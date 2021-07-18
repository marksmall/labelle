""" URLs for Shop API operations. """
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views.order_views import OrderViewSet
from .views.product_views import (
    ProductReviewDestroyView,
    ProductReviewListCreateView,
    ProductViewSet,
)

router = DefaultRouter()

router.register(r'products', ProductViewSet, basename='product')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path(
        'products/<int:id>/review/',
        ProductReviewListCreateView.as_view(),
        name='review-list'
    ),
    path(
        'products/<int:id>/review/<int:pk>/',
        ProductReviewDestroyView.as_view(),
        name='review-detail'
    ),
]
