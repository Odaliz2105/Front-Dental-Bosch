import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthDoctor } from '../../context/storeAuth.jsx';
import { pacienteDoctorService } from '../../services/authService.js';
import { Button, Card, Loading } from '../../components/ui/index.js';
import { FaUsers, FaSearch, FaPlus, FaEye, FaEdit, FaBan } from 'react-icons/fa';

const ListarPacientes = () => {
  const { authDoctor } = useAuthDoctor();
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchPacientes = useCallback(async () => {
    try {
      const data = await pacienteDoctorService.listarPacientes();
      setPacientes(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al cargar pacientes');
      setLoading(false);
    }
  }, []); // Sin dependencias externas

  useEffect(() => {
    if (!hasLoaded && authDoctor?.token) {
      fetchPacientes();
      setHasLoaded(true);
    }
  }, [authDoctor?.token, hasLoaded, fetchPacientes]); // Ahora fetchPacientes es estable

  useEffect(() => {
    // Filter patients based on search term
    const filtered = pacientes.filter(paciente =>
      paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.emailPaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cedula.includes(searchTerm)
    );
    setFilteredPacientes(filtered);
  }, [pacientes, searchTerm]);

  const handleDarBaja = async (pacienteId) => {
    if (!window.confirm('¿Estás seguro de dar de baja a este paciente?')) {
      return;
    }

    try {
      await pacienteDoctorService.eliminarPaciente(pacienteId);
      toast.success('Paciente dado de baja correctamente');
      
      // Recargar directamente sin depender de hasLoaded
      setLoading(true);
      try {
        const data = await pacienteDoctorService.listarPacientes();
        setPacientes(data);
      } catch (recargaError) {
        console.error('Error al recargar:', recargaError);
        toast.error('Error al recargar la lista');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error al dar de baja al paciente');
    }
  };

  const handleVerDetalle = (pacienteId) => {
    navigate(`/paciente/detalle/${pacienteId}`);
  };

  const handleActualizar = (pacienteId) => {
    navigate(`/paciente/actualizar/${pacienteId}`);
  };

  if (loading) {
    return <Loading size="lg" text="Cargando pacientes..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <Card.Body>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaUsers className="text-teal-500 text-2xl" />
              <h1 className="text-2xl font-bold text-gray-800">Listado de Pacientes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <Button onClick={() => navigate('/crear-paciente')}>
                <FaPlus className="mr-2" />
                Nuevo Paciente
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Tabla de Pacientes */}
      <Card>
        <Card.Body>
          {filteredPacientes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No se encontraron pacientes con ese criterio de búsqueda' : 'No hay pacientes registrados'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cédula
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPacientes.map((paciente) => (
                    <tr key={paciente._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {paciente.nombre} {paciente.apellido}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{paciente.emailPaciente}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{paciente.telefono}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{paciente.cedula}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          paciente.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {paciente.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVerDetalle(paciente._id)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActualizar(paciente._id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDarBaja(paciente._id)}
                        >
                          <FaBan />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListarPacientes;
