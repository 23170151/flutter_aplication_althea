import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeft, User, FileText, ClipboardList, Paperclip, Clock, Plus, Search } from "lucide-react";

export function MedicalRecord() {
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state?.patient || {
    name: "Pendiente",
    id: "---",
    age: "--",
    blood: "--",
    allergies: "---"
  };

  const isNewRecord = !location.state?.patient;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoundPatient, setSelectedFoundPatient] = useState<any>(null);

  const mockRecentlySeen = [
    { name: "Juan Pérez", id: "PAC-12893", age: 45, blood: "O+", allergies: "Neva" },
    { name: "María López", id: "PAC-22341", age: 32, blood: "A-", allergies: "Penicilina" },
  ];

  const currentPatient = selectedFoundPatient || (location.state?.patient ? patientData : null);

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-32 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
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
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Expediente Clínico</h1>
              <p className="text-[14px] text-white/70">{patientData.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-[22px] font-bold">{currentPatient?.name || "Seleccione Paciente"}</h2>
              <div className="flex gap-4 mt-1 text-[13px] text-white/80 font-medium">
                 <span>{currentPatient?.age || '--'} {currentPatient?.age ? 'años' : ''}</span>
                 <span>Sangre: {currentPatient?.blood || '--'}</span>
                 <span>Alergias: {currentPatient?.allergies || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Notes and Form Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-bold flex items-center gap-2"><ClipboardList className="w-5 h-5 text-[#c1a16a]" /> Nueva Nota Médica</h3>
                  <span className={`text-[12px] font-bold px-3 py-1 rounded-full ${currentPatient ? 'text-[#c1a16a] bg-[#c1a16a]/10' : 'text-[#717182] bg-[#f8f9fa]'}`}>
                    {currentPatient ? 'Borrador' : 'Selección Requerida'}
                  </span>
                </div>
                
                {!currentPatient ? (
                  <div className="p-10 border-2 border-dashed border-[#e9ecef] rounded-3xl flex flex-col items-center text-center">
                    <Search className="w-10 h-10 text-[#717182]/30 mb-4" />
                    <p className="text-[15px] text-[#717182] font-medium mb-6">Para añadir una nota médica, busque al paciente en su base de datos.</p>
                    <div className="w-full max-w-sm relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717182]" />
                      <input 
                        type="text" 
                        placeholder="Nombre o ID del paciente..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50"
                      />
                    </div>
                    {searchQuery.length > 2 && (
                       <div className="mt-4 w-full max-w-sm bg-white border border-[#e9ecef] rounded-2xl shadow-xl overflow-hidden text-left">
                          {mockRecentlySeen.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                             <button 
                                key={p.id}
                                onClick={() => setSelectedFoundPatient(p)}
                                className="w-full p-4 hover:bg-[#f8f9fa] transition-colors border-b last:border-0 border-[#e9ecef] flex items-center justify-between"
                             >
                                <div>
                                   <p className="font-bold text-[#192a3e]">{p.name}</p>
                                   <p className="text-xs text-[#717182]">{p.id}</p>
                                </div>
                                <Plus className="w-4 h-4 text-[#c1a16a]" />
                             </button>
                          ))}
                       </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[13px] font-bold text-[#717182] ml-4 block mb-1">Motivo de consulta</label>
                      <input type="text" placeholder="Ej. Dolor persistente..." className="w-full bg-[#f8f9fa] border border-[#e9ecef] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50" />
                    </div>
                    
                    <div>
                      <label className="text-[13px] font-bold text-[#717182] ml-4 block mb-1">Diagnóstico y Notas</label>
                      <textarea placeholder="Escriba aquí sus observaciones clínicas..." rows={5} className="w-full bg-[#f8f9fa] border border-[#e9ecef] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 resize-none"></textarea>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4">
                       <button className="px-5 py-3 border border-[#e9ecef] text-[#192a3e] rounded-xl text-[14px] font-bold hover:bg-[#f8f9fa] transition-colors flex items-center gap-2">
                         <Paperclip className="w-4 h-4" /> Adjuntar
                       </button>
                       <button className="px-5 py-3 bg-[#192a3e] text-white rounded-xl text-[14px] font-bold shadow-md hover:bg-[#2a3f56] hover:shadow-lg transition-all">
                         Guardar Expediente
                       </button>
                    </div>
                  </div>
                )}
            </div>
            
            <div className="bg-white rounded-[2rem] shadow-sm border border-[#e9ecef] p-6 md:p-8">
               <h3 className="text-[18px] font-bold flex items-center gap-2 mb-6"><FileText className="w-5 h-5 text-[#c1a16a]" /> Documentos Adjuntos</h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-[#e9ecef] p-4 rounded-xl flex items-center gap-4 hover:border-[#c1a16a]/40 transition-colors cursor-pointer group">
                     <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                        <FileText className="w-5 h-5" />
                     </div>
                     <div>
                       <p className="text-[14px] font-bold text-[#192a3e]">Resultados_Lab_Oct.pdf</p>
                       <p className="text-[12px] text-[#717182] font-medium">1.2 MB</p>
                     </div>
                  </div>
                  
                  <div className="border border-dashed border-[#c1a16a]/50 p-4 rounded-xl flex items-center justify-center gap-2 text-[#c1a16a] hover:bg-[#c1a16a]/5 transition-colors cursor-pointer font-bold text-[14px]">
                     <Plus className="w-5 h-5" /> Subir Archivo
                  </div>
               </div>
            </div>
          </div>

          {/* Timeline History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] shadow-lg border border-[#e9ecef] p-6 md:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold flex items-center gap-2"><Clock className="w-5 h-5 text-[#c1a16a]" /> Historial</h3>
                {isNewRecord && (
                  <button className="p-2 bg-[#f8f9fa] rounded-lg hover:bg-[#c1a16a]/10 transition-colors">
                    <Search className="w-4 h-4 text-[#192a3e]" />
                  </button>
                )}
              </div>
              
              {isNewRecord ? (
                <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                  <User className="w-12 h-12 text-[#e9ecef] mb-3" />
                  <p className="text-[14px] text-[#717182] font-medium leading-relaxed">
                    Por favor seleccione un paciente para ver su historial clínico.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#e9ecef] before:to-transparent">
                  {[
                    { date: "12 Oct 2023", desc: "Consulta General - Dolor leve en abdomen." },
                    { date: "05 Jun 2023", desc: "Chequeo de rutina anual. Resultados normales." },
                    { date: "14 Ene 2023", desc: "Tratamiento por infección respiratoria aguda." }
                  ].map((item, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#c1a16a] text-white shadow relative z-10 flex-shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#e9ecef] bg-white shadow-sm ml-4 md:ml-0 md:group-odd:mr-4 md:group-even:ml-4 float-right md:float-none group-hover:border-[#c1a16a]/30 transition-colors">
                        <h4 className="text-[13px] font-bold text-[#c1a16a] mb-1">{item.date}</h4>
                        <p className="text-[13px] text-[#192a3e] font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
