"""
    custom token payload or claims
"""


from typing import Any, Dict
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from x_users.serializers import UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = "hello world"
        # token['email'] = user.email
        # token['is_staff'] = user.is_staff
        # token['is_superuser'] = user.is_superuser
        # token['is_active'] = user.is_active
        # token['first_name'] = user.first_name

        return token
    
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)

        # refresh = self.get_token(self.user)
        # data['refresh'] = str(refresh)
        # data['access'] = str(refresh.access_token)
        
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        
        
        # use custom serializer
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v, in serializer.items():
            data[k] = v
        
        return data
    
    
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer