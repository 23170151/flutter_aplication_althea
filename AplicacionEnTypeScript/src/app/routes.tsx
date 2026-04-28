import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

// Patient routes
import { PatientDashboard } from "./components/patient/PatientDashboard";
import { DoctorList } from "./components/patient/DoctorList";
import { AppointmentBooking } from "./components/patient/AppointmentBooking";
import { MyAppointments } from "./components/patient/MyAppointments";
import { PatientProfile } from "./components/patient/PatientProfile";

// Doctor routes
import { DoctorDashboard } from "./components/doctor/DoctorDashboard";
import { DoctorSchedule } from "./components/doctor/DoctorSchedule";
import { DoctorPatients } from "./components/doctor/DoctorPatients";
import { MedicalRecord } from "./components/doctor/MedicalRecord";

// Receptionist routes
import { ReceptionistDashboard } from "./components/receptionist/ReceptionistDashboard";
import { SearchPatient } from "./components/receptionist/SearchPatient";
import { BookForPatient } from "./components/receptionist/BookForPatient";

// Admin routes
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { BranchManagement } from "./components/admin/BranchManagement";
import { AddDoctor } from "./components/admin/AddDoctor";
import { AddBranch } from "./components/admin/AddBranch";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  // Patient routes
  {
    path: "/patient/dashboard",
    Component: PatientDashboard,
  },
  {
    path: "/patient/doctors",
    Component: DoctorList,
  },
  {
    path: "/patient/book-appointment/:doctorId",
    Component: AppointmentBooking,
  },
  {
    path: "/patient/appointments",
    Component: MyAppointments,
  },
  {
    path: "/patient/profile",
    Component: PatientProfile,
  },
  // Doctor routes
  {
    path: "/doctor/dashboard",
    Component: DoctorDashboard,
  },
  {
    path: "/doctor/schedule",
    Component: DoctorSchedule,
  },
  {
    path: "/doctor/patients",
    Component: DoctorPatients,
  },
  {
    path: "/doctor/medical-record",
    Component: MedicalRecord,
  },
  // Receptionist routes
  {
    path: "/receptionist/dashboard",
    Component: ReceptionistDashboard,
  },
  {
    path: "/receptionist/search-patient",
    Component: SearchPatient,
  },
  {
    path: "/receptionist/book-patient",
    Component: BookForPatient,
  },
  // Admin routes
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/branch-management",
    Component: BranchManagement,
  },
  {
    path: "/admin/add-doctor",
    Component: AddDoctor,
  },
  {
    path: "/admin/add-branch",
    Component: AddBranch,
  },
]);
