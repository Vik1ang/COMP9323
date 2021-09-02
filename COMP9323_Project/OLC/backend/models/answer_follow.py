from backend import db


class AnswerFollow(db.Model):
    __tablename__ = 'answer_follow'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    answer_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
