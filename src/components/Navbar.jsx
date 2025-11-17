import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDoctor from '../context/DoctorContext';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { set } from 'date-fns';

const DropdownMenu = ({ type }) => {

  const navigate = useNavigate()
  return (
    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border">
      {type === "Login" ?
        <>
          <button
            onClick={() => navigate("/login")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {type} as Doctor
          </button>

          <button
            onClick={() => navigate("/login/patient")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {type} as Patient
          </button>
        </>
        :
        <>
          <button
            onClick={() => navigate("/register/doctor")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {type} as Doctor
          </button>

          <button
            onClick={() => navigate("/register/patient")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {type} as Patient
          </button>
        </>
      }
    </div>
  )
}

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signupdropdownOpen, setSignupDropdownOpen] = useState(false);

  const logindropdownRef = useRef(null);
  const signupdropdownRef = useRef(null);

  const navigate = useNavigate()

  const { doctorData, setDoctorData } = useDoctor();

  // console.log("doctorData in navbar:", doctorData);
  // console.log("isLoggedIn:", isLoggedIn);
  const patientId = JSON.parse(localStorage.getItem("patientId"));

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctor"));
    // console.log("doctor from localStorage in navbar:", doctor);
    console.log("patientId", patientId)

    if (doctor) {
      setDoctor(doctor);
      setIsLoggedIn(doctor.isLoggedIn);

    } else if (patientId) {

      axios.get(`/api/v1/patients/${patientId}`)
        .then(res => {
          // console.log("Patient data:", res.data.patient);
          setPatient(res.data.patient);
          setIsLoggedIn(2);
        })
        .catch(err => {
          console.error("Error fetching patient data:", err);
        });

    }
  }, [doctorData, patientId])

  useEffect(() => {
    const handler = (e) => {
      if (logindropdownRef.current && !logindropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }

      if (signupdropdownRef.current && !signupdropdownRef.current.contains(e.target)) {
        setSignupDropdownOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);


  console.log("patient", patient)

  const logout = async () => {
    try {
      const resp = await axios.post("/api/v1/doctors/logout", {})

      if (resp.data.success) {
        localStorage.removeItem("doctor");
        localStorage.removeItem("doctorId");
        setDoctorData({});
        setDoctor({});
        setIsLoggedIn(0);
        toast.success(resp.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // toast.error("Logout failed. Please try again.");
      localStorage.removeItem("patientId");
      setIsLoggedIn(0);
      setPatient({});
      navigate("/login");
    }
  }

  return (
    <nav className='flex justify-between lg:justify-evenly items-center p-6 shadow bg-white'>
      <ToastContainer />
      <div>
        <h1 className='text-2xl font-bold'><Link to="/">Adoc</Link></h1>
      </div>
      <div className='hidden lg:block'>
        <ul className='flex items-center gap-7'>
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/doctors" className='flex items-center gap-1'>Doctors <i className="fa text-[14px]"
            >&#xf107;</i>
            </Link>
            <ul className='hidden'>
              <li><Link to="#" className='flex items-center gap-1'>Dermatologist
              </Link></li>
              <li><Link to="#" className='flex items-center gap-1'>Gynecologist
              </Link></li>
              <li><Link to="#" className='flex items-center gap-1'>Urologist
              </Link></li>

            </ul>
          </li>
          <li><Link to="#">Hospitals</Link> </li>
          <li><Link to="#">Labs and Diagnostics</Link> </li>
          <li><Link to="#">Surgeries</Link> </li>
          <li><Link to="#">Health Blog</Link> </li>
        </ul>
      </div>
      <div className='hidden lg:flex items-center gap-4' >
        {
          Object.keys(doctor).length === 0 && Object.keys(patient).length === 0 &&
          <>
            <div className='relative' ref={logindropdownRef}>
              <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]' onClick={() => {
                setDropdownOpen(!dropdownOpen);
                // navigate("/login")
              }}>Login</button>

              {
                dropdownOpen && <DropdownMenu type="Login" />
              }

            </div>
            <div className='relative' ref={signupdropdownRef}>
              {/* <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]' onClick={() => {
            setDropdownOpen(!dropdownOpen);
            // navigate("/login")
          }}>Login</button> */}

              <button className='bg-white text-[#ff9d14] py-2 px-2 lg:px-5 rounded border border-[#ff9d14] ' onClick={() => setSignupDropdownOpen(!signupdropdownOpen)}>
                {/* <Link to="/register/doctor">Join as Doctor</Link> */}
                signup
              </button>

              {
                signupdropdownOpen && <DropdownMenu type="Signup" />
              }

            </div>
          </>
        }

        <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]'><Link to="/admin">Admin</Link></button>

        {
          Object.keys(doctor).length !== 0 ? <div className='relative group'>
            <div className='no-underline text-base mr-5 flex items-center gap-1' onClick={() => setOpen(prev => !prev)}>
              <img src={doctor.picture} alt="doc-pic" className='w-11 rounded-full' />
              <h3>{doctor.name}</h3>
              {
                open && <div className="absolute left-0 top-6 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg border transition z-20">
                  <Link to={`/view-profile/${doctor.dr}`} className="block px-4 py-2 hover:bg-blue-100">
                    View Profile
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100">
                    Edit Profile
                  </Link>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-100">
                    Appointments
                  </Link>
                  <button className="block px-4 py-2 hover:bg-blue-100" onClick={logout}>
                    logout
                  </button>
                </div>
              }
            </div>
          </div> : <div className='relative group'>
            <div className='no-underline text-base mr-5 flex items-center gap-1 cursor-pointer' onClick={() => setOpen(prev => !prev)}>
              {/* <img src={doctor.picture} alt="doc-pic" className='w-11 rounded-full' /> */}
              <h3>{patient.pname}</h3>
              {
                open && <div className="absolute left-0 top-6 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg border transition z-20">
                  {/* <Link to={`/view-profile/${doctor.dr}`} className="block px-4 py-2 hover:bg-blue-100">
                    View Profile
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100">
                    Edit Profile
                  </Link> */}
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-100">
                    Appointments
                  </Link>
                  <button className="block px-4 py-2 hover:bg-blue-100" onClick={logout}>
                    logout
                  </button>
                </div>
              }
            </div>
          </div>
        }

        {/* <img src={doctorData.doctor.picture} alt="doc-pic" className='w-11 rounded-full' /> */}
      </div>
      <div className='lg:hidden z-10' id="menu">
        <span className={`text-3xl`}>&equiv;</span>
      </div>
    </nav>
  )
}
