""" Tests for products """
import random

import pytest
from django.urls import reverse
from factory.faker import Faker as FactoryFaker
from rest_framework import status
from rest_framework.test import APIClient
from store.models import Product, ProductReview
from users.tests.factories import UserFactory

from .factories import ProductFactory, ProductReviewFactory


@pytest.mark.django_db
class TestProductsViewSet:
    """ Test product views. """
    def test_products_list(self):
        """ Test getting a list of products. """
        products = [ProductFactory() for _ in range(10)]

        client = APIClient()

        url = reverse('product-list')
        response = client.get(url)

        assert status.is_success(response.status_code)
        assert len(response.json()) == 10

    def test_product_detail(self):
        """ Test to get single product's details. """
        product = ProductFactory()

        client = APIClient()

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.get(url)

        assert status.is_success(response.status_code)

        data = response.json()
        # Assert key not in response
        with pytest.raises(KeyError):
            data['nam']

        assert data['name']

    def test_product_authorized_delete(self, api_client):
        """ Test deleting of an existing product. """
        product = ProductFactory()

        admin = UserFactory(is_admin=True)
        client = api_client(admin)

        assert Product.objects.count() == 1

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.delete(url)

        assert status.is_success(response.status_code)

        assert Product.objects.count() == 0

    def test_product_unauthorized_delete(self):
        """ Test deleting of an existing product. """
        product = ProductFactory()

        client = APIClient()

        assert Product.objects.count() == 1

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.delete(url)

        assert not status.is_success(response.status_code)

        assert Product.objects.count() == 1
        assert response.data["detail"] == 'AnonymousUser is not an admin user'

    def test_product_authorized_creation(self, api_client):
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

        admin = UserFactory(is_admin=True)
        client = api_client(admin)

        assert Product.objects.count() == 0

        url = reverse('product-list')
        response = client.post(url, product_data)

        assert status.is_success(response.status_code)
        assert Product.objects.count() == 1

        new_product = Product.objects.first()
        assert new_product.name == product.name

    def test_product_unauthorized_creation(self):
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

        client = APIClient()

        assert Product.objects.count() == 0

        url = reverse('product-list')
        response = client.post(url, product_data)

        assert not status.is_success(response.status_code)
        assert Product.objects.count() == 0

        assert response.data["detail"] == 'AnonymousUser is not an admin user'

    def test_product_authorized_update(self, api_client):
        """ Test updating an existing product. """
        product = ProductFactory.create()

        name = str(FactoryFaker('name'))
        product_data = {'name': name}

        admin = UserFactory(is_admin=True)
        client = api_client(admin)

        assert Product.objects.count() == 1

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.put(url, product_data)

        assert status.is_success(response.status_code)

        assert product.name != name
        product.refresh_from_db()
        assert product.name == name

    def test_product_unauthorized_update(self):
        """ Test updating an existing product. """
        product = ProductFactory.create()

        name = str(FactoryFaker('name'))
        product_data = {'name': name}

        client = APIClient()

        assert Product.objects.count() == 1

        url = reverse('product-detail', kwargs={'pk': product.pk})
        response = client.put(url, product_data)

        assert not status.is_success(response.status_code)

        assert response.data["detail"] == 'AnonymousUser is not an admin user'


@pytest.mark.django_db
class TestProductReviewView:
    """ Test product review views. """
    def test_product_review_list(self, user):
        """ Test getting a list of product reviews for a single product. """
        products = [ProductFactory() for _ in range(2)]
        product_reviews = [
            ProductReviewFactory(product=random.choice(products), user=user)
            for _ in range(10)
        ]

        reviews_for_product = [
            review for review in product_reviews if review.product_id == 1
        ]

        url = reverse('review-list', kwargs={'id': products[0].pk})

        client = APIClient()

        response = client.get(url)
        data = response.json()

        assert status.is_success(response.status_code)
        assert len(data) == len(reviews_for_product)

    def test_product_review_creation(self, user, api_client):
        """ Test creating of product reviews. """
        product = ProductFactory()
        product_review = ProductReviewFactory.build(product=product, user=user)

        product_review_data = {
            'name': product_review.name,
            'rating': product_review.rating,
            'comment': product_review.comment,
            'created_at': product_review.created_at
        }

        assert ProductReview.objects.count() == 0

        url = reverse('review-list', kwargs={'id': product.pk})

        client = api_client(user)

        response = client.post(url, product_review_data, format='json')

        assert status.is_success(response.status_code)
        assert Product.objects.count() == 1

        new_product_review = ProductReview.objects.first()
        assert new_product_review.name == product_review.name

    def test_product_review_creation_already_exists(self, user, api_client):
        """
        Test adding a product review, when you've already reviewed a product.
        """
        product = ProductFactory()
        product_review = ProductReviewFactory(product=product, user=user)
        print(f'PRODUCT REVIEW: {product_review.__dict__}', flush=True)

        product_review_data = {
            'name': product_review.name,
            'rating': product_review.rating,
            'comment': product_review.comment,
            'created_at': product_review.created_at
        }

        client = api_client(user)

        assert ProductReview.objects.count() == 1

        url = reverse('review-list', kwargs={'id': product.pk})
        response = client.post(url, product_review_data, format='json')
        print(f'RESPONSE DATA: {response.json()}', flush=True)

        assert not status.is_success(response.status_code)
        assert Product.objects.count() == 1

        # new_product_review = ProductReview.objects.first()
        # assert new_product_review.name == product_review.name
        assert False

    def test_product_review_delete_as_admin(self, user, api_client):
        """ Test deleting a product review when an admin. """
        pass

    def test_product_review_delete_as_user(self, user, api_client):
        """ Test deleting a product review when a normal user. """
        pass
