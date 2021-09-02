sql_get_all_general_questions = '''
select title, contents, category, update_time, u.username
from question q
         left join user u on q.uid = u.id
'''

sql_get_user_following_questions = '''
select q.title, q.id
from question_follow qf
         left join question q on q.id = qf.question_id
where qf.user_id = {user_id};
'''