from django.db import models

# Create your models here.
class UsersFollowed(models.Model):
    list_of_users_that_are_followed_by = models.ManyToManyField('user.User', blank=True, default="")
