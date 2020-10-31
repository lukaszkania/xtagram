from rest_framework import serializers
from post.models import Post
from user.models import User
from comment.models import Comment
from likes.models import Likes
from users_followed.models import UsersFollowed

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'description', 'image', 'created_at', 'updated_at', 'post_author', 'likes_number')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk','username', 'password', 'email', 'users_followed', 'avatar')        

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('pk', 'content', 'post', 'comment_author', 'created_at')

class LikesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Likes
        fields = ('pk', 'likes_number', 'list_of_users_that_like_it')

class UsersFollowedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsersFollowed
        fields = ('pk', 'list_of_users_that_are_followed_by')