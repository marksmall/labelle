""" Store serializers. """
from rest_framework import serializers

from .models import Order, OrderItem, Product, ProductReview, ShippingAddress


class ProductSerializer(serializers.ModelSerializer):
    """ Serializer for Products. """
    class Meta:
        """ Meta-class of ProductSerializer. """
        model = Product
        fields = [
            'id',
            'name',
            'image',
            'brand',
            'category',
            'description',
            'rating',
            'number_of_reviews',
            'price',
            'number_in_stock',
            'created_at',
            'reviews',
        ]

    reviews = serializers.SerializerMethodField(read_only=True)

    def get_reviews(self, obj):
        """ Get the data to be set as the reviews field. """
        reviews = obj.productreview_set.all()
        serializer = ProductReviewSerializer(reviews, many=True)

        return serializer.data


class ProductReviewSerializer(serializers.ModelSerializer):
    """ Serializer for Product Reviews. """
    class Meta:
        """ Meta-class of ReviewSerializer. """
        model = ProductReview
        fields = [
            'product',
            'user',
            'name',
            'rating',
            'comment',
            'created_at',
        ]


class OrderSerializer(serializers.ModelSerializer):
    """ Serializer for Orders. """
    class Meta:
        """ Meta-class of OrderSerializer. """
        model = Order
        fields = [
            'user',
            'payment_method',
            'tax_price',
            'shipping_price',
            'total_price',
            'is_paid',
            'delivered_at',
            'created_at',
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    """ Serializer for Order Items. """
    class Meta:
        """ Meta-class of OrderItemSerializer. """
        model = OrderItem
        fields = [
            'order',
            'product',
            'name',
            'quantity',
            'price',
            'image',
        ]


class ShippingAddressSerializer(serializers.ModelSerializer):
    """ Serializer for Shipping Address'. """
    class Meta:
        """ Meta-class of ShippingAddressSerializer. """
        model = ShippingAddress
        fields = [
            'order',
            'address',
            'city',
            'postal_code',
            'country',
            'shipping_price',
        ]
