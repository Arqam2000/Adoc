import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { calculateExperienceByRange } from '../utils/calculateExperience'
import useExperience from '../hooks/useExperience'
import BackButton from '../components/BackButton'
import { apiBaseUrl } from '../constants/constants'
import { set } from 'date-fns'

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([])
  const [doctorExp, setDoctorExp] = useState([])
  const [reviews, setReviews] = useState()
  const [hospitals, setHospitals] = useState([])
  const [videoTimings, setVideoTimings] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMostExperienced, setIsMostExperienced] = useState(false)
  const [isLowestFees, setIsLowestFees] = useState(false)
  const [isHighestRated, setIsHighestRated] = useState(false)
  const [isAvailableToday, setIsAvailableToday] = useState(false)
  const [isVideoConsultation, setIsVideoConsultation] = useState(false)

  // console.log(doctors)

  const [experiences] = useExperience(doctorExp, doctors)

  console.log("experiences from DoctorsList", experiences)

  const location = useLocation()

  console.log("location.state", location.state)

  let specializationName;
  let cityName;
  let filteredBySpecialization = [];
  let filteredByCity = [];
  let filteredByCityAndSpec = [];
  let filterByOnCallDoctor = [];
  let filterByVideoConsultation = [];
                

  if (location.state?.OnCallDoctor) {
    filterByOnCallDoctor = doctors?.filter(doc => doc.appointment_type === "Walk in" || doc.appointment_type === "Both")

    console.log("filterByOnCallDoctor ", filterByOnCallDoctor)
  }

  if (location.state?.videoConsultation) {
    filterByVideoConsultation = doctors?.filter(doc => doc["is available for free video consultation"] === "Yes")

    console.log("filterByVideoConsultation ", filterByVideoConsultation)
  }

  else if (location.state?.city && location.state?.specialization) {
    cityName = location.state.city;
    specializationName = location.state.specialization;

    filteredByCityAndSpec = doctors?.filter(doc => doc.city_name === cityName && doc.Specialization_name === specializationName)


    console.log("filteredByCityAndSpec ", filteredByCityAndSpec)

  } 

  else if (location.state?.city) {
    cityName = location.state?.city;
    filteredByCity = doctors?.filter(doc => doc.city_name === cityName)

    console.log("filteredByCity ", filteredByCity)

  } 

  else if (location.state?.specialization) {
    specializationName = location.state?.specialization;
    filteredBySpecialization = doctors?.filter(doc => doc.Specialization_name === specializationName)
    console.log("filteredBySpecialization ", filteredBySpecialization)
  } 

  useEffect(() => {

    getAllDoctors()

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: adds a smooth scrolling animation
    });
  }, [isHighestRated, isLowestFees, isMostExperienced, isAvailableToday])



  const getAllDoctors = async () => {
    try {
      setLoading(true)
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/get-alldoctors`, {
        isMostExperienced,
        isLowestFees,
        isHighestRated,
        isAvailableToday,
        isVideoConsultation
      })

      if (resp.data.success) {
        setDoctors(resp.data.data)
        setDoctorExp(resp.data.doctorexp)
        setReviews(resp.data.reviews)
        setHospitals(resp.data.hospitals)
        setVideoTimings(resp.data.videoTimings)
      }

    } catch (error) {
      console.log("Error in getting doctors", error)
    } finally {
      setLoading(false)
    }
  }

  console.log("doctors from DoctorsList", doctors)
  // console.log("doctors", JSON.stringify([...doctors]))
  // console.log("hospitals from DoctorsList", JSON.stringify(hospitals))
  // console.log("doctorExp from DoctorsList", JSON.stringify(doctorExp))
  // console.log("doctorExp from DoctorsList", doctorExp)
  // console.log("videoTimings", JSON.stringify(videoTimings))
  // console.log("videoTimings", videoTimings)
  // console.log("reviews", JSON.stringify(reviews))
  // console.log("hospitals from DoctorsList", hospitals)
  // console.log("doctorExp from DoctorsList", doctorExp)
  // console.log("doctorExp from DoctorsList", JSON.stringify(doctorExp))

  return (
    <div className='w-7xl mx-auto mt-4'>
      <BackButton />
      <h1 className='text-2xl font-semibold my-2'>Best {specializationName || "All Doctor"}s </h1>
      <div className='md:flex gap-2 my-4 hidden'>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ' onClick={() => set}>Doctors Near Me</button>
        <button className={`py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ${isMostExperienced ? 'bg-[#000066] text-white' : ''}`} onClick={() => {
          setIsAvailableToday(false)
          setIsHighestRated(false)
          setIsLowestFees(false)
          setIsVideoConsultation(false)
          setIsMostExperienced(!isMostExperienced)
          }}>Most Experienced</button>
        <button className={`py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ${isLowestFees ? 'bg-[#000066] text-white' : ''}`} onClick={() => {
          setIsAvailableToday(false)
          setIsHighestRated(false)
          setIsMostExperienced(false)
          setIsVideoConsultation(false)
          setIsLowestFees(!isLowestFees)
          }}>Lowest Fee</button>
        <button className={`py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ${isHighestRated ? 'bg-[#000066] text-white' : ''}`} onClick={() => {
          setIsAvailableToday(false)
          setIsLowestFees(false)
          setIsMostExperienced(false)
          setIsVideoConsultation(false)
          setIsHighestRated(!isHighestRated)
          }}>Highest Rated</button>
        <button className={`py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ${isAvailableToday ? 'bg-[#000066] text-white' : ''}`} onClick={() => {
          setIsHighestRated(false)
          setIsLowestFees(false)
          setIsMostExperienced(false)
          setIsVideoConsultation(false)
          setIsAvailableToday(!isAvailableToday)
          }}>Available Today</button>
        <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ' onClick={() => set}>Discounts</button>
        <button className={`py-1 px-3 border border-[#000066] text-[#000066] rounded-full cursor-pointer ${isVideoConsultation ? 'bg-[#000066] text-white' : ''}`} onClick={() => {
          setIsHighestRated(false)
          setIsLowestFees(false)
          setIsMostExperienced(false)
          setIsAvailableToday(false)
          setIsVideoConsultation(!isVideoConsultation)
          }}>Video Consultation</button>
      </div>


      <div className='grid lg:grid-cols-3 grid-cols-1 gap-2 mx-auto p-2 my-2'>
        {/* {
          filteredByCityAndSpec.length > 0 ? 
            filteredByCityAndSpec.map(({ dr, name, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
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
                // specializationName={specializationName || ""} 
                hospitals={hospitals?.[index]?.hospitalDetails}
                videoTimings={videoTimings?.[index]?.videoDetails}
              />
            )) : filteredByCity.length === 0 ? filteredBySpecialization?.map(({ dr, name, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          )) : filteredByCity?.map(({ dr, name, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        } */}

        {
          filterByOnCallDoctor.length > 0 && filterByOnCallDoctor.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              phone={phone}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        }

        {
          filterByVideoConsultation.length > 0 && filterByVideoConsultation?.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              phone={phone}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        }

        {
          filteredByCityAndSpec.length > 0 && filteredByCityAndSpec.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
              <DoctorCard
                key={dr}
                dr={dr}
                picture={picture}
                name={name}
                phone={phone}
                specialization={Specialization_name} pmdc_verification={pmdc_verification}
                qualifications={qualifications}
                // experience={experiences[index]?.experience} 
                experience={experiences[index]}
                review={reviews?.[index]}
                fees={fees}
                // specializationName={specializationName || ""} 
                hospitals={hospitals?.[index]?.hospitalDetails}
                videoTimings={videoTimings?.[index]?.videoDetails}
              />
            ))
        }


        {
          filteredByCity.length > 0 && filteredByCity?.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              phone={phone}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        }

        {
          filteredBySpecialization.length > 0 && filteredBySpecialization?.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              phone={phone}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        }

        {/* {
          
          filteredBySpecialization.length === 0 && filteredByCity.length === 0 && filteredByCityAndSpec.length === 0 && filterByOnCallDoctor.length === 0 && filterByVideoConsultation.length === 0 && doctors.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              phone={phone}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          ))
        
        } */}
        {
          
          filteredBySpecialization.length === 0 && filteredByCity.length === 0 && filteredByCityAndSpec.length === 0 && filterByOnCallDoctor.length === 0 && filterByVideoConsultation.length === 0 && location.state === null && doctors.map(({ dr, name, phone, Specialization_name, qualifications, experience, rating, fees, picture, pmdc_verification }, index) => (
            <DoctorCard
              key={dr}
              dr={dr}
              picture={picture}
              name={name}
              phone={phone}
              specialization={Specialization_name}
              pmdc_verification={pmdc_verification}
              qualifications={qualifications}
              // experience={experiences[index]?.experience} 
              experience={experiences[index]}
              review={reviews?.[index]}
              fees={fees}
              // specializationName={specializationName || ""} 
              hospitals={hospitals?.[index]?.hospitalDetails}
              videoTimings={videoTimings?.[index]?.videoDetails}
            />
          )) 
        
        }

        {
          loading ? <p className='text-black text-2xl font-bold'>Loading doctors...</p> : filteredBySpecialization.length === 0 && filteredByCity.length === 0 && filteredByCityAndSpec.length === 0 && filterByOnCallDoctor.length === 0 && filterByVideoConsultation.length === 0 && location.state !== null && <p className='text-gray-500'>No doctors found matching the selected criteria.</p>
        }
      </div>
    </div>
  )
}

export default DoctorsList
