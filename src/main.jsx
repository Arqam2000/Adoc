import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Admin } from './pages/Admin.jsx';
import { Home } from './pages/Home.jsx';
import { Country } from './pages/Country.jsx';
import { City } from './pages/City.jsx';
import { JoinasDoctor } from './pages/JoinasDoctor.jsx';
import { Hospital } from './pages/Hospital.jsx';
import CityManager from './components/ManageCard.jsx';
import { Specialization } from './pages/Specialization.jsx';
import { Login } from './pages/Login.jsx';
import { Degree } from './pages/Degree.jsx';
import { Institute } from './pages/Institute.jsx';
import { Designation } from './pages/Designation.jsx';
import { Disease } from './pages/Disease.jsx';
import { Symptom } from './pages/Symptom.jsx';
// import { Profile } from './pages/Profile.jsx';
import DoctorsList from './pages/DoctorsList.jsx';
import ViewDocProfile from './pages/ViewDocProfile.jsx';
import { Profile } from './pages/NewProfile.jsx';
import InclinicAppointment from './components/InclinicAppointment.jsx';
import { DoctorProvider } from './context/DoctorContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VideoConsultation from './pages/VideoConsultation.jsx';
import PatientSignup from './pages/PatientSignup.jsx';
import PatientPortal from './components/patient_portal_react_tailwind.jsx';
import PatientEditProfile from './pages/PatientEditProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { LoginProvider } from './context/LoginContext.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "admin",
        Component: Admin,
      },
      {
        path: "admin/country",
        Component: Country
      },
      {
        path: "admin/city",
        Component: City
      },
      {
        path: "admin/hospital",
        Component: Hospital
      },
      {
        path: "admin/specialization",
        Component: Specialization
      },
      {
        path: "admin/degree",
        Component: Degree
      },
      {
        path: "admin/institute",
        Component: Institute
      },
      {
        path: "admin/designation",
        Component: Designation
      },
      {
        path: "admin/disease",
        Component: Disease
      },
      {
        path: "admin/symptom",
        Component: Symptom
      },
      // {
      //   path: "profile",
      //   Component: Profile
      // },
      {
        path: "profile",
        Component: Profile
      },
      {
        path: "view-profile/:id",
        Component: ViewDocProfile
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "login/patient",
        Component: Login
      },
      {
        path: "doctors",
        Component: DoctorsList
      },

      {
        path: "register/doctor",
        Component: JoinasDoctor
      },
      {
        path: "register/patient",
        Component: PatientSignup
      },
      {
        path: "book-appointment",
        Component: InclinicAppointment
      },
      {
        path: "/dashboard",
        Component: Dashboard
      },
      {
        path: "/dashboard/video-consultation",
        Component: VideoConsultation
      },
      {
        path: "/dashboard/patient-portal",
        Component: PatientPortal
      },
      {
        path: "/patient/edit-profile",
        Component: PatientEditProfile
      },
      {
        path: "/patient/change-password",
        Component: ChangePassword
      },
      {
        path: "/admin/login",
        Component: AdminLogin
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DoctorProvider >
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
    </DoctorProvider>
  </StrictMode>,
)
