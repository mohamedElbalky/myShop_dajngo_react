from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from drf_spectacular.utils import extend_schema

from .serializers import UserSerializer, UserCreateSerializer, UserSerializerWithToken



@extend_schema(request=None, responses=None, tags=["users profiles"])
@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users_profiles_view(request):
    users = get_user_model().objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(request=None, responses=None, tags=["users profiles"])
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_auth_user_profile_view(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)



@extend_schema(request=UserCreateSerializer, responses=None, tags=["users"])
@api_view(["POST"])
def register_user_view(request):
    serializer = UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.save()
        res_serializer = UserSerializerWithToken(data, many=False)
        return Response(res_serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)