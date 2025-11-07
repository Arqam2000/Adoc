import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useDoctor from '../context/DoctorContext';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const [doctor, setDoctor] = useState({});

  const navigate = useNavigate()

  const { doctorData, setDoctorData } = useDoctor();

  // console.log("doctorData in navbar:", doctorData);
  // console.log("isLoggedIn:", isLoggedIn);

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctor"));
    // console.log("doctor from localStorage in navbar:", doctor);
    if (doctor) {
      setDoctor(doctor);
      setIsLoggedIn(doctor.isLoggedIn);
    }
  }, [doctorData])

  const logout = async () => {
    try {
      const resp = await axios.post("/api/v1/doctors/logout", {})

      if (resp.data.success) {
        localStorage.removeItem("doctor");
        localStorage.removeItem("doctorId");
        setDoctorData(null);
        setIsLoggedIn(0);
        toast.success(resp.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
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
      <div className='hidden lg:flex items-center gap-4'>
        <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]' onClick={() => navigate("/login")}>Login/Signup</button>
        <button className='bg-white text-[#ff9d14] py-2 px-2 lg:px-5 rounded border border-[#ff9d14]'>
          <Link to="/register/doctor">Join as Doctor</Link>
        </button>
        <button className='bg-white text-[#2f2f82] py-2 px-2 lg:px-5 rounded border border-[#2f2f82]'><Link to="/admin">Admin</Link></button>

        {
          isLoggedIn !== 0 && <div className='relative group'>
            <div className='no-underline text-base mr-5 flex items-center' onClick={() => setOpen(prev => !prev)}>
              <img src={doctor.picture} alt="doc-pic" className='w-11 rounded-full' />
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
