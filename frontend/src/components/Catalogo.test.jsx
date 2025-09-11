import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Catalogo from './Catalogo';
import { CarritoContext } from '../context/CarritoContext';
import { api, getCategorias } from '../services/api';

// Mockeamos el módulo de la API
vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
  },
  getCategorias: vi.fn(),
}));

const mockCategorias = [
  { id: 1, nombre: 'Electrónica' },
  { id: 2, nombre: 'Ropa' },
];

const mockProductos = [
  { id: 101, nombre: 'Laptop', precio: 1200, categoria: 1 },
  { id: 102, nombre: 'Mouse', precio: 25, categoria: 1 },
];

const mockProductosRopa = [
  { id: 201, nombre: 'Camiseta', precio: 20, categoria: 2 },
];

describe('Catalogo', () => {
  let agregarProductoMock;

  beforeEach(() => {
    // Reseteamos los mocks antes de cada test
    vi.clearAllMocks();
    agregarProductoMock = vi.fn();

    // Mocks exitosos por defecto
    getCategorias.mockResolvedValue({ data: mockCategorias });
    api.get.mockResolvedValue({ data: mockProductos });
  });

  const renderComponent = () => {
    return render(
      <CarritoContext.Provider value={{ agregarProducto: agregarProductoMock }}>
        <Catalogo />
      </CarritoContext.Provider>
    );
  };

  test('muestra el estado de carga inicialmente', () => {
    renderComponent();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('muestra los productos después de una carga exitosa', async () => {
    renderComponent();

    // Esperamos a que la carga termine
    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
    });

    // Verificamos que los productos se rendericen
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Mouse')).toBeInTheDocument();
    expect(screen.getByText(/1200/)).toBeInTheDocument();
    expect(screen.getByText(/25/)).toBeInTheDocument();
  });

  test('muestra un mensaje de error si la carga de productos falla', async () => {
    // Sobrescribimos el mock para este test específico
    api.get.mockRejectedValue(new Error('Network Error'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No se pudieron cargar los productos.')).toBeInTheDocument();
    });
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
  });

  test('muestra un mensaje de error si la carga de categorías falla', async () => {
    // Sobrescribimos el mock para este test específico
    getCategorias.mockRejectedValue(new Error('Network Error'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No se pudieron cargar las categorías.')).toBeInTheDocument();
    });
  });

  test('filtra los productos por categoría', async () => {
    renderComponent();
    await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument());

    // Mockeamos la llamada a la API para la nueva categoría
    api.get.mockResolvedValue({ data: mockProductosRopa });

    // El usuario selecciona una categoría
    const categoriaSelect = screen.getByLabelText('Categoría:');
    await userEvent.selectOptions(categoriaSelect, 'Ropa');

    // Esperamos a que los nuevos productos se muestren
    await waitFor(() => {
      expect(screen.getByText('Camiseta')).toBeInTheDocument();
    });

    // Verificamos que los productos antiguos ya no están
    expect(screen.queryByText('Laptop')).not.toBeInTheDocument();

    // Verificamos que la API fue llamada con los parámetros correctos
    expect(api.get).toHaveBeenLastCalledWith('/productos/', {
      params: {
        ordering: 'precio', // orden por defecto
        categorias: '2', // id de 'Ropa'
      },
    });
  });

  test('ordena los productos por nombre', async () => {
    const productosOrdenadosPorNombre = [...mockProductos].sort((a, b) => a.nombre.localeCompare(b.nombre));
    // Hacemos un reset del mock de api.get para este test específico
    // para asegurar que no dependemos del estado de `beforeEach` y tener una secuencia predecible.
    api.get.mockReset()
      .mockResolvedValueOnce({ data: mockProductos }) // Carga inicial
      .mockResolvedValueOnce({ data: productosOrdenadosPorNombre }); // Carga ordenada

    renderComponent();
    await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument());

    // El usuario selecciona ordenar por nombre
    const ordenSelect = screen.getByLabelText(/Ordenar por:/);
    await userEvent.selectOptions(ordenSelect, 'nombre');

    await waitFor(() => {
      // Verificamos que la API fue llamada con el nuevo orden
      expect(api.get).toHaveBeenLastCalledWith('/productos/', {
        params: {
          ordering: 'nombre',
        },
      });
    });
    
    // También podemos verificar el orden de los elementos en el DOM
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Laptop'); // Laptop va antes que Mouse alfabéticamente
    expect(items[1]).toHaveTextContent('Mouse');
  });

  test('llama a agregarProducto cuando se hace clic en el botón "Agregar al carrito"', async () => {
    renderComponent();
    await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument());

    // Encontramos el botón "Agregar al carrito" para el primer producto
    const botonesAgregar = screen.getAllByText('Agregar al carrito');
    await userEvent.click(botonesAgregar[0]);

    // Verificamos que la función del contexto fue llamada con el producto correcto
    expect(agregarProductoMock).toHaveBeenCalledTimes(1);
    expect(agregarProductoMock).toHaveBeenCalledWith(mockProductos[0]);
  });

  test('muestra un mensaje cuando no hay productos', async () => {
    api.get.mockResolvedValue({ data: [] });
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('No hay productos para mostrar')).toBeInTheDocument();
    });
  });
});