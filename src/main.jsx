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
        path: "view-profile",
        Component: ViewDocProfile
      },
      {
        path: "login",
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
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
