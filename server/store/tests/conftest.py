""" Configure common test fixtures. """
import pytest
from rest_framework.test import APIClient
from users.tests.factories import UserFactory


@pytest.fixture
def user():
    user = UserFactory()

    return user


@pytest.fixture
def api_client():
    """ Configure and return a DRF client with pre-authenticated User. """
    def _api_client(user):
        client = APIClient()
        client.force_authenticate(user)

        return client

    return _api_client
