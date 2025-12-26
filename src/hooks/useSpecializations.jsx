import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '../constants/constants'

const useSpecializations = () => {
  const [specializations, setSpecializations] = useState([])

  const getSpecializations = async (params) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/v1/specializations/get-specializations`)

      setSpecializations(res.data.specializations)

    } catch (error) {
      console.log("Cannot fetch specializations", error)
    }
  }

  useEffect(() => {
    getSpecializations()
  }, [])

  return {
    specializations,
    getSpecializations
  }
}

export default useSpecializations
