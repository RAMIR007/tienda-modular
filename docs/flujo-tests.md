## Validaciones de unicidad

- Bloques, Categorías y Productos no deben repetirse por nombre
- Se usa `unique=True` en los modelos
- Los serializers devuelven error 400 si el nombre ya existe
- Se valida en Swagger y en pruebas automatizadas

## Validación del carrito

- Se prueba agregar y quitar productos
- Se valida que el formulario de confirmación exija datos del cliente
- Se simula envío al backend para generar PDF

# Pruebas automatizadas del backend

## Modelos
- Se crean bloques, categorías y productos
- Se validan relaciones entre modelos

## API REST
- Se prueba creación de productos vía `/api/productos/`
- Se valida respuesta y estructura JSON

## Vale en PDF
- Se envía cliente y productos a `/api/vale/`
- Se verifica que la respuesta sea un PDF válido

## Herramientas
- `unittest` y `rest_framework.test.APIClient`
- Se ejecutan con `python manage.py test`
