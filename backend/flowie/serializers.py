from rest_framework import serializers

from core.models import TrackedRepository


class TrackedRepositorySerializer(serializers.ModelSerializer):
    """Serializer for Tracked Repository model"""

    class Meta:
        model = TrackedRepository
        fields = ('id', 'user', 'repo_name')
        read_only_fields = ('id', )
