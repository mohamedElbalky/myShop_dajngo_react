from django.shortcuts import get_object_or_404, render

from django.http import JsonResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


from drf_spectacular.utils import extend_schema

from .products import products

from .models import Product
from .serializers import ProductSerializer



@extend_schema(tags=['routers'], request=None, responses=None)
@api_view(["GET"])
def get_routes_view(request):
    """get all routers in the project"""
    routes = [
        "api/products/",
        "api/products/create/",
        "api/products/upload/",
        "api/products/<id>/reviews/",
        "api/products/top/",
        "api/products/<id>/",
        "api/products/delete/<id>/",
        "api/products/update/<id>/",
    ]

    return Response(routes, status=status.HTTP_200_OK)


@extend_schema(request=None, responses=None)
@api_view(["GET"])
def get_products_view(request):
    
    products = Product.objects.order_by('-createdAt')
    serializer = ProductSerializer(products, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@extend_schema(request=None, responses=None)
@api_view(["GET"])
def get_one_product_view(request, uuid=None):
    
    product = get_object_or_404(Product, uuid=uuid)

    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data, status=status.HTTP_200_OK)



def create_new_product_view(request):

    new_product = {
        "_id": "7",
        "name": "new product",
        "image": "/images/airpods.jpg",
        "description": "Gravida dictumst sed enim ornare faucibus dolor mi egestas enim.",
        "brand": "Apple",
        "category": "Electronics",
        "price": 89.99,
        "countInStock": 7,
        "rating": 4,
        "numReviews": 2,
    }
    
    products.append(new_product)
    
    return JsonResponse(products, safe=False)
