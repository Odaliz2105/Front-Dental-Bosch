// src/pages/RecuperarPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/DentalBosch.png';

export const RecuperarPassword = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMensaje({
        tipo: 'error',
        respuesta: 'El email es obligatorio'
      });
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/doctor/recuperarPassword`;
      const { data } = await axios.post(url, { email });
      
      setMensaje({
        tipo: 'success',
        respuesta: data.msg
      });
      setEmail('');
      
    } catch (error) {
      setMensaje({
        tipo: 'error',
        respuesta: error.response?.data?.msg || 'Error al enviar el email'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img src={logo} alt="Dental Bosch" className="w-32 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Recuperar Contraseña
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Ingresa tu email para recibir instrucciones
        </p>

        {mensaje.respuesta && (
          <div className={`p-3 mb-4 rounded ${
            mensaje.tipo === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {mensaje.respuesta}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Enviar Instrucciones
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-600 hover:underline">
            Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RecuperarPassword;