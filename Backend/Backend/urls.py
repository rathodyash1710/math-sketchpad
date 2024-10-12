from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from . import settings
from .views import SaveImageView, DeleteImageView, GETSavedImages

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('account.urls')),
    path('save-image/', SaveImageView.as_view(), name='save-image'),
    path('get-saved-images/', GETSavedImages.as_view(), name='get-images'),
    path('delete-image/<int:pk>/', DeleteImageView.as_view(), name='delete-image'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
