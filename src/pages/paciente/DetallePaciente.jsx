import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import axios from 'axios';

const DetallePaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authPaciente } = useAuthPaciente();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPacienteDetalle = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paciente/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${authPaciente?.token || localStorage.getItem('tokenPaciente')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setPaciente(data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener detalle del paciente:', error);
      setError(error.response?.data?.msg || 'Error al cargar los detalles del paciente');
      setLoading(false);
      
      if (error.response?.status === 401) {
        toast.error('Sesión expirada. Inicia sesión nuevamente.');
        navigate('/paciente/login');
      } else if (error.response?.status === 403) {
        toast.error('No tienes permisos para ver este paciente.');
      } else if (error.response?.status === 404) {
        toast.error('Paciente no encontrado.');
        navigate('/paciente/perfil');
      }
    }
  };

  useEffect(() => {
    fetchPacienteDetalle();
  }, [id]);

  const handleVolver = () => {
    if (authPaciente?.paciente) {
      navigate('/paciente/perfil');
    } else {
      navigate('/doctor/pacientes');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleVolver}
            className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-600">No se encontraron detalles del paciente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Detalles del Paciente</h1>
            <button
              onClick={handleVolver}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              Volver
            </button>
          </div>
        </div>

        {/* Información del Paciente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Información Personal</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nombre Completo</p>
                  <p className="font-medium text-gray-800">
                    {paciente.nombre} {paciente.apellido}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Cédula</p>
                  <p className="font-medium text-gray-800">{paciente.cedula}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{paciente.emailPaciente}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium text-gray-800">
                    {paciente.telefono || 'No especificado'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="font-medium text-gray-800">
                    {paciente.direccion || 'No especificada'}
                  </p>
                </div>
              </div>
            </div>

            {/* Estado y Fechas */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Estado y Fechas</h2>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Estado Actual</p>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    paciente.estadoPaciente
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {paciente.estadoPaciente ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Fecha de Registro</p>
                  <p className="font-medium text-gray-800">
                    {new Date(paciente.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Última Actualización</p>
                  <p className="font-medium text-gray-800">
                    {new Date(paciente.updatedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          {paciente.notas && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Notas Adicionales</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {paciente.notas}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallePaciente;
