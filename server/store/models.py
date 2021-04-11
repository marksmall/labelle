""" Store models. """
from django.conf import settings
from django.db import models


# Create your models here.
class Product(models.Model):
    """ Class representing individual products for sale. """
    # user = models.ForeignKey(
    #     settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    # )
    name = models.CharField(max_length=200, null=True, blank=True)

    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    number_of_reviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    number_in_stock = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class ProductReview(models.Model):
    """ Class representing a review of a product. """
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str(self) -> str:
        return self.name


class Order(models.Model):
    """ Class representing a single purchase order. """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    payment_method = models.CharField(max_length=200, null=True, blank=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    is_paid = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(
        auto_now_add=True, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.user.username + '-' + str(self.created_at)


class OrderItem(models.Model):
    """ Class representing a single item in an order. """
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class ShippingAddress(models.Model):
    """ Class representing where an order is to be sent. """
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, null=True, blank=True
    )
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postal_code = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )

    def __str__(self) -> str:
        return self.address
