import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDoctor } from '../../context/storeAuth.jsx';
import { doctorService, pacienteDoctorService } from '../../services/authService.js';
import { Button, Card, Loading, Modal } from '../../components/ui/index.js';
import { FiUsers, FiCalendar, FiSettings, FiUserPlus, FiShield, FiCheck, FiX, FiClock, FiPackage } from 'react-icons/fi';

const DashboardDoctor = () => {
  const { authDoctor } = useAuthDoctor();
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [doctoresPendientes, setDoctoresPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCrearDoctor, setShowCrearDoctor] = useState(false);
  const [showPromocion, setShowPromocion] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [nuevoDoctor, setNuevoDoctor] = useState({
    nombre: '', apellido: '', email: '', password: '',
    especialidad: '', telefono: '', direccion: ''
  });

  const [promocionData, setPromocionData] = useState({
    especialidad: '', telefono: '', direccion: ''
  });

  const cargarDatos = useCallback(async () => {
    try {
      const [pacientesData, doctoresPendientesData] = await Promise.all([
        pacienteDoctorService.listarPacientes(),
        doctorService.listarDoctoresPendientes()
      ]);
      setPacientes(pacientesData);
      setDoctoresPendientes(doctoresPendientesData.doctores || []);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencias externas

  useEffect(() => {
    if (!hasLoaded && authDoctor?.token) {
      cargarDatos();
      setHasLoaded(true);
    }
  }, [authDoctor?.token, hasLoaded, cargarDatos]); // Ahora cargarDatos es estable

  const handleCrearDoctor = async (e) => {
    e.preventDefault();
    try {
      await doctorService.crearDoctor(nuevoDoctor);
      alert('Doctor creado exitosamente');
      setNuevoDoctor({
        nombre: '', apellido: '', email: '', password: '',
        especialidad: '', telefono: '', direccion: ''
      });
      setShowCrearDoctor(false);
      cargarDatos();
    } catch (error) {
      alert('Error al crear doctor: ' + (error.response?.data?.msg || 'Error desconocido'));
    }
  };

  const handlePromoverPaciente = async (e) => {
    e.preventDefault();
    if (!selectedPaciente) return;
    
    try {
      await doctorService.promoverPaciente(selectedPaciente._id, promocionData);
      alert('Paciente promovido a doctor exitosamente');
      setShowPromocion(false);
      setSelectedPaciente(null);
      setPromocionData({ especialidad: '', telefono: '', direccion: '' });
      cargarDatos();
    } catch (error) {
      alert('Error al promover paciente: ' + (error.response?.data?.msg || 'Error desconocido'));
    }
  };

  const handleAprobarDoctor = async (doctorId) => {
    try {
      await doctorService.aprobarDoctor(doctorId);
      cargarDatos();
      alert('Doctor aprobado');
    } catch (error) {
      alert('Error al aprobar doctor: ' + (error.response?.data?.msg || 'Error desconocido'));
    }
  };

  const handleRechazarDoctor = async (doctorId) => {
    try {
      await doctorService.rechazarDoctor(doctorId);
      cargarDatos();
      alert('Doctor rechazado');
    } catch (error) {
      alert('Error al rechazar doctor: ' + (error.response?.data?.msg || 'Error desconocido'));
    }
  };

  if (loading) {
    return <Loading size="lg" text="Cargando dashboard..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Doctor</h1>
        <p className="text-gray-600">Bienvenido al panel de administración del consultorio</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <Card.Body>
            <div className="flex items-center">
              <FiUsers className="text-3xl text-blue-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Total Pacientes</p>
                <p className="text-2xl font-bold text-gray-900">{pacientes.length}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div className="flex items-center">
              <FiShield className="text-3xl text-yellow-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Doctores Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{doctoresPendientes.length}</p>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div className="flex items-center">
              <FiCalendar className="text-3xl text-green-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Citas Hoy</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <div className="flex items-center">
              <FiSettings className="text-3xl text-purple-500 mr-4" />
              <div>
                <p className="text-sm text-gray-600">Configuración</p>
                <p className="text-2xl font-bold text-gray-900">Activo</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Botones de Acción Rápida */}
      <Card>
        <Card.Body>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => setShowCrearDoctor(true)}>
              <FiUserPlus className="mr-2" />
              Crear Doctor
            </Button>
            <Button onClick={() => setShowPromocion(true)} variant="secondary">
              <FiShield className="mr-2" />
              Promover Paciente
            </Button>
            <Button onClick={() => navigate('/inventario')} variant="success">
              <FiPackage className="mr-2" />
              Inventario
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Doctores Pendientes de Aprobación */}
      {doctoresPendientes.length > 0 && (
        <Card>
          <Card.Body>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Doctores Pendientes de Aprobación</h2>
            <div className="space-y-4">
              {doctoresPendientes.map((doctor) => (
                <div key={doctor._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{doctor.nombre} {doctor.apellido}</p>
                    <p className="text-sm text-gray-600">{doctor.email}</p>
                    <p className="text-xs text-gray-500">Registrado: {new Date(doctor.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAprobarDoctor(doctor._id)}
                    >
                      <FiCheck className="mr-1" />
                      Aprobar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRechazarDoctor(doctor._id)}
                    >
                      <FiX className="mr-1" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Modal Crear Doctor */}
      <Modal
        isOpen={showCrearDoctor}
        onClose={() => setShowCrearDoctor(false)}
        title="Crear Nuevo Doctor"
        size="md"
      >
        <form onSubmit={handleCrearDoctor}>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Nombre" 
              value={nuevoDoctor.nombre} 
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, nombre: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="text" 
              placeholder="Apellido" 
              value={nuevoDoctor.apellido}
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, apellido: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={nuevoDoctor.email}
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={nuevoDoctor.password}
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="text" 
              placeholder="Especialidad" 
              value={nuevoDoctor.especialidad}
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, especialidad: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="tel" 
              placeholder="Teléfono" 
              value={nuevoDoctor.telefono}
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, telefono: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
            <input 
              type="text" 
              placeholder="Dirección" 
              value={nuevoDoctor.direccion}
              onChange={(e) => setNuevoDoctor({...nuevoDoctor, direccion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
              required 
            />
          </div>
          <Modal.Footer>
            <Button type="submit">Crear Doctor</Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setShowCrearDoctor(false)}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Modal Promover Paciente */}
      <Modal
        isOpen={showPromocion}
        onClose={() => {
          setShowPromocion(false);
          setSelectedPaciente(null);
        }}
        title="Promover Paciente a Doctor"
        size="md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Paciente</label>
          <select 
            value={selectedPaciente?._id || ''}
            onChange={(e) => {
              const paciente = pacientes.find(p => p._id === e.target.value);
              setSelectedPaciente(paciente);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
            required
          >
            <option value="">Seleccionar un paciente...</option>
            {pacientes.map((paciente) => (
              <option key={paciente._id} value={paciente._id}>
                {paciente.nombre} {paciente.apellido}
              </option>
            ))}
          </select>
        </div>

        {selectedPaciente && (
          <form onSubmit={handlePromoverPaciente}>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Especialidad" 
                value={promocionData.especialidad}
                onChange={(e) => setPromocionData({...promocionData, especialidad: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                required 
              />
              <input 
                type="tel" 
                placeholder="Teléfono" 
                value={promocionData.telefono}
                onChange={(e) => setPromocionData({...promocionData, telefono: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                required 
              />
              <input 
                type="text" 
                placeholder="Dirección" 
                value={promocionData.direccion}
                onChange={(e) => setPromocionData({...promocionData, direccion: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                required 
              />
            </div>
            <Modal.Footer>
              <Button type="submit">Promover a Doctor</Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => {
                  setShowPromocion(false);
                  setSelectedPaciente(null);
                }}
              >
                Cancelar
              </Button>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DashboardDoctor;
