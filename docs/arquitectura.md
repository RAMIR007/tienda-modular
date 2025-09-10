## Componente Catalogo (React)

- Carga productos desde `/api/productos/`
- Permite filtrar por categoría (`categorias={id}`)
- Permite ordenar por precio o nombre (`ordering=precio|nombre`)
- Usa Axios para consumir la API
- Carga categorías desde `/api/categorias/`

## Carrito de compras

- Estado global con Context API
- Permite agregar y quitar productos
- Se accede desde `Catalogo` y `Carrito`
- Se confirma desde `Confirmacion.jsx`
