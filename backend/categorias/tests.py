from django.test import TestCase
from .models import Bloque, Categoria

class CategoriaTests(TestCase):
    def test_crear_bloque_y_categoria(self):
        bloque = Bloque.objects.create(nombre="Electrónica")
        categoria = Categoria.objects.create(nombre="Teléfonos", bloque=bloque)
        self.assertEqual(categoria.bloque.nombre, "Electrónica")
