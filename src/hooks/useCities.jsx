import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '../constants/constants'

const useCities = () => {
  const [cities, setCities] = useState([])

  const getCities = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/v1/cities/get-cities`)

      setCities(res.data.cities)
    } catch (error) {
      console.log("Cannot fetch cities", error)
    }
  }

  useEffect(() => {
    getCities()
  }, [])
  
  return {
    cities,
    getCities
  }
}

export default useCities
