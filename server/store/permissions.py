""" Store Permissions """
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsOwnerOrAdmin(BasePermission):
    """ Permission to check if user is an Admin. """
    message = "{user} is not an admin user"

    def has_permission(self, request, view):
        """
        Check if method is safe, if so, anyone can execute, else, return whether the user is an admin or not, only admins can use the non-safe methods.
        """
        # anybody can do a GET, HEAD or OPTIONS request.
        if request.method in SAFE_METHODS:
            return True

        if not bool(
            request.user and hasattr(request.user, 'is_admin') and
            request.user.is_admin
        ):
            raise PermissionDenied(self.message.format(user=request.user))

        return True


class IsAuthenticated(BasePermission):
    """
    Permission to check if user is authenticated.
    """
    message = "{user} is not authenticated"

    def has_permission(self, request, view):
        """
        Check if method is safe, if so, anyone can execute, else if, request is
        a `create` action, then check if user is authenticated.
        """
        # print(f"VIEW: {view.__dict__}", flush=True)
        # anybody can do a GET, HEAD or OPTIONS request.
        if request.method in SAFE_METHODS:
            return True

        if not bool(
            request.user and hasattr(request.user, 'is_authenticated') and
            request.user.is_authenticated
        ):
            raise PermissionDenied(self.message.format(user=request.user))

        return True
