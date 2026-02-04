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
import DetallePacienteDoctor from './pages/doctor/DetallePaciente';
import Inventario from './pages/doctor/Inventario';
import DoctorLayout from './components/doctor/DoctorLayout.jsx';

// Páginas Paciente
import LoginPaciente from './pages/paciente/LoginPaciente';
import DashboardPaciente from './pages/paciente/DashboardPaciente';
import PerfilPaciente from './pages/paciente/PerfilPaciente';
import AgendarCita from './pages/paciente/AgendarCita';
import DetallePaciente from './pages/paciente/DetallePaciente';
import CitasPaciente from './pages/paciente/CitasPaciente';
import HistoriaClinica from './pages/paciente/HistoriaClinica';
import PacienteLayout from './components/paciente/PacienteLayout';

// Rutas protegidas Doctor
const ProtectedDoctorRoute = ({ children }) => {
  const { authDoctor, loading } = useAuthDoctor();
  
  console.log('ProtectedDoctorRoute - authDoctor:', authDoctor);
  console.log('ProtectedDoctorRoute - loading:', loading);
  console.log('ProtectedDoctorRoute - current path:', window.location.pathname);
  
  if (loading) {
    console.log('ProtectedDoctorRoute - Mostrando loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!authDoctor?.token) {
    console.log('ProtectedDoctorRoute - No hay token, redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('ProtectedDoctorRoute - Token válido, renderizando children');
  return children;
};

// Rutas protegidas Paciente
const ProtectedPacienteRoute = ({ children }) => {
  const { authPaciente, loading } = useAuthPaciente();
  
  console.log('🔍 ProtectedPacienteRoute - authPaciente:', authPaciente);
  console.log('🔍 ProtectedPacienteRoute - loading:', loading);
  
  if (loading) {
    console.log('⏳ ProtectedPacienteRoute - Mostrando loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!authPaciente?.token || authPaciente.paciente?.rol !== 'paciente') {
    console.log('❌ ProtectedPacienteRoute - No autenticado, redirigiendo a login');
    console.log('❌ Token:', authPaciente?.token);
    console.log('❌ Rol:', authPaciente?.paciente?.rol);
    return <Navigate to="/paciente/login" replace />;
  }
  
  console.log('✅ ProtectedPacienteRoute - Autenticado correctamente');
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
          
          <Route path="/doctor/pacientes/crear" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<CrearPaciente />} />
          </Route>
          
          <Route path="/doctor/pacientes/actualizar/:id" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<ActualizarPaciente />} />
          </Route>
          
          <Route path="/doctor/pacientes/detalle/:id" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<DetallePacienteDoctor />} />
          </Route>
          
          <Route path="/inventario" element={
            <ProtectedDoctorRoute>
              <DoctorLayout />
            </ProtectedDoctorRoute>
          }>
            <Route index element={<Inventario />} />
          </Route>

          {/* Rutas Paciente con Layout */}
          <Route path="/dashboard-paciente" element={
            <ProtectedPacienteRoute>
              <PacienteLayout />
            </ProtectedPacienteRoute>
          }>
            <Route index element={<DashboardPaciente />} />
          </Route>
          
          <Route
            path="/paciente/perfil"
            element={
              <ProtectedPacienteRoute>
                <PacienteLayout />
              </ProtectedPacienteRoute>
            }
          >
            <Route index element={<PerfilPaciente />} />
          </Route>
          
          <Route
            path="/paciente/agendar-cita"
            element={
              <ProtectedPacienteRoute>
                <PacienteLayout />
              </ProtectedPacienteRoute>
            }
          >
            <Route index element={<AgendarCita />} />
          </Route>
          
          <Route
            path="/paciente/citas"
            element={
              <ProtectedPacienteRoute>
                <PacienteLayout />
              </ProtectedPacienteRoute>
            }
          >
            <Route index element={<CitasPaciente />} />
          </Route>
          
          <Route
            path="/paciente/historia-clinica"
            element={
              <ProtectedPacienteRoute>
                <PacienteLayout />
              </ProtectedPacienteRoute>
            }
          >
            <Route index element={<HistoriaClinica />} />
          </Route>
          
          <Route
            path="/paciente/detalle/:id"
            element={
              <ProtectedPacienteRoute>
                <PacienteLayout />
              </ProtectedPacienteRoute>
            }
          >
            <Route index element={<DetallePaciente />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
