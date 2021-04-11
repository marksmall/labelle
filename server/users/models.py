""" Core models. """
from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    """ Class representing a user within the project. """
    is_admin = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
