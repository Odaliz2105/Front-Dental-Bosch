import { useState } from "react";

export function useFetch() {

  // Estados para manejar carga y errores
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Función genérica para peticiones HTTP
  const request = async (url, options = {}) => {
    setCargando(true);
    setError(null);

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      // Manejo de errores del backend
      if (!res.ok) {
        setError(data);
        throw new Error(data.msg || "Error en la petición");
      }

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // Retorna la función y los estados
  return { request, cargando, error };
}

export default useFetch;
