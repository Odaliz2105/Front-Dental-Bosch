import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthPaciente } from "../../context/storeAuthPaciente.jsx";
import { citaService } from "../../services/citaService.js";
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
  const [step, setStep] = useState(1); // 1: seleccionar doctor, 2: seleccionar fecha/hora, 3: confirmar

  // Form data
  const [formData, setFormData] = useState({
    doctor: "",
    fechaCita: "",
    horaCita: "",
    tipoConsulta: "consulta_general",
    motivo: "",
    duracion: 30,
  });

  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [citaConfirmada, setCitaConfirmada] = useState(null);

  // Tipos de consulta
  const tiposConsulta = [
    { value: "consulta_general", label: "Consulta General", duracion: 30 },
    { value: "limpieza", label: "Limpieza Dental", duracion: 45 },
    { value: "extraccion", label: "Extracción", duracion: 30 },
    { value: "ortodoncia", label: "Ortodoncia", duracion: 60 },
    { value: "blanqueamiento", label: "Blanqueamiento", duracion: 90 },
    { value: "emergencia", label: "Emergencia", duracion: 30 },
    { value: "otro", label: "Otro", duracion: 30 },
  ];

  useEffect(() => {
    // Cargar lista de doctores aprobados
    cargarDoctores();
  }, []);

  const cargarDoctores = async () => {
    try {
      // Simulación - en una implementación real, llamaríamos a un endpoint para obtener doctores
      const doctoresSimulados = [
        {
          _id: "1",
          nombre: "Dr. Juan",
          apellido: "Pérez",
          especialidad: "General",
        },
        {
          _id: "2",
          nombre: "Dra. María",
          apellido: "González",
          especialidad: "Ortodoncia",
        },
        {
          _id: "3",
          nombre: "Dr. Carlos",
          apellido: "Rodríguez",
          especialidad: "Cirugía",
        },
      ];
      setDoctores(doctoresSimulados);
    } catch (error) {
      toast.error("Error al cargar los doctores");
    }
  };

  const handleDoctorChange = async (doctorId) => {
    setFormData({ ...formData, doctor: doctorId });
    setStep(2);
  };

  const handleFechaChange = async (fecha) => {
    setFormData({ ...formData, fechaCita: fecha });

    if (formData.doctor && fecha) {
      try {
        const response = await citaService.obtenerHorariosDisponibles(
          formData.doctor,
          fecha,
        );
        setHorariosDisponibles(response.horariosDisponibles || []);
      } catch (error) {
        toast.error("Error al cargar horarios disponibles");
        setHorariosDisponibles([]);
      }
    }
  };

  const handleHorarioSelect = (horario) => {
    setFormData({
      ...formData,
      horaCita: new Date(horario.fecha).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setStep(3);
  };

  const handleTipoConsultaChange = (tipo) => {
    const tipoSeleccionado = tiposConsulta.find((t) => t.value === tipo);
    setFormData({
      ...formData,
      tipoConsulta: tipo,
      duracion: tipoSeleccionado.duracion,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combinar fecha y hora
      const fechaHora = new Date(`${formData.fechaCita}T${formData.horaCita}`);

      // Usar el nuevo endpoint con el formato correcto
      const citaData = {
        pacienteId: authPaciente.paciente._id,
        motivo: formData.motivo,
        fecha: fechaHora.toISOString(),
      };

      const response = await citaService.crearCitaPaciente(citaData);
      setCitaConfirmada(response);
      toast.success("¡Cita agendada exitosamente!");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error al agendar la cita");
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

      const whatsappUrl = `https://wa.me/593987654321?text=${encodeURIComponent(mensaje)}`;
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

      {horariosDisponibles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <FaClock className="inline mr-2" />
            Horarios Disponibles
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {horariosDisponibles.map((horario, index) => (
              <Button
                key={index}
                onClick={() => handleHorarioSelect(horario)}
                variant="primary"
                size="sm"
                className="w-full"
              >
                {new Date(horario.fecha).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Button>
            ))}
          </div>
        </div>
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
                {tipo.label} ({tipo.duracion} min)
              </option>
            ))}
          </select>
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
            <p>Duración: {formData.duracion} minutos</p>
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
              ? step === 1
                ? renderStep1()
                : step === 2
                  ? renderStep2()
                  : renderStep3()
              : renderConfirmacion()}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AgendarCita;
