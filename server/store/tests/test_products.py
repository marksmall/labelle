""" Tests for products """
import pytest
from django.urls import reverse
from factory.faker import Faker as FactoryFaker
from rest_framework import status
from store.models import Product
from users.tests.factories import UserFactory

from .factories import ProductFactory


@pytest.mark.django_db
class TestProductsViewSet:
    """ Test product views. """
    def test_products_list(self, user, api_client):
        """ Test getting a list of products. """
        products = [ProductFactory() for _ in range(10)]

        client = api_client(user)

        url = reverse('product-list')
        response = client.get(url)

        assert status.is_success(response.status_code)
        assert len(response.json()) == 10

    def test_product_detail(self, user, api_client):
        """ Test to get single product's details. """
        product = ProductFactory()

        client = api_client(user)

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.get(url)

        assert status.is_success(response.status_code)

        data = response.json()
        # Assert key not in response
        with pytest.raises(KeyError):
            data['nam']

        assert data['name']

    def test_product_delete(self, user, api_client):
        """ Test deleting of an existing product. """
        admin = UserFactory(is_admin=True)
        print(f'ADMIN USER: {admin}', flush=True)
        product = ProductFactory()

        client = api_client(admin)

        assert Product.objects.count() == 1

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.delete(url)

        assert status.is_success(response.status_code)

        assert Product.objects.count() == 0

    def test_product_creation(self, user, api_client):
        """ Test creating of a product. """
        product = ProductFactory.build()

        product_data = {
            'name': product.name,
            # 'image': product.image,
            'brand': product.brand,
            'category': product.category,
            'description': product.description,
            'rating': product.rating,
            'number_of_reviews': product.number_of_reviews,
            'price': product.price,
            'number_in_stock': product.number_in_stock,
            'created_at': product.created_at,
        }

        client = api_client(user)

        assert Product.objects.count() == 0

        url = reverse('product-list')
        response = client.post(url, product_data, format='json')

        assert status.is_success(response.status_code)
        assert Product.objects.count() == 1

        new_product = Product.objects.first()
        assert new_product.name == product.name

    def test_product_update(self, user, api_client):
        """ Test updating an existing product. """
        product = ProductFactory.create()

        name = str(FactoryFaker('name'))
        product_data = {'name': name}

        client = api_client(user)

        assert Product.objects.count() == 1

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.put(url, product_data, format='json')

        assert status.is_success(response.status_code)

        assert product.name != name
        product.refresh_from_db()
        assert product.name == name
