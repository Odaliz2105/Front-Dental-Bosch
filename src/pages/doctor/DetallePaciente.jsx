import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pacienteDoctorService } from '../../services/authService.js';
import { Button, Card, Loading } from '../../components/ui/index.js';
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';

const DetallePaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPaciente = async () => {
    try {
      setLoading(true);
      
      // Obtener todos los pacientes y buscar el específico
      const pacientes = await pacienteDoctorService.listarPacientes();
      const pacienteEncontrado = pacientes.find(p => p._id === id);
      
      if (!pacienteEncontrado) {
        throw new Error('Paciente no encontrado');
      }

      setPaciente(pacienteEncontrado);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener paciente:', error);
      toast.error(error.response?.data?.msg || 'Error al cargar el paciente');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaciente();
  }, [id]);

  const handleVolver = () => {
    navigate('/doctor/pacientes');
  };

  const handleEditar = () => {
    navigate(`/doctor/pacientes/actualizar/${id}`);
  };

  if (loading) {
    return <Loading size="lg" text="Cargando paciente..." />;
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-600">Paciente no encontrado</p>
          <Button onClick={handleVolver} className="mt-4">
            Volver al Listado
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <Card.Body>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaUser className="text-teal-500 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Detalles del Paciente</h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" onClick={handleVolver}>
                <FaArrowLeft className="mr-2" />
                Volver
              </Button>
              <Button onClick={handleEditar}>
                Editar Paciente
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Información Personal */}
      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Información Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Nombre Completo</p>
                  <p className="font-medium">{paciente.nombre} {paciente.apellido}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{paciente.emailPaciente}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{paciente.telefono || 'No registrado'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaIdCard className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Cédula</p>
                  <p className="font-medium">{paciente.cedula}</p>
                </div>
              </div>

              {paciente.fechaNacimiento && (
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                    <p className="font-medium">{new Date(paciente.fechaNacimiento).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {paciente.genero && (
                <div className="flex items-center space-x-3">
                  <FaVenusMars className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Género</p>
                    <p className="font-medium">{paciente.genero}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {paciente.direccion && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Dirección</p>
                  <p className="font-medium">{paciente.direccion}</p>
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Estado del Paciente */}
      <Card>
        <Card.Body>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Estado del Paciente</h2>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
              paciente.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {paciente.estado || 'activo'}
            </span>
            <p className="text-sm text-gray-500">
              {paciente.estado === 'activo' ? 'Paciente activo en el sistema' : 'Paciente inactivo'}
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetallePaciente;
