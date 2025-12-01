import { useState } from "react";

export function useFetch() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, options = {}) => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(url, options);
      const data = await res.json();
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

  return { request, cargando, error };
}

export default useFetch;
