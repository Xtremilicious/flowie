from rest_framework import viewsets, status
from rest_framework.response import Response
from github import GithubException

from . import serializers
from core.github_utils import GithubSingleton
from core.models import TrackedRepository, User


class UserViewSet(viewsets.GenericViewSet):
    """View set for User model"""

    authentication_classes = []

    permission_classes = []

    serializer_class = serializers.UserSerializer

    queryset = User.objects.all()

    def create_user(self, request, *args, **kwargs):
        """Return create user if not exists otherwise
        create new user"""
        username = request.data.get('username', None)
        if username is not None:
            try:
                g = GithubSingleton.get()
                g.get_user(username)
            except GithubException:
                return Response(
                    {'message': 'Username does not exist on Github'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user_query = User.objects.filter(
                name=username.lower()
            )
            if user_query.exists():
                serializer = self.get_serializer(
                    user_query.first()
                )
            else:
                user = User.objects.create_user(
                    username, username
                )
                serializer = self.get_serializer(
                    user
                )

            return Response(
                serializer.data, status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {'message': 'Bad request'},
                status=status.HTTP_400_BAD_REQUEST
            )


class TrackedRepositoryViewSet(viewsets.GenericViewSet):
    """View set for Tracked Repository"""

    authentication_classes = []

    permission_classes = []

    serializer_class = serializers.TrackedRepositorySerializer

    queryset = TrackedRepository.objects.all()

    def get_queryset(self):
        """Filter queryset"""
        queryset = super(TrackedRepositoryViewSet, self).get_queryset()

        username = self.request.GET.get('username', None)
        if username is not None:
            queryset.filter(
                user__name=username
            ).all()

        return queryset

    def view_tracked_repository(self, request, *args, **kwargs):
        """Return all tracked repos for a certain username"""
        serializer = self.get_serializer(
            self.get_queryset(), many=True
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def create_tracked_repository(self, request, *args, **kwargs):
        """Check if repository and user name exists and
        create tracked repository"""
        username = request.data.get('user', None)
        repo_name = request.data.get('repo_name', None)

        user = User.objects.filter(name=username)
        if user.exists():
            try:
                g = GithubSingleton.get()
                g.get_repo(repo_name)
            except GithubException:
                return Response({
                    'message': 'Repository not found!'},
                    status=status.HTTP_400_BAD_REQUEST)

            serializer = self.get_serializer(
                data={'user': user.first().id, 'repo_name': repo_name}
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'message': 'User not found!'},
                status=status.HTTP_400_BAD_REQUEST
            )
