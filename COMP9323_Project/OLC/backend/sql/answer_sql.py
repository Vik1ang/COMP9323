sql_get_answers_by_filter = '''
select a.id       answer_id,
       a.user_id  user_id,
       u.username username,
       u.profile_photo profile_photo,
       a.content content,
       a.post_id,
       p.type,
       c.name category, 
       a.create_time,
       a.update_time,
       a.post_uuid,
       ifnull((select count(1) from answer_follow af where af.answer_id = a.id and user_id = {}), 1) is_follow,
       (select count(1) from answer_follow af where af.answer_id = a.id) like_num
from answer a
         left join user u on a.user_id = u.id
         left join post p on p.id = a.post_id
         left join community c on c.id = p.category
where 1 = 1 
'''
