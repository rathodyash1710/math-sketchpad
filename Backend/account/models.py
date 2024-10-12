from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    dob = models.DateField(_("Date of Birth"))
    gender = models.CharField(max_length=10, choices=[(
        'male', 'Male'), ('female', 'Female'), ('other', 'Other')], null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)

    groups = models.ManyToManyField(Group, related_name='customuser_set')
    user_permissions = models.ManyToManyField(
        Permission, related_name='customuser_set')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'dob', 'gender', 'country']

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class SavedImage(models.Model):
    image_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_images')
    image = models.ImageField(upload_to='Drawings/')
    upload_time = models.DateTimeField(auto_now=True)
