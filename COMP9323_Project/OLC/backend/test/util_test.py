import base64
import datetime
import os
import uuid

import arrow


def test_uuid():
    # print(type(str(uuid.uuid5(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp())))).replace('-', ''))
    a = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(datetime.datetime.now().timestamp()))).replace('-', '')
    print(a)


def test_path():
    static_folder = 'static/photo'
    basedir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)) + os.sep + static_folder
    if not os.path.exists(basedir):
        print('123sdasa')
    b = os.path.abspath(basedir)
    print(b)


def test_format():
    sql = '123 + {user_id} + 456 + {post_id}'.format(user_id=123)
    sql = sql.format(post_id=456)
    print(sql)


def test_time():
    a = datetime.datetime.now().strftime('%Y-%m-%d')
    b = (datetime.datetime.now() + datetime.timedelta(month=+1)).strftime('%Y-%m-%d')
    print(a)
    print(b)


def test_strftime():
    a = '2019-03-17 11:00:00'
    b = datetime.datetime.strptime(a, "%Y-%m-%d %H:%M:%S")
    print(b)


def test_server_path():
    upload_folder = 'videotest.test/upload'
    path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, os.pardir, upload_folder))
    print(path)


def test_arrow():
    print(arrow.now())
    print(type(arrow.now().datetime))


def test_base():
    with open(
            '/Users/weiqiangzhuang/Doc/UNSW/COMP9323_Project/OLC/backend/static/images/e197ec8539f8cecb3ac485c4ba72d45d.jpg',
            'rb') as f:
        a = base64.b64encode(f.read())
        print(a)


def test_split():
    a = 'data:image/jpeg;base64'
    b = a.split('/')[1].split(';')[0]
    print(b)
