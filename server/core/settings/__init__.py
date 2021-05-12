import glob
import os

import environ
from django.core.exceptions import ImproperlyConfigured

###############################
# import appropriate settings #
###############################
ROOT_DIR = environ.Path(__file__) - 4

ENVIRONMENT = os.environ.get("SYS_ENV", "development")
environment_settings_module = f"core.settings.{ENVIRONMENT.lower()}"

##############################
# load environment variables #
##############################

env = environ.Env()

if ENVIRONMENT == "development":
    # environment variables for development are stored in files
    for env_file in glob.glob(ROOT_DIR("server/.env*")):
        try:
            env.read_env(env_file)
        except Exception as e:
            msg = f"Unable to read '{env_file}': {e}."
            raise ImproperlyConfigured(msg)

else:
    # otherwise, they are dynamically created on the server
    pass

# Import base settings
from .base import *  # noqa

# Import environment specific settings
exec(u"from {} import *".format(environment_settings_module)) in globals()
