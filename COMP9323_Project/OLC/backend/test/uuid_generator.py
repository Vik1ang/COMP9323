import datetime
import sys
import uuid

uid = sys.argv[0]
post_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(uid) + str(datetime.datetime.now().timestamp()))).replace('-', '')
print(post_uuid)
