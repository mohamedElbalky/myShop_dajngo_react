from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

# Register your models here.


from .models import Product, Order, OrderItem, ShippingAdress, Review


class ReviewInline(admin.TabularInline):
    """For ProductAdmin"""

    model = Review
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ("uuid", "createdAt", "updatedAt")
    inlines = [ReviewInline]



class OrderItemInline(admin.TabularInline):
    """For OrderAdmin"""

    model = OrderItem
    extra = 0


class ShippingAdressInline(admin.StackedInline):
    """For OrderAdmin"""

    model = ShippingAdress
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ("uuid", "createdAt", "updatedAt")
    inlines = [OrderItemInline, ShippingAdressInline]


class OrderInline(admin.StackedInline):
    """For CustomUserAdmin"""
    model = Order
    extra = 0
    verbose_name_plural = "User Orders"


class CustomUserAdmin(UserAdmin):
    inlines = [OrderInline]
    
    
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)