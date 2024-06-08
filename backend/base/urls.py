from django.urls import path

from . import views



urlpatterns = [
    path("", views.get_routes_view, name="routes"),
    path("products/", views.get_products_view, name="products"),
    path("products/<str:id>/", views.get_one_product_view, name="product"),
    path("products/create/", views.create_new_product_view, name="create_new_product"),
]
