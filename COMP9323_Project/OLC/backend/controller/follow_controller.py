from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from services.follow_service import show_following_by_user, user_follow, user_unfollow, follow_post, unfollow_post, \
    user_follow_answer, user_unfollow_answer

follow_blueprint = Blueprint('follow', __name__)


@follow_blueprint.route('/user/following', methods=['POST'])
@jwt_required()
def user_follow_user():
    return user_follow(request.json)


@follow_blueprint.route('/user/unfollowing', methods=['POST'])
@jwt_required()
def user_unfollow_user():
    return user_unfollow(request.json)


@follow_blueprint.route('/getMyFollowing', methods=['GET'])
@jwt_required()
def user_get_followings():
    return show_following_by_user(request)


@follow_blueprint.route('/follow_post', methods=['POST'])
@jwt_required()
def user_follow_post():
    return follow_post(request.json)


@follow_blueprint.route('/unfollow_post', methods=['POST'])
@jwt_required()
def user_unfollow_post():
    return unfollow_post(request.json)


@follow_blueprint.route('/answer/follow_answer', methods=['POST'])
@jwt_required()
def follow_answer():
    return user_follow_answer(request.json)


@follow_blueprint.route('/answer/unfollow_answer', methods=['POST'])
@jwt_required()
def unfollow_answer():
    return user_unfollow_answer(request.json)
