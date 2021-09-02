import json
from time import time

import jwt
import requests

API_KEY = 'UiLWyrDgRX2PPhxSroJunA'
API_SECRET = 'OSiB31kdZ8CEHVwS4xunSYvN9qwpbVuGt9Wd'


def generate_token():
    token = jwt.encode(
        {'iss': API_KEY, 'exp': time() + 5000},

        API_SECRET,

        algorithm='HS256'
    )
    return token


def create_meeting(start_time, duration):
    meeting_details = {
        "topic": "Exert Appointment",
        "type": 2,
        "start_time": start_time,
        "timezone": "Australia/Sydney",
        "duration": duration,
        "agenda": "description",
        "host_email"
        "settings": {
            "host_video": True,
            "participant_video": True,
            "join_before_host": True,
            "jbh_time": 0,
            "approval_type": 0,
            "auto_recording": "none",
        }
    }
    headers = {'authorization': 'Bearer %s' % generate_token(),
               'content-type': 'application/json'}
    r = requests.post(
        f'https://api.zoom.us/v2/users/me/meetings',
        headers=headers, data=json.dumps(meeting_details))
    y = json.loads(r.text)
    print(y)
    join_url = y["join_url"]
    start_url = y["start_url"]
    meeting_password = y["password"]
    return start_url, join_url, meeting_password
