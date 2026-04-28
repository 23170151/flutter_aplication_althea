import { useNavigate } from "react-router";
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Edit, LogOut, ChevronRight, Shield, CreditCard, Settings } from "lucide-react";
import { useUser } from "../../contexts/UserContext";
import { motion } from "motion/react";
import logoImage from "@/assets/4e22e5da8fe3f5a493fc37ee0e5f47200635e5bc.png";

export function PatientProfile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const userData = {
    name: user?.name || "Juan Pérez",
    email: user?.email || "juan.perez@correo.com",
    phone: "+52 123 456 7890",
    birthDate: "1985-05-15",
    address: "Av. Insurgentes 123, CDMX",
    memberSince: "Enero 2024",
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-28 md:pb-36 px-6 md:px-12 rounded-b-[3rem] md:rounded-b-[5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-8">
            <button
              onClick={() => navigate("/patient/dashboard")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[20px] font-bold tracking-tight">Mi Perfil</h1>
            <div className="w-11"></div> {/* Spacer */}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-[#c1a16a] to-[#d4b57a] rounded-[2.5rem] flex items-center justify-center shadow-2xl border-4 border-white/20 p-2">
              <div className="w-full h-full bg-[#192a3e] rounded-[2rem] flex items-center justify-center">
                <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2.5 bg-white text-[#192a3e] rounded-2xl shadow-lg border border-[#e9ecef] hover:scale-110 transition-transform">
              <Edit className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6"
          >
            <h2 className="text-[26px] md:text-[32px] font-black leading-tight">{userData.name}</h2>
            <p className="text-[14px] md:text-[15px] opacity-70 font-medium">Miembro desde {userData.memberSince}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Info Column */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stats Bar */}
            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-lg border border-white p-6 md:p-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-[28px] md:text-[32px] font-black bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">12</div>
                  <div className="text-[12px] md:text-[13px] text-[#717182] font-bold uppercase tracking-wider">Citas</div>
                </div>
                <div className="text-center border-x border-[#e9ecef]">
                  <div className="text-[28px] md:text-[32px] font-black text-[#192a3e]">3</div>
                  <div className="text-[12px] md:text-[13px] text-[#717182] font-bold uppercase tracking-wider">Próximas</div>
                </div>
                <div className="text-center">
                  <div className="text-[28px] md:text-[32px] font-black bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">5</div>
                  <div className="text-[12px] md:text-[13px] text-[#717182] font-bold uppercase tracking-wider">Especialistas</div>
                </div>
              </div>
            </motion.div>

            {/* Personal Details */}
            <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] shadow-sm border border-[#e9ecef] p-6 md:p-10">
              <h3 className="text-[20px] font-bold text-[#192a3e] mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#c1a16a] rounded-full" />
                Información Personal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "Correo electrónico", val: userData.email, icon: Mail },
                  { label: "Teléfono de contacto", val: userData.phone, icon: Phone },
                  { label: "Fecha de nacimiento", val: new Date(userData.birthDate + 'T00:00:00').toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" }), icon: Calendar },
                  { label: "Dirección principal", val: userData.address, icon: MapPin },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-[#f4f6f8] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#c1a16a]/10 transition-colors">
                      <item.icon className="w-5 h-5 text-[#c1a16a]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#717182] mb-1">{item.label}</p>
                      <p className="text-[15px] font-bold text-[#192a3e] group-hover:text-[#c1a16a] transition-colors">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar / Actions Column */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-[#e9ecef] p-6 md:p-8"
            >
              <h3 className="text-[20px] font-bold text-[#192a3e] mb-6">Ajustes & Seguridad</h3>
              <div className="space-y-3">
                {[
                  { label: "Historial Médico", icon: Shield },
                  { label: "Métodos de Pago", icon: CreditCard },
                  { label: "Configuración", icon: Settings },
                ].map((action, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 bg-[#f8f9fa] rounded-2xl hover:bg-[#c1a16a]/5 hover:border-[#c1a16a]/30 border border-transparent transition-all group">
                    <div className="flex items-center gap-4">
                      <action.icon className="w-5 h-5 text-[#192a3e]/50 group-hover:text-[#c1a16a]" />
                      <span className="text-[15px] font-bold text-[#192a3e]">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#717182] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#f8f9fa]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 border border-red-100 transition-all shadow-sm"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </div>
            </motion.div>

            {/* App Info / Brand */}
            <div className="text-center p-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
              <img src={logoImage} alt="ALTHEA" className="w-12 h-12 mx-auto mb-3" />
              <p className="text-[12px] font-bold text-[#192a3e] tracking-widest uppercase">
                ALTHEA
              </p>
              <p className="text-[11px] text-[#717182] mt-1 font-medium">Versión 0.0.1 (Beta)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

