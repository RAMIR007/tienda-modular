import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CarritoProvider } from './context/CarritoContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< Updated upstream
    <App />
  </StrictMode>,
)
=======
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </StrictMode>
);
>>>>>>> Stashed changes
