import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:flutter_application_althea/features/auth/login_screen.dart';
import 'package:flutter_application_althea/features/auth/register_screen.dart';
import 'package:flutter_application_althea/features/patient/patient_dashboard_screen.dart';
import 'package:flutter_application_althea/features/patient/doctor_list_screen.dart';
import 'package:flutter_application_althea/features/patient/appointment_booking_screen.dart';
import 'package:flutter_application_althea/features/patient/my_appointments_screen.dart';
import 'package:flutter_application_althea/features/patient/patient_profile_screen.dart';
import 'package:flutter_application_althea/features/doctor/doctor_dashboard_screen.dart';
import 'package:flutter_application_althea/features/doctor/doctor_schedule_screen.dart';
import 'package:flutter_application_althea/features/doctor/doctor_patients_screen.dart';
import 'package:flutter_application_althea/features/doctor/medical_record_screen.dart';
import 'package:flutter_application_althea/features/receptionist/receptionist_dashboard_screen.dart';
import 'package:flutter_application_althea/features/receptionist/search_patient_screen.dart';
import 'package:flutter_application_althea/features/receptionist/book_for_patient_screen.dart';
import 'package:flutter_application_althea/features/admin/admin_dashboard_screen.dart';
import 'package:flutter_application_althea/features/admin/branch_management_screen.dart';

GoRouter createRouter(BuildContext context) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(path: '/', builder: (_, __) => const LoginScreen()),
      GoRoute(path: '/register', builder: (_, __) => const RegisterScreen()),

      // Patient
      GoRoute(
        path: '/patient/dashboard',
        builder: (_, __) => const PatientDashboardScreen(),
      ),
      GoRoute(
        path: '/patient/doctors',
        builder: (_, __) => const DoctorListScreen(),
      ),
      GoRoute(
        path: '/patient/book-appointment/:doctorId',
        builder: (_, state) => AppointmentBookingScreen(
          doctorId: state.pathParameters['doctorId'] ?? '',
        ),
      ),
      GoRoute(
        path: '/patient/appointments',
        builder: (_, __) => const MyAppointmentsScreen(),
      ),
      GoRoute(
        path: '/patient/profile',
        builder: (_, __) => const PatientProfileScreen(),
      ),

      // Doctor
      GoRoute(
        path: '/doctor/dashboard',
        builder: (_, __) => const DoctorDashboardScreen(),
      ),
      GoRoute(
        path: '/doctor/schedule',
        builder: (_, __) => const DoctorScheduleScreen(),
      ),
      GoRoute(
        path: '/doctor/patients',
        builder: (_, __) => const DoctorPatientsScreen(),
      ),
      GoRoute(
        path: '/doctor/medical-record',
        builder: (_, state) => MedicalRecordScreen(
          patientName: state.uri.queryParameters['patient'] ?? '',
        ),
      ),

      // Receptionist
      GoRoute(
        path: '/receptionist/dashboard',
        builder: (_, __) => const ReceptionistDashboardScreen(),
      ),
      GoRoute(
        path: '/receptionist/search-patient',
        builder: (_, __) => const SearchPatientScreen(),
      ),
      GoRoute(
        path: '/receptionist/book-patient',
        builder: (_, __) => const BookForPatientScreen(),
      ),

      // Admin
      GoRoute(
        path: '/admin/dashboard',
        builder: (_, __) => const AdminDashboardScreen(),
      ),
      GoRoute(
        path: '/admin/branch-management',
        builder: (_, __) => const BranchManagementScreen(),
      ),
      GoRoute(
        path: '/admin/add-doctor',
        builder: (_, __) => const AddDoctorScreen(),
      ),
      GoRoute(
        path: '/admin/add-branch',
        builder: (_, __) => const AddBranchScreen(),
      ),
    ],
  );
}
