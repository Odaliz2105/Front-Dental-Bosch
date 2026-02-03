import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../services/authService.js';
import { toast } from 'react-toastify';
import { Button, Card, Loading } from '../components/ui/index.js';
import { FaUser, FaEdit, FaCheckCircle, FaClock, FaIdCard, FaKey } from 'react-icons/fa';

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const response = await doctorService.getPerfil();
      setDoctor(response.doctor);
    } catch (error) {
      toast.error('Error al cargar el perfil');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      fetchProfile();
      setHasLoaded(true);
    }
  }, [hasLoaded, fetchProfile]);

  if (loading) {
    return <Loading size="lg" text="Cargando perfil..." />;
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card>
          <Card.Body className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No se pudo cargar el perfil</h2>
            <Button onClick={() => navigate('/dashboard-doctor')}>
              Volver al Dashboard
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <FaUser className="text-teal-600 text-3xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
                  <p className="text-teal-100 text-lg">Doctor</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      doctor.estado === 'aprobado' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doctor.estado === 'aprobado' ? (
                        <><FaCheckCircle className="inline mr-1" />Aprobado</>
                      ) : (
                        <><FaClock className="inline mr-1" />Pendiente</>
                      )}
                    </span>
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      <FaIdCard className="inline mr-1" />ID: {doctor._id?.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-1" /> Nombre
                </label>
                <p className="text-lg text-gray-900">{doctor.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-1" /> Apellido
                </label>
                <p className="text-lg text-gray-900">{doctor.apellido}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📧 Email
                </label>
                <p className="text-lg text-gray-900">{doctor.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏥 Especialidad
                </label>
                <p className="text-lg text-gray-900">{doctor.especialidad}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📞 Teléfono
                </label>
                <p className="text-lg text-gray-900">{doctor.telefono}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📍 Dirección
                </label>
                <p className="text-lg text-gray-900">{doctor.direccion}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button onClick={() => navigate('/dashboard-doctor')}>
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
