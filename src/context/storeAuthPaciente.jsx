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
      const paciente = localStorage.getItem('paciente');
      
      console.log('🔄 AuthPaciente - Verificando token al iniciar...');
      console.log('🔄 AuthPaciente - Token en localStorage:', token ? 'EXISTS' : 'NULL');
      console.log('🔄 AuthPaciente - Paciente en localStorage:', paciente ? 'EXISTS' : 'NULL');
      
      if (token) {
        try {
          const data = await pacienteService.getPerfil();
          console.log('✅ AuthPaciente - Token válido, perfil:', data);
          setAuthPaciente({ paciente: data, token });
        } catch (error) {
          console.error('❌ AuthPaciente - Token inválido:', error);
          localStorage.removeItem('tokenPaciente');
          localStorage.removeItem('paciente');
          setAuthPaciente({ token: null, paciente: null });
          toast.error('Sesión expirada, por favor inicia sesión nuevamente');
        }
      } else {
        console.log('ℹ️ AuthPaciente - No hay token, estableciendo estado inicial');
        setAuthPaciente({ 
          token: null, 
          paciente: paciente ? JSON.parse(paciente) : null 
        });
      }
      setLoading(false);
    };
    
    verificarToken();
  }, []);

  const loginPaciente = async (email, password) => {
    try {
      console.log('🔑 AuthPaciente - Intentando login con:', email);
      const data = await pacienteService.login(email, password);
      console.log('📥 AuthPaciente - Respuesta del servidor:', data);
      
      localStorage.setItem('tokenPaciente', data.token);
      localStorage.setItem('paciente', JSON.stringify(data.paciente));
      
      const newAuthState = { paciente: data.paciente, token: data.token };
      setAuthPaciente(newAuthState);
      
      console.log('💾 AuthPaciente - Estado guardado:', newAuthState);
      console.log('💾 AuthPaciente - localStorage guardado');
      
      toast.success('¡Bienvenido!');
      return { success: true };
    } catch (error) {
      console.error('❌ AuthPaciente - Error en login:', error);
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
      setAuthPaciente,
      loginPaciente,
      loginPacienteWithToken,
      logoutPaciente,
      loading
    }}>
      {children}
    </AuthPacienteContext.Provider>
  );
};
