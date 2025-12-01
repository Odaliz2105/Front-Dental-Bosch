// Front-Dental-Bosch/src/pages/NuevoPassword.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/DentalBosch.png';

export const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [cargando, setCargando] = useState(true);

  const { token } = useParams();
  const navigate = useNavigate();

  // Verificar si el token es válido al cargar la página
  useEffect(() => {
    const verificarToken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/doctor/recuperarPassword/${token}`;
        const { data } = await axios.get(url);
        
        setTokenValido(true);
        setMensaje({
          tipo: 'success',
          respuesta: data.msg
        });
      } catch (error) {
        setTokenValido(false);
        setMensaje({
          tipo: 'error',
          respuesta: error.response?.data?.msg || 'Token inválido o expirado'
        });
      } finally {
        setCargando(false);
      }
    };

    verificarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if ([password, confirmarPassword].includes('')) {
      setMensaje({
        tipo: 'error',
        respuesta: 'Todos los campos son obligatorios'
      });
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje({
        tipo: 'error',
        respuesta: 'Las contraseñas no coinciden'
      });
      return;
    }

    if (password.length < 6) {
      setMensaje({
        tipo: 'error',
        respuesta: 'La contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/doctor/nuevoPassword/${token}`;
      const { data } = await axios.post(url, { password });
      
      setMensaje({
        tipo: 'success',
        respuesta: data.msg
      });
      
      setPassword('');
      setConfirmarPassword('');
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setMensaje({
        tipo: 'error',
        respuesta: error.response?.data?.msg || 'Error al actualizar la contraseña'
      });
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-50 to-cyan-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Verificando token...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-50 to-cyan-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src={logo} alt="Dental Bosch" className="w-32 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Nueva Contraseña</h1>
          <p className="text-gray-600 mt-2">Ingresa tu nueva contraseña</p>
        </div>

        {/* Mensaje */}
        {mensaje.respuesta && (
          <div className={`p-4 mb-6 rounded-lg ${
            mensaje.tipo === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            <p className="text-sm font-medium">{mensaje.respuesta}</p>
          </div>
        )}

        {tokenValido ? (
          <form onSubmit={handleSubmit}>
            {/* Nueva Contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nueva Contraseña
              </label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-cyan-500 transition duration-300 shadow-lg"
            >
              Guardar Nueva Contraseña
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">El token no es válido o ha expirado.</p>
            <Link 
              to="/recuperar-password" 
              className="text-pink-600 hover:text-pink-700 font-semibold"
            >
              Solicitar nuevo enlace de recuperación
            </Link>
          </div>
        )}

        {/* Enlaces */}
        <div className="mt-6 text-center space-y-2">
          <Link to="/login" className="block text-gray-600 hover:text-pink-600 transition">
            Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NuevoPassword;