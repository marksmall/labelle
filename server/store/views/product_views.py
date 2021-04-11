""" Store views. """
# from django.shortcuts import render
from authentication.permissions import OnlyAdminsCanCRUD
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from store.models import Product, ProductReview
from store.serializers import ProductReviewSerializer, ProductSerializer


# Create your views here.
class ProductViewSet(ModelViewSet):
    """ ViewSet to manage products. """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # permission_classes = [OnlyAdminsCanCRUD]

    @method_decorator(cache_page(60 * 60 * 24))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ProductReviewView(CreateAPIView):
    """ View to create product reviews. """
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer

    # permission_classes = [IsAuthenticated]

    # def post(self, request, *args, **kwargs):
    #     """
    #     Override function to verify, review doesn't already exist for user
    #     and product.
    #     """
    #     print(f'REQUEST: {request.data}', flush=True)
    #     print(f'ARGS: {args}', flush=True)
    #     print(f'KARGS: {kwargs}', flush=True)
    #     user = request.user
    #     data = request.data
    #     product = Product.objects.get(id=kwargs['pk'])
    #     print(f'PRODUCT: {product}', flush=True)
    #     import pdb
    #     pdb.set_trace()

    #     if product.productreview_set.filter(user=user).exists():
    #         content = {
    #             'detail': f'Review of product {product.name} already exists'
    #         }
    #         return Response(
    #             data=content,
    #             status=status.HTTP_400_BAD_REQUEST,
    #             content_type='json'
    #         )
    #     elif data['rating'] == 0:
    #         content = {'detail': 'You Must supply a rating'}
    #         return Response(
    #             data=content,
    #             status=status.HTTP_400_BAD_REQUEST,
    #             content_type='json'
    #         )
    #     else:
    #         review = ProductReview.objects.create(
    #             user=user,
    #             product=product,
    #             username=user.username,
    #             rating=data['rating'],
    #             comment=data['comment'],
    #         )

    #         reviews = product.productreview_set.all()
    #         product.number_of_reviews = len(reviews)

    #         total = 0
    #         for review in reviews:
    #             total += review.rating

    #         product.rating = total / len(reviews)
    #         product.save()

    #         return Response(
    #             data=review,
    #             status=status.HTTP_201_CREATED,
    #             content_type='json'
    #         )
