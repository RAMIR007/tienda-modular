import React, { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export default function Confirmacion() {
  const { carrito } = useContext(CarritoContext);
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
  });
  const [error, setError] = useState('');

  const handleChange = e =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.telefono || !cliente.direccion) {
      setError('Por favor completa todos los campos');
      return;
    }

    setError(''); // Limpiar error si la validación es exitosa

    const datos = {
      cliente,
      productos: carrito,
    };
    console.log('Enviar al backend:', datos);
    // Aquí luego conectamos con valepdf
  };

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
          />
        </div>
        <button type="submit">Generar vale</button>
      </form>
    </div>
  );
}
