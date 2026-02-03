import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthPaciente } from '../context/storeAuthPaciente.jsx';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginPacienteWithToken } = useAuthPaciente();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Guardar el token en el contexto y localStorage
      localStorage.setItem('tokenPaciente', token);
      loginPacienteWithToken(token);
      
      // Redirigir al dashboard del paciente
      setTimeout(() => {
        navigate('/dashboard-paciente');
      }, 1000);
    } else {
      // Si no hay token, redirigir al login
      navigate('/login-paciente');
    }
  }, [searchParams, navigate, loginPacienteWithToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">Autenticando con Google...</h2>
        <p className="text-gray-600 mt-2">Serás redirigido automáticamente</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
