sql_get_own_post_list = '''
select p.id, p.title, p.contents, c.name category, p.update_time, p.post_uuid
from post p
         left join community c on c.id = p.category
where p.uid = {user_id} 
'''

sql_get_all_post_list = '''
select p.id,
       p.type,
       u.username,
       p.uid creator_id,
       p.title,
       p.contents,
       c.name                                                                                 category,
       p.update_time,
       p.create_time,
       p.post_uuid,
       ifnull((select count(1) from post_follow where post_id = p.id and user_id = {}), 1) as is_follow,
       (select count(1) from post_follow where post_id = p.id) follow_num
from post p
         left join community c on c.id = p.category
         left join user u on u.id = p.uid
where 1 = 1 
'''

sql_get_post_video = '''
select pv.post_id, pv.video_name from post_video pv 
'''
