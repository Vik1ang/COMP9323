sql_get_notification_by_user = '''
select n.id,
       n.sender_id,
       (select username from user where id = n.sender_id) sender_name,
       (select profile_photo from user where id = n.sender_id) sender_profile_photo,
       n.receiver_id,
       (select username from user where id = n.receiver_id) receiver_name,
       (select profile_photo from user where id = n.receiver_id) receiver_profile_photo,
       n.title,
       n.content,
       n.is_read,
       n.order_id order_id,
       n.type,
       n.link,
       n.create_time
from notification n
where receiver_id = {}
order by n.create_time desc 
'''

sql_get_if_follow = '''
select ifnull((select count(1)
               from follow
               where following_id = {}
                 and user_id = {}), 1) is_followed
'''
