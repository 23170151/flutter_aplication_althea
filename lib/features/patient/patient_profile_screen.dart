import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';
import 'package:flutter_application_althea/core/providers/user_provider.dart';

class PatientProfileScreen extends StatelessWidget {
  const PatientProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserProvider>().user;
    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.white,
        elevation: 0,
        title: const Text('Mi Perfil', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 22)),
        centerTitle: true,
        leading: IconButton(icon: const Icon(Icons.arrow_back_rounded), onPressed: () => context.go('/patient/dashboard')),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header with avatar
            Container(
              width: double.infinity,
              padding: EdgeInsets.fromLTRB(20, MediaQuery.of(context).padding.top + 70, 20, 60),
              decoration: const BoxDecoration(
                gradient: LinearGradient(colors: [AltheaColors.navy, AltheaColors.navyMid, AltheaColors.navy]),
                borderRadius: BorderRadius.vertical(bottom: Radius.circular(48)),
              ),
              child: Center(
                child: Column(
                  children: [
                    Container(
                      width: 112, height: 112,
                      decoration: const BoxDecoration(shape: BoxShape.circle, gradient: LinearGradient(colors: [AltheaColors.gold, AltheaColors.goldLight])),
                      child: const Icon(Icons.person_rounded, color: AltheaColors.navy, size: 56),
                    ),
                    const SizedBox(height: 16),
                    Text(user?.name ?? 'Paciente', style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900)),
                    const SizedBox(height: 4),
                    Text(user?.email ?? '', style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 15)),
                  ],
                ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Información Personal', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
                  const SizedBox(height: 16),
                  _InfoRow(icon: Icons.person_outline_rounded, label: 'Nombre', value: user?.name ?? ''),
                  _InfoRow(icon: Icons.mail_outline_rounded, label: 'Correo', value: user?.email ?? ''),
                  _InfoRow(icon: Icons.phone_outlined, label: 'Teléfono', value: user?.phone ?? 'No especificado'),
                  _InfoRow(icon: Icons.cake_outlined, label: 'Nacimiento', value: user?.birthDate ?? 'No especificada'),
                  _InfoRow(icon: Icons.bloodtype_outlined, label: 'Tipo de Sangre', value: user?.bloodType ?? 'No especificado'),
                  const SizedBox(height: 28),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.logout_rounded),
                      label: const Text('Cerrar Sesión'),
                      style: ElevatedButton.styleFrom(backgroundColor: AltheaColors.error, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14))),
                      onPressed: () { context.read<UserProvider>().logout(); context.go('/'); },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _InfoRow({required this.icon, required this.label, required this.value});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AltheaColors.borderLight)),
      child: Row(
        children: [
          Icon(icon, color: AltheaColors.gold, size: 20),
          const SizedBox(width: 14),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontSize: 12, color: AltheaColors.textSecondary, fontWeight: FontWeight.w500)),
              const SizedBox(height: 2),
              Text(value, style: const TextStyle(fontSize: 15, color: AltheaColors.navy, fontWeight: FontWeight.w600)),
            ],
          ),
        ],
      ),
    );
  }
}
