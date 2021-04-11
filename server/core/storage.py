from django.conf import settings
from django.core.files.storage import FileSystemStorage


class LocalStorage(FileSystemStorage):
    pass
