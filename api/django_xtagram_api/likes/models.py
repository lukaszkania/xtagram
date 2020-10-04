from django.db import models

# Create your models here.
class Likes(models.Model):
    likes_number = models.IntegerField(default=0, null=True, blank=True)
    list_of_users_that_like_it = models.ManyToManyField('user.User', blank=True)