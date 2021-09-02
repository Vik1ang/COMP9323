import os


def get_image_folder():
    static_folder = 'static/images'
    image_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)) + os.sep + static_folder
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)
    return image_folder


# def get_image_folder():
#     static_folder = 'videotest.test/upload/image'
#     image_folder = os.path.abspath(
#         os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, os.pardir, static_folder))
#     if not os.path.exists(image_folder):
#         os.makedirs(image_folder)
#     return image_folder


def get_video_folder():
    static_folder = 'videotest.test/upload/video'
    video_folder = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, os.pardir, static_folder)
    if not os.path.exists(video_folder):
        os.makedirs(video_folder)
    return video_folder


def get_file_abs_path(folder, file_name):
    # file_path =
    # return os.path.abspath(file_path)
    return os.path.abspath(os.path.join(folder, file_name))
