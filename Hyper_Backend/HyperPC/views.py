from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Profile

@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            first_name=data['fullName']
        )
        Profile.objects.create(user=user, phone=data['phone'])
        return JsonResponse({"message": "Registration successful"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    

@api_view(['POST'])
def login(request):
    data = request.data
    username= data.get('userInput')
    password = data.get('password')

    try:
        if username.isdigit():
            profile = Profile.objects.get(phone=username)
            username = profile.user.username
        else:
            username = username

        user = authenticate(username=username, password=password)
        if user:
            return JsonResponse({"message": "Login successful", "username": user.username})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except Profile.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)