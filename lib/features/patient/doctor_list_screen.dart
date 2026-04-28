import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

/// Doctor list for patients to browse and book
class DoctorListScreen extends StatelessWidget {
  const DoctorListScreen({super.key});

  static const _doctors = [
    {'name': 'Dra. María González', 'specialty': 'Cardiología', 'rating': '4.9', 'exp': '12 años', 'id': '1'},
    {'name': 'Dr. Carlos Ramírez', 'specialty': 'Medicina General', 'rating': '4.7', 'exp': '8 años', 'id': '2'},
    {'name': 'Dra. Laura Sánchez', 'specialty': 'Pediatría', 'rating': '4.8', 'exp': '10 años', 'id': '3'},
    {'name': 'Dr. José Martínez', 'specialty': 'Dermatología', 'rating': '4.6', 'exp': '6 años', 'id': '4'},
    {'name': 'Dra. Patricia Vega', 'specialty': 'Neurología', 'rating': '5.0', 'exp': '15 años', 'id': '5'},
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
        title: const Text('Médicos Disponibles', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 22)),
        leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/patient/dashboard')),
      ),
      body: Column(
        children: [
          // Search bar
          Container(
            color: AltheaColors.navy,
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: TextField(
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Buscar médico o especialidad...',
                hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                prefixIcon: Icon(Icons.search_rounded, color: Colors.white.withOpacity(0.5)),
                filled: true,
                fillColor: Colors.white.withOpacity(0.1),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
              ),
            ),
          ),

          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(20),
              itemCount: _doctors.length,
              itemBuilder: (_, i) => Padding(
                padding: const EdgeInsets.only(bottom: 14),
                child: _DoctorCard(doctor: _doctors[i]),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DoctorCard extends StatefulWidget {
  final Map<String, String> doctor;
  const _DoctorCard({required this.doctor});
  @override State<_DoctorCard> createState() => _DoctorCardState();
}
class _DoctorCardState extends State<_DoctorCard> {
  bool _pressed = false;
  @override
  Widget build(BuildContext context) {
    final d = widget.doctor;
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) { setState(() => _pressed = false); context.go('/patient/book-appointment/${d['id']}', extra: d); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: AltheaColors.borderLight),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8)],
          ),
          child: Row(
            children: [
              // Avatar
              Container(
                width: 80, height: 80,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [AltheaColors.navy, AltheaColors.navyMid], begin: Alignment.topLeft, end: Alignment.bottomRight),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Icon(Icons.person_rounded, color: Colors.white, size: 40),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(d['name']!, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
                    const SizedBox(height: 4),
                    Text(d['specialty']!, style: const TextStyle(fontSize: 14, color: AltheaColors.textSecondary, fontWeight: FontWeight.w500)),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        const Icon(Icons.star_rounded, color: AltheaColors.gold, size: 16),
                        const SizedBox(width: 4),
                        Text(d['rating']!, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: AltheaColors.navy)),
                        const SizedBox(width: 14),
                        Icon(Icons.work_history_outlined, color: Colors.grey[400], size: 16),
                        const SizedBox(width: 4),
                        Text(d['exp']!, style: TextStyle(fontSize: 13, color: Colors.grey[500])),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(colors: [AltheaColors.gold, AltheaColors.goldLight]),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text('Agendar', style: TextStyle(color: AltheaColors.navy, fontSize: 13, fontWeight: FontWeight.w700)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
