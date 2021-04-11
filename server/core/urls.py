"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from .views import AppConfigView, index_view

admin.site.site_header = settings.ADMIN_SITE_HEADER
admin.site.site_title = settings.ADMIN_SITE_TITLE
admin.site.index_title = settings.ADMIN_INDEX_TITLE

api_schema_view = get_schema_view(
    openapi.Info(
        title="Labelle API",
        default_version='v1',
        description="API documentation of the Labelle server API",
        # terms_of_service="https://www.google.com/policies/terms/",
        # contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[
        permissions.AllowAny,
    ],
)

api_schema_views = [
    re_path(
        r'^swagger(?P<format>\.json|\.yaml)$',
        api_schema_view.without_ui(cache_timeout=0),
        name='schema-json'
    ),
    re_path(
        r'^swagger/$',
        api_schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
    ),
    re_path(
        r'^redoc/$',
        api_schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'
    ),
]

api_router = DefaultRouter()

api_urlpatterns = [
    path('', include(api_router.urls)),
    path('', include(api_schema_views)),
    path('app/config', AppConfigView.as_view(), name="app-config"),
    path('', include('users.urls')),
    path('', include('store.urls')),
]

urlpatterns = [
    # docker healthchecks
    path('healthcheck/', include('health_check.urls')),
    path('api/', include(api_urlpatterns)),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
]

# media files...
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # enable django-debug-toolbar during development...
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [
            path("__debug__/", include(debug_toolbar.urls))
        ] + urlpatterns

urlpatterns += [
    # catch nothing-and-anything in index_view...
    path("", index_view, name="index"),
    re_path(r"^.*/$", index_view, name="index"),
]
