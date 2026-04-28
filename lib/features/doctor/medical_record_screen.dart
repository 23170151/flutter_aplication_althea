import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

class MedicalRecordScreen extends StatelessWidget {
  final String patientName;
  const MedicalRecordScreen({super.key, required this.patientName});

  @override
  Widget build(BuildContext context) {
    final name = patientName.isEmpty ? 'Juan Pérez' : patientName;
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(
        backgroundColor: AltheaColors.navy,
        foregroundColor: Colors.white,
        elevation: 0,
        title: const Text('Expediente Clínico', style: TextStyle(fontWeight: FontWeight.w700)),
        leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/doctor/patients')),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Patient header
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(gradient: const LinearGradient(colors: [AltheaColors.navy, AltheaColors.navyMid]), borderRadius: BorderRadius.circular(20)),
              child: Row(
                children: [
                  Container(width: 64, height: 64, decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(18)), child: const Icon(Icons.person_rounded, color: Colors.white, size: 36)),
                  const SizedBox(width: 16),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(name, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
                      const SizedBox(height: 4),
                      Text('ID: PAC-12345 · O+ · 35 años', style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 13)),
                      const SizedBox(height: 4),
                      const Text('Sin alergias conocidas', style: TextStyle(color: AltheaColors.gold, fontSize: 12, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Clinical Notes
            const Text('Notas Clínicas', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
            const SizedBox(height: 12),
            _NoteCard(date: '28 Mar 2026', note: 'Paciente acude por dolor torácico leve. Sin antecedentes cardíacos. Se ordena ECG y análisis de sangre.', doctor: 'Dra. María González'),
            _NoteCard(date: '15 Mar 2026', note: 'Seguimiento post-operatorio. Evolución favorable. Se recomienda reposo relativo y medicación continua.', doctor: 'Dra. María González'),
            const SizedBox(height: 20),

            // Add note
            const Text('Nueva Nota', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
            const SizedBox(height: 12),
            Container(
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AltheaColors.borderLight)),
              child: TextField(
                maxLines: 5,
                style: const TextStyle(fontSize: 14, color: AltheaColors.navy),
                decoration: const InputDecoration(
                  hintText: 'Escribe las notas de la consulta...',
                  hintStyle: TextStyle(color: AltheaColors.textSecondary, fontSize: 14),
                  contentPadding: EdgeInsets.all(16),
                  border: InputBorder.none,
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity, height: 50,
              child: ElevatedButton.icon(
                icon: const Icon(Icons.save_rounded),
                label: const Text('Guardar Nota'),
                style: ElevatedButton.styleFrom(backgroundColor: AltheaColors.navy, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
                onPressed: () => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Nota guardada'), backgroundColor: AltheaColors.navy)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _NoteCard extends StatelessWidget {
  final String date, note, doctor;
  const _NoteCard({required this.date, required this.note, required this.doctor});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AltheaColors.borderLight)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(date, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AltheaColors.gold)),
              Text(doctor, style: const TextStyle(fontSize: 12, color: AltheaColors.textSecondary)),
            ],
          ),
          const SizedBox(height: 8),
          Text(note, style: const TextStyle(fontSize: 14, color: AltheaColors.navy, height: 1.5)),
        ],
      ),
    );
  }
}
