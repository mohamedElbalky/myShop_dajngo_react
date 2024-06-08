from django.shortcuts import render

from django.http import JsonResponse


from .products import products


def get_routes_view(request):

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

    return JsonResponse(routes, safe=False)


def get_products_view(request):
    return JsonResponse(products, safe=False)


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
