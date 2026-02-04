import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import { pacienteService } from '../../services/authService.js';
import { FiCalendar, FiUser, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

const DashboardPaciente = () => {
  const navigate = useNavigate();
  const { authPaciente, logoutPaciente } = useAuthPaciente();
  const [citas, setCitas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatosPaciente = useCallback(async () => {
    try {
      // Cargar perfil del paciente
      await pacienteService.getPerfil();
      
      // Cargar citas del paciente
      const token = authPaciente?.token;
      const citasResponse = await fetch('http://localhost:4000/api/cita/paciente', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (citasResponse.ok) {
        const citasData = await citasResponse.json();
        const todasLasCitas = citasData.citas || [];
        setCitas(todasLasCitas);
        
        // Filtrar citas completadas para el historial
        const citasCompletadas = todasLasCitas.filter(cita => cita.estado === 'completada');
        setHistorial(citasCompletadas);
      }
    } catch (error) {
      console.error('Error al cargar datos del paciente:', error);
    } finally {
      setLoading(false);
    }
  }, [authPaciente?.token]);

  useEffect(() => {
    cargarDatosPaciente();
  }, [cargarDatosPaciente]);

  const handleLogout = () => {
    logoutPaciente();
    navigate('/');
  };

  const handleAgendarCita = () => {
    // Navegar a página de agendar cita
    navigate('/paciente/agendar-cita');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Portal Paciente</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {authPaciente?.paciente?.nombre} {authPaciente?.paciente?.apellido}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FiLogOut />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {authPaciente?.paciente?.nombre}!
          </h2>
          <p className="text-gray-600">
            Aquí puedes gestionar tus citas y revisar tu historial médico.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FiCalendar className="text-3xl text-blue-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Próxima Cita</p>
                <p className="text-2xl font-bold text-gray-900">
                  {citas.length > 0 ? '1' : '0'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FiFileText className="text-3xl text-green-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Historial Clínico</p>
                <p className="text-2xl font-bold text-gray-900">{historial.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FiUser className="text-3xl text-purple-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Rol</p>
                <p className="text-2xl font-bold text-gray-900">Paciente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleAgendarCita}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FiCalendar />
            <span>Agendar Cita</span>
          </button>
          
          <button
            onClick={() => navigate('/paciente/perfil')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <FiUser />
            <span>Mi Perfil</span>
          </button>

          <button
            onClick={() => navigate('/paciente/citas')}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            <FiCalendar />
            <span>Mis Citas</span>
          </button>

          <button
            onClick={() => navigate('/paciente/historia-clinica')}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            <FiFileText />
            <span>Historial Clínico</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Próxima Cita */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Próxima Cita</h2>
            </div>
            <div className="p-6">
              {citas.length > 0 ? (
                <div className="space-y-4">
                  {citas.map((cita) => (
                    <div key={cita._id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{cita.doctor}</p>
                          <p className="text-sm text-gray-600">{cita.especialidad}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(cita.fecha).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {cita.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No tienes citas programadas
                </p>
              )}
            </div>
          </div>

          {/* Historial Reciente */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Historial Reciente</h2>
            </div>
            <div className="p-6">
              {historial.length > 0 ? (
                <div className="space-y-4">
                  {historial.map((registro) => (
                    <div key={registro._id} className="border-l-4 border-purple-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{registro.tratamiento}</p>
                          <p className="text-sm text-gray-600">{registro.doctor}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(registro.fecha).toLocaleDateString('es-ES')}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{registro.notas}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No hay registros en tu historial
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="bg-white shadow rounded-lg mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Información de Contacto</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{authPaciente?.paciente?.emailPaciente}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Teléfono</p>
                <p className="text-gray-900">{authPaciente?.paciente?.telefono}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Dirección</p>
                <p className="text-gray-900">{authPaciente?.paciente?.direccion || 'No especificada'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                <p className="text-gray-900">
                  {new Date(authPaciente?.paciente?.fechaNacimiento).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPaciente;
