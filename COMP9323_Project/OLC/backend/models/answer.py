import datetime

from backend import db


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.datetime.now(), nullable=False)
    update_time = db.Column(db.DateTime, nullable=False)
    post_uuid = db.Column(db.String(255), nullable=False)
