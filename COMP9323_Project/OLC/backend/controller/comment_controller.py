from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from services.comment_service import user_post_comment, user_update_comment, user_delete_comment, \
    show_comments_by_filter

comment_blueprint = Blueprint('comment', __name__)


@comment_blueprint.route('/comment/post_comment', methods=['POST'])
@jwt_required()
def post_comment():
    return user_post_comment(request.json)


@comment_blueprint.route('/comment/update_comment', methods=['POST'])
@jwt_required()
def update_comment():
    return user_update_comment(request.json)


@comment_blueprint.route('/comment/delete_comment', methods=['POST'])
@jwt_required()
def delete_comment():
    return user_delete_comment(request.json)


@comment_blueprint.route('/comment/get_comments', methods=['GET'])
@jwt_required()
def show_comments():
    return show_comments_by_filter(request)
