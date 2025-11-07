import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { calculateExperienceByRange } from '../utils/calculateExperience'
import useExperience from '../hooks/useExperience'
import BackButton from '../components/BackButton'

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([])
  const [doctorExp, setDoctorExp] = useState([])
  const [reviews, setReviews] = useState()
  const [hospitals, setHospitals] = useState([])
  const [videoTimings, setVideoTimings] = useState([])

  // console.log(doctors)

  const [experiences] = useExperience(doctorExp, doctors)

  console.log("experiences from DoctorsList", experiences)

  const location = useLocation()

  // console.log(location.state)

  let specializationName;

  useEffect(() => {
    if (location.state) {
      specializationName = location.state.name
      // console.log("sp name", specializationName)
    }

    getAllDoctors()

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: adds a smooth scrolling animation
    });
  }, [])

  const getAllDoctors = async () => {
    try {
      const resp = await axios.get("/api/v1/doctors/get-alldoctors")

      if (resp.data.success) {
        setDoctors(resp.data.data)
        setDoctorExp(resp.data.doctorexp)
        setReviews(resp.data.reviews)
        setHospitals(resp.data.hospitals)
        setVideoTimings(resp.data.videoTimings)
      }

    } catch (error) {
      console.log("Error in getting doctors", error)
    }
  }
  console.log("doctors from DoctorsList", doctors)
  console.log("doctorExp from DoctorsList", doctorExp)
  console.log("doctorExp from DoctorsList", JSON.stringify(doctorExp))

  return (
    <div className='w-7xl mx-auto mt-4'>
      <BackButton />
      <h1 className='text-2xl font-semibold my-2'>Best {specializationName || "All Doctor"}s </h1>
      <div className='md:flex gap-2 my-4 hidden'>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Doctors Near Me</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Most Experienced</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Lowest Fee</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Highest Rated</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Available Today</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Discounts</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Video Consultation</button>
      </div>


      <div className='grid lg:grid-cols-3 grid-cols-1 gap-2 mx-auto p-2 my-2'>
        {
          doctors?.map(({ dr, name, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard 
            key={dr} 
            dr={dr} 
            picture={picture} 
            name={name} 
            specialization={Specialization_name} pmdc_verification={pmdc_verification} 
            qualifications={qualifications} 
            // experience={experiences[index]?.experience} 
            experience={experiences[index]} 
            review={reviews?.[index]} 
            fees={fees} 
            specializationName={specializationName || ""} hospitals={hospitals?.[index]?.hospitalDetails}
            videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        }

      </div>
    </div>
  )
}

export default DoctorsList
