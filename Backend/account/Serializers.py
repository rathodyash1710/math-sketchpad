from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token
from .models import SavedImage

CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password', 'password2',
                  'gender', 'dob', 'country']

    def validate(self, attrs):
        print('hello')
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        print(1, email, password)

        if email and password:
            user = authenticate(request=self.context.get(
                'request'), email=email, password=password)
            if user is None:
                raise serializers.ValidationError(
                    {"error": "Invalid credentials."})
            if not user.is_active:
                raise serializers.ValidationError(
                    {"error": "User account is disabled."})
        else:
            raise serializers.ValidationError(
                {"error": "Must include both email and password."})

        data['user'] = user
        return data

    def create(self, validated_data):
        user = validated_data['user']
        print(user)
        token, created = Token.objects.get_or_create(user=user)
        return {"token": token.key, }


class SavedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedImage
        fields = ['image']

    def create(self, validated_data):
        user = self.context['request'].user
        return SavedImage.objects.create(user=user, **validated_data)
