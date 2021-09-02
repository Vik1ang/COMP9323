from flask import make_response

from utils.error_code import err_msg


class SuccessResponse:
    def __init__(self, data=None):
        if data is None:
            data = dict()
        resp = make_response(data)
        resp.mimetype = 'application/json'
        resp.status = '200 OK'
        self.response = resp


class ExceptionResponse:
    def __init__(self, error_code, data=None):
        if data is None:
            data = dict()
        resp = make_response()
        resp.mimetype = 'application/json'
        resp.status_code = error_code
        resp.status = str(error_code) + ' ' + err_msg[error_code]
        self.response = resp


class AuthorizationErrorResponse:
    def __init__(self):
        resp = make_response('Unauthorized')
        resp.status_code = 401
        resp.status = '401 unauthorized'
        resp.mimetype = 'application/json'
        self.response = resp
