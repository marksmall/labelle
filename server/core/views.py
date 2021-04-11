"""
Core Views.
"""
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework.views import APIView

###############################
# the one-and-only index_view #
###############################

# this 'index.html' comes from CLIENT_DIR
index_view = TemplateView.as_view(template_name="index.html")


class AppConfigView(APIView):
    """
    Application config, this is a simple view that just returns config
    the client app needs.
    """
    def get(self, request, format=None):
        """
        Simple function to return application config to the client app.
        """
        config = {
            'passwordMaxLength': settings.PASSWORD_MAX_LENGTH,
            'passwordMinLength': settings.PASSWORD_MIN_LENGTH,
            'passwordMinStrength': settings.PASSWORD_MIN_STRENGTH,
        }

        return Response(config, content_type='application/json')
