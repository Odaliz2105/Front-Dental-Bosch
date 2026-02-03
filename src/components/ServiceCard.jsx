import React from 'react';

const ServiceCard = ({ 
  title, 
  description, 
  color = 'rosa', 
  delay = 0,
  children,
  className = '' 
}) => {

  // Configuración de estilos dinámicos según el color del servicio
  const colorClasses = {
    rosa: {
      border: 'border-rosa',
      text: 'text-rosa',
      bgLight: 'bg-[#fef5fb]',
      hover: 'hover:shadow-colored',
    },
    turquesa: {
      border: 'border-turquesa',
      text: 'text-turquesa',
      bgLight: 'bg-[#e6f9fa]',
      hover: 'hover:shadow-colored-turquesa',
    }
  };

  // Selecciona el esquema de colores según la prop recibida
  const currentColor = colorClasses[color] || colorClasses.rosa;

  return (
    <div 
      className={`
        bg-white shadow-large rounded-xl overflow-hidden 
        border-l-4 ${currentColor.border}
        ${currentColor.hover}
        transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
        animate-slide-up opacity-0
        ${className}
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="p-6 md:p-8">

        {/* TÍTULO DEL SERVICIO */}
        <div className="mb-4">
          <h3 className={`text-xl md:text-2xl font-bold ${currentColor.text}`}>
            {title}
          </h3>
        </div>

        {/* DESCRIPCIÓN DEL SERVICIO */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* CONTENIDO ADICIONAL (opcional) */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}

      </div>
    </div>
  );
};

export default ServiceCard;
