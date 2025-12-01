import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useStoreAuth from "../context/storeAuth";
import dentalBosch8 from "../assets/DentalBosch.png";

// CONFIGURACIÓN DE LA API
const API_URL = import.meta.env.VITE_API_URL;
const API_ENDPOINTS = {
  LOGIN: `${API_URL}/api/doctor/login`,
};


export default function Login() {
  const navigate = useNavigate();
  const { login: loginContext } = useStoreAuth();

  // ESTADOS LOCALES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // REGEX PARA VALIDAR EMAIL
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // FUNCION PARA VALIDAR CAMPOS
  const validarCampos = () => {
    let ok = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("El correo electrónico es requerido");
      ok = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Correo electrónico inválido");
      ok = false;
    }

    if (!password.trim()) {
      setPasswordError("La contraseña es requerida");
      ok = false;
    } else if (password.trim().length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      ok = false;
    }

    return ok;
  };

  // FUNCION PARA ENVIAR FORMULARIO
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validarCampos()) return;

  setLoading(true);

  try {
    console.log("🔄 Enviando petición a:", API_ENDPOINTS.LOGIN);

    const res = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      }),
    });

    const data = await res.json();
    console.log("📥 Respuesta del servidor:", data);

    if (!res.ok) {
      throw new Error(data.msg || "Error en la petición");
    }

    //  Login exitoso
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("doctor", JSON.stringify(data.doctor));
      loginContext(data.token, data.doctor);

      toast.success(data.msg || "¡Bienvenido!");
      setTimeout(() => navigate("/perfil"), 800); // ← CAMBIO AQUÍ
    } else {
      throw new Error("No se recibió el token");
    }
  } catch (err) {
    console.error("Error en login:", err);
    toast.error(err.message || "Hubo un error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};
  // RENDERIZADO DEL JSX
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F2F5] font-sans m-0 p-0">
      {/* HEADER */}
      <header className="w-full h-[80px] bg-[#F47CC6] m-0" />

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-[536px]">
          {/* LOGO + TITULO */}
          <div className="flex items-center gap-6 mb-8 max-[768px]:flex-col max-[768px]:text-center">
            <img
              src={dentalBosch8}
              className="w-[64px] h-[64px] object-contain"
              alt="Dental Bosch"
            />
            <h1 className="font-bold text-[3.75rem] text-[#F47CC6] max-[768px]:text-[2.5rem]">
              Dental Bosch
            </h1>
          </div>

          {/* CARD DEL FORMULARIO */}
          <div className="bg-white p-12 rounded-[30px] shadow-lg max-[768px]:p-8">
            <h2 className="text-center font-bold text-[2.5rem] mb-10 text-[#1a1a1a] max-[768px]:text-[2rem]">
              INICIO DE SESIÓN
            </h2>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {emailError && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {emailError}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex items-center gap-2">
                  {/* Botón mostrar/ocultar a la izquierda */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center h-[38px] w-[38px] text-[1.4rem] text-[#606770] hover:text-[#F47CC6] rounded-[15px] bg-[#EAEAEA]"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>

                  {/* Input de contraseña */}
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                  />
                </div>

                {/* Mostrar mensaje de error de contraseña */}
                {passwordError && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)'}}>
                    {passwordError}
                  </p>
                )}
              </div>

              {/* BOTÓN INGRESAR */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[38px] bg-[#69D1D2] text-white font-semibold text-[1rem] rounded-[15px] border-2 border-[#69D1D2] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>

              {/* ENLACE OLVIDASTE TU CONTRASEÑA */}
              <div className="text-center -mt-3">
                <button
                  type="button"
                  onClick={() => navigate("/recuperar-password")}
                  className="text-[#606770] hover:text-[#F47CC6] text-sm font-medium transition-colors bg-transparent border-0 cursor-pointer"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* BOTÓN CREAR CUENTA */}
              <button
                type="button"
                onClick={() => navigate("/crear-cuenta")}
                className="w-full h-[38px] bg-[#F47CC6] text-white font-semibold text-[1rem] rounded-[15px] border-2 border-[#F47CC6] hover:opacity-80"
              >
                Crear una cuenta
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#F47CC6] py-8 m-0">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="text-center text-[0.875rem] text-white">
            ©{new Date().getFullYear()} | Todos los derechos reservados
          </p>
        </div>
      </footer>

      {/* ToastContainer: muestra mensajes tipo toast */}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
}
