import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Star, MapPin, SearchX } from "lucide-react";
import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctora1 from "@/assets/doctora1.png";
import doctora2 from "@/assets/doctora2.png";
import doctora3 from "@/assets/doctora3.jpg";

export function DoctorList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("Todos");

  const allDoctors = [
    {
      id: "1",
      name: "Dra. María González",
      specialty: "Cardiología",
      rating: 4.9,
      reviews: 127,
      consultorio: "Consultorio 301",
      nextAvailable: "Hoy, 2:00 PM",
      image: doctora1,
    },
    {
      id: "2",
      name: "Dr. Carlos Ramírez",
      specialty: "Medicina General",
      rating: 4.8,
      reviews: 98,
      consultorio: "Consultorio 105",
      nextAvailable: "Mañana, 9:00 AM",
      image: doctor1,
    },
    {
      id: "3",
      name: "Dra. Ana Martínez",
      specialty: "Dermatología",
      rating: 4.9,
      reviews: 156,
      consultorio: "Consultorio 204",
      nextAvailable: "28 Mar, 11:00 AM",
      image: doctora2,
    },
    {
      id: "4",
      name: "Dr. Luis Hernández",
      specialty: "Pediatría",
      rating: 5.0,
      reviews: 203,
      consultorio: "Consultorio 108",
      nextAvailable: "29 Mar, 3:30 PM",
      image: doctor2,
    },
    {
      id: "5",
      name: "Dra. Sofia Torres",
      specialty: "Ginecología",
      rating: 4.7,
      reviews: 89,
      consultorio: "Consultorio 302",
      nextAvailable: "30 Mar, 10:00 AM",
      image: doctora3,
    },
  ];

  const filteredDoctors = useMemo(() => {
    return allDoctors.filter((dr) => {
      const matchesSearch = dr.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           dr.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = activeSpecialty === "Todos" || dr.specialty === activeSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, activeSpecialty]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-12 md:pb-16 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/patient/dashboard")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Buscar Médico</h1>
              <p className="text-[14px] text-white/70">Encuentra al especialista ideal</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192a3e]/50" />
            <input
              type="text"
              placeholder="Buscar por especialidad o nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur-md rounded-2xl text-[#192a3e] placeholder-[#192a3e]/40 font-medium focus:outline-none focus:ring-4 focus:ring-[#c1a16a]/30 shadow-lg transition-all border border-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        {/* Specialties Filter */}
        <div className="py-6 md:py-8 -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {[
              "Todos",
              "Cardiología",
              "Dermatología",
              "Pediatría",
              "Ginecología",
              "General",
            ].map((specialty) => (
              <button
                key={specialty}
                onClick={() => setActiveSpecialty(specialty)}
                className={`snap-start px-6 py-3 rounded-2xl whitespace-nowrap transition-all flex-shrink-0 font-semibold shadow-sm ${
                  activeSpecialty === specialty
                    ? "bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] text-white shadow-[#c1a16a]/20"
                    : "bg-white text-[#717182] border border-[#e9ecef] hover:border-[#c1a16a]/50 hover:text-[#192a3e]"
                }`}
              >
                <span className="text-[14px]">{specialty}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid / Empty State */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#e9ecef] hover:shadow-xl hover:-translate-y-1 hover:border-[#c1a16a]/30 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
              >
                {/* Subtle gradient hover effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c1a16a]/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex gap-5 mb-5 relative z-10">
                  {/* Doctor Avatar */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] border border-[#e9ecef] group-hover:border-[#c1a16a]/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm transition-all">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-[18px] font-bold text-[#192a3e] truncate pr-2">
                        {doctor.name}
                      </h3>
                    </div>

                    <p className="text-[14px] font-medium text-[#c1a16a] mb-2">{doctor.specialty}</p>

                    <div className="flex items-center gap-1.5 bg-[#f8f9fa] w-fit px-2.5 py-1 rounded-lg border border-[#e9ecef]">
                      <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                      <span className="text-[13px] font-bold text-[#192a3e]">
                        {doctor.rating}
                      </span>
                      <span className="text-[12px] text-[#717182] ml-0.5">({doctor.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-[#e9ecef] relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-[#f8f9fa] rounded-lg">
                      <MapPin className="w-4 h-4 text-[#717182]" />
                    </div>
                    <span className="text-[14px] text-[#717182] font-medium">{doctor.consultorio}</span>
                  </div>

                  <div className="flex items-center justify-between bg-[#f8f9fa] p-3 rounded-2xl border border-[#e9ecef]">
                    <div>
                      <span className="text-[11px] font-bold text-[#717182] uppercase tracking-wider">Disponible</span>
                      <p className="text-[13px] font-bold text-[#192a3e] mt-0.5">
                        {doctor.nextAvailable}
                      </p>
                    </div>
                    <button className="px-5 py-2.5 bg-[#192a3e] text-white rounded-xl text-[13px] font-semibold hover:bg-[#c1a16a] transition-colors shadow-sm">
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#e9ecef] mb-6">
              <SearchX className="w-10 h-10 text-[#c1a16a]" />
            </div>
            <h3 className="text-[22px] font-bold text-[#192a3e] mb-2">No encontramos resultados</h3>
            <p className="text-[16px] text-[#717182] max-w-sm font-medium leading-relaxed">
              No hay médicos que coincidan con "{searchQuery}" en la categoría de {activeSpecialty === 'Todos' ? 'todas las especialidades' : activeSpecialty}.
            </p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveSpecialty("Todos");}}
              className="mt-8 px-8 py-3 bg-[#192a3e] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
