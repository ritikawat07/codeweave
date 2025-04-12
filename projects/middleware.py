from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from .models import Token

class TokenAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip token authentication for certain paths
        if request.path.startswith('/admin/') or request.path.startswith('/static/'):
            return self.get_response(request)

        # Check for token in Authorization header
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Token '):
            token_key = auth_header.split(' ')[1]
            try:
                token = Token.objects.get(key=token_key)
                request.user = token.user
            except Token.DoesNotExist:
                request.user = AnonymousUser()
        else:
            # If no token is provided, use the default authentication
            if not hasattr(request, 'user'):
                request.user = AnonymousUser()

        return self.get_response(request) 