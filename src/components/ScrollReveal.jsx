import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ 
  children, 
  animation = 'slide-up',
  delay = 0,
  duration = 600,
  threshold = 0.3,
  className = ''
}) => {
  // Controla si el elemento ya es visible en pantalla
  const [isVisible, setIsVisible] = useState(false);

  // Referencia al elemento que se va a observar
  const ref = useRef(null);

  // Detecta cuando el elemento entra en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Se ejecuta solo una vez
        }
      },
      {
        threshold, // Porcentaje visible necesario para activar la animación
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Clases CSS asociadas a cada tipo de animación
  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'scale-in': 'animate-scale-in'
  };

  return (
    <div
      ref={ref}
      className={`
        ${isVisible ? animationClasses[animation] : 'opacity-0'}
        ${className}
      `}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms', // Retardo de la animación
        animationDuration: `${duration}ms`, // Duración de la animación
        animationFillMode: 'forwards'
      }}
    >
      {/* Contenido que se animará al entrar en pantalla */}
      {children}
    </div>
  );
};

export default ScrollReveal;
