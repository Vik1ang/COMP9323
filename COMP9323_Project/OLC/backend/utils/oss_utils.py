import datetime
import os
import uuid

import oss2

from config import accessKeyId, accessKeySecret, aliyunOSSEndpoint, aliyunOSSBucket

oss_auth = oss2.Auth(accessKeyId, accessKeySecret)
oss_bucket = oss2.Bucket(oss_auth, aliyunOSSEndpoint, aliyunOSSBucket)


def upload_file_to_oss(file, folder):
    prefix = str(uuid.uuid3(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp())))
    suffix = os.path.splitext(file.filename)[-1]
    file_name = prefix + suffix
    oss_bucket.put_object(folder + '/' + file_name, file)
    return file_name


def get_oss_url(filepath):
    return oss_bucket.sign_url('GET', filepath, 60 * 60 * 24)


def upload_file_by_open(filename, file_obj):
    oss_bucket.put_object(filename, file_obj)


def upload_file_by_local(filepath, file_name):
    oss_bucket.put_object_from_file(file_name, filepath)
