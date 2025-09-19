from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, unique=True)

    def str(self):
        return f"{self.user}, {self.phone}"
    
class BaseItem(models.Model):
    item_name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    item_photo = models.ImageField(upload_to="items/")
    item_description = models.TextField()

    def __str__(self):
        return self.item_name
    