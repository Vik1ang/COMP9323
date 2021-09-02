import datetime

from sqlalchemy import ForeignKey

from backend import db


class Expert(db.Model):
    __tablename__ = 'expert'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    u_id = db.Column(db.Integer, ForeignKey("user.id"))
    related_experience = db.Column(db.Text, nullable=True)
    status = db.Column(db.Integer, default=0)
    application_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    expert_time = db.Column(db.DateTime, nullable=True)
