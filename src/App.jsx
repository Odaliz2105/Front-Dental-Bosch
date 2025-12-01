// Front-Dental-Bosch/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/storeAuth';

// Importaciones SIN llaves (export default)
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Login from './pages/Login';
import CrearCuenta from './pages/CrearCuenta';
import RecuperarPassword from './pages/RecuperarPassword';
import ConfirmarEmail from './pages/ConfirmarEmail';
import NuevoPassword from './pages/NuevoPassword';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="/confirmar/:token" element={<ConfirmarEmail />} />
          <Route path="/nuevo-password/:token" element={<NuevoPassword />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;