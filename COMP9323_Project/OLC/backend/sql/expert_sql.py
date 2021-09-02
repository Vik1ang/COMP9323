sql_insert_personal_certificates = '''
insert expert_personal_certificate(expert_id, image_name)
values 
'''

sql_select_personal_certificates = '''
select image_name from expert_personal_certificate where expert_id = {}
'''

sql_insert_video = '''
insert post_video(post_id, video_name)
values
'''

sql_delete_personal_certificates = '''
delete from expert_personal_certificate where expert_id = {}
'''