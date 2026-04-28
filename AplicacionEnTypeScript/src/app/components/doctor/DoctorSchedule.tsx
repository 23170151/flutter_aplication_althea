import { useNavigate } from "react-router";
import { ArrowLeft, Clock, Calendar as CalendarIcon, Ban, CheckCircle } from "lucide-react";

export function DoctorSchedule() {
  const navigate = useNavigate();

  const timeSlots = [
    { time: "9:00 AM", status: "booked", patient: "Juan Pérez" },
    { time: "10:00 AM", status: "available" },
    { time: "10:30 AM", status: "booked", patient: "María López" },
    { time: "11:30 AM", status: "blocked" },
    { time: "12:00 PM", status: "blocked" },
    { time: "2:00 PM", status: "booked", patient: "Carlos Gómez" },
    { time: "3:00 PM", status: "available" },
    { time: "4:00 PM", status: "available" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/doctor/dashboard")}
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Mi Agenda</h1>
                <p className="text-[14px] text-white/70">Gestiona tus horarios y bloqueos</p>
              </div>
            </div>
            {/* Desktop Date Picker Placeholder */}
            <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 px-4">
              <CalendarIcon className="w-5 h-5 text-[#c1a16a]" />
              <span className="font-semibold">Hoy, 25 Mar 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-16 relative z-20">
        
        {/* Mobile Date Picker Placeholder */}
        <div className="md:hidden flex items-center gap-3 bg-white shadow-sm border border-[#e9ecef] rounded-2xl p-4 mb-6">
          <CalendarIcon className="w-5 h-5 text-[#c1a16a]" />
          <span className="font-semibold text-[#192a3e]">Hoy, 25 Mar 2026</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Timeline View */}
          <div className="lg:col-span-2 space-y-4">
            {timeSlots.map((slot, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 p-5 md:p-6 rounded-[2rem] border transition-all ${
                  slot.status === 'booked' ? 'bg-white shadow-md border-transparent hover:border-[#c1a16a]/30' : 
                  slot.status === 'blocked' ? 'bg-[#e9ecef]/50 border-transparent border-dashed border-2 hover:border-[#717182]/40' : 
                  'bg-white shadow-sm border-[#e9ecef] hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center min-w-[70px]">
                  <span className={`text-[15px] md:text-[16px] font-bold ${slot.status === 'blocked' ? 'text-[#717182]' : 'text-[#192a3e]'}`}>
                    {slot.time.split(' ')[0]}
                  </span>
                  <span className="text-[12px] font-bold text-[#717182] uppercase">{slot.time.split(' ')[1]}</span>
                </div>
                
                <div className="w-1 md:w-1.5 h-auto rounded-full bg-[#f8f9fa] overflow-hidden relative">
                  <div className={`absolute inset-0 ${
                    slot.status === 'booked' ? 'bg-[#c1a16a]' : 
                    slot.status === 'blocked' ? 'bg-[#717182]' : 
                    'bg-[#28a745]/60'
                  }`} />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-2">
                  <div>
                    {slot.status === 'booked' && (
                      <>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#c1a16a] mb-1">Ocupado</span>
                        <h3 className="text-[16px] md:text-[18px] font-bold text-[#192a3e]">{slot.patient}</h3>
                      </>
                    )}
                    {slot.status === 'available' && (
                      <>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#28a745] mb-1">Disponible</span>
                        <h3 className="text-[16px] md:text-[18px] font-bold text-[#192a3e]/60">Sin cita</h3>
                      </>
                    )}
                    {slot.status === 'blocked' && (
                      <>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#717182] mb-1">Bloqueado</span>
                        <h3 className="text-[16px] md:text-[18px] font-bold text-[#717182]/60 line-through">No disponible</h3>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {slot.status === 'available' ? (
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e9ecef] text-[#717182] rounded-xl text-[12px] font-bold hover:bg-[#ffebee] hover:text-[#d32f2f] hover:border-[#d32f2f]/30 transition-all">
                        <Ban className="w-4 h-4" />
                        Bloquear
                      </button>
                    ) : slot.status === 'blocked' ? (
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e9ecef] text-[#717182] rounded-xl text-[12px] font-bold hover:bg-[#e8f5e9] hover:text-[#28a745] transition-all">
                        <CheckCircle className="w-4 h-4" />
                        Desbloquear
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] text-[#192a3e] rounded-xl text-[12px] font-bold shadow-md hover:shadow-lg transition-all">
                        Ver Detalles
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions / Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] p-6 md:p-8">
              <h3 className="text-[18px] font-bold text-[#192a3e] mb-6">Bloquear Múltiples Horarios</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#717182] mb-2 uppercase tracking-wide">Fecha</label>
                  <input type="date" className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-4 py-3 text-[14px] font-medium text-[#192a3e] focus:outline-none focus:border-[#c1a16a]" defaultValue="2026-03-25" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-[#717182] mb-2 uppercase tracking-wide">Inicio</label>
                    <input type="time" className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-4 py-3 text-[14px] font-medium text-[#192a3e] focus:outline-none focus:border-[#c1a16a]" defaultValue="11:00" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-[#717182] mb-2 uppercase tracking-wide">Fin</label>
                    <input type="time" className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-4 py-3 text-[14px] font-medium text-[#192a3e] focus:outline-none focus:border-[#c1a16a]" defaultValue="13:00" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-[#717182] mb-2 uppercase tracking-wide">Motivo (Opcional)</label>
                  <input type="text" placeholder="Ej. Comida, Junta médica..." className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-4 py-3 text-[14px] font-medium text-[#192a3e] focus:outline-none focus:border-[#c1a16a]" />
                </div>
                
                <button className="w-full bg-[#192a3e] text-white rounded-xl py-3.5 mt-2 font-bold shadow-md hover:bg-[#c1a16a] transition-colors">
                  Aplicar Bloqueo
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#c1a16a]/10 to-[#d4b57a]/10 border border-[#c1a16a]/20 rounded-[2rem] p-6 flex items-start gap-4">
               <Clock className="w-6 h-6 text-[#c1a16a] flex-shrink-0 mt-1" />
               <div>
                  <h4 className="text-[15px] font-bold text-[#192a3e] mb-1">Horarios Fijos</h4>
                  <p className="text-[13px] text-[#717182]">Los horarios no disponibles configurados aquí aplican de manera estándar para tus días laborables. Edita estos desde "Configuración de Perfil".</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
