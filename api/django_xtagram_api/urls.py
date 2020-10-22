from django.urls import include, path
from rest_framework import routers
from post.views import PostViewSet 
from django.conf.urls.static import static
from django.conf import settings
from post.views import FileUploadView
from user.views import UserViewSet
from comment.views import CommentViewSet
from likes.views import LikesViewSet
from users_followed.views import UsersFolloweViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('users', UserViewSet)
router.register('comments', CommentViewSet)
router.register('likes', LikesViewSet)
router.register('users_followed', UsersFolloweViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('a/', FileUploadView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
