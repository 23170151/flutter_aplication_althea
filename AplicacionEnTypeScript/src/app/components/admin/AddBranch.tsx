import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Phone, Building2, Save } from "lucide-react";
import { motion } from "motion/react";

export function AddBranch() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Agregar Nueva Sucursal</h1>
              <p className="text-[14px] text-white/70">Registrar una nueva clínica en el sistema</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-xl border border-[#e9ecef] p-8 md:p-10"
        >
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#192a3e]/60 ml-1 uppercase tracking-wider">Nombre de la Sucursal</label>
                <div className="relative group">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717182] group-focus-within:text-[#c1a16a] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Ej. Sucursal Poniente"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/20 focus:border-[#c1a16a] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-[#192a3e]/60 ml-1 uppercase tracking-wider">Dirección Completa</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717182] group-focus-within:text-[#c1a16a] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Calle, Número, Colonia, CP"
                    className="w-full pl-12 pr-4 py-3.5 bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/20 focus:border-[#c1a16a] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#192a3e]/60 ml-1 uppercase tracking-wider">Teléfono de Contacto</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717182] group-focus-within:text-[#c1a16a] transition-colors" />
                    <input 
                      type="tel" 
                      placeholder="55 0000 0000"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/20 focus:border-[#c1a16a] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-[#192a3e]/60 ml-1 uppercase tracking-wider">Ciudad</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717182] group-focus-within:text-[#c1a16a] transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Ej. Ciudad de México"
                      className="w-full pl-12 pr-4 py-3.5 bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/20 focus:border-[#c1a16a] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="w-full bg-[#192a3e] hover:bg-[#2a3f56] text-white py-4 rounded-2xl font-bold text-[16px] shadow-lg shadow-[#192a3e]/10 transition-all flex items-center justify-center gap-3"
              >
                <Save className="w-5 h-5" />
                Guardar Sucursal
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
