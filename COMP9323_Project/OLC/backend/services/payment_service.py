import datetime

import arrow
from flask_jwt_extended import get_jwt_identity

from backend import db
from models.expert import Expert
from models.payment import Payment
from models.user import User
from utils.error_code import MYSQL_ERROR, PARAM_ERROR, EXPERT_ID_NOT_FOUND, ORDER_ID_NOT_FOUND, ORDER_HAS_BEEN_PROCESSED
from utils.notification_util import send_notification_to
from utils.response import ExceptionResponse, SuccessResponse
from utils.zoom_util import create_meeting


def pay_expert(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    username = identity['username']
    expert_id = req.get('expert_id')
    duration = req.get('duration')
    price = req.get('price')
    start_time = req.get('start_time')
    if not user_id and not expert_id and not duration and not price and not start_time:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    duration = duration * 60
    expert = Expert.query.filter_by(id=expert_id).first()
    if not expert:
        return ExceptionResponse(error_code=EXPERT_ID_NOT_FOUND).response
    expert_user = User.query.filter_by(id=expert.u_id).first()
    start_time = datetime.datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")
    payment = Payment(user_id=user_id, exp_id=expert_id, duration=duration, price=price, start_time=start_time)
    try:
        db.session.add(payment)
        db.session.flush()

        content = 'Hi, {}, {} want to have a {} minutes meeting on {}.'.format(expert_user.username, username, duration,
                                                                               start_time)
        send_notification_to(user_id, expert.u_id, 'Expert Appointment', content, order_id=payment.id,
                             notification_type=1)
        db.session.commit()
        return SuccessResponse(data={"order_id": payment.id}).response
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def expert_deal_appointment(req):
    identity = get_jwt_identity()
    user_id = identity['user_id']
    status = req.get('status')
    order_id = req.get('order_id')
    reason = req.get('reason')

    if not status or not order_id or not status:
        return ExceptionResponse(error_code=PARAM_ERROR).response

    status = int(status)
    if status == 2 and not reason:
        return ExceptionResponse(error_code=PARAM_ERROR).response

    payment = Payment.query.filter_by(id=order_id).first()
    if not payment:
        return ExceptionResponse(error_code=ORDER_ID_NOT_FOUND).response
    if payment.status != 0:
        return ExceptionResponse(error_code=ORDER_HAS_BEEN_PROCESSED).response

    applicant_user = User.query.filter_by(id=payment.user_id).first()
    payment.status = status

    expert_user = User.query.filter_by(id=user_id).first()

    try:
        if status == 1:
            date_time_1 = arrow.get(payment.start_time).format('YYYY-MM-DD')
            date_time_2 = arrow.get(payment.start_time).format('HH:mm:ss')
            start_time = date_time_1 + 'T' + date_time_2
            duration = payment.duration + 60
            start_url, join_url, meeting_password = create_meeting(start_time, duration)
            applicant_content = 'Hi {}, your expert booking has been approved, we will meet at {}, the zoom link attached below, and password is {}'.format(
                applicant_user.username,
                payment.start_time,
                meeting_password)
            expert_content = 'Hi {}, your appointment with {} will be held in zoom at {}. The zoom link attached below and meeting password is {}'.format(
                expert_user.username, applicant_user.username, payment.start_time, meeting_password)
            send_notification_to(user_id, user_id, 'Expert Appointment Confirm', expert_content, link=start_url)
            send_notification_to(user_id, applicant_user.id, 'Expert Appointment Confirm', applicant_content,
                                 link=join_url)
        elif status == 2:
            content = 'Hi {}, your expert booking has been rejected, because {}'.format(applicant_user.username, reason)
            send_notification_to(user_id, applicant_user.id, 'Expert Appointment', content)

        db.session.add(payment)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response
