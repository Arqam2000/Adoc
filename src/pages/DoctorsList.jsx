import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { calculateExperienceByRange } from '../utils/calculateExperience'
import useExperience from '../hooks/useExperience'
import BackButton from '../components/BackButton'
import { apiBaseUrl } from '../constants/constants'

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([])
  const [doctorExp, setDoctorExp] = useState([])
  const [reviews, setReviews] = useState()
  const [hospitals, setHospitals] = useState([])
  const [videoTimings, setVideoTimings] = useState([])

  // console.log(doctors)

  const [experiences] = useExperience(doctorExp, doctors)

  // console.log("experiences from DoctorsList", experiences)

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
  }, [])

  const getAllDoctors = async () => {
    try {
      const resp = await axios.get(`${apiBaseUrl}/api/v1/doctors/get-alldoctors`)

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
  // console.log("doctorExp from DoctorsList", doctorExp)
  // console.log("doctorExp from DoctorsList", JSON.stringify(doctorExp))

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
          filteredBySpecialization.length === 0 && filteredByCity.length === 0 && filteredByCityAndSpec.length === 0 && filterByOnCallDoctor.length === 0 && filterByVideoConsultation.length === 0 && location.state !== null && <p className='text-gray-500'>No doctors found matching the selected criteria.</p>
        }

        
        

      </div>
    </div>
  )
}

export default DoctorsList
