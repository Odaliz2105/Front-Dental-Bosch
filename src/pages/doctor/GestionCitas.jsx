import React, { useState, useEffect } from 'react';
import { useAuthDoctor } from '../../context/storeAuth.jsx';
import { citaService } from '../../services/citaService.js';
import { toast } from 'react-toastify';
import { 
  Button, 
  Card, 
  Badge, 
  Modal, 
  Loading 
} from '../../components/ui/index.js';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiFilter,
  FiRefreshCw,
  FiDollarSign,
  FiFileText
} from 'react-icons/fi';

const GestionCitas = () => {
  const { authDoctor } = useAuthDoctor();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCita, setSelectedCita] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [filters, setFilters] = useState({
    estado: '',
    fecha: ''
  });
  
  // Form data for editing
  const [editForm, setEditForm] = useState({
    estado: '',
    costo: '',
    duracion: '',
    observacion: '',
    metodoPago: ''
  });

  // Load citas
  const loadCitas = async () => {
    try {
      setLoading(true);
      const data = await citaService.listarCitasDoctor(filters);
      setCitas(data);
    } catch (error) {
      console.error('Error al cargar citas:', error);
      toast.error('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authDoctor?.token) {
      loadCitas();
    }
  }, [authDoctor?.token, filters]);

  // Handle edit
  const handleEdit = (cita) => {
    setSelectedCita(cita);
    setEditForm({
      estado: cita.estado,
      costo: cita.costo || '',
      duracion: cita.duracion || '',
      observacion: cita.notasDoctor || '',
      metodoPago: cita.metodoPago || ''
    });
    setShowEditModal(true);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      await citaService.actualizarCita(selectedCita._id, editForm);
      toast.success('Cita actualizada exitosamente');
      setShowEditModal(false);
      loadCitas();
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      toast.error('Error al actualizar la cita');
    }
  };

  // Handle delete
  const handleDelete = async (cita) => {
    if (window.confirm(`¿Estás seguro de eliminar la cita con ${cita.paciente.nombre} ${cita.paciente.apellido}?`)) {
      try {
        await citaService.eliminarCita(cita._id);
        toast.success('Cita eliminada exitosamente');
        loadCitas();
      } catch (error) {
        console.error('Error al eliminar cita:', error);
        toast.error('Error al eliminar la cita');
      }
    }
  };

  // Get badge variant for estado
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'confirmada': return 'success';
      case 'cancelada': return 'danger';
      case 'completada': return 'primary';
      default: return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && citas.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading size="lg" text="Cargando citas..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-600 mt-1">Administra las citas de tu consultorio</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={loadCitas}
          loading={loading}
        >
          <FiRefreshCw className="mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold flex items-center">
            <FiFilter className="mr-2" />
            Filtros
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filters.estado}
                onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={filters.fecha}
                onChange={(e) => setFilters({ ...filters, fecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <Button 
                variant="secondary" 
                onClick={() => setFilters({ estado: '', fecha: '' })}
                className="w-full"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Citas List */}
      <div className="space-y-4">
        {citas.length === 0 ? (
          <Card>
            <Card.Body className="text-center py-8">
              <FiCalendar className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay citas encontradas
              </h3>
              <p className="text-gray-600">
                No hay citas que coincidan con los filtros seleccionados.
              </p>
            </Card.Body>
          </Card>
        ) : (
          citas.map((cita) => (
            <Card key={cita._id} hover>
              <Card.Body>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge variant={getEstadoBadge(cita.estado)}>
                        {cita.estado}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(cita.fechaCita)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <FiUser className="mr-2 text-gray-400" />
                          <span className="font-medium">Paciente:</span>
                          <span className="ml-2">
                            {cita.paciente.nombre} {cita.paciente.apellido}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FiClock className="mr-2 text-gray-400" />
                          <span className="font-medium">Duración:</span>
                          <span className="ml-2">{cita.duracion} minutos</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FiDollarSign className="mr-2 text-gray-400" />
                          <span className="font-medium">Costo:</span>
                          <span className="ml-2">${cita.costo || 0}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Motivo:</span>
                          <p className="text-gray-600 mt-1">{cita.motivo}</p>
                        </div>
                        {cita.notasDoctor && (
                          <div className="text-sm">
                            <span className="font-medium">Notas:</span>
                            <p className="text-gray-600 mt-1">{cita.notasDoctor}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCita(cita);
                        setShowViewModal(true);
                      }}
                    >
                      <FiEye />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cita)}
                    >
                      <FiEdit2 />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(cita)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar Cita"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={editForm.estado}
              onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="completada">Completada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo ($)
            </label>
            <input
              type="number"
              value={editForm.costo}
              onChange={(e) => setEditForm({ ...editForm, costo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración (minutos)
            </label>
            <input
              type="number"
              value={editForm.duracion}
              onChange={(e) => setEditForm({ ...editForm, duracion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <select
              value={editForm.metodoPago}
              onChange={(e) => setEditForm({ ...editForm, metodoPago: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pendiente">Pendiente</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              value={editForm.observacion}
              onChange={(e) => setEditForm({ ...editForm, observacion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Notas del doctor..."
            />
          </div>
        </div>
        
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveEdit}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Detalles de la Cita"
        size="md"
      >
        {selectedCita && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Paciente:</span>
                <p className="text-gray-900">
                  {selectedCita.paciente.nombre} {selectedCita.paciente.apellido}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Teléfono:</span>
                <p className="text-gray-900">{selectedCita.paciente.telefono}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Fecha:</span>
                <p className="text-gray-900">{formatDate(selectedCita.fechaCita)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Estado:</span>
                <div className="mt-1">
                  <Badge variant={getEstadoBadge(selectedCita.estado)}>
                    {selectedCita.estado}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Duración:</span>
                <p className="text-gray-900">{selectedCita.duracion} minutos</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Costo:</span>
                <p className="text-gray-900">${selectedCita.costo || 0}</p>
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-700">Motivo:</span>
              <p className="text-gray-900 mt-1">{selectedCita.motivo}</p>
            </div>
            
            {selectedCita.notasDoctor && (
              <div>
                <span className="text-sm font-medium text-gray-700">Notas del Doctor:</span>
                <p className="text-gray-900 mt-1">{selectedCita.notasDoctor}</p>
              </div>
            )}
          </div>
        )}
        
        <Modal.Footer>
          <Button
            onClick={() => setShowViewModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionCitas;
