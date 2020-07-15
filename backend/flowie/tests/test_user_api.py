from django.test import TestCase

from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import User
from core import models_utils as mu

USER_URL = reverse('flowie:user-view')


class UserPublicAPI(TestCase):
    """Test the user public API"""

    def setUp(self) -> None:
        self.client = APIClient()

    def test_create_new_user(self):
        """Test creating new user"""
        username = 'Diaga'
        payload = {
            'username': username
        }

        res = self.client.post(
            USER_URL, payload
        )

        self.assertEqual(
            res.status_code, status.HTTP_201_CREATED
        )
        self.assertEqual(res.data['name'], username)
        self.assertTrue(
            User.objects.filter(name=username).exists()
        )

    def test_create_existing_user(self):
        """Test create existing user"""
        username = 'Diaga'
        user = mu.sample_user(name=username)
        payload = {
            'username': username
        }

        res = self.client.post(
            USER_URL, payload
        )

        self.assertEqual(
            res.status_code, status.HTTP_201_CREATED
        )
        self.assertEqual(
            res.data['name'], username
        )
