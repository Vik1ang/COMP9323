from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from services.user_service import user_login, user_register, user_logout, user_change_password, user_admit_report, \
    jwt_decode, get_user_info, user_get_notification, user_update_profile, get_my_info, read_notification

user_blueprint = Blueprint('user', __name__)


@user_blueprint.route('/login', methods=['POST'])
def login():
    return user_login(request.get_json())


@user_blueprint.route('/register', methods=['POST'])
def register():
    return user_register(request.get_json())


@user_blueprint.route('/logout', methods=['GET'])
def logout():
    return user_logout()


@user_blueprint.route('/user/change_password', methods=['POST'])
@jwt_required()
def change_password():
    return user_change_password(request.get_json())


@user_blueprint.route('/user/admit_report', methods=['POST'])
@jwt_required()
def admit_report():
    return user_admit_report(request.json)


@user_blueprint.route('/user/jwt_decode', methods=['GET'])
@jwt_required()
def decode_jwt():
    return jwt_decode()


@user_blueprint.route('/user/get_user_info', methods=['GET'])
@jwt_required()
def user_info():
    return get_user_info(request)


@user_blueprint.route('/user/get_notifications', methods=['GET'])
@jwt_required()
def get_notification():
    return user_get_notification()


@user_blueprint.route('/user/update_profile', methods=['POST'])
@jwt_required()
def update_profile():
    return user_update_profile(request.json)


@user_blueprint.route('/user/get_my_info', methods=['GET'])
@jwt_required()
def get_own_info():
    return get_my_info()


@user_blueprint.route('/user/read_notification', methods=['POST'])
@jwt_required()
def user_read_notification():
    return read_notification(request.json)
