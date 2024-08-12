from django.urls import path

from . import views


urlpatterns = [
    path("", views.get_users_profiles_view),
    path("profile/", views.get_auth_user_profile_view),
    path("register/", views.register_user_view),
]
