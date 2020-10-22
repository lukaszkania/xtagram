from django.shortcuts import render
from rest_framework import viewsets
from users_followed.models import UsersFollowed
from serializers import UsersFollowedSerializer

# Create your views here.
class UsersFolloweViewSet(viewsets.ModelViewSet):
    queryset = UsersFollowed.objects.all()
    serializer_class = UsersFollowedSerializer
