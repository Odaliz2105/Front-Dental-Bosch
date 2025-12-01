import React from "react";
import { Link } from "react-router-dom";

const Servicios = () => {
  const servicios = [
    {
      id: 1,
      titulo: "Ortodoncia",
      descripcion: "Especialista en diagnóstico, prevención y tratamiento de problemas de alineación dental y maloclusión.",
      detalles: [
        "Evaluación y diagnóstico completo con exámenes clínicos y radiográficos",
        "Planificación de tratamiento personalizado para cada paciente",
        "Colocación de aparatos ortodónticos (brackets, alineadores transparentes)",
        "Ajustes y seguimiento periódico del tratamiento",
        "Colocación de retenedores para mantener los resultados",
        "Tratamiento de maloclusiones (mordida cruzada, abierta y profunda)",
        "Alineación dental para mejorar apariencia y función",
        "Mejora de la función masticatoria y salud bucal"
      ],
      tratamientos: [
        "Brackets metálicos y estéticos",
        "Alineadores transparentes (ortodoncia invisible)",
        "Expansores de arcada dental",
        "Retenedores fijos y removibles"
      ],
      color: "#f47cc6"
    },
    {
      id: 2,
      titulo: "Limpieza Dental",
      descripcion: "Procedimiento profesional para eliminar placa bacteriana, sarro y manchas de los dientes.",
      detalles: [
        "Eliminación de placa y sarro acumulado",
        "Pulido dental para eliminar manchas superficiales",
        "Aplicación de flúor para fortalecer el esmalte",
        "Prevención de enfermedades periodontales",
        "Detección temprana de problemas dentales",
        "Recomendaciones de higiene bucal personalizada"
      ],
      tratamientos: [
        "Profilaxis dental completa",
        "Limpieza profunda (raspado y alisado radicular)",
        "Aplicación tópica de flúor"
      ],
      color: "#63e1e3"
    },
    {
      id: 3,
      titulo: "Resinas y Restauraciones",
      descripcion: "Tratamientos estéticos y funcionales para reparar dientes dañados o cariados.",
      detalles: [
        "Reparación de caries con resinas del color del diente",
        "Restauraciones estéticas de dientes fracturados",
        "Reconstrucción de dientes desgastados",
        "Cierre de espacios entre dientes",
        "Mejora del contorno y forma dental",
        "Materiales de alta calidad y durabilidad"
      ],
      tratamientos: [
        "Resinas compuestas estéticas",
        "Incrustaciones (inlays y onlays)",
        "Carillas dentales",
        "Reconstrucciones dentales"
      ],
      color: "#f47cc6"
    },
    {
      id: 4,
      titulo: "Extracciones",
      descripcion: "Procedimiento quirúrgico para remover dientes que no pueden ser salvados o causan problemas.",
      detalles: [
        "Extracción de dientes con caries avanzadas",
        "Remoción de muelas del juicio",
        "Extracción de dientes retenidos o impactados",
        "Procedimientos con anestesia local",
        "Cuidados post-operatorios especializados",
        "Técnicas mínimamente invasivas"
      ],
      tratamientos: [
        "Extracciones simples",
        "Extracciones quirúrgicas",
        "Extracción de cordales",
        "Cirugía oral menor"
      ],
      color: "#63e1e3"
    },
    {
      id: 5,
      titulo: "Implantes Dentales",
      descripcion: "Solución permanente para reemplazar dientes perdidos con resultados naturales y duraderos.",
      detalles: [
        "Evaluación completa con estudios radiográficos 3D",
        "Colocación de implantes de titanio",
        "Restauración con coronas personalizadas",
        "Alta tasa de éxito y durabilidad",
        "Recuperación de función masticatoria completa",
        "Resultados estéticos naturales"
      ],
      tratamientos: [
        "Implantes unitarios",
        "Implantes múltiples",
        "Prótesis sobre implantes",
        "All-on-4 (arcada completa)"
      ],
      color: "#f47cc6"
    },
    {
      id: 6,
      titulo: "Blanqueamiento Dental",
      descripcion: "Tratamiento estético para aclarar el color de los dientes y obtener una sonrisa más brillante.",
      detalles: [
        "Evaluación del tono dental inicial",
        "Blanqueamiento profesional supervisado",
        "Resultados visibles desde la primera sesión",
        "Tratamiento seguro y sin dolor",
        "Recomendaciones para mantener resultados",
        "Opciones de tratamiento en consultorio y en casa"
      ],
      tratamientos: [
        "Blanqueamiento LED en consultorio",
        "Blanqueamiento ambulatorio con férulas",
        "Tratamiento combinado para mejores resultados"
      ],
      color: "#63e1e3"
    }
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* HEADER */}
      <header className="w-full px-4 md:px-10 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between shadow-md bg-[#f47cc6] fixed top-0 z-50 gap-3 md:gap-0">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/imagenes/logo.png" alt="D'Bosch" className="h-10 md:h-12 w-auto" />
          <h1 className="text-xl md:text-2xl font-bold text-white">D'Bosch</h1>
        </div>

        <nav className="flex flex-wrap gap-3 md:gap-6 text-sm md:text-lg items-center justify-center">
          <Link to="/" className="text-white hover:opacity-80">Inicio</Link>
          <a href="/#servicios" className="text-white hover:opacity-80">Servicios</a>
          <a href="/#nosotros" className="text-white hover:opacity-80">Nosotros</a>
          <a href="/#agendar" className="text-white hover:opacity-80">Agendar</a>
          <a href="/#ubicacion" className="text-white hover:opacity-80">Ubicación</a>

          <Link
            to="/login"
            className="bg-white text-[#f47cc6] font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-[#63e1e3] hover:text-white transition text-sm md:text-base"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-r from-[#f47cc6] to-[#63e1e3] text-white py-20 md:py-32 mt-16 md:mt-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios dentales con tecnología moderna y atención personalizada para cuidar tu sonrisa
          </p>
        </div>
      </section>

      {/* SERVICIOS DETALLADOS */}
      <section className="px-4 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="space-y-12 md:space-y-16">
          {servicios.map((servicio, index) => (
            <div 
              key={servicio.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 hover:shadow-2xl transition-all duration-300 ${
                index % 2 === 0 ? 'border-[#f47cc6]' : 'border-[#63e1e3]'
              }`}
            >
              <div className="p-6 md:p-10">
                {/* Título y descripción */}
                <div className="mb-6">
                  <h2 
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: servicio.color }}
                  >
                    {servicio.titulo}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {servicio.descripcion}
                  </p>
                </div>

                {/* Detalles del servicio */}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                    ¿Qué incluye?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {servicio.detalles.map((detalle, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-[#63e1e3] text-xl mt-1">✓</span>
                        <p className="text-gray-700">{detalle}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tratamientos */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Tratamientos disponibles:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {servicio.tratamientos.map((tratamiento, idx) => (
                      <span 
                        key={idx}
                        className="bg-white px-4 py-2 rounded-lg text-gray-700 border-2 border-gray-200 text-sm md:text-base"
                      >
                        {tratamiento}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón de contacto */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/#agendar"
                    className="bg-[#f47cc6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#dd6cb4] transition text-center"
                  >
                    Agendar Cita
                  </a>
                  <a
                    href="https://wa.me/593984062668?text=Hola, me interesa el servicio de {servicio.titulo}"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BA5A] transition text-center"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-gradient-to-r from-[#fef5fb] to-[#e6f9fa] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f47cc6] mb-4">
            ¿Necesitas más información?
          </h2>
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
            Nuestro equipo de especialistas está listo para atenderte. Trabajamos con pacientes de todas las edades y ofrecemos tratamientos personalizados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0984062668"
              className="bg-[#63e1e3] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4ac7c9] transition"
            >
              Llamar: 098 406 2668
            </a>
            <Link
              to="/"
              className="bg-white text-[#f47cc6] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-[#f47cc6]"
            >
              Volver al Inicio
            </Link>
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

export default Servicios;