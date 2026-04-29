import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

import 'dart:ui';

class DoctorListScreen extends StatefulWidget {
  const DoctorListScreen({super.key});

  @override
  State<DoctorListScreen> createState() => _DoctorListScreenState();
}

class _DoctorListScreenState extends State<DoctorListScreen> {
  String _searchQuery = '';
  String _activeSpecialty = 'Todos';

  static const _allDoctors = [
    {
      'name': 'Dra. María González',
      'specialty': 'Cardiología',
      'rating': '4.9',
      'reviews': '127',
      'availability': 'Hoy, 2:00 PM',
      'image': 'assets/images/doctora1.png',
      'id': '1',
    },
    {
      'name': 'Dr. Carlos Ramírez',
      'specialty': 'Medicina General',
      'rating': '4.8',
      'reviews': '98',
      'availability': 'Mañana, 9:00 AM',
      'image': 'assets/images/doctor1.jpg',
      'id': '2',
    },
    {
      'name': 'Dra. Ana Martínez',
      'specialty': 'Dermatología',
      'rating': '4.9',
      'reviews': '156',
      'availability': '28 Mar, 11:00 AM',
      'image': 'assets/images/doctora2.png',
      'id': '3',
    },
    {
      'name': 'Dr. Luis Hernández',
      'specialty': 'Pediatría',
      'rating': '5.0',
      'reviews': '203',
      'availability': '29 Mar, 3:30 PM',
      'image': 'assets/images/doctor2.jpg',
      'id': '4',
    },
    {
      'name': 'Dra. Sofia Torres',
      'specialty': 'Ginecología',
      'rating': '4.7',
      'reviews': '89',
      'availability': '30 Mar, 10:00 AM',
      'image': 'assets/images/doctora3.jpg',
      'id': '5',
    },
  ];

  final _specialties = [
    'Todos',
    'Cardiología',
    'Dermatología',
    'Pediatría',
    'Ginecología',
    'Medicina General',
  ];

  @override
  Widget build(BuildContext context) {
    final filteredDoctors = _allDoctors.where((dr) {
      final matchesSearch =
          dr['name']!.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          dr['specialty']!.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesSpecialty =
          _activeSpecialty == 'Todos' || dr['specialty'] == _activeSpecialty;
      return matchesSearch && matchesSpecialty;
    }).toList();

    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      appBar: AppBar(
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AltheaColors.navy,
                AltheaColors.navyMid,
                AltheaColors.navy,
              ],
            ),
          ),
        ),
        foregroundColor: Colors.white,
        elevation: 0,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(bottom: Radius.circular(32)),
        ),
        toolbarHeight: 80,
        title: const Text(
          'Buscar Médico',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 22),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          onPressed: () => context.go('/patient/dashboard'),
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Search bar
          Container(
            color: AltheaColors.navy,
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val),
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Buscar médico o especialidad...',
                hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                prefixIcon: Icon(
                  Icons.search_rounded,
                  color: Colors.white.withOpacity(0.5),
                ),
                filled: true,
                fillColor: Colors.white.withOpacity(0.1),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),

          // Specialties Filter
          Container(
            height: 60,
            margin: const EdgeInsets.only(top: 16),
            child: ScrollConfiguration(
              behavior: ScrollConfiguration.of(context).copyWith(
                dragDevices: {PointerDeviceKind.touch, PointerDeviceKind.mouse},
              ),
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(
                  parent: AlwaysScrollableScrollPhysics(),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 20),
                itemCount: _specialties.length,
                itemBuilder: (context, index) {
                  final specialty = _specialties[index];
                  final isSelected = _activeSpecialty == specialty;
                  return Padding(
                    padding: const EdgeInsets.only(right: 10),
                    child: GestureDetector(
                      onTap: () => setState(() => _activeSpecialty = specialty),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 12,
                        ),
                        decoration: BoxDecoration(
                          gradient: isSelected
                              ? const LinearGradient(
                                  colors: [
                                    AltheaColors.gold,
                                    AltheaColors.goldLight,
                                  ],
                                )
                              : null,
                          color: isSelected ? null : Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: isSelected
                                ? Colors.transparent
                                : AltheaColors.borderLight,
                          ),
                          boxShadow: isSelected
                              ? [
                                  BoxShadow(
                                    color: AltheaColors.gold.withOpacity(0.3),
                                    blurRadius: 8,
                                    offset: const Offset(0, 4),
                                  ),
                                ]
                              : [],
                        ),
                        child: Center(
                          child: Text(
                            specialty,
                            style: TextStyle(
                              color: isSelected
                                  ? Colors.white
                                  : AltheaColors.textSecondary,
                              fontWeight: isSelected
                                  ? FontWeight.w700
                                  : FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),

          Expanded(
            child: filteredDoctors.isNotEmpty
                ? ListView.builder(
                    padding: const EdgeInsets.all(20),
                    itemCount: filteredDoctors.length,
                    itemBuilder: (_, i) => Padding(
                      padding: const EdgeInsets.only(bottom: 14),
                      child: _DoctorCard(doctor: filteredDoctors[i]),
                    ),
                  )
                : _buildEmptyState(),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
                border: Border.all(color: AltheaColors.borderLight),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: const Icon(
                Icons.search_off_rounded,
                size: 48,
                color: AltheaColors.gold,
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'No encontramos resultados',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: AltheaColors.navy,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'No hay médicos que coincidan con "$_searchQuery" en la categoría ${_activeSpecialty == "Todos" ? "de todas las especialidades" : _activeSpecialty}.',
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 16,
                color: AltheaColors.textSecondary,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _searchQuery = '';
                  _activeSpecialty = 'Todos';
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AltheaColors.navy,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(
                  horizontal: 32,
                  vertical: 16,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text(
                'Limpiar búsqueda',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DoctorCard extends StatefulWidget {
  final Map<String, String> doctor;
  const _DoctorCard({required this.doctor});
  @override
  State<_DoctorCard> createState() => _DoctorCardState();
}

class _DoctorCardState extends State<_DoctorCard> {
  bool _pressed = false;
  @override
  Widget build(BuildContext context) {
    final d = widget.doctor;
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapUp: (_) {
        setState(() => _pressed = false);
        context.go('/patient/book-appointment/${d['id']}', extra: d);
      },
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
            boxShadow: [
              BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8),
            ],
          ),
          child: Column(
            children: [
              Row(
                children: [
                  // Avatar
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: AltheaColors.lightCard,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image: AssetImage(d['image']!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          d['name']!,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                            color: AltheaColors.navy,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          d['specialty']!,
                          style: const TextStyle(
                            fontSize: 14,
                            color: AltheaColors.gold,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: AltheaColors.lightCard,
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(color: AltheaColors.borderLight),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(
                                Icons.star_rounded,
                                color: Colors.orange,
                                size: 16,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                d['rating']!,
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w800,
                                  color: AltheaColors.navy,
                                ),
                              ),
                              const SizedBox(width: 4),
                              Text(
                                '(${d['reviews']})',
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AltheaColors.textSecondary,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              const Divider(color: AltheaColors.borderLight, height: 1),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'DISPONIBLE',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          color: AltheaColors.textSecondary,
                          letterSpacing: 0.5,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        d['availability']!,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: AltheaColors.navy,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 12,
                    ),
                    decoration: BoxDecoration(
                      color: AltheaColors.navy,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: const Text(
                      'Agendar',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
