import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [orden, setOrden] = useState('precio');

  useEffect(() => {
    api
      .get('/productos/', { params: { ordering: orden } })
      .then(({ data }) => setProductos(data))
      .catch(err => console.error(err));
  }, [orden]);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <label>
        Ordenar por:{' '}
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="precio">Precio</option>
          <option value="nombre">Nombre</option>
        </select>
      </label>

      <ul>
        {productos.map(p => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> – ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
