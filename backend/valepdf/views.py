from django.http import HttpResponse
from reportlab.pdfgen import canvas
from io import BytesIO
import datetime
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

@api_view(['POST'])
def generar_vale(request):
    data = JSONParser().parse(request)
    cliente = data.get('cliente', {})
    productos = data.get('productos', [])

    buffer = BytesIO()
    p = canvas.Canvas(buffer)

    p.setFont("Helvetica-Bold", 16)
    p.drawString(200, 800, "Vale de Compra")

    p.setFont("Helvetica", 12)
    p.drawString(50, 770, f"Fecha: {datetime.datetime.now().strftime('%d/%m/%Y %H:%M')}")
    p.drawString(50, 750, f"Cliente: {cliente.get('nombre')}")
    p.drawString(50, 735, f"Teléfono: {cliente.get('telefono')}")
    p.drawString(50, 720, f"Dirección: {cliente.get('direccion')}")

    p.drawString(50, 690, "Productos:")
    y = 670
    total = 0
    for prod in productos:
        nombre = prod.get('nombre')
        precio = float(prod.get('precio'))
        p.drawString(60, y, f"- {nombre} – ${precio:.2f}")
        y -= 20
        total += precio

    p.drawString(50, y - 10, f"Total: ${total:.2f}")
    p.showPage()
    p.save()

    buffer.seek(0)
    return HttpResponse(buffer, content_type='application/pdf')
