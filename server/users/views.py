from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet

from .serializers import UserSerializer


# Create your views here.
class UserViewSet(ModelViewSet):
    """ Provide `list and `detail` actions """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
