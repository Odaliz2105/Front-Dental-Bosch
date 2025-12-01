import React, { useState, useEffect } from "react";
import GoogleMaps from "../components/GoogleMaps";

const Home = () => {
  // Slider - 6 imágenes de la clínica dental
  const images = [
    "/imagenes/diente1.jpg",
    "/imagenes/diente2.jpg",
    "/imagenes/diente3.jpg",
    "/imagenes/diente4.jpg",
    "/imagenes/diente5.jpg",
    "/imagenes/diente6.jpg"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp - CAMBIA EL NÚMERO DE WHATSAPP
  const enviarWhatsApp = (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const telefono = e.target.telefono.value;
    const motivo = e.target.motivo.value;
    const fecha = e.target.fecha.value;

    const mensaje = `Hola, soy ${nombre}. Mi teléfono es ${telefono}. 
Motivo de consulta: ${motivo}. 
Fecha sugerida: ${fecha}.`;

    const url = `https://wa.me/593984062668?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full bg-white">

      {/* HEADER */}
      <header className="w-full px-4 md:px-10 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between shadow-md bg-[#f47cc6] fixed top-0 z-50 gap-3 md:gap-0">
        {/* Logo y título */}
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/imagenes/logo.png" alt="D'Bosch" className="h-10 md:h-12 w-auto" />
          <h1 className="text-xl md:text-2xl font-bold text-white">D'Bosch</h1>
        </div>

        <nav className="flex flex-wrap gap-3 md:gap-6 text-sm md:text-lg items-center justify-center">
          <a href="#" className="text-white hover:opacity-80">Inicio</a>
          <a href="#servicios" className="text-white hover:opacity-80">Servicios</a>
          <a href="#nosotros" className="text-white hover:opacity-80">Nosotros</a>
          <a href="#agendar" className="text-white hover:opacity-80">Agendar</a>
          <a href="#ubicacion" className="text-white hover:opacity-80">Ubicación</a>

          <a
            href="/login"
            className="bg-white text-[#f47cc6] font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-[#63e1e3] hover:text-white transition text-sm md:text-base"
          >
            Login
          </a>
        </nav>
      </header>

      {/* SLIDER NUEVO */}
      <section className="w-full h-[90vh] md:h-[85vh] sm:h-[70vh] mt-20 md:mt-16 bg-gray-100 flex flex-col md:flex-row">

        {/* TEXTO IZQUIERDA */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-10 lg:px-16 py-6 md:py-0">
          <div className="text-left max-w-md lg:max-w-lg">
            <h2 className="text-[#f47cc6] text-3xl md:text-4xl lg:text-5xl font-bold">
              Cuidamos tu sonrisa
            </h2>

            <p className="text-[#000000] mt-3 md:mt-4 text-sm md:text-base lg:text-lg">
              Atención profesional con tecnología moderna y diagnósticos precisos.
            </p>

            <a
              href="#agendar"
              className="mt-4 md:mt-6 inline-block bg-[#63e1e3] text-white px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-[#4ac7c9] transition text-sm md:text-base shadow-lg"
            >
              Agendar Cita
            </a>
          </div>
        </div>

        {/* IMAGEN DERECHA */}
        <div className="w-full md:w-1/2 relative h-[40vh] md:h-full">
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-contain bg-black/5 transition-all duration-700"
          />

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === current
                    ? "bg-white w-6 md:w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Flechas */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition z-10"
          >
            ❮
          </button>

          <button
            onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full transition z-10"
          >
            ❯
          </button>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-4 md:px-10 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f47cc6] mb-8 md:mb-10">
          Servicios Principales
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {[
            "Limpieza Dental",
            "Ortodoncia",
            "Resinas / Restauraciones",
            "Extracciones",
            "Implantes",
            "Blanqueamiento Dental"
          ].map((servicio) => (
            <div
              key={servicio}
              className="bg-white shadow-lg p-5 md:p-6 rounded-xl border-l-4 border-[#63e1e3] hover:shadow-2xl transition"
            >
              <h3 className="text-lg md:text-xl font-semibold text-[#f47cc6]">{servicio}</h3>
              <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-base">
                Procedimiento realizado por especialistas con equipos modernos.
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-10">
          <a
            href="/servicios"
            className="text-white bg-[#63e1e3] px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-[#4ac7c9] transition text-sm md:text-base"
          >
            Ver +
          </a>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section id="nosotros" className="bg-[#fef5fb] px-4 md:px-10 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f47cc6] mb-8 md:mb-10">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          <div className="p-5 md:p-6 bg-white shadow-xl rounded-xl border-t-4 border-[#f47cc6]">
            <h3 className="font-bold text-lg md:text-xl text-[#f47cc6]">Profesionales Certificados</h3>
            <p className="mt-2 text-gray-700 text-sm md:text-base">
              Experiencia en atención dental integral.
            </p>
          </div>

          <div className="p-5 md:p-6 bg-white shadow-xl rounded-xl border-t-4 border-[#63e1e3]">
            <h3 className="font-bold text-lg md:text-xl text-[#63e1e3]">Tecnología Moderna</h3>
            <p className="mt-2 text-gray-700 text-sm md:text-base">
              Diagnósticos precisos y tratamientos avanzados.
            </p>
          </div>

          <div className="p-5 md:p-6 bg-white shadow-xl rounded-xl border-t-4 border-[#f47cc6] sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg md:text-xl text-[#f47cc6]">Atención Personalizada</h3>
            <p className="mt-2 text-gray-700 text-sm md:text-base">
              Seguimiento completo para cada paciente.
            </p>
          </div>
        </div>
      </section>

      {/* AGENDAR CITA */}
      <section id="agendar" className="px-4 md:px-10 py-12 md:py-20 bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f47cc6] mb-8 md:mb-10">
          Agendar Cita
        </h2>

        <form
          onSubmit={enviarWhatsApp}
          className="max-w-xl mx-auto bg-[#fef5fb] p-6 md:p-8 rounded-xl shadow-xl border border-[#f47cc6]/20 space-y-3 md:space-y-4"
        >
          <input name="nombre" type="text" placeholder="Nombre Completo" className="w-full p-2.5 md:p-3 rounded-lg border text-sm md:text-base" required />
          <input name="telefono" type="text" placeholder="Teléfono" className="w-full p-2.5 md:p-3 rounded-lg border text-sm md:text-base" required />
          <input name="fecha" type="date" className="w-full p-2.5 md:p-3 rounded-lg border text-sm md:text-base" required />
          <textarea name="motivo" placeholder="Motivo de consulta" className="w-full p-2.5 md:p-3 rounded-lg border text-sm md:text-base" rows="4" required />

          <button className="w-full bg-[#f47cc6] text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-[#dd6cb4] text-sm md:text-base">
            Enviar a WhatsApp
          </button>
        </form>
      </section>

      {/* UBICACIÓN CON GOOGLE MAPS */}
      <section id="ubicacion" className="px-4 md:px-10 py-12 md:py-20 bg-[#fef5fb]">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f47cc6] mb-8 md:mb-10">
          Encuéntranos
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#63e1e3]">
              <h3 className="font-bold text-xl text-[#f47cc6] mb-4">📍 Dirección</h3>
              <p className="text-gray-700">
                Avenida 10 de Agosto N21-182<br />
                2do piso<br />
                Quito, Ecuador
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#f47cc6]">
              <h3 className="font-bold text-xl text-[#63e1e3] mb-4">📞 Contacto</h3>
              <p className="text-gray-700">
                <strong>Teléfono:</strong> <a href="tel:0984062668" className="text-[#63e1e3] hover:underline">098 406 2668</a><br />
                <strong>Email:</strong> info@dbosch.com<br />
                <strong>Horario:</strong> Lun - Sáb: 9:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#63e1e3]">
              <h3 className="font-bold text-xl text-[#f47cc6] mb-4">💬 Redes Sociales</h3>
              <div className="flex gap-4">
                <a href="https://wa.me/593984062668" target="_blank" rel="noopener noreferrer" 
                   className="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20BA5A] transition">
                  WhatsApp
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-[#165DC4] transition">
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="bg-[#E4405F] text-white px-4 py-2 rounded-lg hover:bg-[#C13584] transition">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Mapa de Google con API */}
          <div className="h-[400px] md:h-full rounded-xl overflow-hidden shadow-xl">
            <GoogleMaps />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f47cc6] text-white text-center py-8 md:py-10 px-4">
        <h3 className="text-lg md:text-xl font-bold">D'Bosch - Clínica Dental</h3>
        <p className="mt-2 text-sm md:text-base">Avenida 10 de Agosto N21-182, 2do piso</p>
        <p className="mt-1 text-sm md:text-base">Horarios: Lunes a Sábado 9:00 AM - 6:00 PM</p>
        <p className="mt-1 text-sm md:text-base">Teléfono: 098 406 2668</p>
        <p className="mt-1 text-sm md:text-base">Quito - Ecuador</p>

        <p className="mt-4 text-xs md:text-sm">© 2025 D'Bosch - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Home;