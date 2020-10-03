from django.shortcuts import render
from serializers import LikesSerializer
from rest_framework import viewsets
from likes.models import Likes

# Create your views here.
class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer