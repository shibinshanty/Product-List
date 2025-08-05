from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)  
    description = models.TextField(blank=True)  
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    brand = models.CharField(max_length=100)  

    ELECTRONICS = 'Electronics'
    FURNITURE = 'Furniture'
    APPAREL = 'Apparel'

    CATEGORY_CHOICES = [
        (ELECTRONICS, 'Electronics'),
        (FURNITURE, 'Furniture'),
        (APPAREL, 'Apparel'),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)  

    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.name
