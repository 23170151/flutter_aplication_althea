import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import 'package:flutter_application_althea/core/theme/app_theme.dart';
import 'package:flutter_application_althea/core/providers/user_provider.dart';
import 'package:flutter_application_althea/shared/widgets/althea_header.dart';

class PatientDashboardScreen extends StatelessWidget {
  const PatientDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserProvider>().user;

    final appointments = [
      {
        'doctor': 'Dra. María González',
        'specialty': 'Cardiología',
        'date': DateTime(2026, 3, 28),
        'time': '10:00 AM',
        'consultorio': 'Consultorio 301',
      },
      {
        'doctor': 'Dr. Carlos Ramírez',
        'specialty': 'Medicina General',
        'date': DateTime(2026, 4, 2),
        'time': '3:30 PM',
        'consultorio': 'Consultorio 105',
      },
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
                  roleLabel: 'PACIENTE',
                  userName: user?.name ?? 'Paciente',
                  subtitle: 'Bienvenido de nuevo,',
                  bottomPadding: 30,
                  onLogout: () {
                    context.read<UserProvider>().logout();
                    context.go('/');
                  },
                  onSettings: () => context.go('/patient/profile'),
                ),
                Positioned(
                  bottom: -150,
                  left: 20,
                  right: 20,
                  child: _QuickActionsCard(
                    actions: [
                      _QuickAction(
                        icon: Icons.add_rounded,
                        label: 'Agendar Cita',
                        primary: true,
                        onTap: () => context.go('/patient/doctors'),
                      ),
                      _QuickAction(
                        icon: Icons.calendar_today_outlined,
                        label: 'Mis Citas',
                        onTap: () => context.go('/patient/appointments'),
                      ),
                      _QuickAction(
                        icon: Icons.person_outline_rounded,
                        label: 'Mi Perfil',
                        onTap: () => context.go('/patient/profile'),
                      ),
                    ],
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Próximas Citas',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                          color: AltheaColors.navy,
                        ),
                      ),
                      GestureDetector(
                        onTap: () => context.go('/patient/appointments'),
                        child: const Row(
                          children: [
                            Text(
                              'Ver todas',
                              style: TextStyle(
                                color: AltheaColors.gold,
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            Icon(
                              Icons.chevron_right_rounded,
                              color: AltheaColors.gold,
                              size: 18,
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  ...appointments.map(
                    (a) => Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: _AppointmentCard(appointment: a),
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

// ─── Quick Actions Card ──────────────────────────────────────

class _QuickActionsCard extends StatelessWidget {
  final List<_QuickAction> actions;
  const _QuickActionsCard({required this.actions});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.85),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: Colors.white),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        children: actions.map((a) => Expanded(child: _buildBtn(a))).toList(),
      ),
    );
  }

  Widget _buildBtn(_QuickAction a) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: _QuickActionButton(action: a),
    );
  }
}

class _QuickAction {
  final IconData icon;
  final String label;
  final bool primary;
  final VoidCallback onTap;

  const _QuickAction({
    required this.icon,
    required this.label,
    this.primary = false,
    required this.onTap,
  });
}

class _QuickActionButton extends StatefulWidget {
  final _QuickAction action;
  const _QuickActionButton({required this.action});
  @override
  State<_QuickActionButton> createState() => _QuickActionButtonState();
}

class _QuickActionButtonState extends State<_QuickActionButton> {
  bool _pressed = false;
  @override
  Widget build(BuildContext context) {
    final a = widget.action;
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) {
        setState(() => _pressed = false);
        a.onTap();
      },
      onTapCancel: () => setState(() => _pressed = false),
      child: AnimatedScale(
        scale: _pressed ? 0.96 : 1.0,
        duration: const Duration(milliseconds: 100),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
          decoration: BoxDecoration(
            gradient: a.primary
                ? const LinearGradient(
                    colors: [AltheaColors.gold, AltheaColors.goldLight],
                  )
                : null,
            color: a.primary ? null : Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: a.primary
                ? null
                : Border.all(color: AltheaColors.borderLight),
            boxShadow: a.primary
                ? [
                    BoxShadow(
                      color: AltheaColors.gold.withOpacity(0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 3),
                    ),
                  ]
                : [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.04),
                      blurRadius: 4,
                    ),
                  ],
          ),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: a.primary
                      ? Colors.white.withOpacity(0.2)
                      : AltheaColors.lightCard,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  a.icon,
                  color: a.primary ? AltheaColors.navy : AltheaColors.navy,
                  size: 20,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                a.label,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: a.primary
                      ? AltheaColors.navy
                      : AltheaColors.textPrimary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─── Appointment Card ────────────────────────────────────────

class _AppointmentCard extends StatefulWidget {
  final Map<String, dynamic> appointment;
  const _AppointmentCard({required this.appointment});
  @override
  State<_AppointmentCard> createState() => _AppointmentCardState();
}

class _AppointmentCardState extends State<_AppointmentCard> {
  bool _hovered = false;
  @override
  Widget build(BuildContext context) {
    final a = widget.appointment;
    final date = a['date'] as DateTime;
    final formatted = DateFormat('dd MMM', 'es_MX').format(date);

    return MouseRegion(
      onEnter: (_) => setState(() => _hovered = true),
      onExit: (_) => setState(() => _hovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(
            color: _hovered
                ? AltheaColors.gold.withOpacity(0.4)
                : AltheaColors.borderLight,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(_hovered ? 0.06 : 0.03),
              blurRadius: _hovered ? 12 : 4,
            ),
          ],
        ),
        child: Row(
          children: [
            // Avatar
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: AltheaColors.lightCard,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Icon(
                Icons.person_rounded,
                color: AltheaColors.gold,
                size: 30,
              ),
            ),
            const SizedBox(width: 16),
            // Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    a['doctor'] as String,
                    style: const TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w800,
                      color: AltheaColors.navy,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    a['specialty'] as String,
                    style: const TextStyle(
                      fontSize: 14,
                      color: AltheaColors.textSecondary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
            // Date & Time
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                _InfoChip(
                  icon: Icons.calendar_today_outlined,
                  label: formatted,
                ),
                const SizedBox(height: 8),
                _InfoChip(
                  icon: Icons.access_time_rounded,
                  label: a['time'] as String,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _InfoChip extends StatelessWidget {
  final IconData icon;
  final String label;
  const _InfoChip({required this.icon, required this.label});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: AltheaColors.lightCard,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Icon(icon, color: AltheaColors.gold, size: 14),
          const SizedBox(width: 6),
          Text(
            label,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AltheaColors.navy,
            ),
          ),
        ],
      ),
    );
  }
}
