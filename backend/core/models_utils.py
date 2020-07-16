from . import models


def sample_user(name="sample_user", password="sample_user", **kwargs):
    """Create a sample user"""
    return models.User.objects.create_user(name, password, **kwargs)


def sample_tracked_repo(repo_name, user=None, **kwargs):
    return models.TrackedRepository.objects.create(
        repo_name=repo_name,
        user=sample_user() if user is None else user, **kwargs)
