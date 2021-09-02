import base64
import datetime
import os
import re
import uuid
from datetime import timedelta

import arrow
from flask_jwt_extended import create_access_token, get_jwt_identity

from middleware.sqlalchemy import db
from models.expert import Expert
from models.notification import Notification
from models.report import Report
from models.user import User
from sql.user_sql import sql_get_notification_by_user, sql_get_if_follow
from utils.error_code import MYSQL_ERROR, PARAM_ERROR, PASSWORD_FORMAT_ERROR, NAME_EXISTS_ERROR, \
    NAME_OR_PASSWORD_ERROR, BUSINESS_LOGIC_ERROR, NOTIFICATION_ID_NOT_FOUND, USER_ID_NOT_FOUND
from utils.file_util import get_image_folder
from utils.oss_utils import get_oss_url, upload_file_by_local
from utils.response import ExceptionResponse, SuccessResponse

password_regex = re.compile('(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*\+.~!@#$%^&*()]{8,}$')


def user_login(req):
    username = req["username"]
    password = req["password"]
    user = User.query.filter_by(username=username).first()
    if not user:
        return ExceptionResponse(error_code=NAME_OR_PASSWORD_ERROR).response
    if user.check_password(password) is False or user is None:
        return ExceptionResponse(error_code=NAME_OR_PASSWORD_ERROR).response
    token = create_access_token(identity={
        "username": user.username,
        "user_id": user.id,
        "role": user.role
    }, fresh=False, expires_delta=timedelta(hours=12))
    expert = Expert.query.filter_by(u_id=user.id).first()
    if not expert:
        expert_status = -1
    else:
        expert_status = expert.status
    profile_photo_name = user.profile_photo
    if not profile_photo_name or len(profile_photo_name) == 0:
        profile_photo = None
    else:
        profile_photo = get_oss_url('profile' + '/' + profile_photo_name)
    response = SuccessResponse(data={
        "role": user.role,
        "token": token,
        "user_id": user.id,
        "username": user.username,
        "expert_status": expert_status,
        "profile_photo": profile_photo
    }).response
    response.headers["Authorization"] = 'Bearer ' + token
    return response


def user_register(req):
    username = req["username"]
    password = req["password"]

    if re.match(password_regex, password) is None:
        return ExceptionResponse(error_code=PASSWORD_FORMAT_ERROR).response

    if username and password:
        if User.query.filter_by(username=username).first() is not None:
            return ExceptionResponse(error_code=NAME_EXISTS_ERROR).response
        user = User(username=username, password=password)
        try:
            db.session.add(user)
            db.session.flush()
            db.session.commit()
            token = create_access_token(identity={
                "username": user.username,
                "user_id": user.id,
                "role": user.role
            }, fresh=False, expires_delta=timedelta(hours=12))
            response = SuccessResponse(data={
                "role": user.role,
                "token": token
            }).response
            response.headers["Authorization"] = 'Bearer ' + token
            return response
        except Exception as e:
            print(e)
            db.session.rollback()
            return ExceptionResponse(error_code=MYSQL_ERROR).response
    else:
        return ExceptionResponse(error_code=PARAM_ERROR)


def user_logout():
    return SuccessResponse().response


def user_change_password(req):
    raw_password = req["raw_password"]
    new_password = req["new_password"]
    identity = get_jwt_identity()
    username = identity["username"]

    if re.match(password_regex, new_password) is None:
        return ExceptionResponse(error_code=PASSWORD_FORMAT_ERROR).response

    user = User.query.filter_by(username=username).first()
    if user.check_password(raw_password) is False or user is None:
        return ExceptionResponse(error_code=NAME_OR_PASSWORD_ERROR).response
    user.generate_new_password(new_password)
    try:
        db.session.add(user)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_admit_report(req):
    post_uuid = req.get('post_uuid')
    if not post_uuid:
        return ExceptionResponse(error_code=PARAM_ERROR).response

    report = Report.query.filter_by(post_uuid=post_uuid).first()

    if not report:
        report = Report(post_uuid=post_uuid, count=1)
        db.session.add(report)
    else:
        db.session.query(Report).filter_by(post_uuid=post_uuid).update({"count": report.count + 1})

    try:
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_get_notification():
    identity = get_jwt_identity()
    user_id = identity['user_id']

    sql = sql_get_notification_by_user.format(user_id)
    notification_list = db.session.execute(sql).fetchall()
    result_list = []
    for _ in notification_list:
        receiver_profile_photo_url = None
        if _.receiver_profile_photo:
            receiver_profile_photo_url = get_oss_url('profile' + '/' + _.receiver_profile_photo)
        sender_profile_photo_url = None
        if _.sender_profile_photo:
            sender_profile_photo_url = get_oss_url('profile' + '/' + _.sender_profile_photo)
        result = {
            "id": _.id,
            "receiver_id": _.receiver_id,
            "receiver_name": _.receiver_name,
            "receiver_profile_photo": receiver_profile_photo_url,
            "sender_id": _.sender_id,
            "sender_name": _.sender_name,
            "sender_profile_photo": sender_profile_photo_url,
            "title": _.title,
            "content": _.content,
            "type": _.type,
            "link": _.link,
            "is_read": _.is_read,
            "order_id": _.order_id,
            "create_time": _.create_time
        }
        result_list.append(result)
    return SuccessResponse(data={'notification_list': result_list}).response


def jwt_decode():
    identity = get_jwt_identity()
    return SuccessResponse(data={
        "user_id": identity['user_id'],
        "username": identity['username'],
        "role": identity['role']
    }).response


def get_user_info(req):
    identity = get_jwt_identity()
    my_id = identity['user_id']
    user_id = req.args.get('user_id')
    if not user_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    sql = sql_get_if_follow.format(my_id, user_id)
    res = db.session.execute(sql).fetchone()

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return ExceptionResponse(error_code=USER_ID_NOT_FOUND).response
    expert = Expert.query.filter_by(u_id=user_id).first()
    if not expert:
        expert_id = None
    else:
        expert_id = expert.id
    return SuccessResponse(data={
        "username": user.username,
        "user_id": user.id,
        "role": user.role,
        "is_followed": res.is_followed,
        "expert_id": expert_id
    }).response


def user_update_profile(request):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    real_name = request.get('real_name')
    gender = request.get('gender')
    birth = request.get('birth')
    address = request.get('address')
    profile_photo = request.get('profile_photo')
    if not real_name and not gender and not birth and not address and not profile_photo:
        return ExceptionResponse(error_code=PARAM_ERROR).response

    if real_name:
        user.real_name = real_name
    if gender:
        user.gender = gender
    if birth:
        birth_data = datetime.datetime.strptime(birth, "%Y-%m-%d")
        user.birth = birth_data
    if address:
        user.address = address

    if profile_photo:
        # file_name = upload_file_to_oss(profile_photo, 'profile')
        prefix = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp())))
        suffix = profile_photo.split('/')[1].split(';')[0]
        file_name = prefix + '.' + suffix
        image_folder = get_image_folder()
        data = profile_photo.split(',')[1]
        profile_photo_data = base64.b64decode(data)
        file_path = os.path.join(image_folder, file_name)
        file = open(file_path, 'wb')
        file.write(profile_photo_data)
        file.close()

        upload_file_by_local(os.path.abspath(file_path), 'profile' + '/' + file_name)
        user.profile_photo = file_name

        os.remove(file_path)

    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response

    return SuccessResponse().response


def get_my_info():
    identity = get_jwt_identity()
    user_id = identity['user_id']
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    profile_photo_name = user.profile_photo
    if not profile_photo_name or len(profile_photo_name) == 0:
        profile_photo = None
    else:
        profile_photo = get_oss_url('profile' + '/' + profile_photo_name)

    if user.birth:
        user.birth = arrow.get(user.birth).format('YYYY-MM-DD')

    return SuccessResponse(data={
        "username": user.username,
        "user_id": user.id,
        "role": user.role,
        "profile_photo": profile_photo,
        "real_name": user.real_name,
        "gender": user.gender,
        "birth": user.birth,
        "address": user.address
    }).response


def read_notification(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    notification_id = req.get('notification_id')
    if not notification_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    notification = Notification.query.filter_by(id=notification_id).first()
    if not notification:
        return ExceptionResponse(error_code=NOTIFICATION_ID_NOT_FOUND).response
    if user_id != notification.receiver_id:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    notification.is_read = 1
    try:
        db.session.add(notification)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response
