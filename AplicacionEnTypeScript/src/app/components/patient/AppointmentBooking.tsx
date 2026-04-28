import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, CheckCircle, ShieldCheck, Loader2, AlertCircle, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUser } from "../../contexts/UserContext";
import doctora1 from "@/assets/doctora1.png";

// DEBUG FLAGS FOR TESTING (Set to true to test error UI/UX)
const DEBUG_FORCE_TIME_TAKEN_ERROR = false;
const DEBUG_FORCE_PAYMENT_REJECTED_ERROR = false;

export function AppointmentBooking() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { doctorId } = useParams();

  // UC Extension 1a: solicitarInicioSesion()
  useEffect(() => {
    if (!user) {
      navigate("/", { state: { from: `/patient/book-appointment/${doctorId}` } });
    }
  }, [user, navigate, doctorId]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Card form states
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const doctor = {
    name: "Dra. María González",
    specialty: "Cardiología",
    consultorio: "Consultorio 301 - Seccion 1",
    image: doctora1,
  };

  const availableDates = [
    "2026-03-25",
    "2026-03-26",
    "2026-03-27",
    "2026-03-28",
    "2026-03-29",
  ];

  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleBookAppointment = async () => {
    setIsProcessing(true);
    setError(null);

    // Simulate network delay / bank validation (Step 8 of UC)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate UC extension 6a (Time already taken) or 8a (Payment rejected)
    if (DEBUG_FORCE_TIME_TAKEN_ERROR) {
      setError("El horario seleccionado ya no está disponible. Por favor elige otro.");
      setIsProcessing(false);
      return;
    } else if (DEBUG_FORCE_PAYMENT_REJECTED_ERROR && paymentMethod === "card") {
      setError("El pago fue rechazado por el banco. Por favor intenta con otra tarjeta.");
      setIsProcessing(false);
      return;
    }

    setIsProcessing(false);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] bg-[#c1a16a]/20 rounded-full blur-[100px]" />

        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white max-w-md w-full text-center relative z-10">
          <div className="relative w-28 h-28 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#c1a16a] to-[#d4b57a] rounded-full animate-ping opacity-20" />
            <div className="relative w-full h-full bg-gradient-to-br from-[#c1a16a] to-[#d4b57a] rounded-full flex items-center justify-center shadow-lg shadow-[#c1a16a]/30">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
          </div>

          <h1 className="text-[28px] md:text-[32px] font-bold text-[#192a3e] mb-4 tracking-tight">
            ¡Cita Confirmada!
          </h1>
          <p className="text-[15px] md:text-[16px] text-[#717182] mb-10 leading-relaxed font-medium">
            Tu cita ha sido agendada exitosamente. Hemos enviado los detalles a tu correo electrónico.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/patient/dashboard")}
              className="flex-1 px-6 py-4 bg-white border border-[#e9ecef] text-[#192a3e] rounded-2xl font-semibold hover:border-[#c1a16a]/50 hover:bg-[#f8f9fa] transition-all"
            >
              Ir al Inicio
            </button>
            <button
              onClick={() => navigate("/patient/appointments")}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#192a3e] to-[#243850] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#192a3e]/20 transition-all"
            >
              Ver Mis Citas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#192a3e] font-sans pb-12">
      {/* Header & Doctor Info Context */}
      <div className="bg-gradient-to-r from-[#192a3e] via-[#243850] to-[#192a3e] text-white pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Decorative blur elements for modern premium feel */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-[#c1a16a]/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => navigate("/patient/doctors")}
              className="p-2.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight">Agendar Cita</h1>
          </div>

          {/* Doctor Info Card Overlay */}
          <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-5 md:p-6 shadow-2xl max-w-2xl">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner border border-white/30">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-[#c1a16a]/20 border border-[#c1a16a]/30 rounded-full mb-2">
                  <span className="text-[12px] font-bold text-[#d4b57a] uppercase tracking-wide">{doctor.specialty}</span>
                </div>
                <h2 className="text-[20px] md:text-[24px] font-bold mb-1 leading-tight">{doctor.name}</h2>
                <div className="flex items-center gap-2 mt-2 opacity-90">
                  <MapPin className="w-4 h-4 text-[#c1a16a]" />
                  <span className="text-[14px] font-medium">{doctor.consultorio}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 md:-mt-16 relative z-20">
        {/* Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* Left Column: Date and Time Selection */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Select Date */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e9ecef]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e9ecef]">
                  <Calendar className="w-5 h-5 text-[#c1a16a]" />
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#192a3e]">Selecciona una fecha</h3>
                  <p className="text-[14px] text-[#717182]">Próximos días disponibles</p>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                {availableDates.map((date) => {
                  const dateObj = new Date(date + 'T00:00:00');
                  const day = dateObj.getDate();
                  const month = dateObj.toLocaleDateString("es-MX", { month: "short" }).toUpperCase();
                  const dayName = dateObj.toLocaleDateString("es-MX", { weekday: "short" }).replace('.', '');

                  const isSelected = selectedDate === date;

                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl transition-all border-2 ${isSelected
                        ? "bg-gradient-to-br from-[#c1a16a] to-[#d4b57a] text-white border-transparent shadow-lg shadow-[#c1a16a]/30 scale-[1.02]"
                        : "bg-white text-[#192a3e] border-[#e9ecef] hover:border-[#c1a16a]/50 hover:bg-[#f8f9fa]"
                        }`}
                    >
                      <span className={`text-[11px] font-bold uppercase mb-1 ${isSelected ? 'text-white/80' : 'text-[#717182]'}`}>{month}</span>
                      <span className="text-[24px] md:text-[26px] font-black leading-none mb-1">{day}</span>
                      <span className={`text-[12px] font-medium capitalize ${isSelected ? 'text-white/90' : 'text-[#192a3e]'}`}>{dayName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Date Picker Button */}
              <div className="pt-4 border-t border-[#e9ecef]">
                <div className="relative">
                  <input
                    type="date"
                    id="custom-date-picker"
                    className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedDate(e.target.value);
                      }
                    }}
                  />
                  <button
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border-2 transition-all font-bold text-[14px] ${selectedDate && !availableDates.includes(selectedDate)
                      ? "bg-[#192a3e] text-white border-[#192a3e] shadow-md"
                      : "bg-[#f8f9fa] text-[#192a3e] border-[#e9ecef] hover:border-[#c1a16a]/50"
                      }`}
                  >
                    <Calendar className="w-4.5 h-4.5" />
                    {selectedDate && !availableDates.includes(selectedDate)
                      ? `Fecha seleccionada: ${new Date(selectedDate + 'T00:00:00').toLocaleDateString("es-MX", { day: 'numeric', month: 'long', year: 'numeric' })}`
                      : "O selecciona una fecha exacta en el calendario"}
                  </button>
                </div>
              </div>
            </div>

            {/* Select Time */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e9ecef] transition-opacity duration-300" style={{ opacity: selectedDate ? 1 : 0.5, pointerEvents: selectedDate ? 'auto' : 'none' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e9ecef]">
                  <Clock className="w-5 h-5 text-[#c1a16a]" />
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#192a3e]">Selecciona una hora</h3>
                  <p className="text-[14px] text-[#717182]">Horarios para el {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString("es-MX", { day: 'numeric', month: 'long' }) : 'día seleccionado'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {availableTimes.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3.5 px-2 rounded-xl transition-all border-2 font-bold text-[14px] md:text-[15px] ${isSelected
                        ? "bg-[#192a3e] text-white border-[#192a3e] shadow-md scale-[1.02]"
                        : "bg-white text-[#192a3e] border-[#e9ecef] hover:border-[#192a3e]/30 hover:bg-[#f8f9fa]"
                        }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Payment & Summary */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#e9ecef]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e9ecef]">
                  <CreditCard className="w-5 h-5 text-[#c1a16a]" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#192a3e]">Método de pago</h3>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full flex items-center justify-between p-4 md:p-5 rounded-2xl transition-all border-2 ${paymentMethod === "card"
                    ? "bg-[#c1a16a]/5 border-[#c1a16a]"
                    : "bg-white border-[#e9ecef] hover:border-[#c1a16a]/40"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-[#c1a16a]/20' : 'bg-[#f8f9fa]'}`}>
                      <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-[#c1a16a]' : 'text-[#717182]'}`} />
                    </div>
                    <div className="text-left">
                      <span className="block text-[15px] font-bold text-[#192a3e]">Tarjeta</span>
                      <span className="block text-[13px] text-[#717182] mt-0.5">Crédito o Débito</span>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "card" ? "border-[#c1a16a] bg-[#c1a16a]" : "border-[#e9ecef]"}`}>
                    {paymentMethod === "card" && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                  </div>
                </button>


              </div>

              {/* Card Form Integration (UC Step 7) */}
              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 space-y-4 border-t border-[#e9ecef] mt-6">
                      <div>
                        <label className="text-[13px] font-bold text-[#717182] ml-2 block mb-1">Nombre en la tarjeta</label>
                        <input
                          type="text"
                          placeholder="Como aparece en el plástico"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-[#f8f9fa] border border-[#e9ecef] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 text-[#192a3e] font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[13px] font-bold text-[#717182] ml-2 block mb-1">Número de tarjeta</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            className="w-full bg-[#f8f9fa] border border-[#e9ecef] pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 text-[#192a3e] font-medium tracking-widest"
                          />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#192a3e]/30" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[13px] font-bold text-[#717182] ml-2 block mb-1">Vencimiento</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full bg-[#f8f9fa] border border-[#e9ecef] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 text-[#192a3e] font-medium text-center"
                          />
                        </div>
                        <div>
                          <label className="text-[13px] font-bold text-[#717182] ml-2 block mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="***"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            className="w-full bg-[#f8f9fa] border border-[#e9ecef] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 text-[#192a3e] font-medium text-center tracking-widest"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary & Checkout */}
            <div className="bg-gradient-to-br from-[#192a3e] to-[#243850] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c1a16a]/10 rounded-bl-full blur-[20px]" />

              <h3 className="text-[18px] md:text-[20px] font-bold mb-6 relative z-10">Resumen de tu cita</h3>

              <div className="space-y-4 relative z-10 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] md:text-[15px] text-white/70 font-medium">Costo de Consulta</span>
                  <span className="text-[16px] md:text-[18px] font-bold">$800 MXN</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[14px] md:text-[15px] text-white/70 font-medium">Anticipo Requerido</span>
                  <span className="text-[16px] md:text-[18px] font-bold">$400 MXN</span>
                </div>

                <div className="h-px bg-white/20 my-4 skew-x-12"></div>

                <div className="flex justify-between items-end">
                  <span className="text-[16px] md:text-[18px] font-semibold">Total a pagar hoy</span>
                  <span className="text-[28px] md:text-[32px] font-black bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">$400</span>
                </div>
              </div>

              {/* Error Message (UC Extensions) */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-red-500/20 border border-red-500/50 p-4 rounded-2xl mb-6 flex items-start gap-3 relative z-10"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[13px] font-bold text-red-100">{error}</p>
                    <button onClick={() => setError(null)} className="ml-auto">
                      <X className="w-4 h-4 text-red-100/50 hover:text-red-100" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Book Button */}
              <button
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime || isProcessing || (paymentMethod === "card" && (!cardNumber || !expiry || !cvv))}
                className={`w-full py-4 md:py-5 rounded-2xl font-bold shadow-lg transition-all relative z-10 flex items-center justify-center gap-2 ${selectedDate && selectedTime && !isProcessing
                  ? "bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] text-[#192a3e] hover:shadow-[#c1a16a]/30 hover:shadow-xl active:scale-[0.98]"
                  : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                  }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    {paymentMethod === "card" ? "Pagar Anticipo y Agendar" : "Confirmar y Agendar"}
                  </>
                )}
              </button>

              <p className="text-center text-[12px] text-white/50 mt-4 relative z-10">Transacción 100% segura y encriptada</p>
            </div>

          </div>

        </div>
      </div>

      {/* Success Notification Toast (Step 10 of UC) */}
    </div>
  );
}
