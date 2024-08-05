import os
from uuid import uuid4

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings

from django.utils import timezone


def handle_image_upload(instance, filename):
    return os.path.join(
        "images",
        f"{instance.__class__.__name__.lower()}s",
        str(instance.uuid),
        timezone.now().strftime("%Y-%m-%d-at-[%H:%M:%S.%f]"),
        filename,
    )


class Product(models.Model):
    uuid = models.UUIDField(default=uuid4, db_index=True, editable=False, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="products",
        on_delete=models.SET_NULL,
        null=True,
    )
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to=handle_image_upload)
    brand = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=0,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
    )
    numReviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    countInStock = models.IntegerField(default=0)

    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def get_reviews_count(self):
        return self.reviews.count()


class Review(models.Model):
    uuid = models.UUIDField(default=uuid4, db_index=True, editable=False, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    product = models.ForeignKey(
        Product, related_name="reviews", on_delete=models.CASCADE
    )
    # productName = models.CharField(max_length=255)
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=0,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
    )
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"name: {self.user.username}\nproduct: {self.product.name}\nrating: {self.rating}"


class Order(models.Model):
    uuid = models.UUIDField(default=uuid4, db_index=True, editable=False, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    paymentMethod = models.CharField(max_length=150)
    taxPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    shippingPrice = models.DecimalField(
        max_digits=15, decimal_places=2, null=True, blank=True
    )
    # total price in order = (orders prices + shipping price + tax price)
    totalPrice = models.DecimalField(
        max_digits=20, decimal_places=2, null=True, blank=True
    )
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)
    
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"user: {self.user.username}\ntotalPrice: {self.totalPrice}"


class OrderItem(models.Model):
    uuid = models.UUIDField(default=uuid4, db_index=True, editable=False, unique=True)
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.SET_NULL, null=True, blank=True
    )
    product = models.ForeignKey(
        Product, related_name="items", on_delete=models.SET_NULL, null=True, blank=True
    )
    # productName = models.CharField(max_length=255)
    qty = models.IntegerField(default=0)
    
    # order item price = product.price * qty
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # image = models.ImageField(upload_to=handle_image_upload)

    def __str__(self):
        return (
            f"order: {self.order.uuid}\nproduct: {self.product.name}\nqty: {self.qty}"
        )


class ShippingAdress(models.Model):
    uuid = models.UUIDField(default=uuid4, db_index=True, editable=False, unique=True)
    order = models.OneToOneField(to=Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100)
    postalCode = models.CharField(max_length=10)
    country = models.CharField(max_length=100)
    shippingPrice = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self):
        return f"order: {self.order.uuid}\naddress: {self.address}\ncity: {self.city}"
