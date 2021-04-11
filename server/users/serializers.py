from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """ Serializer for users. """
    class Meta:
        """ Meta-class for UserSerializer. """
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_admin',
        ]
