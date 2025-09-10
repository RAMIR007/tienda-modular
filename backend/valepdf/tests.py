from rest_framework.test import APIClient
from django.test import TestCase

class ValePDFTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_generar_vale_pdf(self):
        data = {
            "cliente": {
                "nombre": "Ramiro",
                "telefono": "555-1234",
                "direccion": "La Habana"
            },
            "productos": [
                {"nombre": "Camisa", "precio": "15.00"},
                {"nombre": "Zapatos", "precio": "30.00"}
            ]
        }
        response = self.client.post("/api/vale/", data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/pdf")
