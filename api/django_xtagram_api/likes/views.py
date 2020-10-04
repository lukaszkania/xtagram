from django.shortcuts import render
from rest_framework import viewsets
from serializers import LikesSerializer
from likes.models import Likes

# Create your views here.
class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all().order_by('pk')
    serializer_class = LikesSerializer