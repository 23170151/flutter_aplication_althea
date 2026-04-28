enum AppointmentStatus { pending, completed, cancelled }

class AppointmentModel {
  final String id;
  final String doctorName;
  final String? patientName;
  final String specialty;
  final DateTime date;
  final String time;
  final String consultorio;
  final AppointmentStatus status;
  final String? doctorImagePath;

  const AppointmentModel({
    required this.id,
    required this.doctorName,
    this.patientName,
    required this.specialty,
    required this.date,
    required this.time,
    required this.consultorio,
    this.status = AppointmentStatus.pending,
    this.doctorImagePath,
  });
}

class DoctorModel {
  final String id;
  final String name;
  final String specialty;
  final String consultorio;
  final double rating;
  final int experience;
  final String? imagePath;
  final List<String> availableTimes;

  const DoctorModel({
    required this.id,
    required this.name,
    required this.specialty,
    required this.consultorio,
    required this.rating,
    required this.experience,
    this.imagePath,
    required this.availableTimes,
  });
}
