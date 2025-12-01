import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import dentalBosch8 from "../assets/DentalBosch.png";

// CONFIGURACIÓN DE LA API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_ENDPOINTS = {
  REGISTRO: `${API_URL}/api/doctor/registro`,
};

export default function CrearCuenta() {
  const navigate = useNavigate();

  // ESTADOS LOCALES
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    especialidad: "",
    telefono: "",
    direccion: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // REGEX PARA VALIDACIONES
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const telefonoRegex = /^[0-9]{10}$/;

  // FUNCIÓN PARA MANEJAR CAMBIOS EN LOS INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // FUNCIÓN PARA VALIDAR CAMPOS
  const validarCampos = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Correo electrónico inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.especialidad.trim()) {
      newErrors.especialidad = "La especialidad es requerida";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!telefonoRegex.test(formData.telefono.trim())) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // FUNCIÓN PARA ENVIAR FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    setLoading(true);

    try {
      console.log("Enviando petición a:", API_ENDPOINTS.REGISTRO);

      const res = await fetch(API_ENDPOINTS.REGISTRO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          especialidad: formData.especialidad.trim(),
          telefono: formData.telefono.trim(),
          direccion: formData.direccion.trim(),
        }),
      });

      const data = await res.json();
      console.log(" Respuesta del servidor:", data);

      if (!res.ok) {
        throw new Error(data.msg || "Error en la petición");
      }

      // Registro exitoso
      toast.success(data.msg || "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.");
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        especialidad: "",
        telefono: "",
        direccion: "",
      });

      // Redirigir al login después de 3 segundos
      setTimeout(() => navigate("/login"), 3000);

    } catch (err) {
      console.error("Error en registro:", err);
      toast.error(err.message || "Hubo un error al crear la cuenta");
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
              CREAR CUENTA
            </h2>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

              {/* NOMBRE */}
              <div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {errors.nombre && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.nombre}
                  </p>
                )}
              </div>

              {/* APELLIDO */}
              <div>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {errors.apellido && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.apellido}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {errors.email && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center h-[38px] w-[38px] text-[1.4rem] text-[#606770] hover:text-[#F47CC6] rounded-[15px] bg-[#EAEAEA]"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex-1 h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                  />
                </div>
                {errors.password && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* ESPECIALIDAD */}
              <div>
                <input
                  type="text"
                  name="especialidad"
                  placeholder="Especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {errors.especialidad && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.especialidad}
                  </p>
                )}
              </div>

              {/* TELÉFONO */}
              <div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono (10 dígitos)"
                  value={formData.telefono}
                  onChange={handleChange}
                  maxLength="10"
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {errors.telefono && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.telefono}
                  </p>
                )}
              </div>

              {/* DIRECCIÓN */}
              <div>
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                />
                {errors.direccion && (
                  <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                    {errors.direccion}
                  </p>
                )}
              </div>

              {/* BOTÓN CREAR CUENTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[38px] bg-[#F47CC6] text-white font-semibold text-[1rem] rounded-[15px] border-2 border-[#F47CC6] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>

              {/* ENLACE VOLVER AL LOGIN */}
              <div className="text-center -mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-[#606770] hover:text-[#F47CC6] text-sm font-medium transition-colors bg-transparent border-0 cursor-pointer"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>

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