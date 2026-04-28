import { useNavigate } from "react-router";
import { Calendar, UserPlus, Bell, Settings, LogOut, Search, Clock, FileText } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import logoImage from "@/assets/4e22e5da8fe3f5a493fc37ee0e5f47200635e5bc.png";

export function ReceptionistDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
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
                <p className="text-[11px] md:text-[12px] opacity-80 font-medium text-[#c1a16a]">RECEPCIÓN</p>
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
            <h2 className="text-[14px] md:text-[16px] text-white/80 font-medium mb-1">Bienvenida,</h2>
            <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight">{user?.name || "Recepcionista"}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        {/* Quick Actions Grid */}
        <div className="-mt-14 mb-8 md:mb-12 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white p-5 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/receptionist/search-patient")}
                className="flex flex-col items-center justify-center gap-3 p-4 md:p-5 bg-gradient-to-br from-[#c1a16a] to-[#d4b57a] rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-white group"
              >
                <Search className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                <span className="text-[13px] md:text-[14px] font-bold">Buscar Paciente</span>
              </button>

              <button
                className="flex flex-col items-center justify-center gap-3 p-4 md:p-5 bg-gradient-to-br from-[#192a3e] to-[#2a3f56] rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-white group"
              >
                <UserPlus className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                <span className="text-[13px] md:text-[14px] font-bold">Nuevo Paciente</span>
              </button>
              
              <button
                onClick={() => navigate("/receptionist/book-patient")}
                className="flex flex-col items-center justify-center gap-3 p-4 md:p-5 bg-white border border-[#e9ecef] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c1a16a]/50 transition-all text-[#192a3e] group"
              >
                <div className="p-2.5 bg-[#f8f9fa] rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                  <Calendar className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a] transition-colors" />
                </div>
                <span className="text-[13px] md:text-[14px] font-bold">Agendar Cita</span>
              </button>
              
              <button
                className="flex flex-col items-center justify-center gap-3 p-4 md:p-5 bg-white border border-[#e9ecef] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c1a16a]/50 transition-all text-[#192a3e] group"
              >
                <div className="p-2.5 bg-[#f8f9fa] rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                  <FileText className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a] transition-colors" />
                </div>
                <span className="text-[13px] md:text-[14px] font-bold">Cobros y Facturas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Today's Overview */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e] mb-2">Resumen del Día</h2>
            <div className="bg-gradient-to-br from-[#192a3e] to-[#243850] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1a16a]/10 rounded-bl-full blur-[20px]" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg"><Calendar className="w-5 h-5 text-[#c1a16a]" /></div>
                    <span className="text-[15px] font-medium">Citas Hoy</span>
                  </div>
                  <span className="text-[24px] font-black bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">42</span>
                </div>
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg"><Clock className="w-5 h-5 text-[#c1a16a]" /></div>
                    <span className="text-[15px] font-medium">Pendientes</span>
                  </div>
                  <span className="text-[24px] font-black">15</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg"><UserPlus className="w-5 h-5 text-[#c1a16a]" /></div>
                    <span className="text-[15px] font-medium">Nuevos Pacientes</span>
                  </div>
                  <span className="text-[24px] font-black">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e]">Actividad Reciente</h2>
               <button className="text-[14px] text-[#c1a16a] font-semibold hover:text-[#d4b57a] transition-colors">
                 Ver todo
               </button>
            </div>
            
            <div className="space-y-4">
              {[
                { action: "Cita agendada", patient: "Juan Pérez", time: "Hace 10 min", icon: Calendar, color: "text-[#192a3e]", bg: "bg-[#192a3e]/10" },
                { action: "Pago registrado", patient: "María López", time: "Hace 25 min", icon: FileText, color: "text-[#28a745]", bg: "bg-[#28a745]/10" },
                { action: "Paciente registrado", patient: "Carlos Gómez", time: "Hace 1 hora", icon: UserPlus, color: "text-[#c1a16a]", bg: "bg-[#c1a16a]/10" },
                { action: "Cita cancelada", patient: "Ana Torres", time: "Hace 2 horas", icon: Clock, color: "text-[#d32f2f]", bg: "bg-[#d32f2f]/10" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-[#e9ecef] hover:shadow-md hover:border-[#c1a16a]/30 transition-all flex items-center gap-4 group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-bold text-[#192a3e]">{item.action}</p>
                    <p className="text-[14px] text-[#717182] font-medium">{item.patient}</p>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <span className="text-[13px] font-bold text-[#717182]">{item.time}</span>
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
