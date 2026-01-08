import React from 'react'
import useCities from '../../hooks/useCities'
import useSpecializations from '../../hooks/useSpecializations'
import useHospitals from '../../hooks/useHospitals'
import { useNavigate } from 'react-router-dom'

const Search = ({ city, setCity, specialization, setSpecialization }) => {
  const { cities } = useCities()
  const { specializations } = useSpecializations()
  const { hospitals } = useHospitals()

  const navigate = useNavigate()

  console.log("cities from search component", cities)
  console.log("specializations from search component", specializations)
  console.log("hospitals from search component", hospitals)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(city || specialization)
      navigate('/doctors', { state: { city, specialization, OnCallDoctor: false } })
    else
      navigate('/doctors')
  }

  return (
    <div className='text-xl md:w-7xl w-11/12 mt-4 mx-auto'>
      {/* <div className='text-xl  p-2 flex items-center gap-2'>
        <span className='inline-flex items-center justify-center rounded-full bg-[#014e78] text-white text-2xl aspect-square px-3'>G</span>
        <h2 className='text-base text-[#3A3A3A] font-semibold'>Hello, Guest</h2>
      </div> */}
      <h1 className='font-bold text-lg text-[#3A3A3A] mt-2'>Find the best doctor near you</h1>
      {/* <div className='md:w-6xl mx-auto outline outline-[#ADADAD] border-[#ADADAD] px-2 rounded-lg shadow-md grid md:grid-cols-[1fr_1fr_1fr_1fr_auto] grid-cols-3 my-7 h-10 items-center bg-white'>
                <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057] w-[90%]' value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="City">Enter City</option>
                    {
                      cities?.map(city => (
                        <option key={city.city_code} value={city.city_name}>{city.city_name}</option>
                      ))
                    }
                </select>
                <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057]' value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
                    <option value="Specialization">Enter Specialization</option>
                    {
                      specializations?.map(spec => (
                        <option 
                        key={spec.Specialization_code} 
                        value={spec.Specialization_name}
                        >{spec.Specialization_name}</option>
                      ))
                    }
                </select>
                <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057] hidden'>
                    <option value="Doctor">Doctor</option>
                </select>
                <select className='outline-none text-base text-[#495057] hidden'>
                    <option value="Hospital">Hospital</option>
                    {
                      hospitals?.map(hos => (
                        <option key={hos.hospital_code} value={hos.hospital_name}>{hos.hospital_name}</option>
                      ))
                    }
                </select>
                <div className='flex justify-end items-center w-fit justify-self-end px-2 bg-[#f2fafe] font-normal'>
                    <button className='cursor-pointer'><i className="fa fa-search font-normal"></i></button>
                </div>
            </div> */}
      <form onSubmit={handleSubmit}>
        <div className='md:w-6xl mx-auto outline outline-[#ADADAD] border-[#ADADAD] px-2 rounded-lg shadow-md flex  my-7 h-10 items-center bg-white'>
          <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057] w-1/2' value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="City">Enter City</option>
            {
              cities?.map(city => (
                <option key={city.city_code} value={city.city_name}>{city.city_name}</option>
              ))
            }
          </select>
          <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057] w-1/2' value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
            <option value="Specialization">Enter Specialization</option>
            {
              specializations?.map(spec => (
                <option
                  key={spec.Specialization_code}
                  value={spec.Specialization_name}
                >{spec.Specialization_name}</option>
              ))
            }
          </select>
          <select className='border-r border-r-[#ADADAD] outline-none text-base text-[#495057] hidden'>
            <option value="Doctor">Doctor</option>
          </select>
          <select className='outline-none text-base text-[#495057] hidden'>
            <option value="Hospital">Hospital</option>
            {
              hospitals?.map(hos => (
                <option key={hos.hospital_code} value={hos.hospital_name}>{hos.hospital_name}</option>
              ))
            }
          </select>
          <div className='flex justify-end items-center w-fit justify-self-end px-2 bg-[#f2fafe] font-normal'>
            <button type='submit' className='cursor-pointer'><i className="fa fa-search font-normal"></i></button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
