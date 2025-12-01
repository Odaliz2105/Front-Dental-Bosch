export const CardProfile = () => {

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full border border-[#f8addc]">

            {/* INFORMACIÓN */}
            <div className="space-y-3 text-gray-700">
                <p><b className="text-[#f47cc6]">Nombre:</b> <span className="ml-2"></span></p>
                <p><b className="text-[#f47cc6]">Apellido:</b> <span className="ml-2"></span></p>
                <p><b className="text-[#f47cc6]">Dirección:</b> <span className="ml-2"></span></p>
                <p><b className="text-[#f47cc6]">Teléfono:</b> <span className="ml-2"></span></p>
                <p><b className="text-[#f47cc6]">Correo:</b> <span className="ml-2"></span></p>
            </div>

        </div>
    );
};
