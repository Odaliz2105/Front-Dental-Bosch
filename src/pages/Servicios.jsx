import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

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
      color: "#63e1e3"
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
      color: "#63e1e3"
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
      color: "#63e1e3"
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
      <Header />

      {/* HERO SECTION */}
      <section className="w-full bg-gradient-to-br from-rosa to-turquesa text-white py-20 md:py-32 mt-16 md:mt-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <ScrollReveal animation="slide-up" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Nuestros <span className="text-yellow-300">Servicios</span>
            </h1>
            <div className="w-32 h-1 bg-white rounded-full mx-auto mb-6 animate-slide-left"></div>
            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Ofrecemos una amplia gama de servicios dentales con tecnología moderna y atención personalizada para cuidar tu sonrisa
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICIOS DETALLADOS */}
      <section className="px-4 md:px-10 py-16 md:py-24 max-w-7xl mx-auto bg-gradient-to-b from-white to-[#fef5fb]">
        <div className="space-y-16 md:space-y-24">
          {servicios.map((servicio, index) => (
            <ScrollReveal key={servicio.id} animation="slide-up" delay={200 + index * 100}>
              <div 
                className={`bg-white rounded-2xl shadow-large overflow-hidden border-t-4 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  index % 2 === 0 ? 'border-rosa' : 'border-turquesa'
                }`}
              >
                <div className="p-8 md:p-12">
                  {/* Título y descripción */}
                  <div className="mb-8">
                    <h2 
                      className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
                        index % 2 === 0 ? 'text-rosa' : 'text-turquesa'
                      }`}
                    >
                      {servicio.titulo}
                    </h2>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mb-6"></div>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-4xl">
                      {servicio.descripcion}
                    </p>
                  </div>

                  {/* Detalles del servicio */}
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                      ¿Qué incluye?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {servicio.detalles.map((detalle, idx) => (
                        <div key={idx} className="flex items-start gap-3 group">
                          <span className={`text-xl mt-1 flex-shrink-0 ${
                            index % 2 === 0 ? 'text-rosa' : 'text-turquesa'
                          }`}>
                            ✓
                          </span>
                          <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                            {detalle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tratamientos */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      Tratamientos disponibles:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {servicio.tratamientos.map((tratamiento, idx) => (
                        <span 
                          key={idx}
                          className="bg-white px-6 py-3 rounded-xl text-gray-700 border-2 border-gray-200 text-base md:text-lg hover:border-turquesa hover:text-turquesa transition-all duration-300 hover:scale-105 shadow-soft"
                        >
                          {tratamiento}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botones de contacto */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a
                      href="/#agendar"
                      className={`flex-1 text-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-large text-lg ${
                        index % 2 === 0 
                          ? 'bg-rosa text-white hover:bg-[#dd6cb4]' 
                          : 'bg-turquesa text-white hover:bg-[#4ac7c9]'
                      }`}
                    >
                      Agendar Cita
                    </a>
                    <a
                      href={`https://wa.me/593984062668?text=Hola, me interesa el servicio de ${servicio.titulo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 hover:shadow-large text-center text-lg"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Información adicional */}
        <ScrollReveal animation="fade-in" delay={800}>
          <div className="mt-20 bg-gradient-to-r from-rosa/10 to-turquesa/10 rounded-3xl p-12 md:p-16 text-center border border-rosa/20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-rosa mb-6">
              ¿Necesitas más información?
            </h2>
            <div className="w-24 h-1 bg-turquesa rounded-full mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Nuestro equipo de especialistas está listo para atenderte. Trabajamos con pacientes de todas las edades y ofrecemos tratamientos personalizados.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:0984062668"
                className="bg-turquesa text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#4ac7c9] transition-all duration-300 hover:scale-105 hover:shadow-large text-lg group"
              >
                <span className="flex items-center justify-center gap-3">
                  📞 Llamar: 098 406 2668
                  <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </a>
              <Link
                to="/"
                className="bg-white text-rosa px-10 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-large border-2 border-rosa text-lg group"
              >
                <span className="flex items-center justify-center gap-3">
                  Volver al Inicio
                  <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default Servicios;