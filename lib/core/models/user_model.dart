enum UserRole { patient, doctor, receptionist, admin }

class UserModel {
  final String id;
  final String name;
  final String email;
  final String? phone;
  final String? birthDate;
  final String? bloodType;
  final UserRole role;

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.phone,
    this.birthDate,
    this.bloodType,
    required this.role,
  });

  String get roleLabel {
    switch (role) {
      case UserRole.patient:
        return 'PACIENTE';
      case UserRole.doctor:
        return 'DOCTOR';
      case UserRole.receptionist:
        return 'RECEPCIÓN';
      case UserRole.admin:
        return 'ADMINISTRACIÓN';
    }
  }

  String get initialRoute {
    switch (role) {
      case UserRole.patient:
        return '/patient/dashboard';
      case UserRole.doctor:
        return '/doctor/dashboard';
      case UserRole.receptionist:
        return '/receptionist/dashboard';
      case UserRole.admin:
        return '/admin/dashboard';
    }
  }
}
