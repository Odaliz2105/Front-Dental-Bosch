import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { citasService } from '../../services/authService.js';
import { FiCalendar, FiClock, FiUser, FiPlus, FiX, FiStar, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CitasPaciente = () => {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState('');

  const cargarCitas = useCallback(async () => {
    try {
      console.log('🔄 Citas - Cargando citas del paciente...');
      
      const data = await citasService.listarCitasPaciente();
      console.log('📅 Citas - Datos recibidos:', data);
      
      setCitas(data.citas || []);
    } catch (error) {
      console.error('❌ Citas - Error al cargar citas:', error);
      toast.error('Error de conexión al cargar citas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarCitas();
  }, [cargarCitas]);

  const handleCancelarCita = async () => {
    if (!selectedCita) return;

    try {
      console.log('❌ Citas - Cancelando cita:', selectedCita._id);
      
      await citasService.cancelarCita(selectedCita._id);
      
      toast.success('Cita cancelada exitosamente');
      setShowCancelModal(false);
      setSelectedCita(null);
      cargarCitas();
    } catch (error) {
      console.error('❌ Citas - Error al cancelar cita:', error);
      toast.error('Error al cancelar la cita');
    }
  };

  const handleCalificarCita = async () => {
    if (!selectedCita || rating === 0) {
      toast.error('Por favor selecciona una calificación');
      return;
    }

    try {
      console.log('⭐ Citas - Calificando cita:', selectedCita._id);
      
      await citasService.calificarCita(selectedCita._id, { calificacion: rating, comentario });
      
      toast.success('Cita calificada exitosamente');
      setShowRatingModal(false);
      setSelectedCita(null);
      setRating(0);
      setComentario('');
      cargarCitas();
    } catch (error) {
      console.error('❌ Citas - Error al calificar cita:', error);
      toast.error('Error al calificar la cita');
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      case 'completada':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const openCancelModal = (cita) => {
    setSelectedCita(cita);
    setShowCancelModal(true);
  };

  const openRatingModal = (cita) => {
    setSelectedCita(cita);
    setShowRatingModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Citas</h1>
          <p className="text-gray-600 mt-1">Gestiona tus citas médicas</p>
        </div>
        <button
          onClick={() => navigate('/paciente/agendar-cita')}
          className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          <FiPlus />
          <span>Nueva Cita</span>
        </button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiCalendar className="text-3xl text-pink-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Total Citas</p>
              <p className="text-2xl font-bold text-gray-900">{citas.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiClock className="text-3xl text-yellow-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {citas.filter(c => c.estado === 'pendiente' || c.estado === 'confirmada').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiAlertCircle className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Completadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {citas.filter(c => c.estado === 'completada').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiX className="text-3xl text-red-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Canceladas</p>
              <p className="text-2xl font-bold text-gray-900">
                {citas.filter(c => c.estado === 'cancelada').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Citas */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Historial de Citas</h2>
        </div>
        
        <div className="overflow-x-auto">
          {citas.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {citas.map((cita) => (
                  <tr key={cita._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(cita.fecha).toLocaleDateString('es-ES')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(cita.fecha).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {cita.doctor?.nombre || 'Dr. Asignado'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cita.doctor?.especialidad || 'Odontología General'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cita.motivo || 'Consulta general'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(cita.estado)}`}>
                        {cita.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {(cita.estado === 'pendiente' || cita.estado === 'confirmada') && (
                          <button
                            onClick={() => openCancelModal(cita)}
                            className="text-red-600 hover:text-red-900"
                            title="Cancelar cita"
                          >
                            <FiX />
                          </button>
                        )}
                        {cita.estado === 'completada' && !cita.calificacion && (
                          <button
                            onClick={() => openRatingModal(cita)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Calificar cita"
                          >
                            <FiStar />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes citas</h3>
              <p className="mt-1 text-sm text-gray-500">Agenda tu primera cita para comenzar</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/paciente/agendar-cita')}
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

      {/* Modal Cancelar Cita */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Cancelar Cita</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  ¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleCancelarCita}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-700"
                >
                  Sí
                </button>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedCita(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-24 hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Calificar Cita */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Calificar Cita</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  Califica tu experiencia en la cita
                </p>
                
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl"
                    >
                      <FiStar
                        className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
                
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Deja un comentario (opcional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  rows="3"
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleCalificarCita}
                  className="px-4 py-2 bg-pink-600 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-pink-700"
                >
                  Enviar
                </button>
                <button
                  onClick={() => {
                    setShowRatingModal(false);
                    setSelectedCita(null);
                    setRating(0);
                    setComentario('');
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-24 hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitasPaciente;
