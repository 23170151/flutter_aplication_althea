import { useNavigate } from "react-router";
import { ArrowLeft, Search, UserCheck, Calendar as CalendarIcon, Phone } from "lucide-react";

export function SearchPatient() {
  const navigate = useNavigate();

  const searchResults = [
    { id: 1, name: "Juan Pérez", phone: "555-0123", email: "juan@example.com", status: "Activo" },
    { id: 2, name: "Juana López", phone: "555-0124", email: "juana.l@example.com", status: "Activo" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-20 md:pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
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
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Buscar Paciente</h1>
              <p className="text-[14px] text-white/70">Encuentra registros rápidamente</p>
            </div>
          </div>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192a3e]/50" />
            <input
              type="text"
              placeholder="Buscar por nombre, correo, teléfono o ID..."
              className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur-md rounded-2xl text-[#192a3e] placeholder-[#192a3e]/40 font-medium focus:outline-none focus:ring-4 focus:ring-[#c1a16a]/30 shadow-lg transition-all border border-white"
              defaultValue="Juan"
            />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 md:-mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] overflow-hidden p-6 md:p-8">
          <h2 className="text-[18px] font-bold text-[#192a3e] mb-6">Resultados de Búsqueda (2)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {searchResults.map((patient) => (
              <div key={patient.id} className="p-5 border border-[#e9ecef] rounded-2xl hover:shadow-md hover:border-[#c1a16a]/50 transition-all flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-[#e9ecef] pb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#192a3e]/5 to-[#192a3e]/10 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-[#192a3e]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#192a3e] leading-snug">{patient.name}</h3>
                    <span className="inline-block px-2 py-0.5 bg-[#28a745]/10 text-[#28a745] font-bold text-[11px] uppercase tracking-wider rounded-md mt-1">{patient.status}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                    <Phone className="w-4 h-4 text-[#c1a16a]" /> {patient.phone}
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-[#717182] font-medium">
                    <span className="w-4 text-center font-bold text-[#c1a16a]">@</span> {patient.email}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-2">
                  <button className="flex-1 py-2.5 bg-white border border-[#e9ecef] text-[#192a3e] rounded-xl text-[13px] font-bold shadow-sm hover:border-[#c1a16a] transition-colors">
                    Ver Perfil
                  </button>
                  <button onClick={() => navigate("/receptionist/book-patient")} className="flex-1 py-2.5 bg-gradient-to-r from-[#192a3e] to-[#243850] text-white rounded-xl text-[13px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> Nueva Cita
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
