""" Store Permissions """
from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsOwnerOrAdmin(BasePermission):
    """ Permission to check if user is Owner or an Admin. """
    def has_object_permission(self, request, view, obj):
        """
        Check if method is safe, if so, anyone can execute, else, return whether the user is an admin or not, only admins can use the non-safe methods.
        """
        # anybody can do a GET, HEAD or OPTIONS request.
        if request.method in SAFE_METHODS:
            return True

        ## Only the owner, or an admin can POST, PUT, PATCH, DELETE.
        user = request.user
        return obj.owner == user or user.is_admin
