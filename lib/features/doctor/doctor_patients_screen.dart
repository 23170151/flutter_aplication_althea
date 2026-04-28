import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

class DoctorPatientsScreen extends StatelessWidget {
  const DoctorPatientsScreen({super.key});
  static const _patients = [
    {'name': 'Juan Pérez', 'age': '35', 'lastVisit': '28 Mar 2026', 'blood': 'O+'},
    {'name': 'María López', 'age': '42', 'lastVisit': '15 Mar 2026', 'blood': 'A-'},
    {'name': 'Carlos Gómez', 'age': '28', 'lastVisit': '02 Abr 2026', 'blood': 'B+'},
    {'name': 'Ana Torres', 'age': '55', 'lastVisit': '20 Feb 2026', 'blood': 'AB+'},
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(backgroundColor: AltheaColors.navy, foregroundColor: Colors.white, elevation: 0, title: const Text('Mis Pacientes', style: TextStyle(fontWeight: FontWeight.w700)), leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/doctor/dashboard'))),
      body: ListView.builder(
        padding: const EdgeInsets.all(20),
        itemCount: _patients.length,
        itemBuilder: (_, i) {
          final p = _patients[i];
          return Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: GestureDetector(
              onTap: () => context.go('/doctor/medical-record?patient=${Uri.encodeComponent(p['name']!)}'),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AltheaColors.borderLight)),
                child: Row(
                  children: [
                    Container(width: 56, height: 56, decoration: BoxDecoration(gradient: const LinearGradient(colors: [AltheaColors.navy, AltheaColors.navyMid]), borderRadius: BorderRadius.circular(16)), child: const Icon(Icons.person_rounded, color: Colors.white, size: 30)),
                    const SizedBox(width: 14),
                    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(p['name']!, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
                      Text('${p['age']} años · Tipo ${p['blood']}', style: const TextStyle(fontSize: 13, color: AltheaColors.textSecondary)),
                      const SizedBox(height: 4),
                      Text('Última visita: ${p['lastVisit']}', style: const TextStyle(fontSize: 12, color: AltheaColors.textSecondary)),
                    ])),
                    const Icon(Icons.chevron_right_rounded, color: AltheaColors.gold),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
