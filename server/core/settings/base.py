"""
Base Django settings for all environments.
"""

import environ
from django.utils.html import escape
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

env = environ.Env()

PROJECT_NAME = "Supplier App"
PROJECT_SLUG = slugify(PROJECT_NAME)
PROJECT_EMAIL = "{role}@" + env("DJANGO_EMAIL_DOMAIN", default="labelle.co.uk")

ROOT_DIR = environ.Path(__file__) - 4
SERVER_DIR = ROOT_DIR.path("server")
CLIENT_DIR = ROOT_DIR.path("client")

# SECRET_KEY and DEBUG are overwritten in deployment.py, development.py, or ci.
SECRET_KEY = '3@f+k&_sh=gr=8st93ht_608f1t76qpq0w4_npl-g2ppt6mq9b'
DEBUG = env("DJANGO_DEBUG", default="false").lower() == "true"

APPEND_SLASH = True

SITE_ID = 1

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

PASSWORD_MAX_LENGTH = env('DJANGO_PASSWORD_MAX_LENGTH', default=8)
PASSWORD_MIN_LENGTH = env('DJANGO_PASSWORD_MIN_LENGTH', default=255)
PASSWORD_MIN_STRENGTH = env('DJANGO_PASSWORD_MIN_STRENGTH', default=2)

########
# Apps #
########
DJANGO_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    "django.contrib.sites",
    # statics...
    "whitenoise.runserver_nostatic",
    "django.contrib.staticfiles",
    # admin...
    "django.contrib.admin",
    # cors...
    "corsheaders",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "drf_yasg",
    "django_filters",
    # users...,
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "knox",
    # healthchecks...
    "health_check",
    "health_check.db",
]

LOCAL_APPS = [
    "core",
    "users",
    "authentication",
    "store",
    "bookings",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

##############
# Middleware #
##############
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.cache.UpdateCacheMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.cache.FetchFromCacheMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = 'core.urls'

#############
# Templates #
#############
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS':
            [
                # and find the "index.html" template in the client build......
                str(CLIENT_DIR.path("build")),
            ],
        'OPTIONS':
            {
                "debug":
                    DEBUG,
                "loaders":
                    [
                        # first look at templates in DIRS, then look in the standard place for each INSTALLED_APP
                        "django.template.loaders.filesystem.Loader",
                        "django.template.loaders.app_directories.Loader",
                    ],
                'context_processors':
                    [
                        'django.template.context_processors.debug',
                        'django.template.context_processors.request',
                        'django.contrib.auth.context_processors.auth',
                        'django.contrib.messages.context_processors.messages',
                        "django.template.context_processors.i18n",
                        "django.template.context_processors.media",
                        "django.template.context_processors.static",
                        "django.template.context_processors.tz",
                    ],
            },
    },
]

WSGI_APPLICATION = 'wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default":
        {
            "ATOMIC_REQUESTS": True,
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env("DJANGO_DB_NAME", default=""),
            "USER": env("DJANGO_DB_USER", default=""),
            "PASSWORD": env("DJANGO_DB_PASSWORD", default=""),
            "HOST": env("DJANGO_DB_HOST", default=""),
            "PORT": env("DJANGO_DB_PORT", default=""),
        }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME':
            'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'users.validators.LengthPasswordValidator',
        'OPTIONS':
            {
                'min_length': PASSWORD_MIN_LENGTH,
                'max_length': PASSWORD_MAX_LENGTH,
            }
    },
    {
        'NAME': 'users.validators.StrengthPasswordValidator',
        'OPTIONS': {
            'strength': PASSWORD_MIN_STRENGTH
        }
    },
    # {
    #     'NAME':
    #         'django.contrib.auth.password_validation.MinimumLengthValidator',
    #         'OPTIONS': {
    #             'min_length': PASSWORD_MIN_LENGTH
    #         }
    # },
    {
        'NAME':
            'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME':
            'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/
LANGUAGE_CODE = "en-gb"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [("en-us", _("American English")), ("en-gb", _("British English"))]

LOCALE_PATHS = [str(SERVER_DIR("core/locale"))]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

STATIC_URL = "/static/"
STATIC_ROOT = str(SERVER_DIR("static"))

STATICFILES_DIRS = [
    # STATIC_ROOT,  # no need to explicitly specify STATIC_ROOT again
    str(CLIENT_DIR.path("build/static"))
]

WHITENOISE_ROOT = str(CLIENT_DIR("build"))
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media files
MEDIA_STORAGE_BUCKET = env("DJANGO_MEDIA_BUCKET", default="")

# Admin
ADMIN_URL = "admin/"

ADMINS = [(PROJECT_NAME, PROJECT_EMAIL.format(role="techdev"))]
MANAGERS = ADMINS

ADMIN_SITE_HEADER = f"{PROJECT_NAME} administration console"
ADMIN_SITE_TITLE = f"{PROJECT_NAME} administration console"
ADMIN_INDEX_TITLE = f"Welcome to the {PROJECT_NAME} administration console"

# Email
# email backend is set in environment-specific settings...

# development: "django.core.mail.backends.console.EmailBackend"
# deployment: "django.core.mail.backends.smtp.EmailBackend"
# ci: django.core.mail.backends.locmem.EmailBackend"

DEFAULT_FROM_EMAIL = f"{PROJECT_NAME} <{PROJECT_EMAIL.format(role='noreply')}>"
SERVER_EMAIL = PROJECT_EMAIL.format(role="noreply")
EMAIL_TIMEOUT = 60

# Django Rest Framework API

REST_FRAMEWORK = {
    "DEFAULT_VERSIONING_CLASS": "rest_framework.versioning.NamespaceVersioning",
    "DEFAULT_AUTHENTICATION_CLASSES":
        [
            # "rest_framework.authentication.BasicAuthentication",  # insecure
            # "rest_framework.authentication.SessionAuthentication",  # CSRF
            # "rest_framework.authentication.TokenAuthentication",  # tokens
            "knox.auth.TokenAuthentication",  # better tokens
            # NOTE: "rest_framework_simplejwt.authentication.JWTTokenUserAuthentication"
            # NOTE: is used explicitly in "suppliers.DataView" instead of DEFAULT_AUTHENTICATION_CLASSES
        ],
    "DEFAULT_RENDERER_CLASSES":
        (
            "rest_framework.renderers.JSONRenderer",
            "rest_framework.renderers.BrowsableAPIRenderer",
        ),
    "COERCE_DECIMAL_TO_STRING": False,
    # "DEFAULT_FILTER_BACKENDS": (
    #     "django_filters.rest_framework.DjangoFilterBackend",
    # ),
}

# Swagger API Documentation
SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS":
        {
            "Token":
                {
                    "type":
                        "apiKey",
                    "name":
                        "Authorization",
                    "in":
                        "header",
                    "description":
                        escape(
                            "Enter 'Token <token>' for Knox or 'Bearer <token>' for JWT"
                        ),
                },
            "Basic": {
                "type": "basic"
            },
        },
    "DOC_EXPANSION": "none",
    "OPERATIONS_SORTER": None,
    "TAGS_SORTER": "alpha",
    "DEFAULT_MODEL_RENDERING": "example",
}

# Authentication & Users
SIMPLE_JWT = {
    "ALGORITHM": env("DJANGO_DATA_TOKEN_ALGORITHM", default="HS256"),
    "SIGNING_KEY": env("DJANGO_DATA_TOKEN_SECRET", default="itsasecret"),
    "USER_ID_CLAIM": "sub",
    "AUTH_TOKEN_CLASSES": ["core.tokens.DataAccessToken"],
}

AUTH_USER_MODEL = "users.User"

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
]

ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_LOGIN_ATTEMPTS_LIMIT = 5
ACCOUNT_LOGOUT_ON_GET = False
ACCOUNT_USERNAME_BLACKLIST = ["admin"]

REST_AUTH_TOKEN_MODEL = "knox.models.AuthToken"
# REST_AUTH_TOKEN_CREATOR = "astrosat_users.utils.create_knox_token"

# custom forms...
# ACCOUNT_FORMS = {
#     # "add_email": "allauth.account.forms.AddEmailForm",
#     "change_password": "astrosat_users.forms.PasswordChangeForm",
#     # "disconnect": "allauth.socialaccount.forms.DisconnectForm",
#     "login": "astrosat_users.forms.LoginForm",
#     "reset_password": "astrosat_users.forms.PasswordResetForm",
#     # "reset_password_from_key": "allauth.account.forms.ResetPasswordKeyForm",
#     "set_password": "astrosat_users.forms.PasswordSetForm",
#     "signup": "astrosat_users.forms.RegistrationForm",
# }

# custom serializers...
# REST_AUTH_SERIALIZERS = {
#     # customize serializers for astrosat_users
#     "TOKEN_SERIALIZER":
#         "astrosat_users.serializers.KnoxTokenSerializer",
#     "LOGIN_SERIALIZER":
#         "astrosat_users.serializers.LoginSerializer",
#     "PASSWORD_CHANGE_SERIALIZER":
#         "astrosat_users.serializers.PasswordChangeSerializer",
#     "PASSWORD_RESET_SERIALIZER":
#         "astrosat_users.serializers.PasswordResetSerializer",
#     "PASSWORD_RESET_CONFIRM_SERIALIZER":
#         "astrosat_users.serializers.PasswordResetConfirmSerializer",
# }

# more custom serializers...
# REST_AUTH_REGISTER_SERIALIZERS = {
#     # customize serializers for astrosat_users
#     "REGISTER_SERIALIZER": "astrosat_users.serializers.RegisterSerializer"
# }

ACCOUNT_LOGIN_CLIENT_URL = "/accounts/login"
ACCOUNT_CONFIRM_EMAIL_CLIENT_URL = "/accounts/confirm-email/{key}"
ACCOUNT_CONFIRM_PASSWORD_CLIENT_URL = "/accounts/password/reset/{key}/{uid}"

# CORS
CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_REGEX_WHITELIST = []

if DEBUG:
    CORS_ORIGIN_REGEX_WHITELIST += [r"^https?://localhost(:\d+)?$"]

# (only using cors on the API)
CORS_URLS_REGEX = r"^/api/.*$"

# Caching
CACHES = {
    'default':
        {
            'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
            'LOCATION': '127.0.0.1;11211'
        }
    # 'default': {
    #     'BACKEND': 'django.core.cache.backends.db.DatabaseCache',
    #     'LOCATION': 'application_cache' # You need to run `python manage.py createcachetable` for this to work
    # }
    # 'default': {
    #     'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
    #     'LOCATION': '/tmp/application_cache'
    # }
}
