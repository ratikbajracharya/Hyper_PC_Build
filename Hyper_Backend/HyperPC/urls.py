from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('items/', views.item_list, name='item_list'),
    path('items/add/', views.add_item, name='add_item'),
]
