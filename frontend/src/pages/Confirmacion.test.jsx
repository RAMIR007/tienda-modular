import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CarritoContext } from '../context/CarritoContext';
import Confirmacion from './Confirmacion';

describe('Confirmacion', () => {
  // Limpiar mocks después de cada test para evitar interferencias
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('bloquea envío si faltan datos del cliente', async () => {
    const user = userEvent.setup();
    render(
      <CarritoContext.Provider value={{ carrito: [] }}>
        <Confirmacion />
      </CarritoContext.Provider>
    );

    // El usuario hace clic en "Generar vale" sin rellenar los campos
    await user.click(screen.getByRole('button', { name: /generar vale/i }));

    // Debería mostrarse un mensaje de error
    expect(await screen.findByText(/Por favor completa todos los campos/i)).toBeInTheDocument();
  });

  test('no muestra error y registra los datos si el formulario está completo', async () => {
    const user = userEvent.setup();
    const mockCarrito = [{ id: 1, nombre: 'Producto Test', precio: 10 }];
    // Mock de console.log para verificar que se llama
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <CarritoContext.Provider value={{ carrito: mockCarrito }}>
        <Confirmacion />
      </CarritoContext.Provider>
    );

    // Rellenar el formulario
    await user.type(screen.getByLabelText(/Nombre y apellidos/i), 'Cliente de Prueba');
    await user.type(screen.getByLabelText(/Teléfono/i), '123456789');
    await user.type(screen.getByLabelText(/Dirección/i), 'Av. Siempreviva 742');

    // El usuario hace clic en "Generar vale"
    await user.click(screen.getByRole('button', { name: /generar vale/i }));

    // No debería mostrarse el mensaje de error
    expect(screen.queryByText(/Por favor completa todos los campos/i)).not.toBeInTheDocument();

    // Verificar que console.log fue llamado con los datos correctos
    expect(consoleLogSpy).toHaveBeenCalledWith('Enviar al backend:', {
      cliente: {
        nombre: 'Cliente de Prueba',
        telefono: '123456789',
        direccion: 'Av. Siempreviva 742',
      },
      productos: mockCarrito,
    });
  });
});