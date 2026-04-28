import 'package:flutter/material.dart';
import 'package:flutter_application_althea/core/models/user_model.dart';

class UserProvider extends ChangeNotifier {
  UserModel? _user;

  UserModel? get user => _user;
  bool get isLoggedIn => _user != null;

  /// Mock login: role is inferred from email content (mirrors TS behavior)
  void login(String email, String password) {
    UserRole role = UserRole.patient;
    if (email.contains('doctor')) role = UserRole.doctor;
    if (email.contains('admin')) role = UserRole.admin;
    if (email.contains('reception')) role = UserRole.receptionist;

    String name;
    switch (role) {
      case UserRole.patient:
        name = 'Juan Pérez';
        break;
      case UserRole.doctor:
        name = 'Dra. María González';
        break;
      case UserRole.receptionist:
        name = 'Ana Martínez';
        break;
      case UserRole.admin:
        name = 'ADMINISTRADOR';
        break;
    }

    _user = UserModel(id: '1', name: name, email: email, role: role);
    notifyListeners();
  }

  void logout() {
    _user = null;
    notifyListeners();
  }
}
