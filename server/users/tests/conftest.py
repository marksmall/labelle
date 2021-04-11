""" Configure common test fixtures. """
import pytest
from authentication.utils import create_auth_token
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from .factories import UserFactory


@pytest.fixture
def user():
    user = UserFactory()
    return user


@pytest.fixture
def api_client():
    """ Configure and return a DRF client with pre-authenticated User. """
    def _api_client(user):
        # _, key = create_auth_token(user)

        client = APIClient()
        # client.credentials(HTTP_AUTHORIZATION=f"token {key}")

        return client

    return _api_client
