""" Utility functions for tests. """
from dj_rest_auth.models import TokenModel
from dj_rest_auth.app_settings import TokenSerializer, create_token

def create_auth_token(user):
    """ Create a knox token for a user. """
    return create_token(TokenModel, user, TokenSerializer)
