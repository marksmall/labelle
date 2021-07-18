""" User Permissions """
from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """ Check if user is a staff member. """
    def has_permission(self, request, view):
        """ Check if request user is a staff member. """
        return bool(request.user and request.user.is_admin)
