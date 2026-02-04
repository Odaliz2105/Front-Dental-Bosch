import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarPaciente from './SidebarPaciente.jsx';

const PacienteLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar fijo a la izquierda */}
      <SidebarPaciente />
      
      {/* Contenido principal */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PacienteLayout;
