import React, { useState, useEffect, useCallback } from 'react';
import { citasService } from '../../services/authService.js';
import { FiFileText, FiCalendar, FiUser, FiSearch, FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';

const HistoriaClinica = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const cargarHistorial = useCallback(async () => {
    try {
      console.log('🔄 Historia - Cargando historial clínico...');
      
      // Como no hay endpoint específico para historia clínica, 
      // usamos las citas completadas como historial
      const data = await citasService.listarCitasPaciente();
      console.log('📅 Historia - Citas recibidas:', data);
      
      // Filtramos solo las citas completadas para mostrar como historial
      const citasCompletadas = (data.citas || []).filter(cita => cita.estado === 'completada');
      setHistorial(citasCompletadas);
      
      console.log('📊 Historia - Historial clínico cargado:', citasCompletadas.length, 'citas');
    } catch (error) {
      console.error('❌ Historia - Error al cargar historial:', error);
      toast.error('Error de conexión al cargar historial');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

  const filteredHistorial = historial.filter(item => {
    const matchesSearch = item.motivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.doctor?.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear ? new Date(item.fecha).getFullYear().toString() === filterYear : true;
    
    return matchesSearch && matchesYear;
  });

  const getAvailableYears = () => {
    const years = [...new Set(historial.map(item => new Date(item.fecha).getFullYear()))];
    return years.sort((a, b) => b - a);
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Historia Clínica</h1>
        <p className="text-gray-600 mt-1">Tu historial médico y tratamientos realizados</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiFileText className="text-3xl text-pink-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Total Consultas</p>
              <p className="text-2xl font-bold text-gray-900">{historial.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiCalendar className="text-3xl text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Última Visita</p>
              <p className="text-lg font-bold text-gray-900">
                {historial.length > 0 
                  ? new Date(Math.max(...historial.map(h => new Date(h.fecha)))).toLocaleDateString('es-ES')
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiUser className="text-3xl text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Doctores Visitados</p>
              <p className="text-2xl font-bold text-gray-900">
                {[...new Set(historial.map(h => h.doctor?.nombre))].filter(Boolean).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por tratamiento o doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 appearance-none"
              >
                <option value="">Todos los años</option>
                {getAvailableYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Historial Clínico */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Registros Clínicos ({filteredHistorial.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredHistorial.length > 0 ? (
            filteredHistorial.map((registro) => (
              <div key={registro._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FiCalendar className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(registro.fecha).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {new Date(registro.fecha).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <FiUser className="text-gray-400 mr-2" />
                      <div>
                        <span className="font-medium text-gray-900">
                          Dr. {registro.doctor?.nombre || 'No especificado'}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {registro.doctor?.especialidad || 'Odontología General'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Tratamiento Realizado</h4>
                      <p className="text-gray-700 mb-3">
                        {registro.motivo || 'Consulta general'}
                      </p>
                      
                      {registro.notas && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Notas del Doctor</h5>
                          <p className="text-gray-600 text-sm">{registro.notas}</p>
                        </div>
                      )}
                      
                      {registro.calificacion && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Calificación:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`text-sm ${
                                    i < registro.calificacion
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            {registro.comentario && (
                              <span className="text-sm text-gray-600 ml-2">
                                "{registro.comentario}"
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completada
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm || filterYear ? 'No se encontraron registros' : 'No tienes historial clínico'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterYear 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'Tu historial aparecerá aquí después de tus primeras consultas'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen Anual */}
      {historial.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Resumen por Año</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getAvailableYears().map(year => {
                const yearData = historial.filter(h => 
                  new Date(h.fecha).getFullYear() === year
                );
                return (
                  <div key={year} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{year}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultas:</span>
                        <span className="font-medium">{yearData.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doctores:</span>
                        <span className="font-medium">
                          {[...new Set(yearData.map(h => h.doctor?.nombre))].filter(Boolean).length}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoriaClinica;
