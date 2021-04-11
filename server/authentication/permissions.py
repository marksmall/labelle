""" Authentication Permissions """
from rest_framework.permissions import SAFE_METHODS, BasePermission


class OnlyAdminsCanCRUD(BasePermission):
    """ Permission to check if user can execute method. """
    def has_permission(self, request, view):
        """
        Check if method is safe, if so, anyone can execute, else, return whether the user is an admin or not, only admins can use the non-safe methods.
        """
        # anybody can do GET, HEAD, or OPTIONS request.
        if request.method in SAFE_METHODS:
            return True

        # only an admin user can POST, PUT, PATCH, DELETE.
        user = request.user
        return user.is_admin
