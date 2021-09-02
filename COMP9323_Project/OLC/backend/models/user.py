import datetime

from werkzeug.security import generate_password_hash, check_password_hash

from middleware.sqlalchemy import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    password = db.Column(db.CHAR(128), nullable=False)
    role = db.Column(db.Integer, nullable=False, default=1)
    create_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    real_name = db.Column(db.String(255), nullable=True)
    gender = db.Column(db.Integer, nullable=True)
    birth = db.Column(db.DateTime, nullable=True)
    address = db.Column(db.String(255), nullable=True)
    profile_photo = db.Column(db.Text, nullable=True)

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password=password)

    def check_password(self, pwd):
        return check_password_hash(self.password, pwd)

    def generate_new_password(self, pwd):
        self.password = generate_password_hash(password=pwd)

    def __repr__(self):
        return 'User %s' % self.username
