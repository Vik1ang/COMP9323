from flask_jwt_extended import get_jwt_identity

from backend import db
from models.answer_follow import AnswerFollow
from models.follow import Follow
from models.follow_post import PostFollow
from sql.follow_sql import sql_user_get_following_list
from utils.error_code import MYSQL_ERROR, PARAM_ERROR, BUSINESS_LOGIC_ERROR
from utils.oss_utils import get_oss_url
from utils.response import SuccessResponse, ExceptionResponse


def show_following_by_user(req):
    identity = get_jwt_identity()
    following_id = identity['user_id']
    print(following_id)
    sql = sql_user_get_following_list.format(following_id)
    following_list = db.session.execute(sql).fetchall()
    result_list = []
    for _ in following_list:
        profile_photo_name = _.profile_photo
        if not profile_photo_name or len(profile_photo_name) == 0:
            profile_photo = ''
        else:
            profile_photo = get_oss_url('profile' + '/' + _.profile_photo)
        result = {
            'user_id': _.user_id,
            'username': _.username,
            'profile_photo': profile_photo
        }
        result_list.append(result)
    return SuccessResponse(data={"following_list": result_list}).response


def user_follow(req):
    identity = get_jwt_identity()
    following_id = identity['user_id']
    user_id = req.get('user_id')
    if not user_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    follow = Follow.query.filter_by(following_id=following_id, user_id=user_id).first()
    if follow:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    follow = Follow(following_id=following_id, user_id=user_id)
    try:
        db.session.add(follow)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_unfollow(req):
    identity = get_jwt_identity()
    following_id = identity['user_id']
    user_id = req.get('user_id')
    if not user_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    try:
        Follow.query.filter_by(following_id=following_id, user_id=user_id).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def follow_post(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    post_id = req.get('post_id')
    if not post_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    # TODO: if have follow should raise exception
    post_follow = PostFollow(post_id=post_id, user_id=user_id)
    try:
        db.session.add(post_follow)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def unfollow_post(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    post_id = req.get('post_id')
    if not post_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    # TODO: authori
    post_follow = PostFollow.query.filter_by(post_id=post_id, user_id=user_id).first()
    if not post_follow:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    try:
        db.session.query(PostFollow).filter_by(post_id=post_id, user_id=user_id).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_follow_answer(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    answer_id = req.get('answer_id')
    if not answer_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    answer_follow = AnswerFollow.query.filter_by(user_id=user_id, answer_id=answer_id).first()
    if answer_follow:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    answer_follow = AnswerFollow(user_id=user_id, answer_id=answer_id)
    try:
        db.session.add(answer_follow)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def user_unfollow_answer(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    answer_id = req.get('answer_id')
    if not answer_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    answer_follow = AnswerFollow.query.filter_by(user_id=user_id, answer_id=answer_id).first()
    if not answer_follow:
        return ExceptionResponse(error_code=BUSINESS_LOGIC_ERROR).response
    try:
        db.session.query(AnswerFollow).filter_by(user_id=user_id, answer_id=answer_id).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response
