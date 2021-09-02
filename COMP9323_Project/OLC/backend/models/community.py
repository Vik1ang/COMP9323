import datetime

from middleware.sqlalchemy import db


class Community(db.Model):
    __tablename__ = 'community'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(32), unique=True, nullable=False)
    intro = db.Column(db.Text, nullable=True)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())

    def __repr__(self):
        return 'community %s' % self.id
