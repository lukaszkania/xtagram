from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from serializers import UserSerializer
from user.models import User
from post.models import Post
from rest_framework.parsers import FileUploadParser

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class FileUploadView(APIView):
    parser_classes = FileUploadParser

    def post(self, request, *args, **kwargs):
        file_serializer = UserSerializer(data=request.data)

        if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)