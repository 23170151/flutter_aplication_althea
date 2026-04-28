import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

class DoctorScheduleScreen extends StatefulWidget {
  const DoctorScheduleScreen({super.key});
  @override State<DoctorScheduleScreen> createState() => _DoctorScheduleScreenState();
}
class _DoctorScheduleScreenState extends State<DoctorScheduleScreen> {
  DateTime _selectedDay = DateTime.now();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(backgroundColor: AltheaColors.navy, foregroundColor: Colors.white, elevation: 0, title: const Text('Mi Agenda', style: TextStyle(fontWeight: FontWeight.w700)), leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/doctor/dashboard'))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Calendar
            Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AltheaColors.borderLight)),
              child: CalendarDatePicker(initialDate: _selectedDay, firstDate: DateTime.now().subtract(const Duration(days: 30)), lastDate: DateTime.now().add(const Duration(days: 90)), onDateChanged: (d) => setState(() => _selectedDay = d)),
            ),
            const SizedBox(height: 24),
            const Text('Horario del Día', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
            const SizedBox(height: 12),
            ...[
              {'time': '9:00 AM', 'patient': 'Juan Pérez', 'type': 'Primera consulta'},
              {'time': '10:30 AM', 'patient': 'María López', 'type': 'Seguimiento'},
              {'time': '2:00 PM', 'patient': 'Carlos Gómez', 'type': 'Control'},
            ].map((a) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AltheaColors.borderLight)),
                child: Row(
                  children: [
                    Container(width: 4, height: 48, decoration: BoxDecoration(color: AltheaColors.gold, borderRadius: BorderRadius.circular(4))),
                    const SizedBox(width: 14),
                    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(a['patient']!, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: AltheaColors.navy)),
                      Text(a['type']!, style: const TextStyle(fontSize: 13, color: AltheaColors.textSecondary)),
                    ])),
                    Text(a['time']!, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AltheaColors.gold)),
                  ],
                ),
              ),
            )),
          ],
        ),
      ),
    );
  }
}
