import React, { useContext, useEffect, useState } from 'react';
import { api, getCategorias } from '../services/api';
import { CarritoContext } from '../context/CarritoContext';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [orden, setOrden] = useState('precio');
  const [error, setError] = useState(null);
  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    getCategorias()
      .then(({ data }) => setCategorias(data))
      .catch(() => setError('No se pudieron cargar las categorías.'));
  }, []);

  useEffect(() => {
    const params = {
      ordering: orden,
    };
    if (categoriaSeleccionada) {
      params.categorias = categoriaSeleccionada;
    }

    setError(null); // Limpiar errores anteriores al recargar
    setLoading(true);
    api
      .get('/productos/', { params })
      .then(({ data }) => setProductos(data))
      .catch(() => setError('No se pudieron cargar los productos.'))
      .finally(() => setLoading(false));
  }, [orden, categoriaSeleccionada]);

  return (
    <div>
      <h2>Catálogo de Productos</h2>

      <div className="filtros-catalogo">
        <label htmlFor="categoria-select">Categoría:</label>
          <select
            id="categoria-select"
            value={categoriaSeleccionada}
            onChange={e => setCategoriaSeleccionada(e.target.value)}
          >
            <option value="">Todas</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>

        <label htmlFor="orden-select" className="filtro-orden">
          Ordenar por:{' '}
          <select id="orden-select" value={orden} onChange={e => setOrden(e.target.value)}>
            <option value="precio">Precio</option>
            <option value="nombre">Nombre</option>
          </select>
        </label>
      </div>

      <div className="catalogo-contenido">
        {loading && <p>Cargando...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          productos.length > 0 ? (
            <ul className="lista-productos">
              {productos.map(p => (
                <li key={p.id}>
                  <strong>{p.nombre}</strong> – ${p.precio}
                  <button className="btn-agregar" onClick={() => agregarProducto(p)}>
                    Agregar al carrito
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay productos para mostrar</p>
          )
        )}
      </div>
    </div>
  );
}
