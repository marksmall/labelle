""" Tests for products """
import pytest
from django.urls import reverse
from factory.faker import Faker as FactoryFaker
from rest_framework import status
from store.models import Order

from .factories import OrderFactory


@pytest.mark.django_db
class TestOrdersViewSet:
    """ Test Order views. """
    def test_orders_list(self, user, api_client):
        """ Test getting a list of orders. """
        orders = [OrderFactory(user=user) for _ in range(10)]

        client = api_client(user)

        url = reverse('order-list')
        response = client.get(url)

        assert status.is_success(response.status_code)
        assert len(response.json()) == 10

    def test_order_detail(self, user, api_client):
        """ Test to get single order's details. """
        order = OrderFactory(user=user)

        client = api_client(user)

        url = reverse('order-detail', kwargs={'pk': order.pk})
        response = client.get(url)

        assert status.is_success(response.status_code)

        data = response.json()
        # Assert key not in response
        with pytest.raises(KeyError):
            data['nam']

        assert data['payment_method']

    def test_order_delete(self, user, api_client):
        """ Test deleting of an order. """
        order = OrderFactory(user=user)

        client = api_client(user)

        assert Order.objects.count() == 1

        url = reverse('order-detail', kwargs={'pk': order.pk})
        response = client.delete(url)

        assert status.is_success(response.status_code)

        assert Order.objects.count() == 0

    def test_order_creation(self, user, api_client):
        """ Test creating a new order. """
        order = OrderFactory.build(user=user)

        order_data = {
            'payment_method': order.payment_method,
            'tax_price': order.tax_price,
            'shipping_price': order.shipping_price,
            'total_price': order.total_price,
            'is_paid': order.is_paid,
            'delivered_at': order.delivered_at,
            'created_at': order.created_at,
        }

        client = api_client(user)

        assert Order.objects.count() == 0

        url = reverse('order-list')
        response = client.post(url, order_data, format='json')

        assert status.is_success(response.status_code)
        assert Order.objects.count() == 1

        new_order = Order.objects.first()
        assert new_order.payment_method == order.payment_method

    def test_order_update(self, user, api_client):
        """ Test updating an existing order. """
        order = OrderFactory.create()

        is_paid = True
        order_data = {'is_paid': is_paid}

        client = api_client(user)

        assert Order.objects.count() == 1

        url = reverse('order-detail', kwargs={'pk': order.pk})
        response = client.put(url, order_data, format='json')

        assert status.is_success(response.status_code)

        assert order.is_paid != is_paid
        order.refresh_from_db()
        assert order.is_paid == is_paid
