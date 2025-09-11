import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import { CarritoProvider } from '../context/CarritoContext';
import { api, getCategorias } from '../services/api';

// Mockeamos el módulo de la API
vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(), // Mockeamos post también
  },
  getCategorias: vi.fn(),
}));

const mockCategorias = [{ id: 1, nombre: 'Ropa' }];
const mockProductos = [{ id: 201, nombre: 'Camisa', precio: 20, categoria: 1 }];

describe('Flujo de compra', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getCategorias.mockResolvedValue({ data: mockCategorias });
    api.get.mockResolvedValue({ data: mockProductos });
    api.post.mockResolvedValue({ data: { message: 'Vale creado' } }); // Mock de post
  });

  const renderApp = () => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </MemoryRouter>
    );
  };

  test('un usuario puede agregar un producto, confirmar y generar un vale', async () => {
    const user = userEvent.setup();
    renderApp();

    // 1. Esperar a que cargue el producto "Camisa"
    expect(await screen.findByText('Camisa')).toBeInTheDocument();

    // 2. Agregar el producto al carrito
    const botonAgregar = screen.getByText('Agregar al carrito');
    await user.click(botonAgregar);

    // 3. Ir a la página de confirmación
    const botonConfirmar = screen.getByText('Confirmar compra');
    await user.click(botonConfirmar);

    // 4. Rellenar el formulario
    await user.type(screen.getByLabelText(/Nombre/i), 'Ramiro');
    await user.type(screen.getByLabelText(/Teléfono/i), '555-1234');
    await user.type(screen.getByLabelText(/Dirección/i), 'La Habana');

    // 5. Enviar el formulario
    const botonGenerarVale = screen.getByText('Generar vale');
    await user.click(botonGenerarVale);

    // 6. Verificar que se llamó a la API para crear el vale
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith('/vales/', {
        cliente: {
          nombre: 'Ramiro',
          telefono: '555-1234',
          direccion: 'La Habana',
        },
        productos: [{ ...mockProductos[0], cantidad: 1 }],
      });
    });
  });
});