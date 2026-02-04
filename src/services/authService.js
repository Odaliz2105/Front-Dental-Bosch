import api from '../helpers/api.js';

// Servicios de autenticación para pacientes
export const pacienteService = {
  // Login de paciente
  login: async (email, password) => {
    const response = await api.post('/api/paciente/login', { email, password });
    return response.data;
  },

  // Registro de paciente
  registro: async (datos) => {
    const response = await api.post('/api/paciente/registro', datos);
    return response.data;
  },

  // Obtener perfil del paciente
  getPerfil: async () => {
    const response = await api.get('/api/paciente/perfil');
    return response.data;
  },

  // Actualizar perfil del paciente
  actualizarPerfil: async (datos) => {
    const response = await api.put('/api/paciente/perfil', datos);
    return response.data;
  },

  // Actualizar contraseña del paciente
  actualizarPassword: async (id, datos) => {
    const response = await api.put(`/api/paciente/actualizarpassword/${id}`, datos);
    return response.data;
  }
};

// Servicios de autenticación para doctores
export const doctorService = {
  // Login de doctor
  login: async (email, password) => {
    const response = await api.post('/api/doctor/login', { email, password });
    return response.data;
  },

  // Registro de doctor (queda pendiente de aprobación)
  registro: async (datos) => {
    const response = await api.post('/api/doctor/registro', datos);
    return response.data;
  },

  // Obtener perfil del doctor
  getPerfil: async () => {
    const response = await api.get('/api/doctor/perfil');
    return response.data;
  },

  // Actualizar perfil del doctor
  actualizarPerfil: async (datos) => {
    const response = await api.put(`/api/doctor/actualizarperfil/${datos.id}`, datos);
    return response.data;
  },

  // Actualizar contraseña del doctor
  actualizarPassword: async (id, datos) => {
    const response = await api.put(`/api/doctor/actualizarpassword/${id}`, datos);
    return response.data;
  },

  // Recuperar contraseña
  recuperarPassword: async (email) => {
    const response = await api.post('/api/doctor/recuperarPassword', { email });
    return response.data;
  },

  // Comprobar token de recuperación
  comprobarTokenPassword: async (token) => {
    const response = await api.get(`/api/doctor/recuperarPassword/${token}`);
    return response.data;
  },

  // Crear nueva contraseña
  crearNuevoPassword: async (token, password) => {
    const response = await api.post(`/api/doctor/nuevoPassword/${token}`, { password });
    return response.data;
  },

  // Confirmar email
  confirmarEmail: async (token) => {
    const response = await api.get(`/api/doctor/confirmar/${token}`);
    return response.data;
  },

  // Crear nuevo doctor (solo doctores aprobados)
  crearDoctor: async (datos) => {
    const response = await api.post('/api/auth/crear-doctor', datos);
    return response.data;
  },

  // Listar doctores pendientes de aprobación (solo doctores aprobados)
  listarDoctoresPendientes: async () => {
    const response = await api.get('/api/auth/doctores-pendientes');
    return response.data;
  },

  // Aprobar doctor (solo doctores aprobados)
  aprobarDoctor: async (doctorId) => {
    const response = await api.put(`/api/auth/aprobar-doctor/${doctorId}`);
    return response.data;
  },

  // Rechazar doctor (solo doctores aprobados)
  rechazarDoctor: async (doctorId) => {
    const response = await api.put(`/api/auth/rechazar-doctor/${doctorId}`);
    return response.data;
  },

  // Promover paciente a doctor (solo doctores aprobados)
  promoverPaciente: async (pacienteId, datos) => {
    const response = await api.put(`/api/auth/promover-paciente/${pacienteId}`, datos);
    return response.data;
  }
};

// Servicios para gestión de pacientes (usados por doctores)
export const pacienteDoctorService = {
  // Listar todos los pacientes
  listarPacientes: async () => {
    const response = await api.get('/api/paciente/');
    return response.data;
  },

  // Crear nuevo paciente
  crearPaciente: async (datos) => {
    const response = await api.post('/api/paciente/', datos);
    return response.data;
  },

  // Actualizar paciente
  actualizarPaciente: async (id, datos) => {
    const response = await api.put(`/api/paciente/actualizar/${id}`, datos);
    return response.data;
  },

  // Eliminar paciente
  eliminarPaciente: async (id) => {
    const response = await api.delete(`/api/paciente/eliminar/${id}`);
    return response.data;
  }
};

// Servicios para gestión de citas (usados por pacientes)
export const citasService = {
  // Listar citas del paciente
  listarCitasPaciente: async () => {
    const response = await api.get('/api/cita/paciente');
    return response.data;
  },

  // Crear nueva cita
  crearCita: async (datos) => {
    const response = await api.post('/api/cita/crear', datos);
    return response.data;
  },

  // Obtener cita por ID
  obtenerCita: async (id) => {
    const response = await api.get(`/api/cita/${id}`);
    return response.data;
  },

  // Cancelar cita
  cancelarCita: async (id) => {
    const response = await api.put(`/api/cita/${id}/cancelar`);
    return response.data;
  },

  // Calificar cita
  calificarCita: async (id, datos) => {
    const response = await api.put(`/api/cita/${id}/calificar`, datos);
    return response.data;
  },

  // Obtener horarios disponibles
  obtenerHorariosDisponibles: async (params = {}) => {
    const response = await api.get('/api/cita/disponibles', { params });
    return response.data;
  }
};

// Servicios para gestión de inventario (usados por doctores)
export const inventarioService = {
  // Listar items de inventario
  listarInventario: async (params = {}) => {
    const response = await api.get('/api/inventario', { params });
    return response.data;
  },

  // Crear nuevo item de inventario
  crearItemInventario: async (datos) => {
    const response = await api.post('/api/inventario', datos);
    return response.data;
  },

  // Obtener item de inventario por ID
  obtenerItemInventario: async (id) => {
    const response = await api.get(`/api/inventario/${id}`);
    return response.data;
  },

  // Actualizar item de inventario
  actualizarItemInventario: async (id, datos) => {
    const response = await api.put(`/api/inventario/${id}`, datos);
    return response.data;
  },

  // Eliminar item de inventario
  eliminarItemInventario: async (id) => {
    const response = await api.delete(`/api/inventario/${id}`);
    return response.data;
  },

  // Actualizar stock (descontar cuando se asigna medicamento)
  actualizarStock: async (id, datos) => {
    const response = await api.put(`/api/inventario/${id}/actualizar-stock`, datos);
    return response.data;
  }
};
