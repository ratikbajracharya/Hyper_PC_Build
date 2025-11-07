from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer
from .models import UserProfile  # For phone login

# -------------------------
# Registration API
# -------------------------
@api_view(['POST'])
def register_user(request):
    """
    Registers a new user.
    Expects JSON: {username, email, password, fullName, phone}
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -------------------------
# Login API
# -------------------------
@api_view(['POST'])
def login_user(request):
    """
    Logs in a user using username or phone number.
    Expects JSON: {userInput, password}
    """
    userInput = request.data.get("userInput")
    password = request.data.get("password")

    if not userInput or not password:
        return Response({"message": "Both fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if input is all digits -> assume phone
        if userInput.isdigit():
            profile = UserProfile.objects.get(phone=userInput)
            username = profile.user.username
        else:
            username = userInput
    except UserProfile.DoesNotExist:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)