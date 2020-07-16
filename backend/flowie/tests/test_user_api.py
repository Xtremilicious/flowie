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
        self.assertEqual(res.data['name'], username.lower())
        self.assertTrue(
            User.objects.filter(name=username.lower()).exists()
        )

    def test_create_existing_user(self):
        """Test create existing user"""
        username = 'ChHannan'
        mu.sample_user(name=username)
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
            res.data['name'], username.lower()
        )

    def test_create_no_user_github(self):
        """Test create user that does not exist on github"""
        username = 'auiwdhiuwahduihawd'
        payload = {
            'username': username
        }

        res = self.client.post(
            USER_URL, payload
        )

        self.assertEqual(
            res.status_code, status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(
            res.data['message'], 'Username does not exist on Github'
        )

    def test_create_no_username(self):
        """Test create user without passing username"""

        res = self.client.post(
            USER_URL
        )

        self.assertEqual(
            res.status_code, status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(
            res.data['message'], 'Bad request'
        )
