"""
Command to ensure site is automatically set.

Ensure that the appropriate site is set in the db during deployment.
Sets an environment variable for deployment. `run-server.sh` and
`run-uwsgi.sh` both will call the `update_site` management command.
"""
import environ
from django.conf import settings
from django.contrib.sites.models import Site
from django.core.exceptions import ImproperlyConfigured
from django.core.management.base import BaseCommand, CommandError
from django.db.utils import IntegrityError

env = environ.Env()

SITE_ENVIRONMENT_VARIABLE = "DJANGO_SITE_DOMAIN"


class Command(BaseCommand):
    """
    Update the sites table.
    """
    help = "Updates a Site object with a specific domain."

    def add_arguments(self, parser):
        """ Define arguments for command. """
        parser.add_argument(
            "--id",
            dest="id",
            required=False,
            default=settings.SITE_ID,
            help=
            "id of Site to update (if not provided, will use the default SITE_ID specified in settings file)."
        )

        parser.add_argument(
            "--domain",
            dest="domain",
            required=False,
            default=None,
            help=
            f"Domain to update the Site with (fi not provided, will use the {SITE_ENVIRONMENT_VARIABLE} environment variable)."
        )

        parser.add_argument(
            "--name",
            dest="name",
            required=False,
            default=None,
            help=
            "Name to update the Site with (if not provided, will just use the domain)."
        )

    def handle(self, *args, **options):
        """ Handle the running of the command. """
        try:
            domain = (
                options["domain"] if options["domain"] is not None else
                env(SITE_ENVIRONMENT_VARIABLE)
            )
            name = options["name"] if options["name"] is not None else domain

            Site.objects.update_or_create(
                id=options["id"],
                defaults={
                    "domain": domain[:100],
                    "name": name[:50]
                }
            )
        except ImproperlyConfigured as improperly_configured:
            raise CommandError(
                "You must either specify a domain on the command-line, or set the DJANGO_SITE_DOMAIN environment variable."
            ) from improperly_configured

        except IntegrityError as integrity_error:
            raise CommandError(
                f"The domain '{domain}' is already in use."
            ) from integrity_error

        except Exception as ex:
            raise CommandError(str(ex)) from ex
