from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib import messages
from django.http import JsonResponse
from .models import Token, UserProfile
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json

# Create your views here.

def index(request):
    return render(request, 'index.html')

def get_or_create_token(user):
    token, created = Token.objects.get_or_create(user=user)
    return token.key

@login_required
def dashboard(request):
    token = get_or_create_token(request.user)
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    
    context = {
        'user': request.user,
        'token': token,
        'profile': user_profile,
    }
    return render(request, 'dashboard.html', context)

@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            user = authenticate(username=username, password=password)
            if user is not None:
                token = get_or_create_token(user)
                return JsonResponse({
                    'status': 'success',
                    'token': token,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                })
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Invalid credentials'
                }, status=401)
        except json.JSONDecodeError:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid JSON'
            }, status=400)
    return JsonResponse({
        'status': 'error',
        'message': 'Method not allowed'
    }, status=405)

def verify_token(request):
    token_key = request.headers.get('Authorization', '').replace('Token ', '')
    try:
        token = Token.objects.get(key=token_key)
        return JsonResponse({
            'status': 'success',
            'user': {
                'id': token.user.id,
                'username': token.user.username,
                'email': token.user.email
            }
        })
    except Token.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Invalid token'
        }, status=401)

def app(request):
    return render(request, 'app.html')
