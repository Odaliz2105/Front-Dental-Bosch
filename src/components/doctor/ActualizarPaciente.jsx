import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { pacienteDoctorService } from '../../services/authService.js';

const ActualizarPaciente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    emailPaciente: '',
    telefono: '',
    direccion: '',
    cedula: ''
  });

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
      setFormData({
        nombre: pacienteEncontrado.nombre || '',
        apellido: pacienteEncontrado.apellido || '',
        emailPaciente: pacienteEncontrado.emailPaciente || pacienteEncontrado.email || '',
        telefono: pacienteEncontrado.telefono || '',
        direccion: pacienteEncontrado.direccion || '',
        cedula: pacienteEncontrado.cedula || ''
      });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await pacienteDoctorService.actualizarPaciente(id, formData);

      toast.success('Paciente actualizado correctamente');
      setSaving(false);
      
      // Redirigir al listado
      setTimeout(() => {
        navigate('/doctor/pacientes');
      }, 1500);
      
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      toast.error(error.response?.data?.msg || 'Error al actualizar paciente');
      setSaving(false);
    }
  };

  const handleVolver = () => {
    navigate('/doctor/pacientes');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando paciente...</p>
        </div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <p className="text-gray-600">Paciente no encontrado</p>
          <button
            onClick={handleVolver}
            className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all"
          >
            Volver al Listado
          </button>
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
            <h1 className="text-2xl font-bold text-gray-800">Actualizar Paciente</h1>
            <button
              onClick={handleVolver}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              Volver
            </button>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cédula *
                </label>
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <textarea
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleVolver}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Actualizando...' : 'Actualizar Paciente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPaciente;
