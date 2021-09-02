from flask import request, Blueprint
from flask_jwt_extended import jwt_required

from services.admin_service import show_payment, show_application, get_daily_data, get_total_data, \
    delete_post_answer_comment, deal_expert_application, get_all_post_answer_comments, get_report, show_expert_details, \
    admin_delete_expert

admin_blueprint = Blueprint('admin', __name__)


@admin_blueprint.route('/admin/payments', methods=['GET'])
@jwt_required()
def admin_show_payment():
    return show_payment(request)


@admin_blueprint.route('/admin/expert_applications', methods=['GET'])
@jwt_required()
def admin_show_application():
    return show_application(request)


@admin_blueprint.route('/admin/get_expert_details', methods=['GET'])
@jwt_required()
def admin_show_expert_details():
    return show_expert_details(request)


@admin_blueprint.route('/admin/delete', methods=['POST'])
@jwt_required()
def admin_delete():
    return delete_post_answer_comment(request.json)


@admin_blueprint.route('/admin/deal_expert_application', methods=['POST'])
@jwt_required()
def admin_deal_expert_application():
    return deal_expert_application(request.json)


@admin_blueprint.route('/admin/get_all', methods=['GET'])
@jwt_required()
def get_all():
    return get_all_post_answer_comments(request)


@admin_blueprint.route('/admin/get_reports', methods=['GET'])
@jwt_required()
def admin_get_reports():
    return get_report(request)


@admin_blueprint.route('/admin/get_daily_report', methods=['GET'])
@jwt_required()
def get_daily_report():
    return get_daily_data()


@admin_blueprint.route('/admin/get_total_report', methods=['GET'])
@jwt_required()
def get_total_report():
    return get_total_data()


@admin_blueprint.route('/admin/delete_expert', methods=['POST'])
@jwt_required()
def delete_expert():
    return admin_delete_expert(request.json)
