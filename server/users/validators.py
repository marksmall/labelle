""" User validators """
from core.settings.base import PASSWORD_MIN_LENGTH
from django.conf import settings
from django.core.exceptions import ValidationError
from django.template.defaultfilters import last

from zxcvbn import zxcvbn

class LengthPasswordValidator:
    """ Validate the password length is within range. """
    def __init__(
        self,
        min_length=settings.PASSWORD_MIN_LENGTH,
        max_length=settings.PASSWORD_MAX_LENGTH
    ):
        """ Initialize validator. """
        assert (
            max_length > min_length and min_length > 0 and max_length > 0
        ), f'Invalid LengthPasswordValidator options: min={min_length}, max={max_length}.'

        self.min_length = min_length
        self.max_length = max_length

    def validate(self, password, user=None):
        """ Validate password """
        password_length = len(password)

        if password_length < self.min_length:
            raise ValidationError(
                f'This password is too short, it must contain at least {self.min_length} characters',
                code='password_too_short'
            )

        if password_length > self.max_length:
            raise ValidationError(
                f'This password is too long, it must contain at most {self.max_length} characters',
                code='password_too_long'
            )

    def get_help_text(self):
        """ Describe validator. """
        return f'The password must contain between {self.min_length} and {self.max_length} characters'


class StrengthPasswordValidator:
    """
    Validate a password using zxcvbn strength estimator.
    Strength values can be:
    0 - Too guessable, risky password (guesses < 10^3).
    1 - Very guessable, protection from throttled online attacks (guesses < 10^6).
    2 - Somewhat guessable, protection from un-throttled online attacks (guesses < 10^8).
    3 - Safely un-guessable, moderate protection from offline slow-hash scenarios (guesses < 10^10).
    4 - Very un-guessable, strong protection from offline slow-hash scenarios (guesses >= 10^10).
    """
    def __init__(self, strength=settings.PASSWORD_MIN_STRENGTH):
        """ Initialize validator. """
        assert 0 <= strength <= 4, f'Invalid StrengthPasswordValidator strength.'
        self.strength = strength

    def validate(self, password, user=None):
        """ Validate password. """
        user_inputs = [
            user.email, user.username, user.first_name, user.last_name,
            user.last
        ] if user is not None else []

        strength_results = zxcvbn(password, user_inputs=user_inputs)

        if strength_results['score'] < self.strength:
            raise ValidationError(
                'The password is too weak.', code='password_too_weak'
            )

    def get_help_text(self):
        """ Describe validator. """
        return f'The password must be of sufficient quality.'
