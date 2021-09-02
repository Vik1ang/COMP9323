import logging

from flask import Flask
from flask_cors import CORS

import config
from middleware.jwt import jwt
from middleware.log import handler
from middleware.sqlalchemy import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)
    jwt.init_app(app)

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.addHandler(handler)

    CORS(app, supports_credentials=True)

    from .controller.user_controller import user_blueprint
    app.register_blueprint(user_blueprint)
    from .controller.posting_controller import post_blueprint
    app.register_blueprint(post_blueprint)
    from .controller.admin_controller import admin_blueprint
    app.register_blueprint(admin_blueprint)
    from .controller.community_controller import community_blueprint
    app.register_blueprint(community_blueprint)
    from .controller.follow_controller import follow_blueprint
    app.register_blueprint(follow_blueprint)
    from .controller.expert_controller import expert_blueprint
    app.register_blueprint(expert_blueprint)
    from .controller.payment_controller import payment_blueprint
    app.register_blueprint(payment_blueprint)
    from .controller.answer_controller import answer_blueprint
    app.register_blueprint(answer_blueprint)
    from .controller.comment_controller import comment_blueprint
    app.register_blueprint(comment_blueprint)

    return app
