import logging
import os
from logging.handlers import TimedRotatingFileHandler

log_dir_name = "logs"
log_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)) + os.sep + log_dir_name
if not os.path.exists(log_folder):
    os.makedirs(log_folder)
log_file_name = log_folder + os.sep + 'olc_log' + '.log'

handler = TimedRotatingFileHandler(log_file_name, when='D', interval=1, backupCount=7)
formatter = logging.Formatter('%(asctime)s: %(levelname)s %(filename)s-%(module)s-%(funcName)s-%(lineno)d %(message)s')
handler.setFormatter(formatter)
handler.suffix = "%Y-%m-%d_%H-%M-%S"
