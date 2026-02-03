import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarDoctor from './SidebarDoctor.jsx';

const DoctorLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar fijo a la izquierda */}
      <SidebarDoctor />
      
      {/* Contenido principal */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
