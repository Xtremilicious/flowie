from django.test import TestCase
from core import models_utils as mu


class UserModelTests(TestCase):
    """Tests for user model"""

    def test_create_user(self):
        """Test creating a user"""
        user = mu.sample_user()

        self.assertEqual(user.name, "sample_user")
        self.assertEqual(user.__str__(), "sample_user")
        self.assertTrue(user.check_password("sample_user"))

    def test_user_name_lower(self):
        """Test user name is lower cased"""
        name = "SAMPLE"
        user = mu.sample_user(name=name)

        self.assertEqual(user.name, name.lower())



