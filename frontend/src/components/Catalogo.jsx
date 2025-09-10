import { useEffect, useState } from 'react';
import { api, getCategorias } from '../services/api';
import { CarritoContext } from '../context/CarritoContext';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [orden, setOrden] = useState('precio');

  useEffect(() => {
    getCategorias().then(({ data }) => setCategorias(data));
  }, []);

  useEffect(() => {
    const params = {
      ordering: orden,
    };
    if (categoriaSeleccionada) {
      params.categorias = categoriaSeleccionada;
    }

    api
      .get('/productos/', { params })
      .then(({ data }) => setProductos(data))
      .catch(err => console.error(err));
  }, [orden, categoriaSeleccionada]);

  return (
    <div>
      <h2>Catálogo de Productos</h2>

      <label>
        Categoría:{' '}
        <select
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
      </label>

      <label style={{ marginLeft: '1rem' }}>
        Ordenar por:{' '}
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="precio">Precio</option>
          <option value="nombre">Nombre</option>
        </select>
      </label>

      <ul style={{ marginTop: '1rem' }}>
        {productos.map(p => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> – ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

const { agregarProducto } = useContext(CarritoContext);

<button onClick={() => agregarProducto(p)}>Agregar al carrito</button>
