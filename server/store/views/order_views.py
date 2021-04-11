from rest_framework.viewsets import ModelViewSet
from store.models import Order
from store.permissions import IsOwnerOrAdmin
from store.serializers import OrderSerializer


class OrderViewSet(ModelViewSet):
    """ ViewSet to manage orders. """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsOwnerOrAdmin]
