DIALECT = 'mysql'
DRIVER = 'pymysql'
USERNAME = 'olcadmin'
PASSWORD = 'comp9323'
HOST = '121.5.155.221'
PORT = '3306'
DATABASE = 'olc'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT, DRIVER, USERNAME, PASSWORD, HOST, PORT,
                                                                       DATABASE)
# TODO: using in product environment
# SECRET_KEY = urandom(50)
# TODO: using in development environment
SECRET_KEY = 'COMP9323'

JWT_SECRET_KEY = SECRET_KEY
PROPAGATE_EXCEPTIONS = True

accessKeyId = '123'
accessKeySecret = '123'
aliyunOSSEndpoint = 'oss-accelerate.aliyuncs.com'
aliyunOSSBucket = 'comp9323-olc'
