import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import { pacienteService } from '../../services/authService.js';
import { FaCalendarAlt } from 'react-icons/fa';

const PerfilPaciente = () => {
  const navigate = useNavigate();
  const { authPaciente, logoutPaciente } = useAuthPaciente();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    emailPaciente: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    if (authPaciente?.paciente) {
      const patientData = authPaciente.paciente;
      setFormData({
        nombre: patientData.nombre || '',
        apellido: patientData.apellido || '',
        emailPaciente: patientData.emailPaciente || '',
        telefono: patientData.telefono || '',
        direccion: patientData.direccion || ''
      });
    }
  }, [authPaciente?.paciente]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await pacienteService.actualizarPerfil(formData);

      toast.success('Perfil actualizado correctamente');
      setEditing(false);
      
      // Actualizar datos en el contexto
      // Opcional: podrías recargar los datos del perfil
      
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al actualizar perfil');
    }
  };

  const handleLogout = () => {
    logoutPaciente();
    navigate('/paciente/login');
    toast.info('Sesión cerrada');
  };

  if (!authPaciente?.paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
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
            <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/paciente/agendar-cita')}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all flex items-center space-x-2"
              >
                <FaCalendarAlt />
                <span>Agendar Cita</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Información del Paciente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                Editar Perfil
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="emailPaciente"
                    value={formData.emailPaciente}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold text-gray-800">{authPaciente.paciente.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Apellido</p>
                  <p className="font-semibold text-gray-800">{authPaciente.paciente.apellido}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{authPaciente.paciente.emailPaciente}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-semibold text-gray-800">{authPaciente.paciente.telefono || 'No especificado'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Dirección</p>
                  <p className="font-semibold text-gray-800">{authPaciente.paciente.direccion || 'No especificada'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfilPaciente;
