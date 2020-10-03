from django.db import models

# Create your models here.
class Likes(models.Model):
    likes_number = models.IntegerField(default=0, blank=True)