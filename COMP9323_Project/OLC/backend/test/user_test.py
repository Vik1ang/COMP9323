import json
import re
import signal
from subprocess import Popen, PIPE
from time import sleep

import pytest
import requests


@pytest.fixture
def url():
    url_pattern = re.compile(r' \* Running on (http[^ ]*)')
    server = Popen(["python3", "../run.py"], stderr=PIPE, stdout=PIPE)
    local_url = ''
    while True:
        line = server.stderr.readline()
        if url_pattern.match(line.decode()):
            local_url = url_pattern.match(line.decode())
            break
    if local_url:
        yield local_url.group(1)
        server.send_signal(signal.SIGINT)
        waited = 0
        while server.poll() is None and waited < 5:
            sleep(0.1)
            waited += 0.1
        if server.poll() is None:
            server.kill()
    else:
        server.kill()
        raise Exception("Couldn't get URL from local server")


def test_register(url):
    rsp_json = requests.post(url + "/register", json={
        "username": "AsiaHayesI",
        "email": "lRoob@hotmail.com",
        "password": "$~;N![Dv?hDxf?.h<"
    })

    rsp = json.loads(rsp_json.text)
    assert rsp["code"] is 200


def test_login(url):
    rsp_json = requests.post(url + "/login", json={
        "username": "AsiaHayesI",
        "password": "$~;N![Dv?hDxf?.h<"
    })

    rsp = json.loads(rsp_json.text)
    assert rsp["code"] is 200
