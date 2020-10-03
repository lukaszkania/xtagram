from django.db import models

# Create your models here.
class Post(models.Model):
    description = models.TextField(max_length=500, blank=True)
    image = models.ImageField(upload_to=None, blank=True, null=True )
    likes_number = models.ManyToManyField('likes.Likes', default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    post_author = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='post_author')
    list_of_users_that_like_it = models.ManyToManyField('user.User', blank=True)