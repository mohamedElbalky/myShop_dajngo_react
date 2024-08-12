
from django.contrib.auth import get_user_model

from rest_framework import serializers

from rest_framework_simplejwt.tokens import RefreshToken

# from .utils import is_valid_email


USER = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    
    class Meta:
        model = USER
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']
        
    def get_name(self, obj):
        name = obj.first_name
        if not name:
            name = obj.email
            
        return name
    
    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = USER
        fields = ['_id', 'username', 'email', 'name', 'isAdmin', 'token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserCreateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    name = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    
    
    class Meta:
        model = USER
        fields = ['username', 'name', 'email', 'password1', 'password2']
        extra_kwargs = {'password': {'write_only': True}, 'username': {'help_text': ''}}
        
        
    def validate_password2(self, value):
        if value != self.initial_data['password1']:
            raise serializers.ValidationError('Passwords must match')
        return value
    
    def validate_email(self, value):
        
        # if not is_valid_email(value):
        #     raise serializers.ValidationError("Invalid Email")
        
        if USER.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        
        return value
    
    
    def create(self, validated_data):
        password1 = validated_data.pop('password1')
        username = validated_data['username']
        try:
            first_name = validated_data['name']
        except KeyError:
            first_name = ""
        email = validated_data['email']
        
        
        
        user = USER.objects.create_user(
            username=username,
            first_name=first_name,
            email=email,
        )
        user.set_password(password1)
        user.save()
        
        return user
    
    