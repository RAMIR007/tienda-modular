import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const { carrito, quitarProducto } = useContext(CarritoContext);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Tu carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos.</p>
      ) : (
        <ul>
          {carrito.map(p => (
            <li key={p.id}>
              {p.nombre} – ${p.precio}
              <button onClick={() => quitarProducto(p.id)}>Quitar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/confirmar')}>Confirmar compra</button>
    </div>
  );
}
