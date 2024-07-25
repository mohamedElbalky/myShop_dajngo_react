from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Product


class ProductUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username"]


class ProductSerializer(serializers.ModelSerializer):
    user = ProductUserSerializer(read_only=True)
    class Meta:
        model = Product
        fields = (
            "uuid",
            "name",
            "image",
            "brand",
            "category",
            "description",
            "rating",
            "numReviews",
            "price",
            "countInStock",
            "createdAt",
            "updatedAt",
            "user"
        )

        read_only_fields = [
            "uuid",
            "createdAt",
            "updatedAt",
        ]
