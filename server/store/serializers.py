""" Store serializers. """
from django.core.exceptions import ValidationError
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

    def validate(self, data):
        """ Validate the review doesn't already exist. """
        print(f"VALIDATING DATA: {data}", flush=True)
        print(f"REQUEST: {self.context['request'].user}", flush=True)
        product_id = self.context['view'].kwargs['id']
        print(f"PRODUCT ID: {product_id}", flush=True)
        product = Product.objects.get(pk=product_id)
        reviews = ProductReview.objects.all()
        print(f"PRODUCT REVIEWS: {reviews[0].__dict__}", flush=True)
        print(
            f"REQUEST USER: {self.context['request'].user.__dict__}",
            flush=True
        )
        already_exists = product.reviews_set.filter(
            user=self.context['request'].user
        ).exists()
        print(f"REVIEW EXISTS: {already_exists}", flush=True)
        # for review in reviews:
        #     if review["name"] == data["name"]:
        #         raise ValidationError(
        #             f"Product review by user {review['name']} already exists"
        #         )

        return data


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
