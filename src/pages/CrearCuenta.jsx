import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doctorService, pacienteService } from "../services/authService.js";
import { FiClock } from "react-icons/fi";

import dentalBosch8 from "../assets/DentalBosch.png";

// CONFIGURACIÓN DE LA API
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const API_ENDPOINTS = {
  REGISTRO_DOCTOR: `${API_URL}/api/doctor/registro`,
  REGISTRO_PACIENTE: `${API_URL}/api/paciente/registro`,
};

export default function CrearCuenta() {
  const navigate = useNavigate();

  // ESTADOS LOCALES
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    cedula: "",
    fechaNacimiento: "",
    genero: "",
  });

  const [userType, setUserType] = useState("paciente"); // Por defecto paciente

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // REGEX PARA VALIDACIONES
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const telefonoRegex = /^[0-9]{10}$/;
  const cedulaRegex = /^[0-9]{10}$/;

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

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!telefonoRegex.test(formData.telefono.trim())) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    // Validaciones específicas para pacientes
    if (userType === "paciente") {
      if (!formData.cedula.trim()) {
        newErrors.cedula = "La cédula es requerida";
      } else if (!cedulaRegex.test(formData.cedula.trim())) {
        newErrors.cedula = "La cédula debe tener 10 dígitos";
      }

      if (!formData.fechaNacimiento) {
        newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
      }

      if (!formData.genero) {
        newErrors.genero = "El género es requerido";
      }
    } else {
      // Validación de dirección solo para doctores
      if (!formData.direccion.trim()) {
        newErrors.direccion = "La dirección es requerida";
      }
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
      let result;
      
      if (userType === "paciente") {
        // Registro de paciente
        result = await pacienteService.registro({
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          emailPaciente: formData.email.trim(),
          password: formData.password.trim(),
          telefono: formData.telefono.trim(),
          cedula: formData.cedula.trim(),
          fechaNacimiento: formData.fechaNacimiento,
          genero: formData.genero,
        });
        toast.success(result.msg || "¡Registro exitoso! Ya puedes iniciar sesión.");
      } else {
        // Registro de doctor
        result = await doctorService.registro({
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          telefono: formData.telefono.trim(),
          direccion: formData.direccion.trim(),
        });
        toast.success(result.msg || "¡Registro exitoso! Tu cuenta queda pendiente de aprobación.");
      }
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: "",
        direccion: "",
        cedula: "",
        fechaNacimiento: "",
        genero: "",
      });

      // Redirigir al login después de 3 segundos
      setTimeout(() => navigate("/login"), 3000);

    } catch (err) {
      console.error("Error en registro:", err);
      toast.error(err.response?.data?.msg || err.message || "Hubo un error al crear la cuenta");
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

            {/* SELECTOR DE TIPO DE USUARIO */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de cuenta
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setUserType("paciente")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    userType === "paciente"
                      ? "bg-[#F47CC6] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Paciente
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("doctor")}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    userType === "doctor"
                      ? "bg-[#F47CC6] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Doctor
                </button>
              </div>
            </div>

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

              {/* CAMPOS ESPECÍFICOS PARA PACIENTES */}
              {userType === "paciente" && (
                <>
                  {/* CÉDULA */}
                  <div>
                    <input
                      type="text"
                      name="cedula"
                      placeholder="Cédula (10 dígitos)"
                      value={formData.cedula}
                      onChange={handleChange}
                      maxLength="10"
                      className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                    />
                    {errors.cedula && (
                      <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                        {errors.cedula}
                      </p>
                    )}
                  </div>

                  {/* FECHA DE NACIMIENTO */}
                  <div>
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                    />
                    {errors.fechaNacimiento && (
                      <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                        {errors.fechaNacimiento}
                      </p>
                    )}
                  </div>

                  {/* GÉNERO */}
                  <div>
                    <select
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                      className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                    >
                      <option value="">Selecciona tu género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.genero && (
                      <p className="font-semibold text-sm mt-1" style={{ color: 'var(--rojo-error)' }}>
                        {errors.genero}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* DIRECCIÓN (SOLO PARA DOCTORES) */}
              {userType === "doctor" && (
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
              )}

              {/* INFORMACIÓN DE APROBACIÓN */}
              {userType === "doctor" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-2">
                    <FiClock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Importante:</p>
                      <p>Tu cuenta quedará en estado <span className="font-semibold">pendiente de aprobación</span>. Un doctor administrador deberá aprobarla antes de que puedas acceder al sistema.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* BOTÓN LOGIN CON GOOGLE - SOLO PARA PACIENTES */}
              {userType === "paciente" && (
                <div className="mt-4">
                  <div className="relative mb-3">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">O continúa con</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}paciente/auth/google`}
                    className="w-full h-[38px] bg-white text-gray-700 font-semibold text-[1rem] rounded-[15px] border-2 border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar con Google
                  </button>
                </div>
              )}

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