import { useNavigate } from "react-router";
import { ArrowLeft, User, Search, UserCheck } from "lucide-react";

export function BookForPatient() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/receptionist/dashboard")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Agendar Cita</h1>
              <p className="text-[14px] text-white/70">Recepción / Gestión de Agenda</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] p-6 md:p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Step 1: Select Patient */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#e9ecef] pb-4">
                <div className="w-8 h-8 rounded-full bg-[#192a3e] text-white flex items-center justify-center font-bold text-[14px]">1</div>
                <h2 className="text-[20px] font-bold text-[#192a3e]">Seleccionar Paciente</h2>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c1a16a]" />
                <input
                  type="text"
                  placeholder="Buscar paciente o ID..."
                  className="w-full pl-12 pr-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl font-medium focus:outline-none focus:border-[#c1a16a] transition-colors"
                  defaultValue="Juan"
                />
              </div>

              {/* Patient Mock Result */}
              <div className="p-4 border-2 border-[#c1a16a] bg-[#c1a16a]/5 rounded-xl flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-white border border-[#c1a16a]/30 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-[#192a3e]" />
                 </div>
                 <div>
                    <h4 className="text-[15px] font-bold text-[#192a3e]">Juan Pérez</h4>
                    <p className="text-[12px] text-[#717182] font-medium">ID: PAC-8921</p>
                 </div>
              </div>
            </div>

            {/* Step 2: Select Doctor & Booking Flow Redirect */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-[#e9ecef] pb-4">
                <div className="w-8 h-8 rounded-full bg-[#192a3e] text-white flex items-center justify-center font-bold text-[14px]">2</div>
                <h2 className="text-[20px] font-bold text-[#192a3e]">Especialidad o Médico</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-[14px] text-[#717182] font-medium leading-relaxed">
                  Para continuar con el agendamiento y visualizar los horarios disponibles, proceda a la vista de selección de médicos donde completará el flujo en favor del paciente seleccionado.
                </p>
                
                <button 
                  onClick={() => navigate("/patient/doctors")}
                  className="w-full py-4 bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Continuar a Selección de Médico <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
