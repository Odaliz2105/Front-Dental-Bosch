// Front-Dental-Bosch/src/components/profile/FormProfile.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormProfile = ({ doctor, onActualizar }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    especialidad: ''
  });

  // Cargar datos del doctor cuando cambie
  useEffect(() => {
    if (doctor) {
      console.log("👨‍⚕️ Doctor recibido en FormProfile:", doctor);
      setForm({
        nombre: doctor.nombre || '',
        apellido: doctor.apellido || '',
        direccion: doctor.direccion || '',
        telefono: doctor.telefono || '',
        email: doctor.email || '',
        especialidad: doctor.especialidad || ''
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (Object.values(form).some(val => !val.trim())) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    // Validar que doctor existe y tiene _id
    if (!doctor || !doctor._id) {
      toast.error('Error: No se pudo identificar el usuario');
      console.error("❌ Doctor no tiene _id:", doctor);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('No hay sesión activa');
        return;
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      
      if (!backendUrl) {
        toast.error('Error de configuración: VITE_BACKEND_URL no está definido');
        console.error("❌ VITE_BACKEND_URL:", backendUrl);
        return;
      }

      const url = `${backendUrl}/doctor/actualizarperfil/${doctor._id}`;
      
      console.log("📡 Actualizando perfil en:", url);
      console.log("📝 Datos a enviar:", form);

      const { data } = await axios.put(url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("✅ Respuesta del servidor:", data);

      toast.success(data.msg || 'Perfil actualizado correctamente');
      
      // Actualizar datos en localStorage
      if (data.doctor) {
        localStorage.setItem('doctor', JSON.stringify(data.doctor));
      }
      
      // Llamar función para recargar datos
      if (onActualizar) {
        onActualizar();
      }

    } catch (error) {
      console.error('❌ Error al actualizar perfil:', error);
      console.error('❌ Error response:', error.response?.data);
      toast.error(error.response?.data?.msg || 'Error al actualizar el perfil');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 border border-[#f8addc]">
      {/* NOMBRE */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                     focus:border-[#f47cc6] focus:ring-[#f47cc6] focus:ring-1 transition-all mb-5"
        />
      </div>

      {/* APELLIDO */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Ingresa tu apellido"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                     focus:border-[#f47cc6] focus:ring-[#f47cc6] focus:ring-1 transition-all mb-5"
        />
      </div>

      {/* DIRECCIÓN */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Dirección</label>
        <input
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          placeholder="Ingresa tu dirección"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                     focus:border-[#f47cc6] focus:ring-[#f47cc6] focus:ring-1 transition-all mb-5"
        />
      </div>

      {/* TELÉFONO */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Ingresa tu teléfono"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                     focus:border-[#f47cc6] focus:ring-[#f47cc6] focus:ring-1 transition-all mb-5"
        />
      </div>

      {/* ESPECIALIDAD */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Especialidad</label>
        <input
          type="text"
          name="especialidad"
          value={form.especialidad}
          onChange={handleChange}
          placeholder="Ingresa tu especialidad"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                     focus:border-[#f47cc6] focus:ring-[#f47cc6] focus:ring-1 transition-all mb-5"
        />
      </div>

      {/* CORREO */}
      <div>
        <label className="mb-1 block text-sm font-semibold text-gray-700">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo electrónico"
          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-600
                     focus:border-[#f47cc6] focus:ring-[#f47cc6] focus:ring-1 transition-all mb-6"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        className="bg-[#f47cc6] w-full p-2 text-white uppercase font-bold rounded-lg
                   hover:bg-[#e96ab6] cursor-pointer transition-all shadow-md"
      >
        Actualizar
      </button>
    </form>
  );
};

export default FormProfile;