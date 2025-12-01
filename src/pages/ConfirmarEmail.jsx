// src/pages/ConfirmarEmail.jsx
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ConfirmarEmail = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmar = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
        
        const response = await fetch(`${API_URL}/api/doctor/confirmar/${token}`, {
          method: 'GET',
        });

        const data = await response.json();
        console.log('Respuesta de confirmación:', data);

        if (!response.ok) {
          throw new Error(data.msg || 'Error al confirmar el email');
        }

        setSuccess(true);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'Error al confirmar el email');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmar();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f47cc6] to-[#63e1e3] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#f47cc6] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Confirmando tu correo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f47cc6] to-[#63e1e3] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-red-500 text-4xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Error de confirmación
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/login"
            className="inline-block bg-[#f47cc6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#dd6cb4] transition"
          >
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f47cc6] to-[#63e1e3] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-green-500 text-4xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Email confirmado!
          </h2>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido activada exitosamente. Ya puedes iniciar sesión.
          </p>
          <Link
            to="/login"
            className="inline-block bg-[#f47cc6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#dd6cb4] transition"
          >
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default ConfirmarEmail;