import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:flutter_application_althea/core/theme/app_theme.dart';

import 'dart:ui';

class AppointmentBookingScreen extends StatefulWidget {
  final String doctorId;
  final Map<String, dynamic>? doctorData;

  const AppointmentBookingScreen({
    super.key,
    required this.doctorId,
    this.doctorData,
  });

  @override
  State<AppointmentBookingScreen> createState() =>
      _AppointmentBookingScreenState();
}

class _AppointmentBookingScreenState extends State<AppointmentBookingScreen> {
  DateTime? _selectedDate;
  String? _selectedTime;
  String _paymentMethod = 'card';
  bool _showConfirmation = false;
  bool _isProcessing = false;
  String? _error;

  String _cardName = '';
  String _cardNumber = '';
  String _expiry = '';
  String _cvv = '';

  final _times = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  // DEBUG FLAGS
  final bool _forceTimeTakenError = false;
  final bool _forcePaymentRejectedError = false;

  void _handleBookAppointment() async {
    setState(() {
      _isProcessing = true;
      _error = null;
    });

    await Future.delayed(const Duration(seconds: 2));

    if (_forceTimeTakenError) {
      setState(() {
        _error =
            "El horario seleccionado ya no está disponible. Por favor elige otro.";
        _isProcessing = false;
      });
      return;
    } else if (_forcePaymentRejectedError && _paymentMethod == "card") {
      setState(() {
        _error =
            "El pago fue rechazado por el banco. Por favor intenta con otra tarjeta.";
        _isProcessing = false;
      });
      return;
    }

    setState(() {
      _isProcessing = false;
      _showConfirmation = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_showConfirmation) {
      return _buildConfirmationScreen();
    }

    final doctor =
        widget.doctorData ??
        {
          'name': 'Dra. María González',
          'specialty': 'Cardiología',
          'consultorio': 'Consultorio 301 - Seccion 1',
          'image': 'assets/images/doctora1.png',
        };

    final isButtonEnabled =
        _selectedDate != null && _selectedTime != null && !_isProcessing;
    // Se ha deshabilitado temporalmente la validación estricta de la tarjeta para facilitar pruebas
    // (_paymentMethod != 'card' || (_cardNumber.isNotEmpty && _expiry.isNotEmpty && _cvv.isNotEmpty));

    return Scaffold(
      backgroundColor: AltheaColors.lightBg,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.only(
                top: 60,
                bottom: 40,
                left: 24,
                right: 24,
              ),
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AltheaColors.navy,
                    AltheaColors.navyMid,
                    AltheaColors.navy,
                  ],
                ),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(40),
                  bottomRight: Radius.circular(40),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      IconButton(
                        onPressed: () => context.go('/patient/doctors'),
                        icon: const Icon(
                          Icons.arrow_back_rounded,
                          color: Colors.white,
                        ),
                        style: IconButton.styleFrom(
                          backgroundColor: Colors.white.withOpacity(0.1),
                        ),
                      ),
                      const SizedBox(width: 16),
                      const Text(
                        'Agendar Cita',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 32),
                  // Doctor Info Card
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: Colors.white.withOpacity(0.2)),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 80,
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                            image: doctor['image'] != null
                                ? DecorationImage(
                                    image: AssetImage(doctor['image']!),
                                    fit: BoxFit.cover,
                                  )
                                : null,
                          ),
                        ),
                        const SizedBox(width: 20),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 10,
                                  vertical: 4,
                                ),
                                decoration: BoxDecoration(
                                  color: AltheaColors.gold.withOpacity(0.2),
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(
                                    color: AltheaColors.gold.withOpacity(0.3),
                                  ),
                                ),
                                child: Text(
                                  doctor['specialty']!,
                                  style: const TextStyle(
                                    color: AltheaColors.gold,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                doctor['name']!,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  const Icon(
                                    Icons.location_on,
                                    color: AltheaColors.gold,
                                    size: 14,
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    doctor['consultorio'] ?? 'Consultorio',
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.9),
                                      fontSize: 13,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Content
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Select Date
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: AltheaColors.borderLight),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: AltheaColors.lightBg,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: AltheaColors.borderLight,
                                ),
                              ),
                              child: const Icon(
                                Icons.calendar_month,
                                color: AltheaColors.gold,
                                size: 20,
                              ),
                            ),
                            const SizedBox(width: 12),
                            const Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Selecciona una fecha',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w800,
                                    color: AltheaColors.navy,
                                  ),
                                ),
                                Text(
                                  'Próximos días disponibles',
                                  style: TextStyle(
                                    fontSize: 13,
                                    color: AltheaColors.textSecondary,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        ScrollConfiguration(
                          behavior: ScrollConfiguration.of(context).copyWith(
                            dragDevices: {
                              PointerDeviceKind.touch,
                              PointerDeviceKind.mouse,
                            },
                          ),
                          child: SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            physics: const BouncingScrollPhysics(
                              parent: AlwaysScrollableScrollPhysics(),
                            ),
                            child: Row(
                              children: List.generate(5, (index) {
                                final date = DateTime.now().add(
                                  Duration(days: index + 1),
                                );
                                final isSelected =
                                    _selectedDate?.day == date.day &&
                                    _selectedDate?.month == date.month;
                                final monthStr = DateFormat(
                                  'MMM',
                                  'es_MX',
                                ).format(date).toUpperCase();
                                final dayStr = DateFormat(
                                  'EEE',
                                  'es_MX',
                                ).format(date).replaceAll('.', '');

                                return Padding(
                                  padding: const EdgeInsets.only(right: 12),
                                  child: GestureDetector(
                                    onTap: () =>
                                        setState(() => _selectedDate = date),
                                    child: AnimatedContainer(
                                      duration: const Duration(
                                        milliseconds: 200,
                                      ),
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 16,
                                        vertical: 16,
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
                                      ),
                                      child: Column(
                                        children: [
                                          Text(
                                            monthStr,
                                            style: TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.w800,
                                              color: isSelected
                                                  ? Colors.white.withOpacity(
                                                      0.8,
                                                    )
                                                  : AltheaColors.textSecondary,
                                            ),
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            '${date.day}',
                                            style: TextStyle(
                                              fontSize: 24,
                                              fontWeight: FontWeight.w900,
                                              color: isSelected
                                                  ? Colors.white
                                                  : AltheaColors.navy,
                                            ),
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            dayStr,
                                            style: TextStyle(
                                              fontSize: 12,
                                              fontWeight: FontWeight.w600,
                                              color: isSelected
                                                  ? Colors.white.withOpacity(
                                                      0.9,
                                                    )
                                                  : AltheaColors.navy,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              }),
                            ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        GestureDetector(
                          onTap: () async {
                            final d = await showDatePicker(
                              context: context,
                              initialDate: DateTime.now().add(
                                const Duration(days: 1),
                              ),
                              firstDate: DateTime.now(),
                              lastDate: DateTime.now().add(
                                const Duration(days: 90),
                              ),
                            );
                            if (d != null) setState(() => _selectedDate = d);
                          },
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            decoration: BoxDecoration(
                              color: AltheaColors.lightBg,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: AltheaColors.borderLight,
                              ),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.calendar_today,
                                  size: 18,
                                  color: AltheaColors.navy,
                                ),
                                SizedBox(width: 8),
                                Text(
                                  'O selecciona en el calendario',
                                  style: TextStyle(
                                    fontWeight: FontWeight.w700,
                                    color: AltheaColors.navy,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),
                  // Select Time
                  Opacity(
                    opacity: _selectedDate != null ? 1.0 : 0.5,
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: AltheaColors.borderLight),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  color: AltheaColors.lightBg,
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(
                                    color: AltheaColors.borderLight,
                                  ),
                                ),
                                child: const Icon(
                                  Icons.access_time,
                                  color: AltheaColors.gold,
                                  size: 20,
                                ),
                              ),
                              const SizedBox(width: 12),
                              const Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Selecciona una hora',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.w800,
                                      color: AltheaColors.navy,
                                    ),
                                  ),
                                  Text(
                                    'Horarios disponibles',
                                    style: TextStyle(
                                      fontSize: 13,
                                      color: AltheaColors.textSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          Wrap(
                            spacing: 12,
                            runSpacing: 12,
                            children: _times.map((time) {
                              final isSelected = _selectedTime == time;
                              return GestureDetector(
                                onTap: _selectedDate != null
                                    ? () => setState(() => _selectedTime = time)
                                    : null,
                                child: AnimatedContainer(
                                  duration: const Duration(milliseconds: 200),
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 16,
                                    vertical: 12,
                                  ),
                                  decoration: BoxDecoration(
                                    color: isSelected
                                        ? AltheaColors.navy
                                        : Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(
                                      color: isSelected
                                          ? AltheaColors.navy
                                          : AltheaColors.borderLight,
                                    ),
                                  ),
                                  child: Text(
                                    time,
                                    style: TextStyle(
                                      fontWeight: FontWeight.w700,
                                      color: isSelected
                                          ? Colors.white
                                          : AltheaColors.navy,
                                    ),
                                  ),
                                ),
                              );
                            }).toList(),
                          ),
                        ],
                      ),
                    ),
                  ),

                  const SizedBox(height: 24),
                  // Payment Method
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24),
                      border: Border.all(color: AltheaColors.borderLight),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: AltheaColors.lightBg,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: AltheaColors.borderLight,
                                ),
                              ),
                              child: const Icon(
                                Icons.credit_card,
                                color: AltheaColors.gold,
                                size: 20,
                              ),
                            ),
                            const SizedBox(width: 12),
                            const Text(
                              'Método de pago',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w800,
                                color: AltheaColors.navy,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        GestureDetector(
                          onTap: () => setState(() => _paymentMethod = 'card'),
                          child: Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: _paymentMethod == 'card'
                                  ? AltheaColors.gold.withOpacity(0.05)
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: _paymentMethod == 'card'
                                    ? AltheaColors.gold
                                    : AltheaColors.borderLight,
                                width: 2,
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(12),
                                  decoration: BoxDecoration(
                                    color: _paymentMethod == 'card'
                                        ? AltheaColors.gold.withOpacity(0.2)
                                        : AltheaColors.lightBg,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Icon(
                                    Icons.credit_card,
                                    color: _paymentMethod == 'card'
                                        ? AltheaColors.gold
                                        : AltheaColors.textSecondary,
                                  ),
                                ),
                                const SizedBox(width: 16),
                                const Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'Tarjeta',
                                        style: TextStyle(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w800,
                                          color: AltheaColors.navy,
                                        ),
                                      ),
                                      Text(
                                        'Crédito o Débito',
                                        style: TextStyle(
                                          fontSize: 13,
                                          color: AltheaColors.textSecondary,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Container(
                                  width: 24,
                                  height: 24,
                                  decoration: BoxDecoration(
                                    color: _paymentMethod == 'card'
                                        ? AltheaColors.gold
                                        : Colors.transparent,
                                    shape: BoxShape.circle,
                                    border: Border.all(
                                      color: _paymentMethod == 'card'
                                          ? AltheaColors.gold
                                          : AltheaColors.borderLight,
                                      width: 2,
                                    ),
                                  ),
                                  child: _paymentMethod == 'card'
                                      ? const Center(
                                          child: Icon(
                                            Icons.check,
                                            size: 14,
                                            color: Colors.white,
                                          ),
                                        )
                                      : null,
                                ),
                              ],
                            ),
                          ),
                        ),

                        if (_paymentMethod == 'card') ...[
                          const SizedBox(height: 20),
                          const Divider(color: AltheaColors.borderLight),
                          const SizedBox(height: 20),
                          _buildTextField(
                            'Nombre en la tarjeta',
                            'Como aparece en el plástico',
                            (val) => setState(() => _cardName = val),
                          ),
                          const SizedBox(height: 16),
                          _buildTextField(
                            'Número de tarjeta',
                            '0000 0000 0000 0000',
                            (val) => setState(() => _cardNumber = val),
                            isNumber: true,
                          ),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              Expanded(
                                child: _buildTextField(
                                  'Vencimiento',
                                  'MM/YY',
                                  (val) => setState(() => _expiry = val),
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: _buildTextField(
                                  'CVV',
                                  '***',
                                  (val) => setState(() => _cvv = val),
                                  isPassword: true,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),
                  // Summary & Checkout
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [AltheaColors.navy, AltheaColors.navyMid],
                      ),
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: [
                        BoxShadow(
                          color: AltheaColors.navy.withOpacity(0.3),
                          blurRadius: 20,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Resumen de tu cita',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Costo de Consulta',
                              style: TextStyle(
                                color: Colors.white.withOpacity(0.7),
                                fontSize: 14,
                              ),
                            ),
                            const Text(
                              '\$800 MXN',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Anticipo Requerido',
                              style: TextStyle(
                                color: Colors.white.withOpacity(0.7),
                                fontSize: 14,
                              ),
                            ),
                            const Text(
                              '\$400 MXN',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        const Divider(color: Colors.white24),
                        const SizedBox(height: 20),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            const Text(
                              'Total a pagar hoy',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            ShaderMask(
                              shaderCallback: (bounds) => const LinearGradient(
                                colors: [
                                  AltheaColors.gold,
                                  AltheaColors.goldLight,
                                ],
                              ).createShader(bounds),
                              child: const Text(
                                '\$400',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 32,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ),
                          ],
                        ),

                        if (_error != null) ...[
                          const SizedBox(height: 24),
                          Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: Colors.red.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: Colors.red.withOpacity(0.5),
                              ),
                            ),
                            child: Row(
                              children: [
                                const Icon(
                                  Icons.error_outline,
                                  color: Colors.redAccent,
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Text(
                                    _error!,
                                    style: const TextStyle(
                                      color: Colors.redAccent,
                                      fontSize: 13,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  ),
                                ),
                                IconButton(
                                  icon: const Icon(
                                    Icons.close,
                                    color: Colors.redAccent,
                                    size: 16,
                                  ),
                                  onPressed: () =>
                                      setState(() => _error = null),
                                ),
                              ],
                            ),
                          ),
                        ],

                        const SizedBox(height: 24),
                        SizedBox(
                          width: double.infinity,
                          height: 56,
                          child: ElevatedButton(
                            onPressed: isButtonEnabled
                                ? _handleBookAppointment
                                : null,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AltheaColors.gold,
                              disabledBackgroundColor: Colors.white.withOpacity(
                                0.1,
                              ),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                            ),
                            child: _isProcessing
                                ? const SizedBox(
                                    width: 24,
                                    height: 24,
                                    child: CircularProgressIndicator(
                                      color: AltheaColors.navy,
                                      strokeWidth: 3,
                                    ),
                                  )
                                : Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.shield_rounded,
                                        color: isButtonEnabled
                                            ? AltheaColors.navy
                                            : Colors.white.withOpacity(0.4),
                                        size: 20,
                                      ),
                                      const SizedBox(width: 8),
                                      Text(
                                        _paymentMethod == 'card'
                                            ? 'Pagar Anticipo y Agendar'
                                            : 'Confirmar y Agendar',
                                        style: TextStyle(
                                          color: isButtonEnabled
                                              ? AltheaColors.navy
                                              : Colors.white.withOpacity(0.4),
                                          fontSize: 16,
                                          fontWeight: FontWeight.w800,
                                        ),
                                      ),
                                    ],
                                  ),
                          ),
                        ),
                        const SizedBox(height: 16),
                        Center(
                          child: Text(
                            'Transacción 100% segura y encriptada',
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.5),
                              fontSize: 12,
                            ),
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
      ),
    );
  }

  Widget _buildTextField(
    String label,
    String hint,
    Function(String) onChanged, {
    bool isNumber = false,
    bool isPassword = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w800,
            color: AltheaColors.textSecondary,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          onChanged: onChanged,
          keyboardType: isNumber ? TextInputType.number : TextInputType.text,
          obscureText: isPassword,
          style: const TextStyle(
            fontWeight: FontWeight.w600,
            color: AltheaColors.navy,
          ),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: TextStyle(
              color: AltheaColors.textSecondary.withOpacity(0.5),
            ),
            filled: true,
            fillColor: AltheaColors.lightBg,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide.none,
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 14,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildConfirmationScreen() {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AltheaColors.lightBg, Colors.white],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: const LinearGradient(
                  colors: [AltheaColors.gold, AltheaColors.goldLight],
                ),
                boxShadow: [
                  BoxShadow(
                    color: AltheaColors.gold.withOpacity(0.4),
                    blurRadius: 30,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: const Icon(
                Icons.check_rounded,
                color: Colors.white,
                size: 60,
              ),
            ),
            const SizedBox(height: 40),
            const Text(
              '¡Cita Confirmada!',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.w900,
                color: AltheaColors.navy,
              ),
            ),
            const SizedBox(height: 16),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 40),
              child: Text(
                'Tu cita ha sido agendada exitosamente. Hemos enviado los detalles a tu correo electrónico.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  color: AltheaColors.textSecondary,
                  fontWeight: FontWeight.w500,
                  height: 1.5,
                ),
              ),
            ),
            const SizedBox(height: 48),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => context.go('/patient/dashboard'),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        side: const BorderSide(
                          color: AltheaColors.borderLight,
                          width: 2,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                      ),
                      child: const Text(
                        'Ir al Inicio',
                        style: TextStyle(
                          color: AltheaColors.navy,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => context.go('/patient/appointments'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        backgroundColor: AltheaColors.navy,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        elevation: 10,
                        shadowColor: AltheaColors.navy.withOpacity(0.5),
                      ),
                      child: const Text(
                        'Ver Mis Citas',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
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
