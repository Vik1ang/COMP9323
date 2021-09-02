from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from services.community_service import show_community, community_add, community_name_check, community_delete

community_blueprint = Blueprint('community', __name__)


@community_blueprint.route('/community/getAllCommunity', methods=['GET'])
def show_communities():
    return show_community(request)


@community_blueprint.route('/community/addCommunity', methods=['POST'])
@jwt_required()
def add_community():
    return community_add(request.json)


@community_blueprint.route('/community/check_community_name', methods=['GET'])
@jwt_required()
def check_community():
    return community_name_check(request)


@community_blueprint.route('/community/delete_community', methods=['POST'])
@jwt_required()
def delete_community():
    return community_delete(request.json)
