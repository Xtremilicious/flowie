from . import models


def sample_user(name="sample_user", password="sample_user", **kwargs):
    """Create a sample user"""
    return models.User.objects.create_user(name, password, **kwargs)
