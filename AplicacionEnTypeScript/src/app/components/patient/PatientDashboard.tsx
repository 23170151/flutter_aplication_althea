import { useNavigate } from "react-router";
import { Calendar, Clock, User, Plus, Bell, Settings, LogOut, ChevronRight } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import logoImage from "@/assets/4e22e5da8fe3f5a493fc37ee0e5f47200635e5bc.png";
import doctor1 from "@/assets/doctor1.jpg";
import doctora1 from "@/assets/doctora1.png";

export function PatientDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dra. María González",
      specialty: "Cardiología",
      date: "2026-03-28",
      time: "10:00 AM",
      consultorio: "Consultorio 301",
      image: doctora1,
    },
    {
      id: 2,
      doctor: "Dr. Carlos Ramírez",
      specialty: "Medicina General",
      date: "2026-04-02",
      time: "3:30 PM",
      consultorio: "Consultorio 105",
      image: doctor1,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative blur elements for modern premium feel */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20 shadow-sm">
                <img src={logoImage} alt="ALTHEA" className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="text-[16px] md:text-[18px] font-bold tracking-tight">ALTHEA</h3>
                <p className="text-[11px] md:text-[12px] opacity-80 font-medium text-[#c1a16a]">PACIENTE</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button className="p-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-sm">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/patient/profile")}
                className="p-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-sm"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-sm group"
              >
                <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>

          <div className="relative z-10 md:mt-4">
            <h2 className="text-[14px] md:text-[16px] text-white/80 font-medium mb-1">Bienvenido de nuevo,</h2>
            <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight">{user?.name || "Paciente"}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        {/* Quick Actions */}
        <div className="-mt-14 mb-8 md:mb-12 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white p-4 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between">
            <button
              onClick={() => navigate("/patient/doctors")}
              className="flex-1 flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
            >
              <div className="bg-white/20 p-2 rounded-xl">
                <Plus className="w-5 h-5 text-[#192a3e]" />
              </div>
              <span className="text-[14px] md:text-[15px] text-[#192a3e] font-semibold">Agendar Cita</span>
            </button>

            <button
              onClick={() => navigate("/patient/appointments")}
              className="flex-1 flex items-center justify-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-[#e9ecef] hover:border-[#c1a16a]/50 hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <div className="bg-[#f8f9fa] p-2 rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                <Calendar className="w-5 h-5 text-[#192a3e] group-hover:text-[#c1a16a] transition-colors" />
              </div>
              <span className="text-[14px] md:text-[15px] font-medium text-[#192a3e]">Mis Citas</span>
            </button>

            <button
              onClick={() => navigate("/patient/profile")}
              className="flex-1 flex items-center justify-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-[#e9ecef] hover:border-[#c1a16a]/50 hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <div className="bg-[#f8f9fa] p-2 rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                <User className="w-5 h-5 text-[#192a3e] group-hover:text-[#c1a16a] transition-colors" />
              </div>
              <span className="text-[14px] md:text-[15px] font-medium text-[#192a3e]">Mi Perfil</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Upcoming Appointments */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e]">Próximas Citas</h2>
              <button
                onClick={() => navigate("/patient/appointments")}
                className="flex items-center text-[14px] text-[#c1a16a] font-semibold hover:text-[#d4b57a] transition-colors"
              >
                Ver todas <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#e9ecef] hover:shadow-md hover:border-[#c1a16a]/30 transition-all flex flex-col md:flex-row md:items-center gap-4 md:gap-6 group"
                >
                  <div className="flex items-start md:items-center justify-between flex-1 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] rounded-2xl overflow-hidden group-hover:from-[#c1a16a]/10 group-hover:to-[#c1a16a]/5 transition-colors">
                        <img src={appointment.image} alt={appointment.doctor} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-[17px] md:text-[18px] font-bold text-[#192a3e] leading-snug">
                          {appointment.doctor}
                        </h3>
                        <p className="text-[14px] text-[#717182] font-medium">{appointment.specialty}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[#e9ecef] md:border-l md:pl-6 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#f8f9fa] rounded-lg">
                        <Calendar className="w-4 h-4 text-[#c1a16a]" />
                      </div>
                      <span className="text-[14px] font-semibold text-[#192a3e]">
                        {new Date(appointment.date + 'T00:00:00').toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[#f8f9fa] rounded-lg">
                        <Clock className="w-4 h-4 text-[#c1a16a]" />
                      </div>
                      <span className="text-[14px] font-semibold text-[#192a3e]">{appointment.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
