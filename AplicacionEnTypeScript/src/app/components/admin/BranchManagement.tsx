import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Plus, Phone, Users, CheckCircle2 } from "lucide-react";

export function BranchManagement() {
  const navigate = useNavigate();

  const branches = [
    { id: 1, name: "Sucursal Norte (Matriz)", address: "Av. Universidad 456, Col. Norte", phone: "555-0012", status: "Activa", doctors: 8 },
    { id: 2, name: "Sucursal Sur", address: "Blvd. Revolución 890, Col. Sur", phone: "555-0013", status: "Activa", doctors: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Gestión de Sucursales</h1>
                <p className="text-[14px] text-white/70">Administración de clínicas</p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#c1a16a] hover:bg-[#d4b57a] text-white rounded-xl shadow-md transition-colors font-bold text-[14px]">
              <Plus className="w-5 h-5" />
              <span className="hidden md:inline">Nueva Sucursal</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] p-6 md:p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {branches.map(branch => (
              <div key={branch.id} className="p-6 border border-[#e9ecef] rounded-3xl hover:shadow-md hover:border-[#c1a16a]/30 transition-all flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#c1a16a]/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#192a3e]/5 flex items-center justify-center text-[#192a3e]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-bold text-[#192a3e]">{branch.name}</h3>
                      <div className="flex items-center gap-1 text-[13px] font-medium text-[#28a745] mt-1">
                        <CheckCircle2 className="w-4 h-4" /> {branch.status}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mt-2 relative z-10">
                  <div className="flex items-start gap-3 text-[14px] text-[#717182] font-medium">
                    <MapPin className="w-4 h-4 text-[#c1a16a] mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                    <Phone className="w-4 h-4 text-[#c1a16a] flex-shrink-0" />
                    {branch.phone}
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                    <Users className="w-4 h-4 text-[#c1a16a] flex-shrink-0" />
                    {branch.doctors} Doctores Activos
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#e9ecef] flex justify-end gap-3 relative z-10">
                  <button className="px-4 py-2 border border-[#e9ecef] text-[#192a3e] rounded-xl text-[13px] font-bold hover:bg-[#f8f9fa] transition-colors">
                    Editar
                  </button>
                  <button className="px-4 py-2 bg-[#192a3e] text-white rounded-xl text-[13px] font-bold hover:bg-[#2a3f56] transition-colors shadow-sm">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
