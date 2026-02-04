import api from '../helpers/api.js';

// Servicios para gestión de citas
export const citaService = {
  // Crear nueva cita (paciente) - ENDPOINT ACTUALIZADO
  crearCitaPaciente: async (datos) => {
    const response = await api.post('/api/paciente/cita', datos);
    return response.data;
  },

  // Crear nueva cita (método antiguo - mantener compatibilidad)
  crearCita: async (datos) => {
    const response = await api.post('/api/cita/crear', datos);
    return response.data;
  },

  // Listar citas del paciente autenticado
  listarCitasPaciente: async (filtros = {}) => {
    const params = new URLSearchParams(filtros);
    const response = await api.get(`/api/cita/paciente?${params}`);
    return response.data;
  },

  // Listar citas del doctor autenticado
  listarCitasDoctor: async (filtros = {}) => {
    const params = new URLSearchParams(filtros);
    // Temporalmente usar la ruta de prueba que funciona
    const response = await api.get(`/api/cita/doctor/test?${params}`);
    return response.data;
  },

  // Obtener cita por ID
  obtenerCita: async (id) => {
    const response = await api.get(`/api/cita/${id}`);
    return response.data;
  },

  // Actualizar cita (doctor)
  actualizarCita: async (id, datos) => {
    // Temporalmente usar la ruta de prueba que funciona
    const response = await api.put(`/api/cita/prueba/${id}`, datos);
    return response.data;
  },

  // Eliminar cita (doctor) - NUEVO ENDPOINT
  eliminarCita: async (id) => {
    // Temporalmente usar la ruta de prueba que funciona
    const response = await api.delete(`/api/cita/prueba/${id}`);
    return response.data;
  },

  // Cancelar cita (paciente)
  cancelarCita: async (id) => {
    const response = await api.put(`/api/cita/${id}/cancelar`);
    return response.data;
  },

  // Calificar cita (paciente)
  calificarCita: async (id, datos) => {
    const response = await api.put(`/api/cita/${id}/calificar`, datos);
    return response.data;
  },

  // Obtener horarios disponibles de un doctor
  obtenerHorariosDisponibles: async (doctor, fecha) => {
    const params = new URLSearchParams({ doctor, fecha });
    const response = await api.get(`/api/cita/disponibles?${params}`);
    return response.data;
  }
};
