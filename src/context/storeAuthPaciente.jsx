import React, { createContext, useContext, useState, useEffect } from 'react';
import { pacienteService } from '../services/authService.js';
import { toast } from 'react-toastify';

const AuthPacienteContext = createContext();

export const useAuthPaciente = () => {
  const context = useContext(AuthPacienteContext);
  if (!context) {
    throw new Error('useAuthPaciente debe usarse dentro de AuthPacienteProvider');
  }
  return context;
};

export const AuthPacienteProvider = ({ children }) => {
  const [authPaciente, setAuthPaciente] = useState({
    token: localStorage.getItem('tokenPaciente') || null,
    paciente: JSON.parse(localStorage.getItem('paciente') || 'null'),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('tokenPaciente');
      if (token) {
        try {
          const data = await pacienteService.getPerfil();
          setAuthPaciente({ paciente: data, token });
        } catch (error) {
          console.error('Token inválido:', error);
          localStorage.removeItem('tokenPaciente');
          localStorage.removeItem('paciente');
          setAuthPaciente({ token: null, paciente: null });
          toast.error('Sesión expirada, por favor inicia sesión nuevamente');
        }
      }
      setLoading(false);
    };
    
    verificarToken();
  }, []);

  const loginPaciente = async (email, password) => {
    try {
      const data = await pacienteService.login(email, password);
      
      localStorage.setItem('tokenPaciente', data.token);
      localStorage.setItem('paciente', JSON.stringify(data.paciente));
      
      setAuthPaciente({ paciente: data.paciente, token: data.token });
      
      toast.success('¡Bienvenido!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.msg || 'Error al iniciar sesión';
      toast.error(message);
      return { success: false, message };
    }
  };

  const loginPacienteWithToken = async (token) => {
    try {
      const data = await pacienteService.getPerfil();
      
      localStorage.setItem('tokenPaciente', token);
      localStorage.setItem('paciente', JSON.stringify(data));
      
      setAuthPaciente({ paciente: data, token });
      toast.success('¡Bienvenido!');
    } catch (error) {
      console.error('Error al verificar token:', error);
      localStorage.removeItem('tokenPaciente');
      localStorage.removeItem('paciente');
      setAuthPaciente({ token: null, paciente: null });
      toast.error('Error al autenticar con Google');
    }
  };

  const logoutPaciente = () => {
    localStorage.removeItem('tokenPaciente');
    localStorage.removeItem('paciente');
    setAuthPaciente({ token: null, paciente: null });
    toast.info('Sesión cerrada');
  };

  return (
    <AuthPacienteContext.Provider value={{
      authPaciente,
      loginPaciente,
      loginPacienteWithToken,
      logoutPaciente,
      loading
    }}>
      {children}
    </AuthPacienteContext.Provider>
  );
};
