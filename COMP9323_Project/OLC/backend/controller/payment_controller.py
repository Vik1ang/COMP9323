from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from services.payment_service import pay_expert, expert_deal_appointment

payment_blueprint = Blueprint('payment', __name__)


@payment_blueprint.route('/payment/pay_expert', methods=['POST'])
@jwt_required()
def pay_to_expert():
    return pay_expert(request.json)


@payment_blueprint.route('/payment/deal_appointment', methods=['POST'])
@jwt_required()
def deal_appointment():
    return expert_deal_appointment(request.json)
