# Endpoints de la API

## Bloques
- `GET /api/bloques/`  
- `POST /api/bloques/`  
- `GET /api/bloques/{id}/`  
- `PUT /api/bloques/{id}/`  
- `DELETE /api/bloques/{id}/`  

## Categorías
- `GET /api/categorias/?bloque={bloque_id}`  
- `POST /api/categorias/`  
- `GET /api/categorias/{id}/`  
- `PUT /api/categorias/{id}/`  
- `DELETE /api/categorias/{id}/`  

## Productos
- `GET /api/productos/?categorias={cat_id}&precio_min={x}&precio_max={y}&ordering={precio|nombre}`  
- `POST /api/productos/`  
- `GET /api/productos/{id}/`  
- `PUT /api/productos/{id}/`  
- `DELETE /api/productos/{id}/`  
