""" Bookings models. """
from django.conf import settings
from django.db import models


# Create your models here.
class Service(models.Model):
    """ Class representing a bookable service. """
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    number_of_reviews = models.IntegerField(null=True, blank=True, default=0)
    duration = models.IntegerField(
        null=True, blank=True, default=0
    )  # Duration service takes, in minutes.
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )

    def __str__(self) -> str:
        return self.name


class ServiceReview(models.Model):
    """ Class representing a review of a product. """
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str(self) -> str:
        return self.name


class Booking(models.Model):
    """ Class representing an individual booking. """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    payment_method = models.CharField(max_length=200, null=True, blank=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.user.username + '-' + str(self.created_at)


class BookingItem(models.Model):
    """ Class representing a single item in an order. """
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True)
    service = models.ForeignKey(Service, on_delete=models.SET, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return self.name
