import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime, MdWhatsapp } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/593984062668',
      icon: <MdWhatsapp className="w-5 h-5" />,
      bgColor: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#20BA5A]',
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com',
      icon: <span className="w-5 h-5 flex items-center justify-center font-bold">f</span>,
      bgColor: 'bg-[#1877F2]',
      hoverColor: 'hover:bg-[#165DC4]',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: <span className="w-5 h-5 flex items-center justify-center font-bold">📷</span>,
      bgColor: 'bg-[#E4405F]',
      hoverColor: 'hover:bg-[#C13584]',
    },
  ];

  return (
    <footer className="bg-rosa text-white">
      <div className="w-full px-4 md:px-10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Clinic Info */}
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/imagenes/logo.png" 
                  alt="D'Bosch" 
                  className="h-12 w-auto transition-transform duration-300 hover:rotate-3" 
                />
                <h3 className="text-xl md:text-2xl font-bold">D'Bosch</h3>
              </div>
              <p className="text-gray-100 text-sm leading-relaxed">
                Clínica dental especializada en brindar sonrisas saludables con tecnología moderna y atención personalizada.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 animate-slide-up">
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              
              <div className="flex items-start gap-3 group">
                <MdLocationOn className="w-5 h-5 mt-1 text-gray-200 group-hover:text-white transition-colors duration-300" />
                <div>
                  <p className="text-gray-100 text-sm">Avenida 10 de Agosto N21-182</p>
                  <p className="text-gray-100 text-sm">2do piso, Quito, Ecuador</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <MdPhone className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors duration-300" />
                <a 
                  href="tel:0984062668" 
                  className="text-gray-100 text-sm hover:text-white transition-colors duration-300"
                >
                  098 406 2668
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <MdEmail className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors duration-300" />
                <a 
                  href="mailto:info@dbosch.com" 
                  className="text-gray-100 text-sm hover:text-white transition-colors duration-300"
                >
                  info@dbosch.com
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <MdAccessTime className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors duration-300" />
                <div>
                  <p className="text-gray-100 text-sm">Lun - Sáb: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              
              <div className="space-y-2">
                <Link 
                  to="/" 
                  className="block text-gray-100 text-sm hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Inicio
                </Link>
                <a 
                  href="/#servicios" 
                  className="block text-gray-100 text-sm hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Servicios
                </a>
                <a 
                  href="/#nosotros" 
                  className="block text-gray-100 text-sm hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Nosotros
                </a>
                <a 
                  href="/#agendar" 
                  className="block text-gray-100 text-sm hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Agendar Cita
                </a>
                <Link 
                  to="/login" 
                  className="block text-gray-100 text-sm hover:text-white transition-all duration-300 hover:translate-x-2"
                >
                  Portal Doctores
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.bgColor} ${social.hoverColor} text-white p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-medium`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href="https://wa.me/593984062668?text=Hola, me gustaría agendar una cita"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-turquesa hover:bg-[#4ac7c9] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-medium text-sm"
                >
                  <MdWhatsapp className="w-4 h-4" />
                  Agendar por WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-100 text-sm">
                © {currentYear} D'Bosch - Todos los derechos reservados
              </p>
              
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-100 hover:text-white transition-colors duration-300">
                  Política de Privacidad
                </a>
                <a href="#" className="text-gray-100 hover:text-white transition-colors duration-300">
                  Términos de Servicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
