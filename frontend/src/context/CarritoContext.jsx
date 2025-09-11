import { createContext, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = producto => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      return existe ? prev : [...prev, producto];
    });
  };

  const quitarProducto = id => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarProducto, quitarProducto, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
