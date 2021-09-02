import datetime

from backend import db


class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    receiver_id = db.Column(db.Integer, nullable=False)
    sender_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Integer, nullable=False, default=0)
    order_id = db.Column(db.Integer, nullable=True)
    type = db.Column(db.Integer, default=0, nullable=False)
    link = db.Column(db.Integer, nullable=True)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
