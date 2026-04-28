import 'package:flutter/material.dart';

/// ============================================================
///  ALTHEA Design System - Color Palette
/// ============================================================
class AltheaColors {
  // Primary dark blues
  static const Color darkBg = Color(0xFF0D1820);
  static const Color navy = Color(0xFF192A3E);
  static const Color navyMid = Color(0xFF243850);
  static const Color navyLight = Color(0xFF2A3F56);

  // Gold accent
  static const Color gold = Color(0xFFC1A16A);
  static const Color goldLight = Color(0xFFD4B57A);

  // Light backgrounds
  static const Color lightBg = Color(0xFFF4F6F8);
  static const Color lightCard = Color(0xFFF8F9FA);
  static const Color borderLight = Color(0xFFE9ECEF);

  // Text
  static const Color textPrimary = Color(0xFF192A3E);
  static const Color textSecondary = Color(0xFF717182);
  static const Color textWhite = Colors.white;

  // Status
  static const Color success = Color(0xFF28A745);
  static const Color error = Color(0xFFD32F2F);
}

class AltheaTheme {
  static ThemeData get theme => ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: AltheaColors.lightBg,
    colorScheme: const ColorScheme.light(
      primary: AltheaColors.navy,
      secondary: AltheaColors.gold,
      surface: AltheaColors.lightCard,
      error: AltheaColors.error,
    ),
  );
}
