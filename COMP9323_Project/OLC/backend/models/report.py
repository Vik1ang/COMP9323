from backend.middleware.sqlalchemy import db


class Report(db.Model):
    __tablename__ = 'report'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_uuid = db.Column(db.Integer, nullable=False)
    count = db.Column(db.Integer)
