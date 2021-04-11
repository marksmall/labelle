""" Utilities for tests. """
import factory
from factory.django import DjangoModelFactory
from factory.faker import Faker as FactoryFaker
from store.models import Order, OrderItem, Product, ProductReview, ShippingAddress
from users.tests.factories import UserFactory

CATEGORIES = ('Electronics', 'Food and Grocery', 'Books', 'Fashion')
PAYMENT_METHODS = ('VISA', 'PAYPAL')


class ProductFactory(DjangoModelFactory):
    """ Factory to create Products. """
    class Meta:
        """ Meta class for products factory """
        model = Product

    name = FactoryFaker('name')
    image = FactoryFaker('url')
    brand = FactoryFaker('company')
    category = FactoryFaker('random_element', elements=CATEGORIES)
    description = FactoryFaker('paragraph', nb_sentences=2)
    rating = FactoryFaker('pyint', min_value=0, max_value=6)
    number_of_reviews = FactoryFaker('pyint', min_value=0, max_value=36)
    price = FactoryFaker(
        'pydecimal', left_digits=3, right_digits=2, positive=True
    )
    number_in_stock = FactoryFaker('pyint', min_value=0, max_value=50)
    created_at = FactoryFaker('date_time')


class ProductReviewFactory(DjangoModelFactory):
    """ Factory to create reviews. """
    class Meta:
        """ Meta class for review factory """
        model = ProductReview

    product = factory.SubFactory(ProductFactory)
    user = factory.SubFactory(UserFactory)
    name = FactoryFaker('name')
    rating = FactoryFaker('pyint', min_value=0, max_value=6)
    comment = FactoryFaker('paragraph', nb_sentences=5)
    created_at = FactoryFaker('date_time')


class OrderFactory(DjangoModelFactory):
    """ Factory to create orders. """
    class Meta:
        """ Meta class for orders factory """
        model = Order

    user = factory.SubFactory(UserFactory)
    payment_method = FactoryFaker('random_element', elements=PAYMENT_METHODS)
    tax_price = FactoryFaker(
        'pydecimal', left_digits=3, right_digits=2, positive=True
    )
    shipping_price = FactoryFaker(
        'pydecimal', left_digits=3, right_digits=2, positive=True
    )
    total_price = FactoryFaker(
        'pydecimal', left_digits=3, right_digits=2, positive=True
    )
    is_paid = False
    delivered_at = FactoryFaker('date_time')
    created_at = FactoryFaker('date_time')


# class OrderItemFactory(DjangoModelFactory):
#     """ Factory to create items of an order. """
#     class Meta:
#         """ Meta class for order items factory """
#         model = OrderItem

#     # order = FactoryFaker('')
#     # product = FactoryFaker('')
#     name = FactoryFaker('name')
#     # quantity = FactoryFaker('')
#     # price = FactoryFaker('')
#     image = FactoryFaker('url')

# class ShippingAddressFactory(DjangoModelFactory):
#     """ Factory to create Shipping Addresses for an order. """
#     class Meta:
#         """ Meta class for Shipping Address factory """
#         model = ShippingAddress

#     # order = FactoryFaker('')
#     # address = FactoryFaker('')
#     # city = FactoryFaker('name')
#     # postal_code = FactoryFaker('')
#     # country = FactoryFaker('')
#     # shipping_price = FactoryFaker('')
