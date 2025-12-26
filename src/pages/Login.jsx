import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import useDoctor from '../context/DoctorContext'
import { apiBaseUrl } from '../constants/constants'

export const Login = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({
        phone: "",
        password: ""
    })

    const navigate = useNavigate()
    const location = useLocation()

    console.log("location", location)
    console.log("state", location.state)

    const {setDoctorData} = useDoctor()

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

      if(location.pathname === "/login") {
        axios.post(`${apiBaseUrl}/api/v1/doctors/login`, {...user})
        .then(res => {
            console.log("response", res.data)
            toast.success(res.data.message)
            localStorage.setItem("doctorId", JSON.stringify(res.data.user.dr))
            navigate(`/dashboard`)
        })
        .catch(err => {
            console.log("Error:", err)
            toast.error(err.response.data.message)
            setError(err.response.data.message)
        })
        .finally(() => setLoading(false))

      } else if(location.pathname === "/login/patient") {
        axios.post(`${apiBaseUrl}/api/v1/patients/login`, {...user})
        .then(res => {
            console.log("response", res.data)
            toast.success(res.data.message)
            localStorage.setItem("patientId", JSON.stringify(res.data.patient.patient))
            navigate(`/dashboard`)
        })
        .catch(err => {
            console.log("Error:", err)
            toast.error(err.response?.data?.message)
            setError(err.response?.data?.message)
        })
        .finally(() => setLoading(false))
      }
    }
    // useEffect(() => {
        
    // }, [])

    return (
        <div>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        {location.pathname === "/login" ? "Welcome Back Doctor" : "Welcome Back Patient"}
                    </h2>
                    <p className="text-center text-gray-500 mb-8">
                        Please login to your account
                    </p>


                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Phone</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={user.email}
                                onChange={(e) => setUser({...user, phone: e.target.value})}
                            />
                        </div>


                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={user.password}
                                onChange={(e) => setUser({...user, password: e.target.value})}
                            />
                        </div>


                        <div className="flex items-center justify-between text-sm text-gray-600">
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
                            {loading? "Loading...": "Login"}
                        </button>
                    </form>


                    <p className="mt-6 text-center text-gray-600">
                        Don’t have an account? {" "}
                        <Link to="/register/patient" className="text-blue-600 font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
