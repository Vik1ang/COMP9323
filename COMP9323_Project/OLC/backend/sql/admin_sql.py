sql_admin_show_application_without_status = '''
select e.id, e.application_time,e.expert_time, u.username, e.status, e.u_id
from expert e
    left join user u on e.u_id = u.id
where 1 = 1
'''

sql_admin_show_application_with_status = '''
select e.id, e.application_time,e.expert_time, u.username, e.status, e.u_id 
from expert e
    left join user u on e.u_id = u.id
where 1 = 1 and e.status = {} 
'''

sql_admin_show_payment_without_status = '''
select p.id,
       p.start_time start_time,
       p.user_id                                              user_id,
       (select username from user u1 where u1.id = p.user_id) user_name,
       p.exp_id                                               expert_id,
       (select username
        from user u2
                 left join expert e1 on u2.id = e1.u_id
        where e1.id = p.exp_id)                               expert_name,
       p.duration,
       p.price,
       p.status
from payment p
         left join expert e on p.exp_id = e.id
         left join user u on p.user_id = u.id
where 1 = 1
'''

sql_admin_show_payment_with_status = '''
select p.id,
       p.start_time,
       p.user_id                                              user_id,
       (select username from user u1 where u1.id = p.user_id) user_name,
       p.exp_id                                               expert_id,
       (select username
        from user u2
                 left join expert e1 on u2.id = e1.u_id
        where e1.id = p.exp_id)                               expert_name,
       p.duration,
       p.price,
       p.status
from payment p
         left join expert e on p.exp_id = e.id
         left join user u on p.user_id = u.id
where 1 = 1 and  p.status = {}
'''

sql_admin_get_daily_data = '''
select (select count(1)
        from user u
        where u.create_time between \'{}\' and \'{}\'
          and u.role != 0
       )                                                           user_num,
       (select count(1)
        from expert e
        where e.expert_time between \'{}\' and \'{}\'
          and e.status = 1)                                        expert_num,
       (select sum(p.price)
        from payment p
        where p.start_time between \'{}\' and \'{}\') income,
       (select count(1)
        from post p
        where p.create_time between \'{}\' and \'{}\') post_num;
'''

sql_admin_get_total_data = '''
select (select count(1)
        from user u
        where u.role != 0
       )                    user_num,
       (select count(1)
        from expert e
        where e.status = 1) expert_num,
       (select sum(p.price)
        from payment p)     income,
       (select count(1)
        from post p)        post_num;
'''


sql_admin_get_expert_details = '''
select e.id, e.application_time,e.expert_time, u.username, e.status, e.related_experience, e.u_id
from expert e
    left join user u on e.u_id = u.id
where 1 = 1 and e.id = {} 
'''

sql_admin_get_data_by_time = '''
select (select count(1)
        from user u
        where u.create_time between \'{}\' and \'{}\'
          and u.role != 0
       )                                                           user_num,
       (select count(1)
        from expert e
        where e.expert_time between \'{}\' and \'{}\'
          and e.status = 1)                                        expert_num,
       (select sum(p.price)
        from payment p
        where p.start_time between \'{}\' and \'{}\') income,
       (select count(1)
        from post p
        where p.create_time between \'{}\' and \'{}\') post_num;
'''