import os
import sys

# print(os.path.dirname())
from flask import session

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

import backend

app = backend.create_app()


@app.route('/')
def print_route():
    print(app.url_map)
    name = session.get('user')
    upload_folder = 'videotest.test/upload'
    path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, os.pardir, upload_folder))
    print(path)
    return "upload_folder: %s" % path


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
