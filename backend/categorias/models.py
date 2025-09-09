from django.db import models

class Bloque(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    bloque = models.ForeignKey(Bloque, on_delete=models.CASCADE, related_name='categorias')

    def __str__(self):
        return f"{self.bloque.nombre} → {self.nombre}"
