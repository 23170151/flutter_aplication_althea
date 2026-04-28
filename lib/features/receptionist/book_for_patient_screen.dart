import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

class BookForPatientScreen extends StatefulWidget {
  const BookForPatientScreen({super.key});
  @override State<BookForPatientScreen> createState() => _BookForPatientScreenState();
}
class _BookForPatientScreenState extends State<BookForPatientScreen> {
  String? _selectedPatient;
  String? _selectedDoctor;
  String? _selectedTime;
  DateTime _selectedDate = DateTime.now().add(const Duration(days: 1));

  final _patients = ['Juan Pérez', 'María López', 'Carlos Gómez', 'Ana Torres'];
  final _doctors = ['Dra. María González - Cardiología', 'Dr. Carlos Ramírez - Medicina General', 'Dra. Laura Sánchez - Pediatría'];
  final _times = ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(backgroundColor: AltheaColors.navy, foregroundColor: Colors.white, elevation: 0, title: const Text('Agendar para Paciente', style: TextStyle(fontWeight: FontWeight.w700)), leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/receptionist/dashboard'))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _SectionTitle('Seleccionar Paciente'),
            _Dropdown(hint: 'Seleccionar paciente', items: _patients, value: _selectedPatient, onChanged: (v) => setState(() => _selectedPatient = v)),
            const SizedBox(height: 20),
            _SectionTitle('Seleccionar Doctor'),
            _Dropdown(hint: 'Seleccionar doctor', items: _doctors, value: _selectedDoctor, onChanged: (v) => setState(() => _selectedDoctor = v)),
            const SizedBox(height: 20),
            _SectionTitle('Fecha'),
            Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AltheaColors.borderLight)),
              child: CalendarDatePicker(initialDate: _selectedDate, firstDate: DateTime.now(), lastDate: DateTime.now().add(const Duration(days: 90)), onDateChanged: (d) => setState(() => _selectedDate = d)),
            ),
            const SizedBox(height: 20),
            _SectionTitle('Horario'),
            Wrap(spacing: 8, runSpacing: 8, children: _times.map((t) {
              final selected = _selectedTime == t;
              return GestureDetector(
                onTap: () => setState(() => _selectedTime = t),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(gradient: selected ? const LinearGradient(colors: [AltheaColors.gold, AltheaColors.goldLight]) : null, color: selected ? null : Colors.white, borderRadius: BorderRadius.circular(10), border: Border.all(color: selected ? AltheaColors.gold : AltheaColors.borderLight)),
                  child: Text(t, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: selected ? AltheaColors.navy : AltheaColors.textSecondary)),
                ),
              );
            }).toList()),
            const SizedBox(height: 28),
            if (_selectedPatient != null && _selectedDoctor != null && _selectedTime != null)
              SizedBox(width: double.infinity, height: 52, child: ElevatedButton.icon(icon: const Icon(Icons.check_rounded), label: const Text('Confirmar Cita'), style: ElevatedButton.styleFrom(backgroundColor: AltheaColors.gold, foregroundColor: AltheaColors.navy, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))), onPressed: () { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Cita agendada exitosamente'), backgroundColor: AltheaColors.navy)); context.go('/receptionist/dashboard'); })),
          ],
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String text;
  const _SectionTitle(this.text);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Text(text, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
    );
  }
}

class _Dropdown extends StatelessWidget {
  final String hint;
  final List<String> items;
  final String? value;
  final void Function(String?) onChanged;
  const _Dropdown({required this.hint, required this.items, required this.value, required this.onChanged});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14), border: Border.all(color: AltheaColors.borderLight)),
      child: DropdownButton<String>(
        isExpanded: true,
        underline: const SizedBox(),
        hint: Text(hint, style: const TextStyle(color: AltheaColors.textSecondary, fontSize: 14)),
        value: value,
        items: items.map((i) => DropdownMenuItem(value: i, child: Text(i, style: const TextStyle(fontSize: 14, color: AltheaColors.navy)))).toList(),
        onChanged: onChanged,
      ),
    );
  }
}
