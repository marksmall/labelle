"""
Django settings for Continuous Integration environment.
"""

from .base import *  # noqa
from .base import env

###########
# General #
###########

DEBUG = True

SECRET_KEY = "ci_labelle_4cp9^q84zd%!9i(m=mo14&bzdhg*ud=wr**+*=*#2#a5%fq*mh"

ALLOWED_HOSTS = [
    # note that ALLOWED_HOSTS is set to "['*']" in "deployment.py"
    # since Nginx is handling host vulnerabilities
    "localhost",
    "0.0.0.0",
    "127.0.0.1",
]

###############
# Media files #
###############

MEDIA_URL = "/media/"
MEDIA_ROOT = str(SERVER_DIR("media"))

############
# Database #
############

# database values are hard-coded in the appropriate section of build.yml;
# a transient db is created at 127.0.0.1:5666

#########
# Email #
#########

EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
EMAIL_HOST = "localhost"
EMAIL_PORT = 1025
