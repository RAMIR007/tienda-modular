# Generación de Vale en PDF

## Vista: `valepdf.views.generar_vale`

- Método: `POST /api/vale/`
- Recibe: JSON con `cliente` y `productos`
- Genera PDF con:
  - Fecha
  - Datos del cliente
  - Lista de productos
  - Total de la compra
- Devuelve: archivo PDF como respuesta

## Formato del PDF

- Título: "Vale de Compra"
- Fuente: Helvetica
- Espaciado vertical entre productos
- Total calculado automáticamente

## Validaciones

- Todos los campos del cliente son obligatorios
- El carrito debe tener al menos un producto
