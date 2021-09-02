from backend import db


class Follow(db.Model):
    __tablename__ = 'follow'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    following_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
