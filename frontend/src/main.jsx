import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // <--- Add this import!
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// Note: BrowserRouter is now handled only in main.jsx, not App.jsx
// So, the BrowserRouter import and usage here is correct as per our previous fix.
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);