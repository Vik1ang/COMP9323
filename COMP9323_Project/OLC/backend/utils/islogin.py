from flask import session

from utils.response import AuthorizationErrorResponse


def is_login(func):
    def check_login(*args, **kwargs):
        if session.get('user'):
            ret = func(*args, **kwargs)
            return ret
        else:
            return AuthorizationErrorResponse().response

    return check_login
