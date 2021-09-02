sql_get_comments_by_filter = '''
select c.id       comment_id,
       c.content content,
       c.user_id user_id,
       u.username username,
       c.answer_id,
       c.post_uuid,
       c.create_time,
       c.update_time
from comment c
         left join user u on c.user_id = u.id
where 1 = 1 
'''


sql_get_comments_by_answer_id = '''
select c.id       comment_id,
       c.content  content,
       c.user_id  user_id,
       u.username username,
       u.profile_photo profile_photo,
       c.answer_id,
       c.post_uuid,
       c.create_time,
       c.update_time
from comment c
         left join user u on c.user_id = u.id
where c.answer_id = {}
order by c.create_time
'''