// Front-Dental-Bosch/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthDoctorProvider, useAuthDoctor } from './context/storeAuth.jsx';
import { AuthPacienteProvider, useAuthPaciente } from './context/storeAuthPaciente.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header.jsx';

// Páginas públicas
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Login from './pages/Login';
import CrearCuenta from './pages/CrearCuenta';
import RecuperarPassword from './pages/RecuperarPassword';
import ConfirmarEmail from './pages/ConfirmarEmail';
import NuevoPassword from './pages/NuevoPassword';
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';

// Páginas Doctor
import Profile from './pages/Profile';
import DashboardDoctor from './pages/doctor/DashboardDoctor';
import GestionCitas from './pages/doctor/GestionCitas';
import ListarPacientes from './pages/doctor/ListarPacientes';
import CrearPaciente from './pages/doctor/CrearPaciente';
import ActualizarPaciente from './pages/doctor/ActualizarPaciente';
import Inventario from './pages/doctor/Inventario';
import DoctorLayout from './components/doctor/DoctorLayout.jsx';

// Páginas Paciente
import LoginPaciente from './pages/paciente/LoginPaciente';
import DashboardPaciente from './pages/paciente/DashboardPaciente';
import PerfilPaciente from './pages/paciente/PerfilPaciente';
import AgendarCita from './pages/paciente/AgendarCita';
import DetallePaciente from './pages/paciente/DetallePaciente';

// Rutas protegidas Doctor
const ProtectedDoctorRoute = ({ children }) => {
  const { authDoctor, loading } = useAuthDoctor();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!authDoctor?.token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Rutas protegidas Paciente
const ProtectedPacienteRoute = ({ children }) => {
  const { authPaciente, loading } = useAuthPaciente();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!authPaciente?.token || authPaciente.paciente?.rol !== 'paciente') {
    return <Navigate to="/paciente/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      <AuthDoctorProvider>
        <AuthPacienteProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthPacienteProvider>
      </AuthDoctorProvider>

      {/* Toast global */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="light"
      />
    </div>
  );
}

const AppContent = () => {
  const { authDoctor } = useAuthDoctor();
  const { authPaciente } = useAuthPaciente();

  // 👉 SOLO aplicar padding si hay sesión
  const isAuthenticated = authDoctor?.token || authPaciente?.token;

  return (
    <>
      <Header />

      <main className={isAuthenticated ? 'pt-[96px] md:pt-[110px]' : ''}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="/confirmar/:token" element={<ConfirmarEmail />} />
          <Route path="/nuevo-password/:token" element={<NuevoPassword />} />
          <Route path="/auth/google-success" element={<GoogleAuthSuccess />} />
          <Route path="/paciente/login" element={<LoginPaciente />} />

          {/* Rutas Doctor con Layout */}
          <Route path="/dashboard-doctor" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<DashboardDoctor />} />
          </Route>
          
          <Route path="/perfil" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<Profile />} />
          </Route>
          
          <Route path="/doctor/citas" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<GestionCitas />} />
          </Route>
          
          <Route path="/doctor/pacientes" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<ListarPacientes />} />
          </Route>
          
          <Route path="/crear-paciente" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<CrearPaciente />} />
          </Route>
          
          <Route path="/paciente/actualizar/:id" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<ActualizarPaciente />} />
          </Route>
          
          <Route path="/inventario" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<Inventario />} />
          </Route>

          {/* Rutas Paciente */}
          <Route
            path="/paciente/perfil"
            element={
              <ProtectedPacienteRoute>
                <PerfilPaciente />
              </ProtectedPacienteRoute>
            }
          />
          <Route
            path="/paciente/agendar-cita"
            element={
              <ProtectedPacienteRoute>
                <AgendarCita />
              </ProtectedPacienteRoute>
            }
          />
          <Route
            path="/dashboard-paciente"
            element={
              <ProtectedPacienteRoute>
                <DashboardPaciente />
              </ProtectedPacienteRoute>
            }
          />
          <Route
            path="/paciente/detalle/:id"
            element={
              <ProtectedPacienteRoute>
                <DetallePaciente />
              </ProtectedPacienteRoute>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
