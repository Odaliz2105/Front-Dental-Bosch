import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import { pacienteService } from '../../services/authService.js';
import { Button, Card, Loading } from '../../components/ui/index.js';
import { FaCalendarAlt } from 'react-icons/fa';

const PerfilPaciente = () => {
  const navigate = useNavigate();
  const { authPaciente, logoutPaciente, setAuthPaciente } = useAuthPaciente();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form data - igual que el doctor
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: ''
  });

  // Password form data
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    passwordNuevo: '',
    confirmarPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Cargar datos del paciente cuando cambie - igual que el doctor
  useEffect(() => {
    if (authPaciente?.paciente) {
      console.log("👨‍⚕️ Paciente recibido en PerfilPaciente:", authPaciente.paciente);
      console.log("🔍 Estructura completa de authPaciente:", authPaciente);
      console.log("🆔 ID del paciente:", authPaciente.paciente._id || authPaciente.paciente.id);
      
      setFormData({
        nombre: authPaciente.paciente.nombre || '',
        apellido: authPaciente.paciente.apellido || '',
        telefono: authPaciente.paciente.telefono || '',
        direccion: authPaciente.paciente.direccion || ''
      });
    } else {
      console.log("❌ authPaciente.paciente es null o undefined");
    }
  }, [authPaciente?.paciente]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);

    try {
      console.log('🔄 Contraseña - Iniciando proceso de actualización');
      console.log('🔄 Contraseña - authPaciente:', authPaciente);
      console.log('🔄 Contraseña - authPaciente.paciente:', authPaciente?.paciente);
      
      // Validaciones
      if (!passwordData.passwordActual || !passwordData.passwordNuevo || !passwordData.confirmarPassword) {
        toast.error('Todos los campos son obligatorios');
        return;
      }

      if (passwordData.passwordNuevo.length < 6) {
        toast.error('La nueva contraseña debe tener al menos 6 caracteres');
        return;
      }

      if (passwordData.passwordNuevo !== passwordData.confirmarPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }

      // Obtener el ID del paciente
      const pacienteId = authPaciente.paciente._id || authPaciente.paciente.id;
      
      if (!pacienteId) {
        toast.error('Error: No se pudo identificar el usuario');
        return;
      }

      console.log('🔄 Contraseña - Actualizando contraseña del paciente:', pacienteId);

      // Enviar solicitud de actualización de contraseña
      const datosPassword = {
        passwordActual: passwordData.passwordActual,
        passwordNuevo: passwordData.passwordNuevo
      };

      console.log('🔄 Contraseña - Llamando al servicio con:', { pacienteId, datosPassword: { passwordActual: '***', passwordNuevo: '***' } });

      const response = await pacienteService.actualizarPassword(pacienteId, datosPassword);
      console.log('📊 Contraseña - Respuesta del servidor:', response);

      toast.success('✅ ¡Contraseña actualizada correctamente! 🎉');
      
      // Limpiar formulario
      setPasswordData({
        passwordActual: '',
        passwordNuevo: '',
        confirmarPassword: ''
      });
      setShowPasswordForm(false);

    } catch (error) {
      console.error('❌ Contraseña - Error al actualizar:', error);
      console.error('❌ Contraseña - Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.msg || 'Error al actualizar la contraseña');
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔄 Perfil - Actualizando perfil con:', formData);
      
      // Validar que paciente existe - más flexible
      if (!authPaciente?.paciente) {
        toast.error('Error: No se pudo identificar el usuario');
        console.error("❌ authPaciente.paciente es null:", authPaciente);
        return;
      }

      // Obtener el ID del paciente (puede venir de diferentes formas)
      const pacienteId = authPaciente.paciente._id || authPaciente.paciente.id;
      
      if (!pacienteId) {
        toast.error('Error: No se pudo identificar el usuario');
        console.error("❌ Paciente no tiene _id o id:", authPaciente.paciente);
        return;
      }

      console.log("✅ ID del paciente encontrado:", pacienteId);

      // Enviar datos como hace el doctor (el backend usa ?? para ignorar vacíos)
      const datosActualizar = {
        nombre: formData.nombre.trim() || undefined,
        apellido: formData.apellido.trim() || undefined,
        telefono: formData.telefono.trim() || undefined,
        direccion: formData.direccion.trim() || undefined
      };
      
      console.log('📤 Enviando datos al backend:', datosActualizar);
      
      const response = await pacienteService.actualizarPerfil(datosActualizar);
      console.log('📊 Perfil - Respuesta del servidor:', response);
      
      // Actualizar contexto y localStorage - igual que el doctor
      if (response.paciente) {
        setAuthPaciente({ 
          paciente: response.paciente, 
          token: authPaciente.token 
        });
        
        localStorage.setItem('paciente', JSON.stringify(response.paciente));
        
        // Actualizar formData con los nuevos datos
        setFormData({
          nombre: response.paciente.nombre || '',
          apellido: response.paciente.apellido || '',
          telefono: response.paciente.telefono || '',
          direccion: response.paciente.direccion || ''
        });
      }
      
      toast.success('✅ ¡Perfil actualizado correctamente! 🎉');
      setEditing(false);
      
    } catch (error) {
      console.error('❌ Perfil - Error al actualizar:', error);
      toast.error(error.response?.data?.msg || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutPaciente();
    navigate('/paciente/login');
    toast.info('Sesión cerrada');
  };

  if (!authPaciente?.paciente) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card>
          <Card.Body className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No se pudo cargar el perfil</h2>
            <Button onClick={() => navigate('/paciente/dashboard')}>
              Volver al Dashboard
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - igual que el doctor */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <FaCalendarAlt className="text-teal-600 text-3xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                  <p className="text-teal-100 text-lg">Paciente</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      ID: {(authPaciente.paciente._id || authPaciente.paciente.id)?.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                {!editing && (
                  <Button onClick={() => setEditing(true)}>
                    Editar Perfil
                  </Button>
                )}
                {editing && (
                  <Button onClick={() => setEditing(false)} variant="secondary">
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">
                  {editing ? 'Editar Información' : 'Información Personal'}
                </h3>
              </Card.Header>
              <Card.Body>
                {editing ? (
                  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                    {/* NOMBRE */}
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingresa tu nombre"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all mb-5"
                      />
                    </div>

                    {/* APELLIDO */}
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">Apellido</label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Ingresa tu apellido"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all mb-5"
                      />
                    </div>

                    {/* TELÉFONO */}
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Ingresa tu teléfono"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all mb-5"
                      />
                    </div>

                    {/* DIRECCIÓN */}
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">Dirección</label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Ingresa tu dirección"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all mb-6"
                      />
                    </div>

                    {/* BOTÓN */}
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Actualizando...' : 'Actualizar Perfil'}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Nombre</span>
                      <p className="text-lg font-medium text-gray-900">{authPaciente.paciente.nombre || 'No especificado'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Apellido</span>
                      <p className="text-lg font-medium text-gray-900">{authPaciente.paciente.apellido || 'No especificado'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Teléfono</span>
                      <p className="text-lg font-medium text-gray-900">{authPaciente.paciente.telefono || 'No especificado'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Dirección</span>
                      <p className="text-lg font-medium text-gray-900">{authPaciente.paciente.direccion || 'No especificado'}</p>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Cambio de Contraseña */}
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Seguridad</h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                {!showPasswordForm ? (
                  <Button 
                    onClick={() => setShowPasswordForm(true)} 
                    variant="secondary" 
                    className="w-full"
                  >
                    Cambiar Contraseña
                  </Button>
                ) : (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        name="passwordActual"
                        value={passwordData.passwordActual}
                        onChange={handlePasswordChange}
                        placeholder="Ingresa tu contraseña actual"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        name="passwordNuevo"
                        value={passwordData.passwordNuevo}
                        onChange={handlePasswordChange}
                        placeholder="Ingresa tu nueva contraseña"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all"
                        required
                        minLength="6"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-semibold text-gray-700">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        name="confirmarPassword"
                        value={passwordData.confirmarPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirma tu nueva contraseña"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                   focus:border-teal-500 focus:ring-teal-500 focus:ring-1 transition-all"
                        required
                        minLength="6"
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        type="submit" 
                        disabled={loadingPassword} 
                        className="flex-1"
                      >
                        {loadingPassword ? 'Actualizando...' : 'Actualizar'}
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordData({
                            passwordActual: '',
                            passwordNuevo: '',
                            confirmarPassword: ''
                          });
                        }} 
                        variant="secondary" 
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                )}
              </Card.Body>
            </Card>

            {/* Otras Acciones */}
            <Card>
              <Card.Header>
                <h3 className="text-lg font-semibold text-gray-900">Acciones</h3>
              </Card.Header>
              <Card.Body className="space-y-4">
                <Button onClick={() => navigate('/paciente/dashboard')} className="w-full">
                  Ir al Dashboard
                </Button>
                <Button onClick={handleLogout} variant="secondary" className="w-full">
                  Cerrar Sesión
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPaciente;
