import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Phone, Lock, Eye, EyeOff, Calendar } from "lucide-react";
import { motion } from "motion/react";
import logoImage from "@/assets/4e22e5da8fe3f5a493fc37ee0e5f47200635e5bc.png";

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    navigate("/patient/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#0d1820]">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-gradient-to-bl from-[#c1a16a]/20 to-transparent blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#192a3e] to-transparent blur-[120px]"
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 sm:mb-8 flex items-center gap-3 relative z-10 w-full max-w-[400px] justify-center mt-4"
      >
        <img src={logoImage} alt="ALTHEA" className="w-12 h-12 sm:w-14 sm:h-14" />
        <div className="text-white">
          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight">ALTHEA</h1>
          <p className="text-[11px] sm:text-[13px] opacity-70 font-medium tracking-wide text-[#c1a16a]">CONSULTORIOS</p>
        </div>
      </motion.div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] sm:rounded-3xl shadow-2xl p-6 sm:p-8 relative z-10"
      >
        <div className="mb-6 text-center">
          <h2 className="text-[24px] sm:text-[28px] font-semibold text-white mb-1.5">Crear Cuenta</h2>
          <p className="text-[13px] sm:text-[14px] text-white/60">Completa tus datos para registrarte</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-[13px] font-medium text-white/80 mb-1.5 ml-1">
              Nombre completo
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40 group-focus-within:text-[#c1a16a] transition-colors" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-[14px] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 focus:border-[#c1a16a] transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[13px] font-medium text-white/80 mb-1.5 ml-1">
              Correo electrónico
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40 group-focus-within:text-[#c1a16a] transition-colors" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-[14px] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 focus:border-[#c1a16a] transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-[13px] font-medium text-white/80 mb-1.5 ml-1">
                Teléfono
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40 group-focus-within:text-[#c1a16a] transition-colors" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                  className="w-full pl-11 pr-3 py-3 bg-black/20 border border-white/10 rounded-2xl text-[14px] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 focus:border-[#c1a16a] transition-all"
                  required
                />
              </div>
            </div>

            {/* Birth Date Input */}
            <div>
              <label htmlFor="birthDate" className="block text-[13px] font-medium text-white/80 mb-1.5 ml-1">
                Nacimiento
              </label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40 group-focus-within:text-[#c1a16a] transition-colors" />
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full pl-11 pr-3 py-3 bg-black/20 border border-white/10 rounded-2xl text-[14px] text-white focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 focus:border-[#c1a16a] transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-[13px] font-medium text-white/80 mb-1.5 ml-1">
              Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/40 group-focus-within:text-[#c1a16a] transition-colors" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-black/20 border border-white/10 rounded-2xl text-[14px] text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c1a16a]/50 focus:border-[#c1a16a] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#c1a16a] to-[#d4b57a] text-[#192a3e] py-3.5 sm:py-4 rounded-2xl font-semibold shadow-lg shadow-[#c1a16a]/20 hover:shadow-[#c1a16a]/40 transition-all mt-6"
          >
            Crear Cuenta
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center bg-black/10 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:p-5 border-t border-white/10 rounded-b-[28px] sm:rounded-b-3xl">
          <p className="text-[13px] sm:text-[14px] text-white/70">
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-[#c1a16a] hover:text-[#d4b57a] font-semibold transition-colors ml-1"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 text-white/50 text-[11px] font-medium tracking-widest uppercase text-center relative z-10 mb-8"
      >
        © 2026 ALTHEA Consultorios. <br className="sm:hidden" />Todos los derechos reservados.
      </motion.div>
    </div>
  );
}