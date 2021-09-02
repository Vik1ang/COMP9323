from flask_jwt_extended import get_jwt_identity

from backend import db
from models.community import Community
from utils.error_code import COMMUNITY_ALREADY_EXIST, MYSQL_ERROR, PARAM_ERROR
from utils.response import SuccessResponse, ExceptionResponse, AuthorizationErrorResponse


def show_community(req):
    search = req.args.get('search')
    if search:
        search_content = '%' + search + '%'
        community_list = Community.query.filter(Community.name.like(search_content)).order_by(Community.name).all()
    else:
        community_list = Community.query.order_by(Community.name).all()
    result_list = []
    for _ in community_list:
        if _.name == 'general':
            continue
        result = {
            'id': _.id,
            'name': _.name,
            'create_time': _.create_time
        }
        result_list.append(result)
    return SuccessResponse(data={"communities": result_list}).response


def community_add(req):
    community_name = req.get('community_name')
    community = Community.query.filter_by(name=community_name).first()
    if community:
        return ExceptionResponse(error_code=COMMUNITY_ALREADY_EXIST).response
    community = Community(name=community_name)
    try:
        db.session.add(community)
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        db.sessiom.rollback()
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def community_name_check(req):
    community_name = req.args.get('community')
    if not community_name:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    community_name.strip()
    community = Community.query.filter_by(name=community_name).first()
    if community:
        is_existed = 1
    else:
        is_existed = 0
    return SuccessResponse(data={"is_existed": is_existed}).response


def community_delete(req):
    admin_check()
    community_name = req.get('community')
    if not community_name:
        return ExceptionResponse(error_code=PARAM_ERROR).response
    community_name = community_name.lstrip()
    community_name = community_name.rstrip()
    try:
        db.session.query(Community).filter_by(name=community_name).delete()
        db.session.commit()
        return SuccessResponse().response
    except Exception as e:
        print(e)
        return ExceptionResponse(error_code=MYSQL_ERROR).response


def admin_check():
    identity = get_jwt_identity()
    if 0 != identity['role']:
        return AuthorizationErrorResponse().response
