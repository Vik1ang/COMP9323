from backend import db


class PostFollow(db.Model):
    __tablename__ = 'post_follow'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
