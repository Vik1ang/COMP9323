from backend import db
from models.notification import Notification


def send_notification_to(sender_id, receiver_id, title, content, order_id=None, notification_type=0, link=None):
    notification = Notification(receiver_id=receiver_id, sender_id=sender_id, title=title, content=content,
                                order_id=order_id, type=notification_type, link=link)
    try:
        db.session.add(notification)
    except Exception as e:
        print(e)
        db.session.rollback()
        raise Exception


def read_notification(notification_id):
    notification = Notification.query.filter_by(id=notification_id).first()
    notification.is_read = 1
    try:
        db.session.add(notification)
    except Exception as e:
        print(e)
        db.session.rollback()
        raise Exception
