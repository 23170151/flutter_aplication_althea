import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import 'package:flutter_application_althea/core/theme/app_theme.dart';
import 'package:flutter_application_althea/core/providers/user_provider.dart';
import 'package:flutter_application_althea/shared/widgets/althea_header.dart';

class DoctorDashboardScreen extends StatelessWidget {
  const DoctorDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserProvider>().user;

    final todayAppointments = [
      {'patient': 'Juan Pérez', 'time': '9:00 AM', 'type': 'Primera consulta', 'status': 'completed'},
      {'patient': 'María López', 'time': '10:30 AM', 'type': 'Seguimiento', 'status': 'pending'},
      {'patient': 'Carlos Gómez', 'time': '2:00 PM', 'type': 'Control', 'status': 'pending'},
    ];

    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.bottomCenter,
              children: [
                AltheaHeader(
                  roleLabel: 'DOCTOR',
                  userName: user?.name ?? 'Doctor',
                  subtitle: 'Bienvenido, Dr(a).',
                  bottomPadding: 30,
                  onLogout: () { context.read<UserProvider>().logout(); context.go('/'); },
                ),
                Positioned(
                  bottom: -150,
                  left: 20,
                  right: 20,
                  child: Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.85),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: Colors.white),
                      boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 20, offset: const Offset(0, 8))],
                    ),
                    child: Row(
                      children: [
                        _StatItem(value: '${todayAppointments.length}', label: 'Citas Hoy', isHighlighted: true),
                        _verticalDivider(),
                        const _StatItem(value: '8', label: 'Esta Semana'),
                        _verticalDivider(),
                        const _StatItem(value: '32', label: 'Nuevos\nPacientes'),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 150),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Today's schedule
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Agenda de Hoy', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
                      GestureDetector(
                        onTap: () => context.go('/doctor/schedule'),
                        child: const Row(children: [
                          Text('Ver Agenda', style: TextStyle(color: AltheaColors.gold, fontSize: 14, fontWeight: FontWeight.w600)),
                          Icon(Icons.chevron_right_rounded, color: AltheaColors.gold, size: 18),
                        ]),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  ...todayAppointments.map((a) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _AppointmentItem(appointment: a, onViewRecord: () => context.go('/doctor/medical-record?patient=${Uri.encodeComponent(a['patient']!)}')),
                  )),
                  const SizedBox(height: 20),

                  // Quick Actions
                  const Text('Accesos Rápidos', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AltheaColors.navy)),
                  const SizedBox(height: 16),
                  _QuickActionCard(
                    icon: Icons.groups_rounded,
                    title: 'Mis Pacientes',
                    subtitle: 'Ver histórico y expedientes',
                    gradient: const [AltheaColors.navy, AltheaColors.navyMid],
                    textColor: Colors.white,
                    onTap: () => context.go('/doctor/patients'),
                  ),
                  const SizedBox(height: 12),
                  _QuickActionCard(
                    icon: Icons.calendar_month_rounded,
                    title: 'Mi Agenda',
                    subtitle: 'Configurar horario y bloqueos',
                    gradient: const [AltheaColors.gold, AltheaColors.goldLight],
                    textColor: AltheaColors.navy,
                    onTap: () => context.go('/doctor/schedule'),
                  ),
                  const SizedBox(height: 12),
                  _QuickActionCard(
                    icon: Icons.description_outlined,
                    title: 'Nuevas Notas Médicas',
                    subtitle: 'Añadir registros rápidamente',
                    light: true,
                    onTap: () => context.go('/doctor/medical-record'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _verticalDivider() => Container(height: 40, width: 1, color: AltheaColors.borderLight, margin: const EdgeInsets.symmetric(horizontal: 8));
}

class _StatItem extends StatelessWidget {
  final String value;
  final String label;
  final bool isHighlighted;
  const _StatItem({required this.value, required this.label, this.isHighlighted = false});
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        children: [
          Text(value, style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: isHighlighted ? AltheaColors.navy : AltheaColors.navy)),
          const SizedBox(height: 4),
          Text(label, textAlign: TextAlign.center, style: TextStyle(fontSize: 11, fontWeight: isHighlighted ? FontWeight.w700 : FontWeight.w500, color: isHighlighted ? AltheaColors.gold : AltheaColors.textSecondary, letterSpacing: isHighlighted ? 0.8 : 0)),
        ],
      ),
    );
  }
}

class _AppointmentItem extends StatelessWidget {
  final Map<String, String> appointment;
  final VoidCallback onViewRecord;
  const _AppointmentItem({required this.appointment, required this.onViewRecord});
  @override
  Widget build(BuildContext context) {
    final isCompleted = appointment['status'] == 'completed';
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AltheaColors.borderLight)),
      child: Row(
        children: [
          Container(
            width: 52, height: 52,
            decoration: BoxDecoration(
              color: isCompleted ? AltheaColors.lightCard : AltheaColors.gold.withOpacity(0.1),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(Icons.person_rounded, color: isCompleted ? AltheaColors.textSecondary : AltheaColors.gold, size: 28),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(appointment['patient']!, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: isCompleted ? AltheaColors.textSecondary : AltheaColors.navy, decoration: isCompleted ? TextDecoration.lineThrough : null)),
                Text(appointment['type']!, style: const TextStyle(fontSize: 13, color: AltheaColors.textSecondary)),
              ],
            ),
          ),
          Row(
            children: [
              Icon(Icons.access_time_rounded, size: 14, color: AltheaColors.gold),
              const SizedBox(width: 4),
              Text(appointment['time']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: AltheaColors.navy)),
              const SizedBox(width: 10),
              GestureDetector(
                onTap: onViewRecord,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10), border: Border.all(color: AltheaColors.borderLight)),
                  child: const Text('Expediente', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AltheaColors.navy)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _QuickActionCard extends StatefulWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final List<Color>? gradient;
  final Color textColor;
  final bool light;
  final VoidCallback onTap;
  const _QuickActionCard({required this.icon, required this.title, required this.subtitle, this.gradient, this.textColor = Colors.white, this.light = false, required this.onTap});
  @override State<_QuickActionCard> createState() => _QuickActionCardState();
}
class _QuickActionCardState extends State<_QuickActionCard> {
  bool _pressed = false;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) { setState(() => _pressed = false); widget.onTap(); },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.97 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: widget.gradient != null ? LinearGradient(colors: widget.gradient!) : null,
            color: widget.light ? Colors.white : null,
            borderRadius: BorderRadius.circular(20),
            border: widget.light ? Border.all(color: AltheaColors.borderLight) : null,
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 8)],
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: widget.light ? AltheaColors.lightCard : Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(14)),
                child: Icon(widget.icon, color: widget.light ? AltheaColors.navy : widget.textColor, size: 26),
              ),
              const SizedBox(width: 16),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(widget.title, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: widget.light ? AltheaColors.navy : widget.textColor)),
                  const SizedBox(height: 3),
                  Text(widget.subtitle, style: TextStyle(fontSize: 13, color: widget.light ? AltheaColors.textSecondary : widget.textColor.withOpacity(0.7))),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
