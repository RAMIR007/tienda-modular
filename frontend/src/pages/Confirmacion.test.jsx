import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CarritoContext } from '../context/CarritoContext';
import Confirmacion from './Confirmacion';
import { api } from '../services/api';

// Mockeamos el módulo de la API
vi.mock('../services/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('Confirmacion', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('bloquea envío si faltan datos del cliente', async () => {
    const user = userEvent.setup();
    render(
      <CarritoContext.Provider value={{ carrito: [], vaciarCarrito: vi.fn() }}>
        <Confirmacion />
      </CarritoContext.Provider>
    );

    await user.click(screen.getByRole('button', { name: /generar vale/i }));

    expect(await screen.findByText(/Por favor completa todos los campos/i)).toBeInTheDocument();
  });

  test('no muestra error y llama a la API si el formulario está completo', async () => {
    const user = userEvent.setup();
    const mockCarrito = [{ id: 1, nombre: 'Producto Test', precio: 10 }];
    const vaciarCarritoMock = vi.fn();
    api.post.mockResolvedValue({ data: {} }); // Mock de la respuesta de la API

    render(
      <CarritoContext.Provider value={{ carrito: mockCarrito, vaciarCarrito: vaciarCarritoMock }}>
        <Confirmacion />
      </CarritoContext.Provider>
    );

    await user.type(screen.getByLabelText(/Nombre y apellidos/i), 'Cliente de Prueba');
    await user.type(screen.getByLabelText(/Teléfono/i), '123456789');
    await user.type(screen.getByLabelText(/Dirección/i), 'Av. Siempreviva 742');

    await user.click(screen.getByRole('button', { name: /generar vale/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith('/vales/', {
        cliente: {
          nombre: 'Cliente de Prueba',
          telefono: '123456789',
          direccion: 'Av. Siempreviva 742',
        },
        productos: [{ id: 1, nombre: 'Producto Test', precio: 10, cantidad: 1 }],
      });
    });

    expect(screen.queryByText(/Por favor completa todos los campos/i)).not.toBeInTheDocument();
    expect(vaciarCarritoMock).toHaveBeenCalledTimes(1);
    expect(await screen.findByText(/¡Vale generado con éxito!/i)).toBeInTheDocument();
  });
});
