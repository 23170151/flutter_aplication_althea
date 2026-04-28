import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

class AppointmentBookingScreen extends StatefulWidget {
  final String doctorId;
  const AppointmentBookingScreen({super.key, required this.doctorId});

  @override
  State<AppointmentBookingScreen> createState() => _AppointmentBookingScreenState();
}

class _AppointmentBookingScreenState extends State<AppointmentBookingScreen> {
  DateTime _selectedDate = DateTime.now().add(const Duration(days: 1));
  String? _selectedTime;

  final _times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '3:00 PM', '3:30 PM', '4:00 PM'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(
        backgroundColor: AltheaColors.navy,
        foregroundColor: Colors.white,
        elevation: 0,
        title: const Text('Agendar Cita', style: TextStyle(fontWeight: FontWeight.w700)),
        leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/patient/doctors')),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Doctor info card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [AltheaColors.navy, AltheaColors.navyMid]),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Container(
                    width: 64, height: 64,
                    decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(18)),
                    child: const Icon(Icons.person_rounded, color: Colors.white, size: 36),
                  ),
                  const SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Dra. María González', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 4),
                      Text('Cardiología', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 14)),
                      const SizedBox(height: 4),
                      Text('Consultorio 301', style: TextStyle(color: AltheaColors.gold, fontSize: 13, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            const Text('Selecciona una fecha', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
            const SizedBox(height: 12),

            // Calendar
            Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AltheaColors.borderLight)),
              child: CalendarDatePicker(
                initialDate: _selectedDate,
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(const Duration(days: 90)),
                onDateChanged: (d) => setState(() => _selectedDate = d),
              ),
            ),
            const SizedBox(height: 24),

            const Text('Horario disponible', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
            const SizedBox(height: 12),

            // Time slots
            Wrap(
              spacing: 10, runSpacing: 10,
              children: _times.map((t) {
                final selected = _selectedTime == t;
                return GestureDetector(
                  onTap: () => setState(() => _selectedTime = t),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 150),
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
                    decoration: BoxDecoration(
                      gradient: selected ? const LinearGradient(colors: [AltheaColors.gold, AltheaColors.goldLight]) : null,
                      color: selected ? null : Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: selected ? AltheaColors.gold : AltheaColors.borderLight),
                    ),
                    child: Text(t, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: selected ? AltheaColors.navy : AltheaColors.textSecondary)),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 32),

            // Confirm button
            if (_selectedTime != null)
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('¡Cita agendada exitosamente!'), backgroundColor: AltheaColors.navy),
                    );
                    context.go('/patient/appointments');
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AltheaColors.gold,
                    foregroundColor: AltheaColors.navy,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                  child: const Text('Confirmar Cita', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
