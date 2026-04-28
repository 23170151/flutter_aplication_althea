import { useNavigate } from "react-router";
import { ArrowLeft, Search, User, FileText, ChevronRight } from "lucide-react";

export function DoctorPatients() {
  const navigate = useNavigate();

  const patients = [
    { id: 1, name: "Juan Pérez", age: 34, lastVisit: "Hace 1 semana", nextAppt: "Hoy, 9:00 AM" },
    { id: 2, name: "María López", age: 28, lastVisit: "Hace 2 meses", nextAppt: "Hoy, 10:30 AM" },
    { id: 3, name: "Roberto Sánchez", age: 45, lastVisit: "Ayer", nextAppt: "Ninguna" },
    { id: 4, name: "Carmen Gómez", age: 52, lastVisit: "Hace 6 meses", nextAppt: "29 Mar, 4:00 PM" },
    { id: 5, name: "Luis Torres", age: 19, lastVisit: "Primera vez", nextAppt: "Mañana, 11:00 AM" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-20 md:pb-24 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/doctor/dashboard")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Mis Pacientes</h1>
              <p className="text-[14px] text-white/70">Historial y expedientes médicos</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192a3e]/50" />
            <input
              type="text"
              placeholder="Buscar paciente por nombre o ID..."
              className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur-md rounded-2xl text-[#192a3e] placeholder-[#192a3e]/40 font-medium focus:outline-none focus:ring-4 focus:ring-[#c1a16a]/30 shadow-lg transition-all border border-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-12 pb-12 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] overflow-hidden">
          
          {/* Header Row (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-[#f8f9fa] border-b border-[#e9ecef] text-[13px] font-bold text-[#717182] uppercase tracking-wider">
            <div className="col-span-4">Paciente</div>
            <div className="col-span-3">Última Visita</div>
            <div className="col-span-3">Próxima Cita</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          <div className="divide-y divide-[#e9ecef]">
            {patients.map((patient) => (
              <div key={patient.id} className="p-6 md:p-0">
                {/* Mobile View */}
                <div className="md:hidden flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#192a3e]/10 to-[#c1a16a]/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-[#192a3e]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[#192a3e]">{patient.name}</h3>
                      <p className="text-[13px] text-[#717182]">Edad: {patient.age} años</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 bg-[#f8f9fa] p-3 rounded-xl border border-[#e9ecef]">
                    <div>
                      <span className="block text-[11px] font-bold text-[#717182] uppercase">Última Visita</span>
                      <span className="text-[13px] font-medium text-[#192a3e]">{patient.lastVisit}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-[#717182] uppercase">Próxima Cita</span>
                      <span className="text-[13px] font-medium text-[#192a3e]">{patient.nextAppt}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate("/doctor/medical-record")}
                    className="w-full flex justify-center items-center gap-2 py-3 bg-white border border-[#e9ecef] rounded-xl text-[14px] font-semibold text-[#192a3e] hover:border-[#c1a16a] transition-colors shadow-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Expediente
                  </button>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 items-center hover:bg-[#f8f9fa] transition-colors group">
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#192a3e]/10 to-[#c1a16a]/20 flex items-center justify-center group-hover:from-[#c1a16a]/20 group-hover:to-[#c1a16a]/30 transition-colors">
                      <User className="w-6 h-6 text-[#192a3e]" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[#192a3e]">{patient.name}</h3>
                      <p className="text-[13px] text-[#717182]">{patient.age} años</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <span className="inline-block px-3 py-1 bg-[#192a3e]/5 rounded-lg text-[14px] font-medium text-[#192a3e]">
                      {patient.lastVisit}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-[14px] font-medium text-[#192a3e]">{patient.nextAppt}</span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button 
                      onClick={() => navigate("/doctor/medical-record")}
                      className="px-4 py-2.5 bg-white border border-[#e9ecef] rounded-xl text-[13px] font-semibold text-[#192a3e] hover:border-[#c1a16a] hover:text-[#c1a16a] transition-all shadow-sm flex items-center gap-2"
                    >
                      Expediente
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-[#f8f9fa] border-t border-[#e9ecef] text-center">
            <button className="text-[14px] font-bold text-[#c1a16a] hover:text-[#d4b57a] transition-colors">
              Cargar más pacientes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
