from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .Serializers import CustomUserSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated

CustomUser = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomUserSerializer


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response_data = serializer.create(serializer.validated_data)
        return Response(response_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.auth_token:
            request.user.auth_token.delete()
            return Response({"success": "Successfully logged out."}, status=200)
        return Response({"error": "No active session found."}, status=400)
