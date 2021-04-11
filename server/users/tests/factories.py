""" Test factories. """
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory
from factory.faker import Faker as FactoryFaker


class UserFactory(DjangoModelFactory):
    """ Factory to create users. """
    class Meta:
        """ Meta class for normal users factory. """
        model = get_user_model()

    username = FactoryFaker('email')
    email = FactoryFaker('email')
    first_name = FactoryFaker('first_name')
    last_name = FactoryFaker('last_name')
    is_admin = False
