from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.db.models import Q

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['price', 'name', 'created_at']

    def get_queryset(self):
        queryset = Product.objects.all().order_by('-created_at')
        params = self.request.query_params

        # Filter by category (supports multiple categories)
        category = params.getlist('category')
        if category:
            queryset = queryset.filter(category__in=category)

        # Filter by brand (supports multiple brands)
        brand = params.getlist('brand')
        if brand:
            queryset = queryset.filter(brand__in=brand)

        # Filter by min and max price
        min_price = params.get('min_price')
        max_price = params.get('max_price')
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        # Filter by stock availability
        in_stock = params.get('in_stock')
        if in_stock == 'true':
            queryset = queryset.filter(stock__gt=0)
        elif in_stock == 'false':
            queryset = queryset.filter(stock__lte=0)

        # Optional search
        search = params.get('search')
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        # Optional ordering
        ordering = params.get('ordering')
        if ordering:
            queryset = queryset.order_by(ordering)

        return queryset
