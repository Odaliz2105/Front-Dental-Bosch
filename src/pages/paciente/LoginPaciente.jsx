import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import dentalBosch from '../../assets/DentalBosch.png';

const LoginPaciente = () => {
  const navigate = useNavigate();
  const { loginPaciente } = useAuthPaciente();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginPaciente(email, password);
      
      if (result.success) {
        setTimeout(() => navigate('/dashboard-paciente'), 800);
      }
    } catch (err) {
      console.error("Error en login paciente:", err);
      
      // Verificar si el error es por rol incorrecto
      if (err.response?.data?.msg?.includes("doctor") || 
          err.response?.data?.msg?.includes("rol")) {
        // Mostrar alerta específica para rol incorrecto
        if (window.confirm("Parece que eres un doctor. ¿Deseas redirigirte al login de doctores?")) {
          navigate("/login");
        }
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F2F5] font-sans m-0 p-0">
      {/* HEADER */}
      <header className="w-full h-[80px] bg-[#F47CC6] m-0" />

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center px-4 py-8">
        <div className="w-full max-w-[536px]">
          {/* LOGO + TITULO */}
          <div className="flex items-center gap-6 mb-8 max-[768px]:flex-col max-[768px]:text-center">
            <button onClick={() => navigate("/")}>
              <img
                src={dentalBosch}
                className="w-[64px] h-[64px] object-contain"
                alt="Dental Bosch"
              />
            </button>

            <h1 className="font-bold text-[3.75rem] text-[#F47CC6] max-[768px]:text-[2.5rem]">
              Dental Bosch
            </h1>
          </div>

          {/* CARD DEL FORMULARIO */}
          <div className="bg-white p-12 rounded-[30px] shadow-lg max-[768px]:p-8">
            <h2 className="text-center font-bold text-[2.5rem] mb-10 text-[#1a1a1a] max-[768px]:text-[2rem]">
              PORTAL PACIENTES
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[38px] bg-[#EAEAEA] text-[#606770] rounded-[15px] px-4 text-[1rem] focus:outline-none"
                  required
                />
              </div>

              {/* BOTÓN INGRESAR */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[38px] bg-[#69D1D2] text-white font-semibold text-[1rem] rounded-[15px] border-2 border-[#69D1D2] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>

              {/* BOTÓN REGISTRO */}
              <button
                type="button"
                onClick={() => navigate("/crear-cuenta")}
                className="w-full h-[38px] bg-[#F47CC6] text-white font-semibold text-[1rem] rounded-[15px] border-2 border-[#F47CC6] hover:opacity-80"
              >
                Crear una cuenta
              </button>

              {/* BOTÓN LOGIN DOCTOR */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full h-[38px] bg-[#606770] text-white font-semibold text-[1rem] rounded-[15px] border-2 border-[#606770] hover:opacity-80"
              >
                Soy Doctor
              </button>

              {/* SEPARADOR */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O también</span>
                </div>
              </div>

              {/* SECCIÓN APP MÓVIL */}
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600 font-medium">
                  📱 <span className="text-[#F47CC6] font-bold">¡Lleva tu consultorio en el bolsillo!</span>
                </p>
                <p className="text-xs text-gray-500">
                  Gestiona pacientes, citas y más desde cualquier lugar
                </p>
                
                {/* BOTÓN PLAY STORE */}
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block max-w-[280px] mx-auto transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src="/imagenes/googleplay.jpg"
                    alt="Descargar en Google Play"
                    className="w-full h-auto rounded-[8px]"
                  />
                </a>
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
    </div>
  );
};

export default LoginPaciente;
