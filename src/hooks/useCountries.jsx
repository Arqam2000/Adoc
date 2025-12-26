import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '../constants/constants'

const useCountries = () => {
  const [countries, setCountries] = useState([])

  const getCountries = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/api/v1/countries/get-countries`)

      setCountries(res.data.countries)
    } catch (error) {
      console.log("Cannot fetch countries", error)
    }
  }

  useEffect(() => {
    getCountries()
  }, [])

  return {
    countries
  }
}

export default useCountries
