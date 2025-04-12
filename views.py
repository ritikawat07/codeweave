from django.http import JsonResponse
import requests

def generate_pdf(request):
    if request.method == 'POST':
        try:
            # Get the content from the request
            data = json.loads(request.body)
            content = data.get('content')
            title = data.get('title', 'Project Roadmap')
            
            # Prepare the payload for the PDF API
            payload = {
                'content': content,
                'title': title,
                'options': {
                    'format': 'A4',
                    'margin': '20mm',
                    'printBackground': True
                }
            }
            
            # Make the request to the PDF API
            response = requests.post(
                'https://api.market/store/yakpdf/pdf',
                json=payload,
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                # Return the PDF data
                return HttpResponse(
                    response.content,
                    content_type='application/pdf',
                    headers={
                        'Content-Disposition': f'attachment; filename="{title}.pdf"'
                    }
                )
            else:
                return JsonResponse(
                    {'error': f'PDF generation failed with status {response.status_code}'},
                    status=response.status_code
                )
                
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
            
    return JsonResponse({'error': 'Method not allowed'}, status=405) 