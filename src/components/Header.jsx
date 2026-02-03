import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { useAuthDoctor } from '../context/storeAuth.jsx';
import { useAuthPaciente } from '../context/storeAuthPaciente.jsx';
import { toast } from 'react-toastify';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { authDoctor, logoutDoctor } = useAuthDoctor();
  const { authPaciente, logoutPaciente } = useAuthPaciente();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#servicios', text: 'Servicios', isExternal: true },
    { href: '/#nosotros', text: 'Nosotros', isExternal: true },
    { href: '/#agendar', text: 'Agendar', isExternal: true },
    { href: '/#ubicacion', text: 'Ubicación', isExternal: true },
  ];

  // Verificar si hay algún usuario autenticado
  const isAuthenticated = authDoctor?.token || authPaciente?.token;
  const currentUserType = authDoctor?.token ? 'doctor' : authPaciente?.token ? 'paciente' : null;

  const handleNavClick = (href, isExternal) => {
    setIsMobileMenuOpen(false);
    
    if (isExternal) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Para rutas internas, usar navigate directamente
      navigate(href);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-rosa shadow-large backdrop-blur-sm bg-opacity-95' 
          : 'bg-rosa shadow-md'
      }`}
    >
      <div className="w-full px-4 md:px-10 py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          {/* Logo y título */}
          <Link 
            to={isAuthenticated ? (currentUserType === 'doctor' ? "/perfil" : "/paciente/perfil") : "/"}
            className="flex items-center gap-2 md:gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <img 
              src="/imagenes/logo.png" 
              alt="D'Bosch" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:rotate-3" 
            />
            <h1 className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-gray-100">
              D'Bosch
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap gap-3 md:gap-6 text-sm md:text-lg items-center justify-center">
            {/* Mostrar enlaces públicos solo si NO está autenticado */}
            {!isAuthenticated && navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.text}
                  href={link.href}
                  onClick={() => handleNavClick(link.href, link.isExternal)}
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:scale-105 relative group"
                >
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
              ) : (
                <Link
                  key={link.text}
                  to={link.href}
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:scale-105 relative group"
                >
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}

            {/* Enlaces administrativos - solo mostrar si está autenticado como doctor */}
            {authDoctor?.token && (
              <>
                {/* El doctor ahora tiene su propio sidebar */}
              </>
            )}

            {/* Botón de login/perfil/cerrar sesión */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  if (currentUserType === 'doctor') {
                    logoutDoctor();
                  } else {
                    logoutPaciente();
                  }
                  toast.info('Sesión cerrada correctamente');
                  navigate('/login');
                }}
                className="bg-white text-rosa font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-medium text-sm md:text-base"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-rosa font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-turquesa hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-medium text-sm md:text-base"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-gray-200 transition-colors duration-300 p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <MdClose className="w-6 h-6" />
            ) : (
              <MdMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col gap-4 pt-4 pb-2">
            {/* Mostrar enlaces públicos solo si NO está autenticado */}
            {!isAuthenticated && navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.text}
                  href={link.href}
                  onClick={() => handleNavClick(link.href, link.isExternal)}
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:translate-x-2 text-base"
                >
                  {link.text}
                </a>
              ) : (
                <Link
                  key={link.text}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-gray-200 transition-all duration-300 hover:translate-x-2 text-base"
                >
                  {link.text}
                </Link>
              )
            ))}

            {/* Enlaces administrativos móviles - solo mostrar si está autenticado como doctor */}
            {authDoctor?.token && (
              <>
                {/* El doctor ahora tiene su propio sidebar */}
              </>
            )}

            {/* Botón de login/cerrar sesión móvil */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  if (currentUserType === 'doctor') {
                    logoutDoctor();
                  } else {
                    logoutPaciente();
                  }
                  toast.info('Sesión cerrada correctamente');
                  navigate('/login');
                }}
                className="bg-white text-rosa font-semibold px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-300 text-center mt-2"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white text-rosa font-semibold px-4 py-2 rounded-md hover:bg-turquesa hover:text-white transition-all duration-300 text-center mt-2"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
