import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthPaciente } from '../../context/storeAuthPaciente.jsx';
import { 
  FiHome, 
  FiCalendar, 
  FiFileText, 
  FiUser, 
  FiLogOut,
  FiSettings 
} from 'react-icons/fi';

const SidebarPaciente = () => {
  const navigate = useNavigate();
  const { authPaciente, logoutPaciente } = useAuthPaciente();

  const handleLogout = () => {
    logoutPaciente();
    navigate('/');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard-paciente',
      icon: FiHome,
      description: 'Página principal'
    },
    {
      name: 'Citas',
      path: '/paciente/citas',
      icon: FiCalendar,
      description: 'Gestionar citas'
    },
    {
      name: 'Historia Clínica',
      path: '/paciente/historia-clinica',
      icon: FiFileText,
      description: 'Ver historial médico'
    },
    {
      name: 'Mi Perfil',
      path: '/paciente/perfil',
      icon: FiUser,
      description: 'Editar perfil'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="/imagenes/logo.png" 
            alt="D'Bosch" 
            className="h-10 w-auto"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">D'Bosch</h2>
            <p className="text-xs text-gray-500">Portal Paciente</p>
          </div>
        </div>
      </div>

      {/* Info del paciente */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <FiUser className="text-pink-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {authPaciente?.paciente?.nombre} {authPaciente?.paciente?.apellido}
            </p>
            <p className="text-xs text-gray-500">
              {authPaciente?.paciente?.emailPaciente}
            </p>
            <span className="inline-block mt-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
              Activo
            </span>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs opacity-75">{item.description}</p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cerrar sesión */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarPaciente;
