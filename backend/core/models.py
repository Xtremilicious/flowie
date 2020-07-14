from uuid import uuid4

from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin


class UserManager(BaseUserManager):
    """Manager for User model"""

    def create_user(self, name, password, **extra_fields):
        """Creates and saves a new user"""
        if not name:
            raise ValueError("User must have an email address")

        user = self.model(name=name.lower(), **extra_fields)
        user.set_password(password)

        user.save()
        return user

    def create_superuser(self, name, password):
        """Create and save a superuser in the system"""
        user = self.create_user(name=name, password=password)
        user.is_staff = True
        user.is_superuser = True

        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User model"""
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    avatar = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'name'

    class Meta:
        app_label = 'flowie'
        default_related_name = 'users'

    def __str__(self):
        return self.name


class TrackedRepository(models.Model):
    """Tracked Repository model"""
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    repo_name = models.TextField()

    class Meta:
        app_label = 'flowie'
        default_related_name = 'tracked_repositories'

    def __str__(self):
        return self.repo_name
