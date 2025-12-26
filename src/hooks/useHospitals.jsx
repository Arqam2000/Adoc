import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { apiBaseUrl } from '../constants/constants'

const useHospitals = () => {
  const [hospitals, setHospitals] = useState([])
  const [hospital, setHospital] = useState("")
  const [hospitalCode, setHospitalCode] = useState("")
  const [error, setError] = useState(null)

  const getHospitals = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/v1/hospitals/get-hospitals`)

      setHospitals(res.data.hospitals)

    } catch (error) {
      console.log("Cannot fetch hospitals")
    }
  }

  const addHospital = async (hospital, cityCode) => {
    try {
      const res = await axios.post("/api/v1/hospitals/add-hospital", {hospital, cityCode})

      const newHospital = res.data.hospital

      setHospitals([...hospitals, {...newHospital}])

      toast.success("Hospital added successfully")

    } catch (error) {
      console.log("Cannot add hospital", error)
    }
  }

  const editHospital = async (hospitalCode, hospital) => {
    if (!hospitalCode) {
      setError("Please select a hospital")
    } else {
      // setLoading(true)
      setError(null)
      try {
        const res = await axios.patch(`/api/v1/hospitals/edit-hospital/${hospitalCode}`, { hospital })

        console.log(res.data)

        const newHospital = { ...res.data.data }

        let hospitalIndex = hospitals.findIndex(hospital => hospital.hospital_code == hospitalCode)

        hospitals[hospitalIndex] = newHospital
        // console.log(newHospitals)
        setHospitals(hospitals)
        toast.success(res.data.message)
        setHospital("")
        setHospitalCode()

      } catch (error) {
        setError(error.message)
      }
      // setLoading(false)
    }
  }

  const deleteHospital = async (hospital_code) => {
    if (!hospital_code) {
      setError("Please select a hospital")
    } else {
      // setLoading(true)
      setError(null)
      try {
        const res = await axios.delete(`/api/v1/hospitals/delete-hospital/${hospital_code}`)

        const newHospitals = hospitals.filter(hospital => hospital.hospital_code != hospital_code)
        console.log(newHospitals)
        setHospitals(newHospitals)
        // toast.success(res.data.message)
        // setHospital("")
      } catch (error) {
        setError(error.message)
      }
      // setLoading(false)
    }
  }

  useEffect(() => {
    getHospitals()
  }, [])

  return {
    hospitals,
    hospital,
    setHospital,
    hospitalCode,
    setHospitalCode,
    getHospitals,
    addHospital,
    editHospital,
    deleteHospital,
    error
  }
}

export default useHospitals
