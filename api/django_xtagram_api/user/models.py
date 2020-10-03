from django.contrib.auth.models import User
from django.db import models
from post.models import Post

# Create your models here.
class User(User):
    users_followed = models.ManyToManyField(User, related_name="followed", blank=True)
    users_following = models.ManyToManyField(User, related_name="following", blank=True)
    avatar = models.ImageField(upload_to=None, default='default_avatar.png')