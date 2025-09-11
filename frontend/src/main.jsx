import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CarritoProvider } from './context/CarritoContext';

<<<<<<< HEAD
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
=======
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>
);
>>>>>>> eff8e9064fd1bea9b5df1b87686f8f8b6f24448a
