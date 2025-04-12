from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/verify-token/', views.verify_token, name='verify_token'),
] 