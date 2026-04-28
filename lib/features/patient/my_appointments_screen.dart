import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

class MyAppointmentsScreen extends StatelessWidget {
  const MyAppointmentsScreen({super.key});

  static const _appointments = [
    {'doctor': 'Dra. María González', 'specialty': 'Cardiología', 'date': '28 Mar', 'time': '10:00 AM', 'status': 'upcoming'},
    {'doctor': 'Dr. Carlos Ramírez', 'specialty': 'Medicina General', 'date': '02 Abr', 'time': '3:30 PM', 'status': 'upcoming'},
    {'doctor': 'Dra. Laura Sánchez', 'specialty': 'Pediatría', 'date': '15 Mar', 'time': '11:00 AM', 'status': 'completed'},
    {'doctor': 'Dr. José Martínez', 'specialty': 'Dermatología', 'date': '02 Mar', 'time': '9:00 AM', 'status': 'cancelled'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(colors: [AltheaColors.navy, AltheaColors.navyMid, AltheaColors.navy]),
          ),
        ),
        foregroundColor: Colors.white,
        elevation: 0,
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(bottom: Radius.circular(32))),
        toolbarHeight: 80,
        title: const Text('Mis Citas', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 24)),
        leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/patient/dashboard')),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(20),
        itemCount: _appointments.length,
        itemBuilder: (_, i) {
          final a = _appointments[i];
          final isUpcoming = a['status'] == 'upcoming';
          final isCancelled = a['status'] == 'cancelled';
          return Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AltheaColors.borderLight),
              ),
              child: Row(
                children: [
                  Container(
                    width: 64, height: 64,
                    decoration: BoxDecoration(
                      color: isUpcoming ? AltheaColors.gold.withOpacity(0.12) : AltheaColors.lightCard,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Icon(Icons.person_rounded, color: isUpcoming ? AltheaColors.gold : AltheaColors.textSecondary, size: 32),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(a['doctor']!, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: isCancelled ? AltheaColors.textSecondary : AltheaColors.navy, decoration: isCancelled ? TextDecoration.lineThrough : null)),
                        const SizedBox(height: 2),
                        Text(a['specialty']!, style: const TextStyle(fontSize: 14, color: AltheaColors.textSecondary, fontWeight: FontWeight.w500)),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Icon(Icons.calendar_today_outlined, size: 14, color: Colors.grey[400]),
                            const SizedBox(width: 6),
                            Text('${a['date']} · ${a['time']}', style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AltheaColors.navy)),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: isUpcoming ? AltheaColors.gold.withOpacity(0.15) : isCancelled ? Colors.red.withOpacity(0.1) : Colors.green.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      isUpcoming ? 'Próxima' : isCancelled ? 'Cancelada' : 'Completada',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: isUpcoming ? AltheaColors.gold : isCancelled ? Colors.red : Colors.green),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
