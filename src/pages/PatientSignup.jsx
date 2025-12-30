import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import useDoctor from '../context/DoctorContext'
import { apiBaseUrl } from '../constants/constants'

const PatientSignup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bloodGroup: "",
    gender: ""
  })

  const navigate = useNavigate()
  const location = useLocation()

  console.log("path", location.pathname)

  const { setDoctorData } = useDoctor()

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    axios.post(`${apiBaseUrl}/api/v1/patients/register`, { ...user })
      .then(res => {
        console.log("response", res.data)
        toast.success(res.data.message)
        navigate(`/login`, {state: {from: location.pathname}})
      })
      .catch(err => {
        console.log("Error:", err)
        toast.error(err.response.data.message)
        setError(err.response.data.message)
      })
      .finally(() => setLoading(false))
  }
  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full lg:max-w-md lg:p-8 p-3">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please register your account
          </p>


          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="number"
                placeholder="Enter your phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
              <input
                type="text"
                placeholder="Enter your blood group"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.bloodGroup}
                onChange={(e) => setUser({ ...user, bloodGroup: e.target.value })}
              />
            </div>

            <div className='flex gap-3'>
              <label>Gender</label>
              <label ><input type="radio" name="gender" id="gender" value="Male" onChange={e => setUser({...user, gender: e.target.value})}/> Male</label>
              <label ><input type="radio" name="gender" id="gender" value="Female" onChange={e => setUser({...user, gender: e.target.value})}/> Female</label>
            </div>


            <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-gray-600 gap-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline text-blue-600">
                Forgot password?
              </a>
            </div>


            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>


          <p className="mt-6 text-center text-gray-600">
            Already have an account? {" "}
            <Link to="/login" state={{from: location.pathname}} className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientSignup
