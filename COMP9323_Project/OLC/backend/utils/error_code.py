err_msg = dict()

# General (try not to use)
BUSINESS_LOGIC_ERROR = 555
err_msg[BUSINESS_LOGIC_ERROR] = 'business logic error'

# 601 - 800 user role/service

PARAM_ERROR = 600
err_msg[PARAM_ERROR] = 'parameter error'

NAME_OR_PASSWORD_ERROR = 601
err_msg[NAME_OR_PASSWORD_ERROR] = 'email or password error'

NAME_EXISTS_ERROR = 602
err_msg[NAME_EXISTS_ERROR] = 'username exists'

PASSWORD_FORMAT_ERROR = 603
err_msg[PASSWORD_FORMAT_ERROR] = 'password format error'

USER_ALREADY_APPLY_EXPERT = 604
err_msg[USER_ALREADY_APPLY_EXPERT] = 'user has already applied expert'

COMMUNITY_ALREADY_EXIST = 605
err_msg[COMMUNITY_ALREADY_EXIST] = 'community exists'

ANSWER_ID_NOT_EXIST = 606
err_msg[ANSWER_ID_NOT_EXIST] = 'answer id not exists'

COMMENT_ID_NOT_EXIST = 607
err_msg[COMMUNITY_ALREADY_EXIST] = 'comment id not exists'

EXPERT_ID_NOT_FOUND = 608
err_msg[EXPERT_ID_NOT_FOUND] = 'expert id not found'

NOTIFICATION_ID_NOT_FOUND = 609
err_msg[NOTIFICATION_ID_NOT_FOUND] = 'notification id not found'

ORDER_ID_NOT_FOUND = 610
err_msg[ORDER_ID_NOT_FOUND] = 'order id not found'

ORDER_HAS_BEEN_PROCESSED = 611
err_msg[ORDER_HAS_BEEN_PROCESSED] = 'order has been processed'

USER_ID_NOT_FOUND = 612
err_msg[USER_ID_NOT_FOUND] = 'user_id not found'

# 801 - 1000 middleware
MYSQL_ERROR = 801
err_msg[MYSQL_ERROR] = 'database error'

# 1001 - 1200 pay
PAY_ERROR = 1001
err_msg[PAY_ERROR] = 'general pay error'
