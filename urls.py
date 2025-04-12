from .views import generate_pdf

urlpatterns = [
    # ... existing patterns ...
    path('generate-pdf/', generate_pdf, name='generate_pdf'),
] 