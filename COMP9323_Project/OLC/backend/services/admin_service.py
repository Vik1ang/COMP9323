import arrow
from flask_jwt_extended import get_jwt_identity

from backend import db
from models.answer import Answer
from models.comment import Comment
from models.expert import Expert
from models.post import Post
from models.report import Report
from models.user import User
from sql.admin_sql import sql_admin_show_application_with_status, sql_admin_show_application_without_status, \
    sql_admin_show_payment_with_status, sql_admin_show_payment_without_status, sql_admin_get_daily_data, \
    sql_admin_get_total_data, sql_admin_get_expert_details, sql_admin_get_data_by_time
from sql.expert_sql import sql_select_personal_certificates
from utils.error_code import MYSQL_ERROR, PARAM_ERROR, EXPERT_ID_NOT_FOUND
from utils.notification_util import send_notification_to
from utils.oss_utils import get_oss_url
from utils.response import SuccessResponse, AuthorizationErrorResponse, ExceptionResponse


def show_payment(req):
    admin_check()
    status = req.args.get('status')
    order_id = req.args.get('order_id')
    if status:
        sql = sql_admin_show_payment_with_status.format(status)
    else:
        sql = sql_admin_show_payment_without_status
    if order_id:
        sql += ' and p.id = {} '.format(order_id)
    payment = db.session.execute(sql).fetchall()
    result_list = []
    for _ in payment:
        result = {
            'orderId': _.id,
            'start_time': _.start_time,
            'user_name': _.user_name,
            'user_id': _.user_id,
            'expert_name': _.expert_name,
            'expert_id': _.expert_id,
            'duration': _.duration,
            'price': _.price,
            'status': _.status
        }
        result_list.append(result)
    return SuccessResponse(data={"payments": result_list}).response


def show_application(req):
    admin_check()
    application_status = req.args.get('status')
    expert_id = req.args.get('expert_id')
    expert_name = req.args.get('expert_name')
    if application_status:
        sql = sql_admin_show_application_with_status.format(application_status)
    else:
        sql = sql_admin_show_application_without_status
    if expert_id:
        sql += ' and e.id = {} '.format(expert_id)
    if expert_name:
        sql += ' and u.username like \'%{}%\' '.format(expert_name)
    application = db.session.execute(sql).fetchall()
    result_list = []
    for _ in application:
        result = {
            'expert_id': _.id,
            'user_id': _.u_id,
            'application_time': _.application_time,
            'expert_time': _.expert_time,
            'expert_name': _.username,
            'status': _.status
        }
        result_list.append(result)
    return SuccessResponse(data={"expert application": result_list}).response


def deal_expert_application(req):
    admin_check()
    expert_id = req.get('expert_id')
    status = req.get('status')
    reason = req.get('reason')
    if status != 1 and status != 2:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    try:
        expert = Expert.query.filter_by(id=expert_id).first()
        if not expert:
            return ExceptionResponse(error_code=EXPERT_ID_NOT_FOUND).response
        expert.status = status
        user_id = expert.u_id
        user = User.query.filter_by(id=user_id).first()
        username = user.username
        content = ''
        if status == 2:
            if not reason:
                return ExceptionResponse(error_code=PARAM_ERROR).response
            user.role = 2
            db.session.add(user)
            content = 'Unfortunately ' + username + '\'s expert application did not pass for some reason: ' + reason
        elif status == 1:
            content = 'Configuration ' + username + ' on becoming an expert'
            expert.expert_time = arrow.now().datetime
        send_notification_to(8, user_id, 'Expert Application', content)
        db.session.add(expert)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def show_expert_details(req):
    admin_check()
    expert_id = req.args.get('expert_id')
    if not expert_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    sql_personal_certificate = sql_select_personal_certificates.format(expert_id)
    sql_expert_details = sql_admin_get_expert_details.format(expert_id)
    expert_details = db.session.execute(sql_expert_details).fetchone()
    image_list = db.session.execute(sql_personal_certificate).fetchall()
    image = []
    for _ in image_list:
        image_url = get_oss_url('expert' + '/' + _.image_name)
        image.append(image_url)
    data = {
        "expert_name": expert_details.username,
        "expert_id": expert_details.id,
        "user_id": expert_details.u_id,
        "expert_time": expert_details.expert_time,
        "related_experience": expert_details.related_experience,
        "personal_certificate": image
    }
    return SuccessResponse(data={"expert": data}).response


def delete_post_answer_comment(req):
    admin_check()
    post_uuid = req.get('post_uuid')
    if not post_uuid:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    try:
        db.session.query(Post).filter_by(post_uuid=post_uuid).delete()
        db.session.query(Answer).filter_by(post_uuid=post_uuid).delete()
        db.session.query(Comment).filter_by(post_uuid=post_uuid).delete()
        db.session.query(Report).filter_by(post_uuid=post_uuid).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def get_all_post_answer_comments(req):
    admin_check()
    result_list = []
    post_uuid = req.args.get('post_uuid')
    if post_uuid:
        post_list = db.session.query(Post).filter_by(post_uuid=post_uuid).all()
        answer_list = db.session.query(Answer).filter_by(post_uuid=post_uuid).all()
        comment_list = db.session.query(Comment).filter_by(post_uuid=post_uuid).all()
    else:
        post_list = db.session.query(Post).all()
        answer_list = db.session.query(Answer).all()
        comment_list = db.session.query(Comment).all()

    for _ in post_list:
        result = {
            "post_uuid": _.post_uuid,
            "creator_id": _.uid,
            "title": _.title,
            "contents": _.contents,
            "update_time": _.update_time,
            "type": 0
        }
        result_list.append(result)
    for _ in answer_list:
        result = {
            "post_uuid": _.post_uuid,
            "creator_id": _.user_id,
            "title": '',
            "contents": _.content,
            "update_time": _.update_time,
            "type": 1
        }
        result_list.append(result)
    for _ in comment_list:
        result = {
            "post_uuid": _.post_uuid,
            "creator_id": _.user_id,
            "title": '',
            "contents": _.content,
            "update_time": _.update_time,
            "type": 2
        }
        result_list.append(result)
    return SuccessResponse(data={"list": result_list}).response


def get_report(req):
    admin_check()
    post_uuid = req.args.get('post_uuid')
    report_list = db.session.query(Report).all()
    post_uuid_list = []
    for _ in report_list:
        post_uuid_list.append(str(_.post_uuid))
    if post_uuid:
        post_list = Post.query.filter_by(post_uuid=post_uuid).all()
        answer_list = Answer.query.filter_by(post_uuid=post_uuid).all()
        comment_list = Comment.query.filter_by(post_uuid=post_uuid).all()
    else:
        post_list = Post.query.filter(Post.post_uuid.in_(post_uuid_list)).all()
        answer_list = Answer.query.filter(Answer.post_uuid.in_(post_uuid_list)).all()
        comment_list = Comment.query.filter(Comment.post_uuid.in_(post_uuid_list)).all()
    result_list = []
    for _ in post_list:
        result = {
            "post_uuid": _.post_uuid,
            "creator_id": _.uid,
            "title": _.title,
            "contents": _.contents,
            "update_time": _.update_time,
            "type": 0
        }
        result_list.append(result)
    for _ in answer_list:
        result = {
            "post_uuid": _.post_uuid,
            "creator_id": _.user_id,
            "title": '',
            "contents": _.content,
            "update_time": _.update_time,
            "type": 1
        }
        result_list.append(result)
    for _ in comment_list:
        result = {
            "post_uuid": _.post_uuid,
            "creator_id": _.user_id,
            "title": '',
            "contents": _.content,
            "update_time": _.update_time,
            "type": 2
        }
        result_list.append(result)
    return SuccessResponse(data={"report_list": result_list}).response


def get_daily_data():
    admin_check()

    now = arrow.now()
    today = now.datetime.strftime('%Y-%m-%d')
    next_day = now.shift(days=+1).datetime.strftime("%Y-%m-%d")

    sql = sql_admin_get_daily_data.format(today, next_day, today, next_day, today, next_day, today, next_day)
    daily_report = db.session.execute(sql).fetchone()
    return SuccessResponse(data={
        "Growing users": daily_report.user_num if daily_report.user_num else 0,
        "Growing experts": daily_report.expert_num if daily_report.expert_num else 0,
        "income": daily_report.income if daily_report.income else 0,
        "post": daily_report.post_num if daily_report.post_num else 0
    }).response


def get_total_data():
    admin_check()
    sql = sql_admin_get_total_data
    now = arrow.now()
    total_report = {}
    for _ in range(0, 6):
        last = now.shift(months=-1)
        now_date = now.datetime.strftime('%Y-%m-%d')
        last_date = last.datetime.strftime('%Y-%m-%d')
        sql = sql_admin_get_data_by_time.format(last_date, now_date, last_date, now_date, last_date, now_date,
                                                last_date, now_date)
        report = db.session.execute(sql).fetchone()
        monthly_result = {
            "Growing users": report.user_num if report.user_num else 0,
            "Growing experts": report.expert_num if report.expert_num else 0,
            "income": report.income if report.income else 0,
            "post": report.post_num if report.post_num else 0
        }
        total_report[str(_)] = monthly_result
        now = now.shift(months=-1)

    user_num = User.query.count()
    expert_num = Expert.query.filter_by(status=1).count()

    return SuccessResponse(data={
        "total_report": total_report,
        "total_user": user_num,
        "total_expert": expert_num
    }).response


def admin_check():
    identity = get_jwt_identity()
    if 0 != identity['role']:
        return AuthorizationErrorResponse().response


def admin_delete_expert(req):
    admin_check()
    expert_id = req.get('expert_id')
    if not expert_id:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    expert = Expert.query.filter_by(id=expert_id).first()
    if not expert:
        return ExceptionResponse(error_code=EXPERT_ID_NOT_FOUND).response
    try:
        user_id = expert.u_id
        user = User.query.filter_by(id=user_id).first()
        user.role = 1
        db.session.query(Expert).filter_by(id=expert_id).delete()
        db.session.add(user)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.session.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response
