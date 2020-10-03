from django.db import models
from post.models import Post

# Create your models here.
class Comment(models.Model):
    content = models.TextField(max_length=400)
    post = models.ForeignKey('post.Post', on_delete=models.CASCADE, related_name='comments')
    comment_author = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='comment_author')
    created_at = models.DateTimeField(auto_now_add=True)