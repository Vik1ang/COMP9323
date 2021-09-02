from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from services.posting_service import user_posting, user_get_own_posting, get_all_posting_by, user_update_posting, \
    user_delete_posting

post_blueprint = Blueprint('post', __name__)


@post_blueprint.route('/post/posting', methods=['POST'])
@jwt_required()
def posting():
    return user_posting(request)


@post_blueprint.route('/post/update', methods=['POST'])
@jwt_required()
def update_post():
    return user_update_posting(request.json)


@post_blueprint.route('/post/delete', methods=['POST'])
@jwt_required()
def delete_post():
    return user_delete_posting(request.json)


@post_blueprint.route('/post/getMyPosts', methods=['GET'])
@jwt_required()
def get_my_post_list():
    return user_get_own_posting(request)


@post_blueprint.route('/post/getAllPosts', methods=['GET'])
@jwt_required()
def get_all_post_by():
    return get_all_posting_by(request.args)
