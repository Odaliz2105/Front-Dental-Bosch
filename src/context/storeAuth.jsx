// src/context/storeAuth.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    doctor: JSON.parse(localStorage.getItem("doctor") || "null"),
  });

  const login = (token, doctor) => {
    setAuth({ token, doctor });
    localStorage.setItem("token", token);
    localStorage.setItem("doctor", JSON.stringify(doctor));
  };

  const logout = () => {
    setAuth({ token: null, doctor: null });
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el context
export default function useStoreAuth() {
  return useContext(AuthContext);
}
