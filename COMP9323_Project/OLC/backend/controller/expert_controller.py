from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from services.expert_service import user_apply_expert, user_get_expert_applications, user_get_expert_list

expert_blueprint = Blueprint('expert', __name__)


@expert_blueprint.route('/apply_expert', methods=['POST'])
@jwt_required()
def apply_expert():
    return user_apply_expert(request.json)


@expert_blueprint.route('/show_expert_applications', methods=['GET'])
@jwt_required()
def show_expert_applications():
    return user_get_expert_applications()


@expert_blueprint.route('/show_expert_list', methods=['GET'])
@jwt_required()
def show_expert_list():
    return user_get_expert_list(request)
