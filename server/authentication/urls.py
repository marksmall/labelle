""" URLs for User API operations. """
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AuthenticationViewSet

router = DefaultRouter()

router.register(
    r'authentication', AuthenticationViewSet, basename='authentication'
)

urlpatterns = [path('', include(router.urls))]
