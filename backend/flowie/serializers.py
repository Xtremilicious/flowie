from rest_framework import serializers

from core.models import TrackedRepository


class TrackedRepositorySerializer(serializers.ModelSerializer):
    """Serializer for Tracked Repository model"""
