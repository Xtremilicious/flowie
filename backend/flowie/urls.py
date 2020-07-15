from django.urls import path, include

from rest_framework.routers import Route

from app.urls import router
from . import views

app_name = 'flowie'

router.routes += [
    # Track Repository View Route
    Route(
        url=r'^flowie{trailing_slash}track{trailing_slash}repository'
            r'{trailing_slash}$',
        mapping={
            'get': 'view_tracked_repository',
            'post': 'create_tracked_repository'
        },
        name='tracked_repository-view',
        detail=False,
        initkwargs={'suffix': 'View'}
    ),

    # User View Route
    Route(
        url='^flowie{trailing_slash}user{trailing_slash}$',
        mapping={
            'post': 'create_user'
        },
        name='user-view',
        detail=False,
        initkwargs={'suffix': 'View'}
    ),

    # PR Linked Issues View Route
    Route(
        url=r'^flowie{trailing_slash}pr{trailing_slash}linked'
            r'{trailing_slash}issues{trailing_slash}$',
        mapping={
            'post': 'view_linked_issues'
        },
        name='pr_linked_issue-view',
        detail=False,
        initkwargs={'suffix': 'View'}
    )
]

router.register('flowie', views.TrackedRepositoryViewSet)
router.register('flowie', views.UserViewSet)
router.register('flowie', views.PRLinkedIssueViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
