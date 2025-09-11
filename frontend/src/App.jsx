import { Route, Routes } from 'react-router-dom';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Confirmacion from './pages/Confirmacion';

function App() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Tienda</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carrito />
              <Catalogo />
            </>
          }
        />
        <Route
          path="/confirmar"
          element={
            <>
              <Carrito />
              <Confirmacion />
            </>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
