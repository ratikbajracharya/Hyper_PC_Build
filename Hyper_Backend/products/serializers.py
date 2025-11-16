from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # include all fields: id, name, slug, category, price, stock, description, image, timestamps
