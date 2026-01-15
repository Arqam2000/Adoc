import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useLoginName from '../context/LoginContext'
import { toast, ToastContainer } from 'react-toastify'
import { apiBaseUrl } from '../constants/constants'

const ResetPasswordPatient = () => {
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const location = useLocation()
  const navigate = useNavigate()
  const { setLoginName, setPd } = useLoginName()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/patients/reset-password`, { email: location?.state?.email, password, confirmPassword })
  
      if (res.data.success) {
        toast.success(res.data.message)
        localStorage.setItem("patientId", JSON.stringify(res.data.patient.patient))
        setLoginName(res.data.patient.pname)
        setPd("p")
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while resetting password")
      console.log("error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Reset Password
          </h2>
          {/* <p className="text-center text-gray-500 mb-8">
            Please enter your registered email to reset your password
          </p> */}


          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>

              <div >
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>

              <div >
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

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

export default ResetPasswordPatient
