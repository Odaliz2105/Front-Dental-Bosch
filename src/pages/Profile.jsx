// Front-Dental-Bosch/src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardPassword from "../components/profile/CardPassword";
import { CardProfile } from "../components/profile/CardProfile";
import FormProfile from "../components/profile/FormProfile";

const Profile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos del perfil al cargar
  useEffect(() => {
    obtenerPerfil();
  }, []);

  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/doctor/perfil`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDoctor(data);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      if (error.response?.status === 401) {
        // Token inválido o expirado
        handleCerrarSesion();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarSesion = () => {
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('doctor');
    
    // Redirigir al login
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP BAR */}
      <header className="bg-[#f47cc6] shadow">
        <nav className="bg-[#f47cc6] text-white px-6 py-4 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* LOGO */}
            <h1 className="text-2xl font-bold">Dental Bosch</h1>

            {/* LINKS */}
            <ul className="hidden md:flex space-x-6 text-lg">
              <li className="hover:text-gray-200 cursor-pointer">Perfil</li>
              <li className="hover:text-gray-200 cursor-pointer">Citas</li>
              <li className="hover:text-gray-200 cursor-pointer">Historias Clínicas</li>
              <li className="hover:text-gray-200 cursor-pointer">Inventario</li>
            </ul>

            {/* BOTÓN CERRAR SESIÓN */}
            <button 
              onClick={handleCerrarSesion}
              className="bg-white text-[#f47cc6] font-semibold px-4 py-2 rounded-md hover:bg-pink-100 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
        {/* PANEL DATOS GENERALES */}
        <div className="shadow-xl bg-white border rounded-lg">
          {/* TÍTULO DEL PANEL */}
          <div className="bg-[#f47cc6] text-white px-4 py-2 rounded-t-lg font-semibold">
            Datos generales
          </div>

          {/* CONTENIDO */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FOTO */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                  className="rounded border border-gray-300 shadow"
                  width={130}
                  alt="foto"
                />
                <label className="absolute bottom-1 right-1 bg-[#f47cc6] text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-[#d969ae] shadow">
                  📷
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* INFORMACIÓN GENERAL */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Nombre:</p>
                <p className="text-gray-600">{doctor?.nombre || '—'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Apellido:</p>
                <p className="text-gray-600">{doctor?.apellido || '—'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Dirección:</p>
                <p className="text-gray-600">{doctor?.direccion || '—'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Teléfono:</p>
                <p className="text-gray-600">{doctor?.telefono || '—'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Correo:</p>
                <p className="text-gray-600">{doctor?.email || '—'}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Especialidad:</p>
                <p className="text-gray-600">{doctor?.especialidad || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL FORMULARIO */}
        <div className="shadow-xl bg-white border rounded-lg">
          <div className="bg-[#f47cc6] text-white px-4 py-2 rounded-t-lg font-semibold">
            Actualizar información
          </div>

          <div className="p-6">
            <FormProfile doctor={doctor} onActualizar={obtenerPerfil} />
          </div>
        </div>

        {/* PANEL CONTRASEÑA */}
        <div>
          <div className="shadow-xl bg-white border rounded-lg">
            <div className="bg-[#f47cc6] text-white px-4 py-2 rounded-t-lg font-semibold">
              Seguridad y contraseña
            </div>

            <div className="p-6">
              <CardPassword />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#f47cc6] text-white text-center py-8 md:py-10 px-4">
        <h3 className="text-lg md:text-xl font-bold">Dental Bosch</h3>
        <p className="mt-2 text-sm md:text-base">Horarios: Lunes a Sábado 8:00 - 18:00</p>
        <p className="mt-1 text-sm md:text-base">Teléfono: 0987654321</p>
        <p className="mt-1 text-sm md:text-base">Ubicación: Quito - Ecuador</p>
        <p className="mt-4 text-xs md:text-sm">©️ 2025 Dental Bosch - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Profile;