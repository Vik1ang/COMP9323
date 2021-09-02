import datetime
import uuid

from flask_jwt_extended import get_jwt_identity

from backend import db
from models.answer import Answer
from sql.answer_sql import sql_get_answers_by_filter
from sql.comment_sql import sql_get_comments_by_answer_id
from utils.error_code import MYSQL_ERROR, ANSWER_ID_NOT_EXIST, BUSINESS_LOGIC_ERROR
from utils.response import ExceptionResponse, SuccessResponse


def user_post_answer(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    post_id = req.get('post_id')
    content = req.get('content')
    post_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(user_id) + str(datetime.datetime.now().timestamp()))).replace(
        '-', '')

    answer = Answer(user_id=user_id, post_id=post_id, content=content, post_uuid=post_uuid,
                    create_time=datetime.datetime.now(),
                    update_time=datetime.datetime.now())
    try:
        db.session.add(answer)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_update_answer(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    post_id = req.get('post_id')
    content = req.get('content')
    answer_id = req.get('answer_id')
    answer = Answer.query.filter_by(id=answer_id, post_id=post_id).first()
    if not answer:
        return ExceptionResponse(error_code=ANSWER_ID_NOT_EXIST).response
    if answer.user_id != user_id:
        return ExceptionResponse(BUSINESS_LOGIC_ERROR).response
    try:
        db.session.query(Answer).filter_by(id=answer_id, post_id=post_id).update(
            {
                "content": content,
                "update_time": datetime.datetime.now()
            })
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_delete_answer(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    answer_id = req.get('answer_id')
    answer = Answer.query.filter_by(id=answer_id).first()
    if not answer:
        return ExceptionResponse(error_code=ANSWER_ID_NOT_EXIST).response
    if answer.user_id != user_id:
        return ExceptionResponse(BUSINESS_LOGIC_ERROR).response
    try:
        db.session.query(Answer).filter_by(id=answer_id).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def show_answer_by_filter(req):
    identity = get_jwt_identity()
    post_id = req.args.get('post_id')
    user_id = req.args.get('user_id')
    answer_id = req.args.get('answer_id')
    search = req.args.get('search')
    is_follow = req.args.get('is_follow')
    sort = req.args.get('sort')
    self_user_id = identity['user_id']
    sql = sql_get_answers_by_filter.format(self_user_id)
    if post_id:
        sql += ' and a.post_id = {} '.format(post_id)
    if user_id:
        sql += ' and a.user_id = {} '.format(user_id)
    if answer_id:
        sql += ' and a.id = {} '.format(answer_id)
    if search:
        sql += ' and a.content like (\'%{}%\') '.format(search)
    if is_follow:
        sql += ' and (select count(1) from answer_follow af where af.user_id = {} and af.answer_id = a.id) = 1 '.format(
            is_follow)
    if not sort:
        sql += ' order by a.create_time asc '
    else:
        sort = int(sort)
        if sort == 0:
            sql += ' order by like_num asc'
        elif sort == 1:
            sql += ' order by like_num desc'
        elif sort == 2:
            sql += ' order by a.update_time asc'
        elif sort == 3:
            sql += ' order by a.update_time desc'

    answer_list = db.session.execute(sql).fetchall()
    result_list = []
    for _ in answer_list:
        comment_list = db.session.execute(sql_get_comments_by_answer_id.format(_.answer_id)).fetchall()
        result = {
            "answer_id": _.answer_id,
            "content": _.content,
            "user_id": _.user_id,
            "user_profile_photo": _.profile_photo,
            "username": _.username,
            "post_id": _.post_id,
            "type": _.type,
            "category": _.category,
            "create_time": _.create_time,
            "update_time": _.update_time,
            "post_uuid": _.post_uuid,
            "is_follow": _.is_follow,
            "like_num": _.like_num,
            "comment_list": comment_list
        }
        result_list.append(result)
    return SuccessResponse(data={"answer_list": result_list}).response
