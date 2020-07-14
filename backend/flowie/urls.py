from django.urls import path, include

from rest_framework.routers import Route

from app.urls import router
from . import views

app_name = 'flower'

router.routes += [
    # Track Repository View Route
    Route(
        url=r'^twix{trailing_slash}board{trailing_slash}$',
        mapping={
            'get': 'view_tracked_repository',
            'post': 'create_tracked_repository'
        },
        name='tracked_repository-view',
        detail=False,
        initkwargs={'suffix': 'View'}
    ),
]

router.register('flowie', views.BoardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
