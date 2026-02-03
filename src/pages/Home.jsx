import React, { useState, useEffect } from "react";
import GoogleMaps from "../components/GoogleMaps";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import ScrollReveal from "../components/ScrollReveal";

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
    <div className="w-full bg-white min-h-screen">
      <Header />

      {/* SLIDER NUEVO */}
      <section id="inicio" className="w-full min-h-[90vh] md:min-h-[85vh] sm:min-h-[70vh] mt-16 md:mt-20 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col md:flex-row relative overflow-hidden">

        {/* TEXTO IZQUIERDA */}
        <ScrollReveal animation="slide-right" delay={200} className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-10 lg:px-16 py-6 md:py-0">
          <div className="text-left max-w-md lg:max-w-lg space-y-6">
            <div className="space-y-4">
              <h2 className="text-rosa text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Cuidamos tu <span className="text-turquesa">sonrisa</span>
              </h2>
              
              <div className="w-24 h-1 bg-turquesa rounded-full animate-slide-left"></div>
            </div>

            <p className="text-negro text-lg md:text-xl lg:text-2xl leading-relaxed font-medium">
              Atención profesional con tecnología moderna y diagnósticos precisos.
            </p>

            <div className="space-y-4">
              <a
                href="#agendar"
                className="inline-flex items-center gap-3 bg-turquesa text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#4ac7c9] transition-all duration-300 hover:scale-105 hover:shadow-large text-lg md:text-xl group"
              >
                Agendar Cita
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </a>
              
              <div className="flex gap-4 text-sm md:text-base text-gris-medio">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-turquesa rounded-full animate-pulse-soft"></span>
                  Especialistas certificados
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-rosa rounded-full animate-pulse-soft" style={{ animationDelay: '1s' }}></span>
                  Tecnología moderna
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* IMAGEN DERECHA */}
        <ScrollReveal animation="slide-left" delay={400} className="w-full md:w-1/2 relative h-[50vh] md:h-full">
          <div className="relative w-full h-full">
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-contain transition-all duration-1000 ease-in-out"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-rosa/10 to-transparent pointer-events-none"></div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-300 ${
                    index === current
                      ? "bg-white w-8 h-2 rounded-full"
                      : "bg-white/50 hover:bg-white/70 w-2 h-2 rounded-full"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Flechas */}
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-medium z-10 group"
              aria-label="Previous slide"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform duration-300">❮</span>
            </button>

            <button
              onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-medium z-10 group"
              aria-label="Next slide"
            >
              <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">❯</span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-4 md:px-10 py-16 md:py-24 bg-gradient-to-b from-white to-[#fef5fb]">
        <ScrollReveal animation="fade-in" delay={200}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rosa mb-4">
              Servicios Principales
            </h2>
            <div className="w-24 h-1 bg-turquesa rounded-full mx-auto animate-slide-left"></div>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              Ofrecemos tratamientos dentales de alta calidad con tecnología moderna
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {[
            { title: "Limpieza Dental", color: "turquesa" },
            { title: "Ortodoncia", color: "rosa" },
            { title: "Resinas / Restauraciones", color: "turquesa" },
            { title: "Extracciones", color: "rosa" },
            { title: "Implantes", color: "turquesa" },
            { title: "Blanqueamiento Dental", color: "rosa" }
          ].map((servicio, index) => (
            <ScrollReveal key={servicio.title} animation="slide-up" delay={200 + index * 100}>
              <ServiceCard
                title={servicio.title}
                description="Procedimiento realizado por especialistas con equipos modernos."
                color={servicio.color}
              >
                <div className="mt-4">
                  <a
                    href="/servicios"
                    className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3 ${
                      servicio.color === 'rosa' ? 'text-rosa hover:text-rosa/80' : 'text-turquesa hover:text-turquesa/80'
                    }`}
                  >
                    Ver más
                    <span>→</span>
                  </a>
                </div>
              </ServiceCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-in" delay={800} className="flex justify-center mt-12">
          <a
            href="/servicios"
            className="inline-flex items-center gap-3 bg-turquesa text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#4ac7c9] transition-all duration-300 hover:scale-105 hover:shadow-large text-lg group"
          >
            Ver todos los servicios
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
          </a>
        </ScrollReveal>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section id="nosotros" className="bg-[#fef5fb] px-4 md:px-10 py-16 md:py-24">
        <ScrollReveal animation="fade-in" delay={200}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rosa mb-4">
              ¿Por qué elegirnos?
            </h2>
            <div className="w-24 h-1 bg-turquesa rounded-full mx-auto animate-slide-left"></div>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              La combinación perfecta de experiencia, tecnología y atención personalizada
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <ScrollReveal animation="slide-up" delay={300}>
            <div className="p-8 bg-white shadow-large rounded-xl border-t-4 border-rosa hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-rosa/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-rosa">✓</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl text-rosa mb-4">Profesionales Certificados</h3>
              <p className="text-gray-700 leading-relaxed">
                Experiencia en atención dental integral con especialistas altamente calificados.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={400}>
            <div className="p-8 bg-white shadow-large rounded-xl border-t-4 border-turquesa hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-turquesa/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-turquesa">⚡</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl text-turquesa mb-4">Tecnología Moderna</h3>
              <p className="text-gray-700 leading-relaxed">
                Diagnósticos precisos y tratamientos avanzados con equipos de última generación.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-up" delay={500}>
            <div className="p-8 bg-white shadow-large rounded-xl border-t-4 border-rosa hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-rosa/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-rosa">❤</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl text-rosa mb-4">Atención Personalizada</h3>
              <p className="text-gray-700 leading-relaxed">
                Seguimiento completo para cada paciente con tratamientos individualizados.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AGENDAR CITA */}
      <section id="agendar" className="px-4 md:px-10 py-16 md:py-24 bg-white">
        <ScrollReveal animation="fade-in" delay={200}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rosa mb-4">
              Agendar Cita
            </h2>
            <div className="w-24 h-1 bg-turquesa rounded-full mx-auto animate-slide-left"></div>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              Reserva tu consulta de forma rápida y sencilla
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={400}>
          <form
            onSubmit={enviarWhatsApp}
            className="max-w-2xl mx-auto bg-gradient-to-br from-[#fef5fb] to-white p-8 md:p-10 rounded-2xl shadow-large border border-rosa/20 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nombre Completo</label>
                <input 
                  name="nombre" 
                  type="text" 
                  placeholder="Tu nombre" 
                  className="w-full p-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 transition-all duration-300" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                <input 
                  name="telefono" 
                  type="text" 
                  placeholder="098 406 2668" 
                  className="w-full p-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 transition-all duration-300" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Fecha Sugerida</label>
              <input 
                name="fecha" 
                type="date" 
                className="w-full p-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 transition-all duration-300" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Motivo de consulta</label>
              <textarea 
                name="motivo" 
                placeholder="Cuéntanos sobre tu consulta..." 
                className="w-full p-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:border-turquesa focus:ring-2 focus:ring-turquesa/20 transition-all duration-300 resize-none" 
                rows="4" 
                required 
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-rosa text-white py-4 rounded-xl font-semibold hover:bg-[#dd6cb4] transition-all duration-300 hover:scale-[1.02] hover:shadow-large text-lg group"
            >
              <span className="flex items-center justify-center gap-3">
                Enviar a WhatsApp
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </button>
          </form>
        </ScrollReveal>
      </section>

      {/* UBICACIÓN CON GOOGLE MAPS */}
      <section id="ubicacion" className="px-4 md:px-10 py-16 md:py-24 bg-gradient-to-b from-white to-[#fef5fb]">
        <ScrollReveal animation="fade-in" delay={200}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rosa mb-4">
              Encuéntranos
            </h2>
            <div className="w-24 h-1 bg-turquesa rounded-full mx-auto animate-slide-left"></div>
            <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
              Visítanos en nuestra clínica en el corazón de Quito
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Información de contacto */}
          <ScrollReveal animation="slide-right" delay={400} className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-large border-l-4 border-turquesa hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-turquesa/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-rosa mb-3">Dirección</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Avenida 10 de Agosto N21-182<br />
                    2do piso<br />
                    Quito, Ecuador
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-large border-l-4 border-rosa hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rosa/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-turquesa mb-3">Contacto</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex items-center gap-2">
                      <strong>Teléfono:</strong> 
                      <a href="tel:0984062668" className="text-turquesa hover:underline transition-colors duration-300">
                        098 406 2668
                      </a>
                    </p>
                    <p><strong>Email:</strong> info@dbosch.com</p>
                    <p><strong>Horario:</strong> Lun - Sáb: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-large border-l-4 border-turquesa hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-turquesa/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💬</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-rosa mb-4">Redes Sociales</h3>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://wa.me/593984062668" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 hover:shadow-medium font-medium"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#1877F2] text-white px-6 py-3 rounded-xl hover:bg-[#165DC4] transition-all duration-300 hover:scale-105 hover:shadow-medium font-medium"
                    >
                      Facebook
                    </a>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#E4405F] text-white px-6 py-3 rounded-xl hover:bg-[#C13584] transition-all duration-300 hover:scale-105 hover:shadow-medium font-medium"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Mapa de Google con API */}
          <ScrollReveal animation="slide-left" delay={600} className="h-[500px] lg:h-full rounded-2xl overflow-hidden shadow-xl">
            <GoogleMaps />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;