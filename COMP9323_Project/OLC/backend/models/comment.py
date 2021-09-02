import datetime

from backend.middleware.sqlalchemy import db


class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    answer_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    update_time = db.Column(db.DateTime, nullable=False)
    post_uuid = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<comment %s>' % self.title
