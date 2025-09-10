import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export default function Confirmacion() {
  const { carrito } = useContext(CarritoContext);
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
  });

  const handleChange = e =>
    setCliente({ ...cliente, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre y apellidos"
          value={cliente.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={handleChange}
          required
        />
        <input
          name="direccion"
          placeholder="Dirección"
          value={cliente.direccion}
          onChange={handleChange}
          required
        />
        <button type="submit">Generar vale</button>
      </form>
    </div>
  );
}
