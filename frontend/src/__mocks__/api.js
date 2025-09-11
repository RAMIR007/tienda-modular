export const api = {
  get: jest.fn((url) => {
    if (url === "/productos/") {
      return Promise.resolve({
        data: [
          { id: 1, nombre: "Camisa", precio: 15.0 },
          { id: 2, nombre: "Zapatos", precio: 30.0 },
        ],
      });
    }
    if (url === "/categorias/") {
      return Promise.resolve({
        data: [{ id: 1, nombre: "Ropa" }],
      });
    }
  }),
  post: jest.fn((url, data) => {
    if (url === "/vale/") {
      return Promise.resolve({
        data: new Blob(["PDF generado"]),
      });
    }
  }),
};
