""" Tests for products """
import pytest
from django.urls import reverse
from factory.faker import Faker as FactoryFaker
from rest_framework import status
from store.models import Product, ProductReview

from .factories import ProductFactory, ProductReviewFactory


@pytest.mark.django_db
class TestProductsViewSet:
    """ Test product review views. """
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

        client = api_client(user)

        assert ProductReview.objects.count() == 0

        url = reverse('review-list', kwargs={'pk': product.pk})
        response = client.post(url, product_review_data, format='json')

        assert status.is_success(response.status_code)
        assert Product.objects.count() == 1

        new_product_review = ProductReview.objects.first()
        assert new_product_review.name == product_review.name

    # def test_product_review_creation_already_exists(self, user, api_client):
    #     """
    #     Test adding a product review, when you've already reviewed a product.
    #     """
    #     product = ProductFactory()
    #     product_review = ProductReviewFactory(product=product, user=user)

    #     product_review_data = {
    #         'name': product_review.name,
    #         'rating': product_review.rating,
    #         'comment': product_review.comment,
    #         'created_at': product_review.created_at
    #     }

    #     client = api_client(user)

    #     assert ProductReview.objects.count() == 1

    #     url = reverse('review-list', kwargs={'pk': product.pk})
    #     response = client.post(url, product_review_data, format='json')
    #     print(f'RESPONSE DATA: {response.json()}', flush=True)

    #     assert status.is_success(response.status_code)
    #     assert Product.objects.count() == 1

    #     # new_product_review = ProductReview.objects.first()
    #     # assert new_product_review.name == product_review.name
    #     assert False
