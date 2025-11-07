import React, { useEffect, useState } from 'react'
import { calculateExperienceByRange } from '../utils/calculateExperience'

const useExperience = (doctorExp, doctors) => {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
      // calculateExperience()
  
      const exp = doctors.map(doc => calculateExperienceByRange(doctorExp, doc?.dr, { nowIfNoTill: true }))
  
      console.log("exp from useExperience", exp)
  
      setExperiences(exp)
  
    }, [doctorExp])

  return [ experiences ]
}

export default useExperience
