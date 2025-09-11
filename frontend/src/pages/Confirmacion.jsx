import React, { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { api } from '../services/api';

export default function Confirmacion() {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
  });
  const [error, setError] = useState('');
  const [estado, setEstado] = useState('inicial'); // inicial, enviando, exito, error

  const handleChange = e =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.telefono || !cliente.direccion) {
      setError('Por favor completa todos los campos');
      return;
    }
    setError('');
    setEstado('enviando');

    const productosConCantidad = carrito.map(p => ({ ...p, cantidad: 1 }));

    try {
      await api.post('/vales/', {
        cliente,
        productos: productosConCantidad,
      });
      setEstado('exito');
      vaciarCarrito();
    } catch (err) {
      setEstado('error');
      setError('No se pudo generar el vale. Inténtalo de nuevo.');
    }
  };

  if (estado === 'exito') {
    return (
      <div>
        <h2>¡Vale generado con éxito!</h2>
        <p>Gracias por tu compra.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Confirmar compra</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nombre">Nombre y apellidos</label>
          <input
            id="nombre"
            name="nombre"
            placeholder="Nombre y apellidos"
            value={cliente.nombre}
            onChange={handleChange}
            required
            disabled={estado === 'enviando'}
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            value={cliente.telefono}
            onChange={handleChange}
            required
            disabled={estado === 'enviando'}
          />
        </div>
        <div>
          <label htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            name="direccion"
            placeholder="Dirección"
            value={cliente.direccion}
            onChange={handleChange}
            required
            disabled={estado === 'enviando'}
          />
        </div>
        <button type="submit" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Generando...' : 'Generar vale'}
        </button>
      </form>
    </div>
  );
}
