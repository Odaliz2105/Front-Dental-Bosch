const CardPassword = () => {

    return (
        <>
            <div className="bg-white shadow-md rounded-md p-6 mt-10">
                <h1 className="font-black text-2xl text-[#f47cc6]">Actualizar contraseña</h1>
                <hr className="my-4 border-t-2 border-[#f8addc]" />

                <form>

                    {/* Contraseña actual */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Contraseña actual
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña actual"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                       focus:outline-none focus:ring-2 focus:ring-[#f47cc6] focus:border-[#f47cc6] mb-5"
                        />
                    </div>

                    {/* Nueva contraseña */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa la nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                       focus:outline-none focus:ring-2 focus:ring-[#f47cc6] focus:border-[#f47cc6] mb-5"
                        />
                    </div>

                    {/* Botón */}
                    <input
                        type="submit"
                        className="bg-[#f47cc6] w-full p-2 text-white uppercase font-bold rounded-md 
                                   hover:bg-[#d967ad] cursor-pointer transition-all"
                        value="Cambiar"
                    />

                </form>
            </div>
        </>
    );
};

export default CardPassword;
