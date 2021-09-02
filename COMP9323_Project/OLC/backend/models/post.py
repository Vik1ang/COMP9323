import datetime

from backend import db


class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    uid = db.Column(db.Integer)
    contents = db.Column(db.Text, nullable=False)
    category = db.Column(db.Integer, nullable=False)
    post_uuid = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Integer, nullable=False)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    update_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())

    def __repr__(self):
        return '<question %s>' % self.title
