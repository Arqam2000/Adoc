import axios from 'axios';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import { apiBaseUrl } from '../constants/constants';

const ChangePassword = () => {

  const changePassword = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value, e.target[2].value)
    try {
      const res = await axios.put(`${apiBaseUrl}/api/v1/patients/change-password/${localStorage.getItem("patientId")}`, {
        oldPassword: e.target[0].value,
        newPassword: e.target[1].value,
        confirmPassword: e.target[2].value
      });

      toast.success("Password changed successfully.");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password. Please try again.");
      console.error("Error changing password:", error);
    }
  }

  return (    
    <div className='flex justify-center items-center min-h-screen'>
      <ToastContainer />
      <form onSubmit={changePassword} className='bg-white rounded-md shadow-md p-5 py-7 md:w-md w-11/12'>
        <h3 className='text-xl font-semibold text-center mb-4'>Change Password</h3>
        <div className='mb-4'>
          <label htmlFor="current-password" className='block mb-1'>Current Password</label>
          <input type="password" id="current-password" className='w-full outline-none border border-gray-400 p-1' />
        </div>
        <div className='mb-4'>
          <label htmlFor="new-password" className='block mb-1'>New Password</label>
          <input type="password" id="new-password" className='w-full outline-none border border-gray-400 p-1' />
        </div>
        <div className='mb-4'>
          <label htmlFor="confirm-password" className='block mb-1'>Confirm Password</label>
          <input type="password" id="confirm-password" className='w-full outline-none border border-gray-400 p-1' />
        </div>
        <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded w-full'>Change Password</button>
        <Link to="/dashboard" className='mt-3 text-blue-500 text-center block'>Back to dashboard</Link>
      </form>
    </div>
  )
}

export default ChangePassword
