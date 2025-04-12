from django.urls import path
from . import views

urlpatterns = [
    path('api/app/', views.app, name='app'),
    path('api/generate-roadmap/', views.generate_roadmap_view, name='generate_roadmap'),
    path('api/clear-cache/', views.clear_cache_view, name='clear_cache'),
    path('api/roadmap/', views.roadmap_view, name='roadmap'),
    path('devenv.html', views.devenv, name='devenv'),
] 