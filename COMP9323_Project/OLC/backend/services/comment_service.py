import datetime
import uuid

from flask_jwt_extended import get_jwt_identity

from backend import db
from models.comment import Comment
from sql.comment_sql import sql_get_comments_by_filter
from utils.error_code import MYSQL_ERROR, COMMENT_ID_NOT_EXIST, BUSINESS_LOGIC_ERROR
from utils.response import SuccessResponse, ExceptionResponse


def user_post_comment(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    answer_id = req.get('answer_id')
    content = req.get('content')
    post_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(user_id) + str(datetime.datetime.now().timestamp()))).replace(
        '-', '')
    comment = Comment(answer_id=answer_id, user_id=user_id, content=content, post_uuid=post_uuid,
                      create_time=datetime.datetime.now(), update_time=datetime.datetime.now())
    try:
        db.session.add(comment)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_update_comment(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    answer_id = req.get('answer_id')
    comment_id = req.get('comment_id')
    content = req.get('content')

    comment = Comment.query.filter_by(id=comment_id, answer_id=answer_id).first()

    if not comment:
        return ExceptionResponse(error_code=COMMENT_ID_NOT_EXIST).response
    if comment.user_id != user_id:
        return ExceptionResponse(BUSINESS_LOGIC_ERROR).response

    try:
        db.session.query(Comment).filter_by(id=comment_id, answer_id=answer_id).update(
            {
                "content": content,
                "update_time": datetime.datetime.now()
            }
        )
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_delete_comment(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    comment_id = req.get('comment_id')
    comment = Comment.query.filter_by(id=comment_id).first()
    if not comment:
        return ExceptionResponse(error_code=COMMENT_ID_NOT_EXIST).response
    if comment.user_id != user_id:
        return ExceptionResponse(BUSINESS_LOGIC_ERROR).response

    try:
        db.session.query(Comment).filter_by(id=comment_id).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def show_comments_by_filter(req):
    answer_id = req.args.get('answer_id')
    user_id = req.args.get('user_id')
    search = req.args.get('search')
    comment_id = req.args.get('comment_id')

    sql = sql_get_comments_by_filter

    if answer_id:
        sql += ' and c.answer_id = {} '.format(answer_id)
    if user_id:
        sql += ' and c.user_id = {} '.format(user_id)
    if comment_id:
        sql += ' and c.comment_id = {} '.format(comment_id)
    if search:
        sql += ' and c.content like (\'%{}%\') '.format(search)

    sql += ' order by c.create_time asc '

    comment_list = db.session.execute(sql).fetchall()
    result_list = []
    for _ in comment_list:
        result = {
            "comment_id": _.comment_id,
            "content": _.content,
            "user_id": _.user_id,
            "username": _.username,
            "answer_id": _.answer_id,
            "post_uuid": _.post_uuid,
            "create_time": _.create_time,
            "update_time": _.update_time
        }
        result_list.append(result)
    return SuccessResponse(data={"comment_list": result_list}).response
