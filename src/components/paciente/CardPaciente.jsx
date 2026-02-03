import React from 'react';
import { toast } from 'react-toastify';

const CardPaciente = ({ paciente, onActualizar, onDarBaja, onVerDetalle }) => {
  const handleActualizar = () => {
    if (onActualizar) {
      onActualizar(paciente._id);
    }
  };

  const handleDarBaja = () => {
    if (onDarBaja && paciente.estadoPaciente) {
      if (window.confirm('¿Estás seguro de dar de baja a este paciente?')) {
        onDarBaja(paciente._id);
      }
    } else {
      toast.warning('El paciente ya está inactivo');
    }
  };

  const handleVerDetalle = () => {
    if (onVerDetalle) {
      onVerDetalle(paciente._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header del Card */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {paciente.nombre} {paciente.apellido}
          </h3>
          <p className="text-sm text-gray-600">{paciente.emailPaciente}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          paciente.estadoPaciente
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {paciente.estadoPaciente ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Información del Paciente */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Cédula</p>
            <p className="font-medium text-gray-800">{paciente.cedula}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="font-medium text-gray-800">
              {paciente.telefono || 'No especificado'}
            </p>
          </div>
        </div>

        {paciente.direccion && (
          <div>
            <p className="text-sm text-gray-500">Dirección</p>
            <p className="font-medium text-gray-800">{paciente.direccion}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Fecha de Registro</p>
            <p className="font-medium text-gray-800">
              {new Date(paciente.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Última Actualización</p>
            <p className="font-medium text-gray-800">
              {new Date(paciente.updatedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
        <button
          onClick={handleVerDetalle}
          className="flex-1 bg-teal-500 text-white px-3 py-2 rounded text-sm hover:bg-teal-600 transition-colors"
        >
          Ver Detalle
        </button>
        
        <button
          onClick={handleActualizar}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Actualizar
        </button>
        
        {paciente.estadoPaciente && onDarBaja && (
          <button
            onClick={handleDarBaja}
            className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
          >
            Dar de Baja
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPaciente;
