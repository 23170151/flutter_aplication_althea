import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, X, ChevronRight, AlertCircle, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import doctor1 from "@/assets/doctor1.jpg";
import doctora1 from "@/assets/doctora1.png";
import doctora2 from "@/assets/doctora2.png";

type AppointmentStatus = "upcoming" | "completed" | "cancelled";

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  consultorio: string;
  status: AppointmentStatus;
  image: string;
}

export function MyAppointments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("upcoming");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);

  const appointments: Appointment[] = [
    {
      id: 1,
      doctor: "Dra. María González",
      specialty: "Cardiología",
      date: "2026-03-28",
      time: "10:00 AM",
      consultorio: "Consultorio 301",
      status: "upcoming",
      image: doctora1,
    },
    {
      id: 2,
      doctor: "Dr. Carlos Ramírez",
      specialty: "Medicina General",
      date: "2026-04-02",
      time: "3:30 PM",
      consultorio: "Consultorio 105",
      status: "upcoming",
      image: doctor1,
    },
    {
      id: 3,
      doctor: "Dra. Ana Martínez",
      specialty: "Dermatología",
      date: "2026-03-15",
      time: "11:00 AM",
      consultorio: "Consultorio 204",
      status: "completed",
      image: doctora2,
    },
  ];

  const filteredAppointments = appointments.filter(
    (apt) => apt.status === activeTab
  );

  const handleCancelAppointment = (id: number) => {
    setSelectedAppointment(id);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  const tabVariants = {
    active: { backgroundColor: "#ffffff", color: "#192a3e", scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
    inactive: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#ffffff", scale: 1 }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-20 md:pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/patient/dashboard")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Mis Citas</h1>
          </div>

          {/* Tabs */}
          <div className="flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-md mx-auto">
            {(["upcoming", "completed", "cancelled"] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variants={tabVariants}
                animate={activeTab === tab ? "active" : "inactive"}
                className="flex-1 py-3 rounded-xl font-bold text-[13px] md:text-[14px] transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {tab === "upcoming" ? "Próximas" : tab === "completed" ? "Pasadas" : "Canceladas"}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 md:-mt-10 relative z-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e9ecef] hover:shadow-lg hover:border-[#c1a16a]/30 transition-all flex flex-col gap-5 group"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#c1a16a]/5 to-[#d4b57a]/15 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                      <img src={appointment.image} alt={appointment.doctor} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-[17px] font-bold text-[#192a3e] leading-tight">
                          {appointment.doctor}
                        </h3>
                      </div>
                      <p className="text-[14px] text-[#717182] font-medium">
                        {appointment.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#f8f9fa]">
                    <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                      <Calendar className="w-4 h-4 text-[#c1a16a]" />
                      <span>
                        {new Date(appointment.date + 'T00:00:00').toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                      <Clock className="w-4 h-4 text-[#c1a16a]" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                      <MapPin className="w-4 h-4 text-[#c1a16a]" />
                      <span>{appointment.consultorio}</span>
                    </div>
                  </div>

                  {appointment.status === "upcoming" && (
                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 py-3 bg-gradient-to-r from-[#192a3e] to-[#243850] text-white rounded-xl text-[13px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        Ver Detalles <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="p-3 border border-red-100 text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                        title="Cancelar"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {appointment.status === "completed" && (
                    <div className="flex flex-col gap-4 pt-2">
                      <button className="w-full py-3 bg-[#f8f9fa] border border-[#e9ecef] text-[#192a3e] rounded-xl text-[13px] font-bold hover:bg-white hover:border-[#c1a16a]/30 transition-all">
                        Ver Receta / Resumen
                      </button>
                      <div className="bg-[#f8f9fa] rounded-2xl p-4 border border-[#e9ecef] border-dashed">
                        <label className="text-[11px] font-black text-[#c1a16a] uppercase mb-1 block tracking-widest leading-none">Mi Reseña</label>
                        <div className="flex gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 text-[#c1a16a] fill-[#c1a16a]/20 hover:fill-[#c1a16a] transition-all cursor-pointer" />
                          ))}
                        </div>
                        <textarea 
                          placeholder="Comparte tu experiencia con el especialista..."
                          className="w-full bg-white border border-[#e9ecef] rounded-xl p-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-[#c1a16a]/50 min-h-[80px] font-medium placeholder-[#717182]/50"
                        />
                         <button className="mt-2 text-[12px] font-bold text-[#c1a16a] hover:text-[#d4b57a] transition-colors float-right">
                           Guardar opinión
                         </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-[#e9ecef]">
                  <Calendar className="w-10 h-10 text-[#717182]/50" />
                </div>
                <h3 className="text-[20px] font-bold text-[#192a3e] mb-2">
                  No hay citas {activeTab === "upcoming" ? "pendientes" : activeTab === "completed" ? "pasadas" : "canceladas"}
                </h3>
                <p className="text-[#717182] mb-8 font-medium">Parece que no tienes nada agendado aquí.</p>
                {activeTab === "upcoming" && (
                  <button
                    onClick={() => navigate("/patient/doctors")}
                    className="px-8 py-4 bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] text-white rounded-2xl font-bold shadow-lg shadow-[#c1a16a]/20 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    Agendar Nueva Cita
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl border border-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-[22px] font-bold text-[#192a3e]">
                  ¿Cancelar cita?
                </h3>
              </div>

              <p className="text-[15px] text-[#717182] font-medium leading-relaxed mb-8">
                De acuerdo con las políticas de ALTHEA, si la cancelación se realiza con menos de 24 horas de anticipación, no se realizará la devolución del anticipo.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 py-4 border border-[#e9ecef] text-[#192a3e] rounded-2xl font-bold hover:bg-[#f8f9fa] transition-colors"
                >
                  Regresar
                </button>
                <button
                  onClick={confirmCancellation}
                  className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:shadow-xl transition-all"
                >
                  Sí, cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

