from django.contrib import admin
from categorias.models import Bloque, Categoria
from productos.models import Producto

admin.site.register(Bloque)
admin.site.register(Categoria)
admin.site.register(Producto.ProductoAdmin)
