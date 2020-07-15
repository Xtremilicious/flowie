from django.test import TestCase

from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core import models_utils as mu

T_REPO_URL = reverse('flowie:tracked_repository-view')


class TrackedRepositoryPublicAPI(TestCase):
    """Test the tracked repository public API"""

    def setUp(self) -> None:
        self.client = APIClient()

    def test_create_track_repository(self):
        """Test for creating track repo successfully"""
        user = mu.sample_user('Diaga')
        repo_name = 'JuliaPlots/Plots.jl'
        payload = {
            'user': user.name,
            'repo_name': repo_name
        }

        res = self.client.post(T_REPO_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['user'], user.id)
        self.assertEqual(res.data['repo_name'], repo_name)

    def test_create_track_repository_wrong_repo_name(self):
        """Test for creating track repo with wrong repo name"""
        user = mu.sample_user('Diaga')
        repo_name = 'RANDOM_REPO_NAME_12341234'

        payload = {
            'user': user.name,
            'repo_name': repo_name
        }

        res = self.client.post(T_REPO_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data['message'], 'Repository not found!')

    def test_create_track_repository_wrong_user_name(self):
        """Test for creating track repo with wrong user name"""
        username = 'RANDOM_USER_NAME_12341234'
        repo_name = 'JuliaPlots/Plots.jl'

        payload = {
            'user': username,
            'repo_name': repo_name
        }

        res = self.client.post(T_REPO_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res.data['message'], 'User not found!')
