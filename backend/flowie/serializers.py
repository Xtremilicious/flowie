from rest_framework import serializers

from core.models import TrackedRepository, User
from core.github_utils import GithubSingleton


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user model"""

    avatar = serializers.SerializerMethodField('get_avatar')

    def get_avatar(self, obj):
        """Return avatar"""
        g = GithubSingleton.get()
        user = g.get_user(obj.name)
        return user.avatar_url

    class Meta:
        model = User
        fields = ('name', 'avatar')
        read_only_fields = ('avatar', )


class TrackedRepositorySerializer(serializers.ModelSerializer):
    """Serializer for Tracked Repository model"""

    class Meta:
        model = TrackedRepository
        fields = ('id', 'user', 'repo_name')
        read_only_fields = ('id', )
