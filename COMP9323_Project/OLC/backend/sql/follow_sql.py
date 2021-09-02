sql_user_get_following_list = '''
select f.user_id user_id, u.username username, u.profile_photo profile_photo
from follow f
         left join user u on f.user_id = u.id
where f.following_id = {}
order by username;
'''
