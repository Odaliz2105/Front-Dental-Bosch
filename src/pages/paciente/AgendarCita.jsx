import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthPaciente } from "../../context/storeAuthPaciente.jsx";
import { citasService } from "../../services/authService.js";
import { Button, Card, Loading } from "../../components/ui/index.js";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaNotesMedical,
  FaMoneyBillWave,
  FaWhatsapp,
} from "react-icons/fa";

const AgendarCita = () => {
  const navigate = useNavigate();
  const { authPaciente } = useAuthPaciente();

  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [step, setStep] = useState(1); // 1: seleccionar doctor, 2: seleccionar fecha/hora, 3: confirmar

  // Form data - paciente no elige duración
  const [formData, setFormData] = useState({
    doctor: "",
    fechaCita: "",
    horaCita: "",
    tipoConsulta: "consulta_general",
    motivo: "",
  });

  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [horariosOcupados, setHorariosOcupados] = useState([]); // Para mostrar horarios no disponibles
  const [citaConfirmada, setCitaConfirmada] = useState(null);

  // Tipos de consulta (según backend)
  const tiposConsulta = [
    { value: "consulta_general", label: "Consulta General" },
    { value: "limpieza", label: "Limpieza Dental" },
    { value: "extraccion", label: "Extracción" },
    { value: "ortodoncia", label: "Ortodoncia" },
    { value: "blanqueamiento", label: "Blanqueamiento" },
    { value: "emergencia", label: "Emergencia" },
    { value: "otro", label: "Otro" },
  ];

  useEffect(() => {
    // Cargar lista de doctores aprobados
    cargarDoctores();
  }, []);

  const cargarDoctores = async () => {
    try {
      setLoading(true);
      // Cargar doctores reales desde el backend
      const response = await fetch('http://localhost:4000/api/doctor/aprobados');
      const data = await response.json();
      setDoctores(data);
      console.log('📋 Doctores cargados:', data);
    } catch (error) {
      console.error('❌ Error al cargar doctores:', error);
      toast.error("Error al cargar los doctores");
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorChange = async (doctorId) => {
    setFormData({ ...formData, doctor: doctorId, fechaCita: "", horaCita: "" });
    setHorariosDisponibles([]); // Limpiar horarios anteriores
    setStep(2);
  };

  const handleFechaChange = async (fecha) => {
    setFormData({ ...formData, fechaCita: fecha, horaCita: "" });
    setHorariosDisponibles([]); // Limpiar horarios anteriores
    setHorariosOcupados([]); // Limpiar horarios ocupados

    if (formData.doctor && fecha) {
      try {
        setLoadingHorarios(true);
        console.log('🔄 AgendarCita - Cargando horarios para doctor:', formData.doctor, 'fecha:', fecha);
        
        const response = await citasService.obtenerHorariosDisponibles({
          doctor: formData.doctor,
          fecha: fecha
        });
        
        console.log('📅 AgendarCita - Horarios recibidos:', response);
        
        // Generar todos los horarios del día (8 AM - 6 PM)
        const todosLosHorarios = [];
        const horaInicio = 8;
        const horaFin = 18;
        
        for (let hora = horaInicio; hora < horaFin; hora++) {
          for (let minuto = 0; minuto < 60; minuto += 30) {
            const fechaHora = new Date(fecha);
            fechaHora.setHours(hora, minuto, 0, 0);
            
            todosLosHorarios.push({
              fecha: fechaHora,
              horaString: fechaHora.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              disponible: false // Por defecto no disponible
            });
          }
        }
        
        // Marcar como disponibles los horarios que vienen del backend
        const disponibles = response.horariosDisponibles || [];
        disponibles.forEach(horarioDisponible => {
          const index = todosLosHorarios.findIndex(h => 
            new Date(h.fecha).getTime() === new Date(horarioDisponible.fecha).getTime()
          );
          if (index !== -1) {
            todosLosHorarios[index].disponible = true;
          }
        });
        
        // Separar disponibles y ocupados
        const disponiblesFiltrados = todosLosHorarios.filter(h => h.disponible);
        const ocupadosFiltrados = todosLosHorarios.filter(h => !h.disponible);
        
        setHorariosDisponibles(disponiblesFiltrados);
        setHorariosOcupados(ocupadosFiltrados);
        
      } catch (error) {
        console.error('❌ AgendarCita - Error al cargar horarios:', error);
        toast.error("Error al cargar horarios disponibles");
        setHorariosDisponibles([]);
        setHorariosOcupados([]);
      } finally {
        setLoadingHorarios(false);
      }
    }
  };

  const handleHorarioSelect = (horario) => {
    console.log('🕐 AgendarCita - Horario seleccionado:', horario);
    console.log('🕐 AgendarCita - Hora formateada:', horario.horaString);
    
    setFormData({
      ...formData,
      horaCita: horario.horaString,
    });
    
    console.log('🔄 AgendarCita - Cambiando al paso 3');
    setStep(3);
  };

  const handleTipoConsultaChange = (tipo) => {
    setFormData({
      ...formData,
      tipoConsulta: tipo,
    });
  };

  const handleConfirmarCita = async () => {
    try {
      setLoading(true);
      console.log('🔄 AgendarCita - Creando cita con datos:', formData);
      
      // Validar campos requeridos según backend
      if (!formData.doctor || !formData.fechaCita || !formData.motivo) {
        toast.error("Debes seleccionar un doctor, fecha y motivo");
        return;
      }
      
      // Crear objeto con fecha y hora combinados
      const fechaHora = new Date(`${formData.fechaCita}T${formData.horaCita}`);
      
      const citaData = {
        doctor: formData.doctor,
        fechaCita: fechaHora.toISOString(),
        tipoConsulta: formData.tipoConsulta,
        motivo: formData.motivo.trim(),
      };

      console.log('📤 Enviando cita:', citaData);
      
      const response = await citasService.crearCita(citaData);
      console.log('✅ AgendarCita - Cita creada:', response);
      
      setCitaConfirmada(response);
      toast.success("¡Cita agendada exitosamente!");
      setStep(3); // Mostrar confirmación
    } catch (error) {
      console.error('❌ AgendarCita - Error al crear cita:', error);
      toast.error(error.response?.data?.msg || "Error al agendar cita");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleConfirmarCita();
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    if (citaConfirmada) {
      const doctor = doctores.find((d) => d._id === formData.doctor);
      const mensaje =
        `Hola, he agendado una cita:\n\n` +
        `Doctor: ${doctor?.nombre} ${doctor?.apellido}\n` +
        `Fecha: ${new Date(citaConfirmada.fechaCita).toLocaleDateString("es-ES")}\n` +
        `Hora: ${new Date(citaConfirmada.fechaCita).toLocaleTimeString(
          "es-ES",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )}\n` +
        `Motivo: ${formData.motivo}\n\n` +
        `Gracias por su atención.`;

      const whatsappUrl = `https://wa.me/593984062668?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Selecciona un Doctor
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctores.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => handleDoctorChange(doctor._id)}
            className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all"
          >
            <div className="flex items-center space-x-3">
              <FaUserMd className="text-teal-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Dr. {doctor.nombre} {doctor.apellido}
                </h3>
                <p className="text-sm text-gray-600">{doctor.especialidad}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Selecciona Fecha y Hora
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FaCalendarAlt className="inline mr-2" />
          Fecha de la cita
        </label>
        <input
          type="date"
          value={formData.fechaCita}
          onChange={(e) => handleFechaChange(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      {loadingHorarios ? (
        <div className="text-center py-4">
          <Loading size="sm" />
          <p className="text-sm text-gray-600 mt-2">Cargando horarios disponibles...</p>
        </div>
      ) : (
        <>
          {/* Horarios Disponibles */}
          {horariosDisponibles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                <FaClock className="inline mr-2" />
                Horarios Disponibles
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {horariosDisponibles.map((horario, index) => (
                  <Button
                    key={`disponible-${index}`}
                    onClick={() => handleHorarioSelect(horario)}
                    variant="primary"
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {horario.horaString}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Horarios Ocupados */}
          {horariosOcupados.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4">
                <FaClock className="inline mr-2" />
                Horarios Ocupados
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {horariosOcupados.map((horario, index) => (
                  <Button
                    key={`ocupado-${index}`}
                    variant="secondary"
                    size="sm"
                    className="w-full bg-red-100 text-red-700 border-red-300 cursor-not-allowed"
                    disabled
                  >
                    {horario.horaString}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje si no hay horarios */}
          {horariosDisponibles.length === 0 && horariosOcupados.length === 0 && formData.fechaCita && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600">No hay horarios disponibles para esta fecha</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirmar Cita</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Consulta
          </label>
          <select
            value={formData.tipoConsulta}
            onChange={(e) => handleTipoConsultaChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            required
          >
            {tiposConsulta.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            * La duración será asignada automáticamente por el doctor
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaNotesMedical className="inline mr-2" />
            Motivo de la consulta
          </label>
          <textarea
            value={formData.motivo}
            onChange={(e) =>
              setFormData({ ...formData, motivo: e.target.value })
            }
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="Describe el motivo de tu consulta..."
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">
            Resumen de la cita:
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              Doctor: {doctores.find((d) => d._id === formData.doctor)?.nombre}{" "}
              {doctores.find((d) => d._id === formData.doctor)?.apellido}
            </p>
            <p>Fecha: {formData.fechaCita}</p>
            <p>Hora: {formData.horaCita}</p>
            <p>
              Tipo:{" "}
              {
                tiposConsulta.find((t) => t.value === formData.tipoConsulta)
                  ?.label
              }
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep(2)}
            className="flex-1"
          >
            Atrás
          </Button>
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            className="flex-1"
          >
            {loading ? "Agendando..." : "Confirmar Cita"}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderConfirmacion = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 p-6 rounded-lg">
        <FaCalendarAlt className="text-green-500 text-4xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          ¡Cita Agendada!
        </h2>
        <p className="text-green-600">
          Tu cita ha sido confirmada exitosamente
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <h3 className="font-semibold text-gray-800 mb-2">
          Detalles de la cita:
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            Doctor: {doctores.find((d) => d._id === formData.doctor)?.nombre}{" "}
            {doctores.find((d) => d._id === formData.doctor)?.apellido}
          </p>
          <p>
            Fecha:{" "}
            {new Date(citaConfirmada.fechaCita).toLocaleDateString("es-ES")}
          </p>
          <p>
            Hora:{" "}
            {new Date(citaConfirmada.fechaCita).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>Motivo: {formData.motivo}</p>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleWhatsAppRedirect}
          variant="success"
          className="w-full"
        >
          <FaWhatsapp className="mr-2" />
          Confirmar por WhatsApp
        </Button>

        <Button onClick={() => navigate("/paciente/perfil")} className="w-full">
          Ver Mis Citas
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <Card.Body>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Agendar Cita</h1>
              <Button
                variant="ghost"
                onClick={() => navigate("/paciente/perfil")}
              >
                Volver al Perfil
              </Button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? "bg-teal-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-16 h-1 ${
                        step > stepNumber ? "bg-teal-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Content */}
            {!citaConfirmada
              ? (() => {
                  console.log('🎬 AgendarCita - Renderizando paso:', step);
                  return step === 1
                    ? renderStep1()
                    : step === 2
                      ? renderStep2()
                      : renderStep3();
                })()
              : renderConfirmacion()}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AgendarCita;
