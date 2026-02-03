import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthDoctor } from '../../context/storeAuth.jsx';

const CardPassword = () => {
    const [form, setForm] = useState({
        passwordActual: '',
        passwordNuevo: ''
    });
    const [loading, setLoading] = useState(false);
    const { authDoctor } = useAuthDoctor();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!form.passwordActual || !form.passwordNuevo) {
            toast.error('Todos los campos son obligatorios');
            return;
        }

        if (form.passwordNuevo.length < 6) {
            toast.error('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                toast.error('No hay sesión activa');
                return;
            }

            if (!authDoctor?.doctor?.id) {
                toast.error('No se pudo obtener el ID del usuario');
                return;
            }

            const url = `${import.meta.env.VITE_API_URL}/api/doctor/actualizarpassword/${authDoctor.doctor.id}`;
            
            console.log("🔑 Actualizando contraseña...");
            console.log("📡 URL:", url);
            console.log("👤 ID Usuario:", authDoctor.doctor.id);

            const { data } = await axios.put(url, {
                passwordActual: form.passwordActual,
                passwordNuevo: form.passwordNuevo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("✅ Contraseña actualizada:", data);

            // Mostrar notificación de éxito
            toast.success(data.msg || '¡Contraseña actualizada correctamente! 🔐');
            
            // Limpiar formulario
            setForm({
                passwordActual: '',
                passwordNuevo: ''
            });

        } catch (error) {
            console.error('❌ Error al actualizar contraseña:', error);
            console.error('❌ Error response:', error.response?.data);
            
            // Mostrar notificación de error específica
            const errorMsg = error.response?.data?.msg || 'Error al actualizar la contraseña';
            
            if (error.response?.status === 400) {
                toast.error(`❌ ${errorMsg}`);
            } else if (error.response?.status === 401) {
                toast.error('⚠️ Sesión expirada, por favor inicia sesión nuevamente');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                toast.error(`❌ ${errorMsg}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-md p-6">
                <h1 className="font-black text-2xl text-[#69D1D2]">Actualizar contraseña</h1>
                <hr className="my-4 border-t-2 border-[#f8addc]" />

                <form onSubmit={handleSubmit}>

                    {/* Contraseña actual */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Contraseña actual
                        </label>
                        <input
                            type="password"
                            name="passwordActual"
                            value={form.passwordActual}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña actual"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                       focus:outline-none focus:ring-2 focus:ring-[#f47cc6] focus:border-[#f47cc6] mb-5"
                            disabled={loading}
                        />
                    </div>

                    {/* Nueva contraseña */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            name="passwordNuevo"
                            value={form.passwordNuevo}
                            onChange={handleChange}
                            placeholder="Ingresa la nueva contraseña (mínimo 6 caracteres)"
                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                                       focus:outline-none focus:ring-2 focus:ring-[#f47cc6] focus:border-[#f47cc6] mb-5"
                            disabled={loading}
                        />
                    </div>

                    {/* Botón */}
                    <input
                        type="submit"
                        className="bg-[#69D1D2] w-full p-2 text-white uppercase font-bold rounded-md 
                                   hover:opacity-80 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        value={loading ? "Actualizando..." : "Cambiar contraseña"}
                        disabled={loading}
                    />

                </form>
            </div>
        </>
    );
};

export default CardPassword;
