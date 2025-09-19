from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from models import BaseItem
from django.contrib import messages
from django.shortcuts import render, redirect
import json

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'User created', 'username': user.username})

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('userInput')
        password = data.get('password')

        user = authenticate(username=user_input, password=password)

        if user:
            return JsonResponse({'message': 'Login successful', 'username': user.username})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

def add_item(request):
    if request.method == "POST":
        item_name = request.POST.get("item_name")
        price = request.POST.get("price")
        item_description = request.POST.get("item_description")
        item_photo = request.FILES.get("item_photo")

        BaseItem.objects.create(
            item_name=item_name,
            price=price,
            item_description=item_description,
            item_photo=item_photo
        )
        messages.success(request, "Item added successfully.")
        return redirect("item_list")

    return render(request, "add_item.html") 


def item_list(request):
    items = BaseItem.objects.all()
    return render(request, "item_list.html", {"items": items})