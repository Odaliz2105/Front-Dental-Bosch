import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { doctorService } from "../services/authService.js";
import { toast } from 'react-toastify';

const AuthDoctorContext = createContext();

export const useAuthDoctor = () => {
  const context = useContext(AuthDoctorContext);
  if (!context) {
    throw new Error('useAuthDoctor debe usarse dentro de AuthDoctorProvider');
  }
  return context;
};

export const AuthDoctorProvider = ({ children }) => {
  const [authDoctor, setAuthDoctor] = useState({
    token: localStorage.getItem("token") || null,
    doctor: JSON.parse(localStorage.getItem("doctor") || "null"),
  });
  const [loading, setLoading] = useState(true);

  console.log('AuthDoctorProvider - Estado inicial:', authDoctor);

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    console.log('AuthDoctorProvider - Verificando token:', token ? 'existe' : 'no existe');
    
    if (token) {
      try {
        // Verificar token con el backend
        console.log('AuthDoctorProvider - Verificando token con backend...');
        const data = await doctorService.getPerfil();
        console.log('AuthDoctorProvider - Token válido, doctor:', data);
        setAuthDoctor({ token, doctor: data });
      } catch (error) {
        console.error('AuthDoctorProvider - Token inválido:', error);
        localStorage.removeItem("token");
        localStorage.removeItem("doctor");
        setAuthDoctor({ token: null, doctor: null });
        toast.error('Sesión expirada, por favor inicia sesión nuevamente');
      }
    } else {
      console.log('AuthDoctorProvider - No hay token en localStorage');
    }
    setLoading(false); // Siempre ejecutar esto, haya token o no
  }, []);

  useEffect(() => {
    verificarToken();
  }, [verificarToken]);

  const loginDoctor = async (email, password) => {
    try {
      const data = await doctorService.login(email, password);
      
      // Guardar en localStorage y estado
      localStorage.setItem("token", data.token);
      localStorage.setItem("doctor", JSON.stringify(data.doctor));
      
      setAuthDoctor({ token: data.token, doctor: data.doctor });
      
      toast.success('¡Bienvenido Doctor!');
      return { success: true, data };
    } catch (error) {
      const message = error.response?.data?.msg || 'Error al iniciar sesión';
      toast.error(message);
      return { success: false, message };
    }
  };

  const logoutDoctor = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    setAuthDoctor({ token: null, doctor: null });
    toast.info('Sesión cerrada');
  };

  return (
    <AuthDoctorContext.Provider value={{
      authDoctor,
      loginDoctor,
      logoutDoctor,
      loading
    }}>
      {children}
    </AuthDoctorContext.Provider>
  );
};
