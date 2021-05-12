"""
Django settings for Development environment.
"""

import socket

from .base import *  # noqa
from .base import env

###########
# General #
###########

SECRET_KEY = env("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = [
    # note that ALLOWED_HOSTS is set to "['*']" in "deployment.py"
    # since Nginx is handling host vulnerabilities
    "*",
]

###############
# Media files #
###############

DEFAULT_FILE_STORAGE = 'core.storage.LocalStorage'
MEDIA_URL = "/media/"
MEDIA_ROOT = str(SERVER_DIR("media"))

#############
# profiling #
#############

# see "https://gist.github.com/douglasmiranda/9de51aaba14543851ca3"
# for tips about making django_debug_toolbar to play nicely w/ Docker

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())

INSTALLED_APPS += ["debug_toolbar", "pympler"]  # noqa F405

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]  # noqa F405

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TEMPLATE_CONTEXT": True,
    "SHOW_COLLAPSED": True,
}

DEBUG_TOOLBAR_PANELS = [
    "debug_toolbar.panels.versions.VersionsPanel",
    "debug_toolbar.panels.timer.TimerPanel",
    "debug_toolbar.panels.settings.SettingsPanel",
    "debug_toolbar.panels.headers.HeadersPanel",
    "debug_toolbar.panels.request.RequestPanel",
    "debug_toolbar.panels.sql.SQLPanel",
    "debug_toolbar.panels.profiling.ProfilingPanel",
    # TODO: THIS WILL NOT WORK B/C OF https://github.com/pympler/pympler/pull/99
    # TODO: IN THE MEANTIME I'VE WRITTEN MY OWN DECORATOR THAT ACCOMPLISHES THE SAME THING
    # 'pympler.panels.MemoryPanel',
    "debug_toolbar.panels.cache.CachePanel",
    "debug_toolbar.panels.signals.SignalsPanel",
    "debug_toolbar.panels.staticfiles.StaticFilesPanel",
    "debug_toolbar.panels.templates.TemplatesPanel",
    "debug_toolbar.panels.logging.LoggingPanel",
    "debug_toolbar.panels.redirects.RedirectsPanel",
]

INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]
INTERNAL_IPS += [ip[:-1] + "1" for ip in ips]

###########
# logging #
###########

# minimal logging in development, just so things work
# proper logging should be setup in deployment

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters":
        {
            "standard":
                {
                    "format":
                        "[develop] %(asctime)s [%(levelname)s] %(name)s: %(message)s"
                }
        },
    "filters": {},
    "handlers":
        {
            "console":
                {
                    "level": "DEBUG",
                    "class": "logging.StreamHandler",
                    "filters": [],
                },
            "mail_admins":
                {
                    "level": "ERROR",
                    "class": "django.utils.log.AdminEmailHandler",
                },
        },
    "root": {
        "handlers": ["console", "mail_admins"],
        "level": "DEBUG",
    },
    "loggers":
        {
            # when DEBUG is True, these loggers spit out _way_ too much information
            # so I'm increasing their levels
            "django.db.backends": {
                "level": "WARNING"
            },
            "django.utils.autoreload": {
                "level": "INFO"
            },
            "environ.environ": {
                "level": "DEBUG"
            },
            "faker": {
                "level": "INFO"
            },
            "factory": {
                "level": "INFO"
            },
        },
}

#########
# Email #
#########

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

##################
# Authentication #
##################

CORS_ORIGIN_ALLOW_ALL = True
