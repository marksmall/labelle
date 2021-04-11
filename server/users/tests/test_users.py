import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from factory.faker import Faker as FactoryFaker
from rest_framework import status

from .factories import UserFactory

User = get_user_model()


@pytest.mark.django_db
class TestUsersViewSet:
    """ Tests related to user views. """
    def test_users_list(self, user, api_client):
        """ Test getting a list of users. """
        users = [UserFactory() for _ in range(10)]

        client = api_client(user)

        url = reverse('user-list')
        response = client.get(url)

        assert status.is_success(response.status_code)
        assert len(
            response.json()
        ) == 10 + 1  # Extra is for user used by api_client

    def test_user_detail(self, user, api_client):
        """ Test to get single user's details. """
        user_obj = UserFactory()

        client = api_client(user)

        url = reverse('user-detail', kwargs={'pk': user_obj.pk})
        response = client.get(url)

        assert status.is_success(response.status_code)
        data = response.json()
        assert 'id' in data
        assert 'username' in data
        assert 'email' in data
        assert 'first_name' in data
        assert 'last_name' in data
        assert 'is_admin' in data

    def test_user_delete(self, user, api_client):
        """ Test deleting of a user. """
        user_obj = UserFactory()

        client = api_client(user)

        assert User.objects.count(
        ) == 1 + 1  # Extra is for user used by api_client

        url = reverse('user-detail', kwargs={'pk': user_obj.pk})
        response = client.delete(url)

        assert status.is_success(response.status_code)
        assert User.objects.count() == 1

    def test_user_creation(self, user, api_client):
        """ Test creating of a user. """
        user_obj = UserFactory.build()

        user_data = {
            'username': user_obj.username,
            'first_name': user_obj.first_name
        }

        client = api_client(user)

        assert User.objects.count() == 1

        url = reverse('user-list')
        response = client.post(url, user_data, format='json')
        data = response.json()

        assert status.is_success(response.status_code)

        assert User.objects.count() == 2
        new_user = get_user_model().objects.get(id=data['id'])
        assert new_user.username == user_obj.username
        assert new_user.first_name == user_obj.first_name

    def test_user_update(self, user, api_client):
        """ Test updating of an existing user. """
        user_obj = UserFactory.create()

        last_name = str(FactoryFaker('last_name'))
        user_data = {'username': user_obj.username, 'last_name': last_name}

        client = api_client(user)

        assert User.objects.count(
        ) == 1 + 1  # Extra is for user used by api_client

        url = reverse('user-detail', kwargs={'pk': user_obj.pk})
        response = client.put(url, user_data, format='json')

        assert status.is_success(response.status_code)

        assert user_obj.last_name != last_name
        user_obj.refresh_from_db()
        assert user_obj.last_name == last_name
