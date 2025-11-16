from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile  # make sure this class exists in users/models.py

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    phone = serializers.CharField(write_only=True, required=False)
    fullName = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'fullName', 'phone']

    def create(self, validated_data):
        phone = validated_data.pop('phone', None)
        full_name = validated_data.pop('fullName', '')
        # You can split fullName into first_name and last_name if needed
        first_name = full_name

        # Create the user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name
        )

        # Create UserProfile if phone is provided
        if phone:
            UserProfile.objects.create(user=user, phone=phone)

        return user
