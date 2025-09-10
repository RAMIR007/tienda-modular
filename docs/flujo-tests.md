## Validaciones de unicidad

- Bloques, Categorías y Productos no deben repetirse por nombre
- Se usa `unique=True` en los modelos
- Los serializers devuelven error 400 si el nombre ya existe
- Se valida en Swagger y en pruebas automatizadas

## Validación del carrito

- Se prueba agregar y quitar productos
- Se valida que el formulario de confirmación exija datos del cliente
- Se simula envío al backend para generar PDF
