import base64
import datetime
import os
import uuid

import arrow
from flask_jwt_extended import get_jwt_identity

from middleware.sqlalchemy import db
from models.community import Community
from models.expert import Expert
from models.post import Post
from models.report import Report
from sql.expert_sql import sql_insert_video
from sql.post_sql import sql_get_own_post_list, sql_get_all_post_list, sql_get_post_video
from utils.error_code import MYSQL_ERROR, PARAM_ERROR, BUSINESS_LOGIC_ERROR
from utils.file_util import get_video_folder
from utils.oss_utils import upload_file_to_oss, get_oss_url
from utils.response import SuccessResponse, ExceptionResponse


def user_posting(request):
    identity = get_jwt_identity()
    uid = identity["user_id"]
    title = request.form.get('title')
    contents = request.form.get('contents')
    post_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(uid) + str(datetime.datetime.now().timestamp()))).replace('-',
                                                                                                                 '')
    category = request.form.get('category')
    post_type = request.form.get('type')

    video = request.files.getlist('video')

    if not category:
        category = 1
    else:
        category = category.strip()
        category_class = Community.query.filter_by(name=category).first()
        category = category_class.id

    now = arrow.now().datetime
    create_time = now
    update_time = now
    posting = Post(title=title, uid=uid, contents=contents, category=category, post_uuid=post_uuid, type=post_type,
                   create_time=create_time, update_time=update_time)
    db.session.add(posting)
    db.session.flush()
    video_list = []
    if video:
        for _ in video:
            # prefix = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp())))
            # suffix = os.path.splitext(_.filename)[-1]
            # file_name = prefix + suffix
            # file_path = os.path.join(video_folder, file_name)
            # _.save(file_path)
            file_name = upload_file_to_oss(_, 'post')
            video_list.append(file_name)
        try:
            sql = sql_insert_video
            for _ in video_list:
                sql += ' ({}, \'{}\'),'.format(posting.id, _)
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
        db.session.rollback()
        # for _ in video_list:
        #     file_path = os.path.join(video_folder, _)
        #     os.remove(file_path)
        return ExceptionResponse(error_code=MYSQL_ERROR).response
    return SuccessResponse().response


def user_posting_decrypt(request):
    identity = get_jwt_identity()
    title = request.get('title')
    uid = identity["user_id"]
    contents = request.get('contents')
    post_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(uid) + str(datetime.datetime.now().timestamp()))).replace('-',
                                                                                                                 '')
    category = request.get('category')
    post_type = request.get('type')
    video = request.get('video')

    if not category:
        category = 1
    else:
        category = category.strip()
        category_class = Community.query.filter_by(name=category).first()
        category = category_class.id

    posting = Post(title=title, uid=uid, contents=contents, category=category, post_uuid=post_uuid, type=post_type)
    db.session.add(posting)
    db.session.flush()
    video_list = []
    video_folder = get_video_folder()
    if video:
        prefix = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp())))
        suffix = '.mp4'
        file_name = prefix + suffix
        file_path = os.path.join(video_folder, file_name)
        video_list.append(file_name)
        data = base64.b64encode(video)
        file = open(file_path, 'wb')
        file.write(data)
        file.close()

        try:
            sql = sql_insert_video
            for _ in video_list:
                sql += ' ({}, \'{}\'),'.format(posting.id, _)
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
        db.session.rollback()
        for _ in video_list:
            file_path = os.path.join(video_folder, _)
            os.remove(file_path)
        return ExceptionResponse(error_code=MYSQL_ERROR).response
    return SuccessResponse().response


def user_update_posting(req):
    identity = get_jwt_identity()
    uid = identity["user_id"]
    title = req.get('title')
    contents = req.get('contents')
    post_id = req.get('post_id')
    if not title and not contents:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    post = Post.query.filter_by(id=post_id).first()
    if post.uid != uid:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    if title:
        post.title = title
    if contents:
        post.contents = contents
    try:
        db.session.add(post)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_delete_posting(req):
    identity = get_jwt_identity()
    post_id = req.get('post_id')
    user_id = identity['user_id']
    post = Post.query.filter_by(id=post_id).first()
    post_uuid = post.post_uuid
    if post.uid != user_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    try:
        db.session.query(Report).filter_by(post_uuid=post_uuid).delete()
        db.session.query(Post).filter_by(id=post_id).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_get_own_posting(request):
    identity = get_jwt_identity()
    # user_id = identity['user_id']
    community_type = request.args.get('type')
    user_id = request.args.get('user_id')
    if not user_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    sql = sql_get_own_post_list.format(user_id=user_id)
    if community_type:
        sql += ' and p.type = {} '.format(community_type)
    try:
        post_list = db.session.execute(sql).fetchall()
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response
    result_list = []
    for _ in post_list:
        result = {
            'id': _.id,
            'title': _.title,
            'contents': _.contents,
            'category': _.category,
            'post_uuid': _.post_uuid,
            'update_time': _.update_time
        }
        result_list.append(result)
    return SuccessResponse(data={'post_list': result_list}).response


def get_all_posting_by(req):
    identity = get_jwt_identity()
    self_user_id = identity['user_id']
    community = req.get('community')
    post_type = req.get('type')
    user_id = req.get('user_id')
    post_id = req.get('post_id')
    search = req.get('search')
    is_follow = req.get('is_follow')
    sort = req.get('sort')
    sql = sql_get_all_post_list.format(self_user_id)
    expert_list = db.session.query(Expert).all()
    expert_id_user_id_dict = {}
    for _ in expert_list:
        expert_id_user_id_dict[_.u_id] = _.id

    print(expert_id_user_id_dict)
    if post_type:
        post_type = int(post_type)
        if post_type > 3 or post_type < 1:
            return ExceptionResponse(error_code=PARAM_ERROR).response

        sql += ' and p.type = {} '.format(post_type)
    if community:
        sql += ' and c.name = \'{}\' '.format(community)
    if user_id:
        sql += ' and u.id = {}'.format(user_id)
    if post_id:
        sql += ' and p.id = {}'.format(post_id)
    if search:
        sql += ' and (p.title like (\'%{}%\') or p.contents like \'%{}%\')'.format(search, search)
    if is_follow:
        sql += ' and (select count(1) from post_follow pf where pf.user_id = {} and pf.post_id = p.id) = 1 '.format(
            self_user_id)

    if not sort:
        sql += ' order by p.create_time desc '
    else:
        sort = int(sort)
        if sort == 0:
            sql += ' order by follow_num asc'
        elif sort == 1:
            sql += ' order by follow_num desc'
        elif sort == 2:
            sql += ' order by p.update_time asc'
        elif sort == 3:
            sql += ' order by p.update_time desc'

    try:
        post_list = db.session.execute(sql).fetchall()
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response
    result_list = []
    video_list = db.session.execute(sql_get_post_video).fetchall()
    for _ in post_list:
        expert_id = None
        if expert_id_user_id_dict.__contains__(_.creator_id):
            expert_id = expert_id_user_id_dict[_.creator_id]
        video = []
        for v in video_list:
            if v.post_id == _.id:
                file_url = get_oss_url('post' + '/' + v.video_name)
                video.append(file_url)
        result = {
            'id': _.id,
            'type': _.type,
            'username': _.username,
            'creator_id': _.creator_id,
            'expert_id': expert_id,
            'title': _.title,
            'contents': _.contents,
            'category': _.category,
            'post_uuid': _.post_uuid,
            'update_time': _.update_time,
            'create_time': _.create_time,
            'is_follow': _.is_follow,
            'follow_num': _.follow_num,
            'video': video
        }
        result_list.append(result)
    return SuccessResponse(data={'post_list': result_list}).response
