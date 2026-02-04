import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import { pacienteService, citasService } from '../../services/authService.js';
import { FiCalendar, FiUser, FiFileText, FiPlus, FiClock } from 'react-icons/fi';

const DashboardPaciente = () => {
  const navigate = useNavigate();
  const { authPaciente } = useAuthPaciente();
  const [citas, setCitas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatosPaciente = useCallback(async () => {
    try {
      console.log('🔄 Dashboard - Cargando datos del paciente...');
      
      // Cargar perfil del paciente
      await pacienteService.getPerfil();
      
      // Cargar citas del paciente usando el servicio
      const citasData = await citasService.listarCitasPaciente();
      console.log('📅 Dashboard - Citas cargadas:', citasData);
      
      const todasLasCitas = citasData.citas || [];
      setCitas(todasLasCitas);
      
      // Filtrar citas completadas para el historial
      const citasCompletadas = todasLasCitas.filter(cita => cita.estado === 'completada');
      setHistorial(citasCompletadas);
      
      console.log('📊 Dashboard - Datos cargados exitosamente');
    } catch (error) {
      console.error('❌ Dashboard - Error al cargar datos del paciente:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatosPaciente();
  }, [cargarDatosPaciente]);

  const handleAgendarCita = () => {
    navigate('/paciente/agendar-cita');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  // Obtener próximas citas (no canceladas ni completadas)
  const proximasCitas = citas.filter(cita => 
    cita.estado === 'pendiente' || cita.estado === 'confirmada'
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, {authPaciente?.paciente?.nombre}!
        </h1>
        <p className="text-gray-600">
          Aquí puedes gestionar tus citas y revisar tu historial médico.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiCalendar className="text-3xl text-pink-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Próximas Citas</p>
              <p className="text-2xl font-bold text-gray-900">
                {proximasCitas.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiClock className="text-3xl text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Total Citas</p>
              <p className="text-2xl font-bold text-gray-900">{citas.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiFileText className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Historial Clínico</p>
              <p className="text-2xl font-bold text-gray-900">{historial.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiUser className="text-3xl text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="text-2xl font-bold text-gray-900">Activo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleAgendarCita}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <FiPlus />
            <span>Agendar Cita</span>
          </button>
          
          <button
            onClick={() => navigate('/paciente/citas')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiCalendar />
            <span>Mis Citas</span>
          </button>

          <button
            onClick={() => navigate('/paciente/historia-clinica')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FiFileText />
            <span>Historial Clínico</span>
          </button>

          <button
            onClick={() => navigate('/paciente/perfil')}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FiUser />
            <span>Mi Perfil</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próxima Cita */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Próxima Cita</h2>
          </div>
          <div className="p-6">
            {proximasCitas.length > 0 ? (
              <div className="space-y-4">
                {proximasCitas.slice(0, 3).map((cita) => (
                  <div key={cita._id} className="border-l-4 border-pink-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          Dr. {cita.doctor?.nombre || 'No asignado'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cita.doctor?.especialidad || 'Odontología General'}
                        </p>
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
                        <p className="text-sm text-gray-600 mt-1">
                          {cita.motivo || 'Consulta general'}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {cita.estado}
                      </span>
                    </div>
                  </div>
                ))}
                {proximasCitas.length > 3 && (
                  <button
                    onClick={() => navigate('/paciente/citas')}
                    className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                  >
                    Ver todas las citas →
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes próximas citas</h3>
                <p className="mt-1 text-sm text-gray-500">Agenda una cita para comenzar</p>
                <div className="mt-6">
                  <button
                    onClick={handleAgendarCita}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                  >
                    <FiPlus className="mr-2" />
                    Agendar Cita
                  </button>
                </div>
              </div>
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
                {historial.slice(0, 3).map((registro) => (
                  <div key={registro._id} className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">
                          {registro.motivo || 'Consulta general'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Dr. {registro.doctor?.nombre || 'No especificado'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(registro.fecha).toLocaleDateString('es-ES')}
                        </p>
                        {registro.notas && (
                          <p className="text-sm text-gray-600 mt-1">{registro.notas}</p>
                        )}
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Completada
                      </span>
                    </div>
                  </div>
                ))}
                {historial.length > 3 && (
                  <button
                    onClick={() => navigate('/paciente/historia-clinica')}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Ver todo el historial →
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay historial</h3>
                <p className="mt-1 text-sm text-gray-500">Tu historial aparecerá después de tus consultas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPaciente;
