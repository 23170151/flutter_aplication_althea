import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { TrendingUp, Users, Calendar, DollarSign, Bell, Settings, LogOut, FileText, Activity } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import logoImage from "@/assets/4e22e5da8fe3f5a493fc37ee0e5f47200635e5bc.png";

export function AdminDashboard() {
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
                <p className="text-[11px] md:text-[12px] opacity-80 font-medium text-[#c1a16a]">ADMINISTRACIÓN</p>
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
            <h2 className="text-[14px] md:text-[16px] text-white/80 font-medium mb-1">Panel de Control</h2>
            <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight">{user?.name || "Administrador"}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        {/* Stats Overview */}
        <div className="-mt-14 mb-8 md:mb-12 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white p-5 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-4 rounded-2xl border border-[#e9ecef] shadow-sm flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#192a3e]/10 flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-[#192a3e]" />
                </div>
                <div className="text-[24px] md:text-[28px] font-black text-[#192a3e]">156</div>
                <div className="text-[12px] md:text-[13px] text-[#717182] font-semibold mt-1">Total Pacientes</div>
              </div>
              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-4 rounded-2xl border border-[#e9ecef] shadow-sm flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#c1a16a]/10 flex items-center justify-center mb-2">
                  <Activity className="w-5 h-5 text-[#c1a16a]" />
                </div>
                <div className="text-[24px] md:text-[28px] font-black bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">12</div>
                <div className="text-[12px] md:text-[13px] text-[#717182] font-semibold mt-1">Doctores Activos</div>
              </div>
              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-4 rounded-2xl border border-[#e9ecef] shadow-sm flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#192a3e]/10 flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 text-[#192a3e]" />
                </div>
                <div className="text-[24px] md:text-[28px] font-black text-[#192a3e]">89</div>
                <div className="text-[12px] md:text-[13px] text-[#717182] font-semibold mt-1">Citas Este Mes</div>
              </div>
              <div className="bg-gradient-to-br from-[#f8f9fa] to-white p-4 rounded-2xl border border-[#e9ecef] shadow-sm flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#192a3e]/10 flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-[#192a3e]" />
                </div>
                <div className="text-[24px] md:text-[28px] font-black text-[#192a3e]">42</div>
                <div className="text-[12px] md:text-[13px] text-[#717182] font-semibold mt-1">Nuevos Reportes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Actions & Recent Activity (Left Col) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Quick Actions */}
            <div>
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e] mb-4">Módulos</h2>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate("/admin/branch-management")}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-[#e9ecef] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c1a16a]/50 transition-all text-[#192a3e] group"
                >
                  <div className="p-2.5 bg-[#f8f9fa] rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                    <Users className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a]" />
                  </div>
                  <span className="text-[13px] font-bold">Sucursales</span>
                </button>

                <button className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-[#e9ecef] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c1a16a]/50 transition-all text-[#192a3e] group">
                  <div className="p-2.5 bg-[#f8f9fa] rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                    <Calendar className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a]" />
                  </div>
                  <span className="text-[13px] font-bold">Agenda General</span>
                </button>

                <button 
                  onClick={() => navigate("/admin/add-doctor")}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-[#e9ecef] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c1a16a]/50 transition-all text-[#192a3e] group"
                >
                  <div className="p-2.5 bg-[#f8f9fa] rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                    <Users className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a]" />
                  </div>
                  <span className="text-[13px] font-bold">Agregar Doctor</span>
                </button>

                <button 
                  onClick={() => navigate("/admin/add-branch")}
                  className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-[#e9ecef] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#c1a16a]/50 transition-all text-[#192a3e] group"
                >
                  <div className="p-2.5 bg-[#f8f9fa] rounded-xl group-hover:bg-[#c1a16a]/10 transition-colors">
                    <Activity className="w-6 h-6 text-[#192a3e] group-hover:text-[#c1a16a]" />
                  </div>
                  <span className="text-[13px] font-bold">Agregar Sucursal</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e]">Actividad</h2>
                 <button className="text-[14px] text-[#c1a16a] font-semibold hover:text-[#d4b57a] transition-colors">Ver todo</button>
              </div>
              <div className="bg-white rounded-3xl shadow-sm border border-[#e9ecef] p-5 space-y-4">
                {[
                  { event: "Nueva cita registrada", time: "Hace 5 min", icon: Calendar, color: "text-[#192a3e]", bg: "bg-[#192a3e]/10" },
                  { event: "Nuevo paciente registrado", time: "Hace 15 min", icon: Users, color: "text-[#192a3e]", bg: "bg-[#192a3e]/10" },
                  { event: "Nuevo doctor registrado", time: "Hace 2 horas", icon: Users, color: "text-[#c1a16a]", bg: "bg-[#c1a16a]/10" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-[#192a3e] truncate">{item.event}</p>
                      <p className="text-[12px] text-[#717182] font-medium">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Revenue Chart (Right Col, spans 2) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#192a3e] mb-2">Próximos Eventos</h2>
            <div className="bg-white rounded-[2rem] shadow-sm border border-[#e9ecef] p-8 min-h-[400px] flex flex-col justify-center items-center text-center">
               <div className="w-20 h-20 rounded-3xl bg-[#c1a16a]/10 flex items-center justify-center mb-6">
                 <Calendar className="w-10 h-10 text-[#c1a16a]" />
               </div>
               <h3 className="text-[20px] font-bold text-[#192a3e] mb-2">No hay eventos para hoy</h3>
               <p className="text-[#717182] text-[14px] max-w-[300px]">Las citas y eventos importantes aparecerán aquí conforme se registren en el sistema.</p>
               <button className="mt-8 px-6 py-3 bg-[#192a3e] text-white rounded-2xl font-bold text-[14px] hover:bg-[#2a3f56] transition-all shadow-lg shadow-[#192a3e]/10">
                 Ver Agenda Completa
               </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
