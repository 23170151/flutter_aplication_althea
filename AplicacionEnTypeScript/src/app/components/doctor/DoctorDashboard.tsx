import { useNavigate } from "react-router";
import { Calendar, Clock, User, FileText, Bell, Settings, LogOut, Users, ChevronRight } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import logoImage from "@/assets/4e22e5da8fe3f5a493fc37ee0e5f47200635e5bc.png";

export function DoctorDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const todayAppointments = [
    {
      id: 1,
      patient: "Juan Pérez",
      time: "9:00 AM",
      type: "Primera consulta",
      consultorio: "Consultorio 301 - Torre Médica",
      status: "completed",
    },
    {
      id: 2,
      patient: "María López",
      time: "10:30 AM",
      type: "Seguimiento",
      consultorio: "Consultorio 301 - Torre Médica",
      status: "pending",
    },
    {
      id: 3,
      patient: "Carlos Gómez",
      time: "2:00 PM",
      type: "Control",
      consultorio: "Consultorio 301 - Torre Médica",
      status: "pending",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative blur elements */}
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
                <p className="text-[11px] md:text-[12px] opacity-80 font-medium text-[#c1a16a]">DOCTOR</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <button className="p-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-sm">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all shadow-sm">
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
            <h2 className="text-[14px] md:text-[16px] text-white/80 font-medium mb-1">Bienvenido, Dr(a).</h2>
            <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight">{user?.name || "Doctor"}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        {/* Quick Stats Grid */}
        <div className="-mt-14 mb-8 md:mb-12 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white p-5 md:p-8">
            <div className="grid grid-cols-3 divide-x divide-[#e9ecef]">
              <div className="text-center px-4">
                <div className="text-[28px] md:text-[36px] font-black text-[#192a3e] drop-shadow-sm">{todayAppointments.length}</div>
                <div className="text-[12px] md:text-[14px] font-bold text-[#c1a16a]/80 uppercase tracking-widest mt-1">Citas Hoy</div>
              </div>
              <div className="text-center px-4">
                <div className="text-[28px] md:text-[36px] font-black text-[#192a3e]">8</div>
                <div className="text-[12px] md:text-[14px] font-medium text-[#717182] mt-1">Esta Semana</div>
              </div>
              <div className="text-center px-4">
                <div className="text-[28px] md:text-[36px] font-black text-[#192a3e]">32</div>
                <div className="text-[12px] md:text-[14px] font-medium text-[#717182] mt-1">Nuevos Pacientes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e]">Agenda de Hoy</h2>
              <button
                onClick={() => navigate("/doctor/schedule")}
                className="flex items-center text-[14px] text-[#c1a16a] font-semibold hover:text-[#d4b57a] transition-colors"
              >
                Ver Agenda <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#e9ecef] hover:shadow-md hover:border-[#c1a16a]/30 transition-all flex flex-col md:flex-row md:items-center gap-4 group"
                >
                  <div className="flex items-start md:items-center justify-between flex-1 gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-colors ${appointment.status === 'completed' ? 'bg-[#e9ecef]/50' : 'bg-gradient-to-br from-[#c1a16a]/10 to-[#c1a16a]/5 group-hover:bg-[#c1a16a]/20'}`}>
                        <User className={`w-7 h-7 ${appointment.status === 'completed' ? 'text-[#717182]' : 'text-[#c1a16a]'}`} />
                      </div>
                      <div>
                        <h3 className={`text-[17px] md:text-[18px] font-bold leading-snug ${appointment.status === 'completed' ? 'text-[#717182] line-through' : 'text-[#192a3e]'}`}>
                          {appointment.patient}
                        </h3>
                        <p className="text-[14px] text-[#717182] font-medium">{appointment.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[#e9ecef] md:border-l md:pl-6 w-full md:w-auto">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="p-1.5 bg-[#f8f9fa] rounded-lg">
                        <Clock className="w-4 h-4 text-[#c1a16a]" />
                      </div>
                      <span className="text-[14px] font-semibold text-[#192a3e]">{appointment.time}</span>
                    </div>

                    <button
                      onClick={() => navigate("/doctor/medical-record", {
                        state: {
                          patient: {
                            name: appointment.patient,
                            id: `PAC-${Math.floor(Math.random() * 90000) + 10000}`,
                            age: Math.floor(Math.random() * 30) + 20,
                            blood: "O+",
                            allergies: "Ninguna"
                          }
                        }
                      })}
                      className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#e9ecef] text-[#192a3e] rounded-xl text-[13px] font-semibold hover:border-[#c1a16a] hover:text-[#c1a16a] transition-all shadow-sm"
                    >
                      Ver Expediente
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e] mb-5">Accesos Rápidos</h2>

            <button
              onClick={() => navigate("/doctor/patients")}
              className="w-full flex items-center p-5 bg-gradient-to-r from-[#192a3e] to-[#243850] rounded-3xl shadow-lg hover:shadow-xl hover:shadow-[#192a3e]/20 transition-all text-white group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-bl-[100px] pointer-events-none" />
              <div className="p-4 bg-white/10 rounded-2xl mr-4 group-hover:bg-white/20 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-[18px] font-bold">Mis Pacientes</span>
                <span className="block text-[13px] text-white/70 mt-1">Ver histórico y expedientes</span>
              </div>
            </button>

            <button
              onClick={() => navigate("/doctor/schedule")}
              className="w-full flex items-center p-5 bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] rounded-3xl shadow-lg hover:shadow-xl hover:shadow-[#c1a16a]/20 transition-all text-white group relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-bl-[100px] pointer-events-none" />
              <div className="p-4 bg-white/20 rounded-2xl mr-4 group-hover:bg-white/30 transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="block text-[18px] font-bold text-[#192a3e]">Mi Agenda</span>
                <span className="block text-[13px] text-[#192a3e]/70 mt-1">Configurar horario y bloqueos</span>
              </div>
            </button>

            <button
              onClick={() => navigate("/doctor/medical-record")}
              className="w-full flex items-center p-5 bg-white border border-[#e9ecef] rounded-3xl shadow-sm hover:shadow-md hover:border-[#c1a16a]/50 transition-all group"
            >
              <div className="p-4 bg-[#f8f9fa] rounded-2xl mr-4 group-hover:bg-[#c1a16a]/10 transition-colors">
                <FileText className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a] transition-colors" />
              </div>
              <div className="text-left">
                <span className="block text-[18px] font-bold text-[#192a3e]">Nuevas Notas Médicas</span>
                <span className="block text-[13px] text-[#717182] mt-1">Añadir registros rápidamente</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
