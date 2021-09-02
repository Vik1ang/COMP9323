import base64
import datetime
import os
import uuid

from flask_jwt_extended import get_jwt_identity

from backend import db
from models.expert import Expert
from sql.expert_sql import sql_insert_personal_certificates, sql_select_personal_certificates, \
    sql_delete_personal_certificates
from utils.error_code import MYSQL_ERROR, USER_ALREADY_APPLY_EXPERT, PARAM_ERROR
from utils.file_util import get_image_folder
from utils.oss_utils import upload_file_by_local
from utils.response import SuccessResponse, ExceptionResponse


def user_apply_expert(request):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    related_experience = request.get('related_experience')
    personal_certificate = request.get('personal_certificate')
    if not related_experience and not personal_certificate:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    expert = Expert.query.filter_by(u_id=user_id).first()
    if expert:
        if expert.status == 0 or expert.status == 1:
            return ExceptionResponse(error_code=USER_ALREADY_APPLY_EXPERT).response
        elif expert.status == 2:
            sql = sql_delete_personal_certificates.format(expert.id)
            try:
                db.session.execute(sql)
            except Exception as e:
                print(e)
                db.session.rollback()
                return ExceptionResponse(error_code=MYSQL_ERROR).response
            expert.status = 0
    else:
        expert = Expert(u_id=user_id)

    if related_experience:
        expert.related_experience = related_experience
    try:
        db.session.add(expert)
        db.session.flush()
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response

    expert_id = expert.id
    image_list = []
    if personal_certificate:
        image_folder = get_image_folder()
        for _ in personal_certificate:
            prefix = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp())))
            suffix = _.split('/')[1].split(';')[0]
            file_name = prefix + '.' + suffix
            data = _.split(',')[1]
            profile_photo_data = base64.b64decode(data)
            file_path = os.path.join(image_folder, file_name)
            file = open(file_path, 'wb')
            file.write(profile_photo_data)
            file.close()

            upload_file_by_local(os.path.abspath(file_path), 'expert' + '/' + file_name)
            image_list.append(file_name)

            os.remove(file_path)

        try:
            sql = sql_insert_personal_certificates
            for _ in image_list:
                sql += ' ({}, \'{}\'),'.format(expert_id, _)
            sql = sql[:-1]
            print(sql)
            db.session.execute(sql)
        except Exception as e:
            print(e)
            db.session.rollback()
            return ExceptionResponse(error_code=MYSQL_ERROR).response

    try:
        db.session.commit()
    except Exception as e:
        print(e)
        # for _ in image_list:
        #     file_path = os.path.join(image_folder, _)
        #     os.remove(file_path)
        return ExceptionResponse(error_code=MYSQL_ERROR).response
    return SuccessResponse(data={"expert_id": expert_id}).response


def user_get_expert_applications():
    identity = get_jwt_identity()
    user_id = identity['user_id']
    expert = Expert.query.filter_by(u_id=user_id, status=0).first()
    expert_id = expert.id
    sql = sql_select_personal_certificates.format(expert_id)
    image_list = db.session.execute(sql).fetchall()
    image = []
    for _ in image_list:
        image.append(_.image_name)
    return SuccessResponse(data={
        "first_name": expert.first_name,
        "last_name": expert.last_name,
        "related_experience": expert.related_experience,
        "personal_certificate": image
    }).response


def user_get_expert_list(req):
    expert_list = Expert.query.filter_by(status=1).all()
    result_list = []
    for _ in expert_list:
        result = {
            "first_name": _.first_name,
            "last_name": _.last_name,
            "related_experience": _.related_experience,
            "expert_id": _.id
        }
        result_list.append(result)
    return SuccessResponse(data={"expert_list": result_list}).response
