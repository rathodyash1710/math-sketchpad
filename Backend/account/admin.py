from django.contrib import admin
from .models import CustomUser, SavedImage
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


admin.site.register(CustomUser)
admin.site.register(SavedImage)
