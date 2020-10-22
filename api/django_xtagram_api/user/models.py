from django.contrib.auth.models import User
from django.db import models
from post.models import Post

# Create your models here.
class User(User):
    users_followed = models.ManyToManyField('users_followed.UsersFollowed', related_name='users_followed_by', blank=True, null=True)
    avatar = models.ImageField(upload_to=None, default='default_avatar.png')