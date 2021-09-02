import datetime

from middleware.sqlalchemy import db


class Payment(db.Model):
    __tablename__ = 'payment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    exp_id = db.Column(db.Integer, db.ForeignKey('expert.id'))
    duration = db.Column(db.Integer, nullable=False, default=30)
    price = db.Column(db.Integer, nullable=False, default=0)
    status = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return 'payment %s' % self.id
