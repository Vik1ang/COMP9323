from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from services.answer_service import user_post_answer, user_update_answer, user_delete_answer, show_answer_by_filter

answer_blueprint = Blueprint('answer', __name__)


@answer_blueprint.route('/answer/post_answer', methods=['POST'])
@jwt_required()
def post_answer():
    return user_post_answer(request.json)


@answer_blueprint.route('/answer/update_answer', methods=['POST'])
@jwt_required()
def update_answer():
    return user_update_answer(request.json)


@answer_blueprint.route('/answer/delete_answer', methods=['POST'])
@jwt_required()
def delete_answer():
    return user_delete_answer(request.json)


@answer_blueprint.route('/answer/get_answers', methods=['GET'])
@jwt_required()
def show_answers():
    return show_answer_by_filter(request)
