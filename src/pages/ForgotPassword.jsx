import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { apiBaseUrl } from '../constants/constants'
import PhoneInput from 'react-phone-number-input'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/patients/request-otp`, { email })

      if (res.data.success) {
        toast.success(res.data.message)
        setIsOtpSent(true)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/patients/verify-otp`, { email, otp })

      if (res.data.success) {
        toast.success(res.data.message)
        setIsOtpSent(false)
        navigate('/reset-password/patient', { state: { email } })
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please enter your registered email to reset your password
          </p>


          <form className="space-y-5" onSubmit={isOtpSent ? handleOTPSubmit : handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>

              <div >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* <div className='py-3 px-3 w-[100%] lg:w-[80%] outline'>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={setPhone}
                  international
                />
              </div> */}
            </div>

            {
              isOtpSent && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">OTP</label> 
                  <div >
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter the OTP"
                      className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )
            }


            {/* <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div> */}


            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              {loading ? "Loading..." : "submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
