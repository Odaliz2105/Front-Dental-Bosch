export const CardProfile = ({ doctor }) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full border border-[#f8addc]">

            {/* INFORMACIÓN */}
            <div className="space-y-3 text-gray-700">
                <p><b className="text-[#f47cc6]">Nombre:</b> <span className="ml-2">{doctor?.nombre || 'No disponible'}</span></p>
                <p><b className="text-[#f47cc6]">Apellido:</b> <span className="ml-2">{doctor?.apellido || 'No disponible'}</span></p>
                <p><b className="text-[#f47cc6]">Dirección:</b> <span className="ml-2">{doctor?.direccion || 'No disponible'}</span></p>
                <p><b className="text-[#f47cc6]">Teléfono:</b> <span className="ml-2">{doctor?.telefono || 'No disponible'}</span></p>
                <p><b className="text-[#f47cc6]">Correo:</b> <span className="ml-2">{doctor?.email || 'No disponible'}</span></p>
                <p><b className="text-[#f47cc6]">Especialidad:</b> <span className="ml-2">{doctor?.especialidad || 'No disponible'}</span></p>
            </div>

        </div>
    );
};
