from django.test import TestCase
from categorias.models import Categoria, Bloque
from .models import Producto
from rest_framework.test import APIClient

class ProductoTests(TestCase):
    def test_producto_con_categoria(self):
        bloque = Bloque.objects.create(nombre="Ropa")
        categoria = Categoria.objects.create(nombre="Camisas", bloque=bloque)
        producto = Producto.objects.create(nombre="Camisa Azul", precio=15.00)
        producto.categorias.add(categoria)
        self.assertIn(categoria, producto.categorias.all())
        
class ProductoAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_crear_producto_via_api(self):
        bloque = Bloque.objects.create(nombre="Hogar")
        categoria = Categoria.objects.create(nombre="Cocina", bloque=bloque)
        data = {
            "nombre": "Taza",
            "precio": "5.00",
            "categorias": [categoria.id]
        }
        response = self.client.post("/api/productos/", data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["nombre"], "Taza")        
        
class ProductoUnicidadTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.producto = Producto.objects.create(nombre="Camisa", precio=10.00)

    def test_producto_duplicado(self):
        data = {"nombre": "Camisa", "precio": "12.00", "categorias": []}
        response = self.client.post("/api/productos/", data, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertIn("nombre", response.data)
        
