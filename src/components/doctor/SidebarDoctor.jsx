import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthDoctor } from '../../context/storeAuth.jsx';
import { toast } from 'react-toastify';
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiUser, 
  FiLogOut,
  FiPackage,
  FiPlus
} from 'react-icons/fi';

const SidebarDoctor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authDoctor, logoutDoctor } = useAuthDoctor();

  const menuItems = [
    {
      icon: FiHome,
      label: 'Dashboard',
      description: 'Página inicial',
      path: '/dashboard-doctor',
      color: 'text-blue-500'
    },
    {
      icon: FiUsers,
      label: 'Pacientes',
      description: 'CRUD de pacientes',
      path: '/doctor/pacientes',
      color: 'text-green-500'
    },
    {
      icon: FiPlus,
      label: 'Crear Paciente',
      description: 'Agregar nuevo paciente',
      path: '/doctor/pacientes/crear',
      color: 'text-purple-500'
    },
    {
      icon: FiCalendar,
      label: 'Citas',
      description: 'Sprint 3 - futuro',
      path: '/doctor/citas',
      color: 'text-orange-500'
    },
    {
      icon: FiPackage,
      label: 'Inventario',
      description: 'Gestión de inventario',
      path: '/inventario',
      color: 'text-teal-500'
    },
    {
      icon: FiUser,
      label: 'Mi Perfil',
      description: 'Ya lo tienes',
      path: '/perfil',
      color: 'text-indigo-500'
    }
  ];

  const handleLogout = () => {
    logoutDoctor();
    toast.info('Sesión cerrada correctamente');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200">
      {/* Header del Sidebar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="/imagenes/logo.png" 
            alt="D'Bosch" 
            className="h-10 w-auto"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">D'Bosch</h2>
            <p className="text-xs text-gray-500">Panel Doctor</p>
          </div>
        </div>
        
        {/* Info del doctor */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">
            Dr. {authDoctor?.doctor?.nombre} {authDoctor?.doctor?.apellido}
          </p>
          <p className="text-xs text-gray-500">{authDoctor?.doctor?.email}</p>
          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            {authDoctor?.doctor?.estado}
          </span>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active 
                    ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                }`}
              >
                <Icon className={`text-xl ${active ? 'text-blue-500' : item.color}`} />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer con Cerrar Sesión */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-all duration-200"
        >
          <FiLogOut className="text-xl text-red-500" />
          <div className="flex-1 text-left">
            <p className="font-medium text-sm">Cerrar Sesión</p>
            <p className="text-xs text-red-500">Salir del sistema</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SidebarDoctor;
