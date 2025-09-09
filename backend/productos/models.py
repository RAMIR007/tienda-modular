from django.db import models
from categorias.models import Categoria

class Producto(models.Model):
    nombre     = models.CharField(max_length=100)
    categorias = models.ManyToManyField(Categoria, related_name='productos')
    descripción= models.TextField(max_length=2000)
    precio     = models.DecimalField(max_digits=10, decimal_places=2)
    imagen     = models.ImageField(upload_to='productos/', blank=True, null=True)

    def __str__(self):
        return self.nombre
