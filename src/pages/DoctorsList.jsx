import React from 'react'
import DoctorCard from '../components/DoctorCard'
import { useLocation } from 'react-router-dom'

const DoctorsList = () => {
    let doctors = [
        {
            name: "Dr. Asif Khan Gandapur",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Nusrat Habib Rana",
            specialization: "Neuro Psychiatrist",
            experience: "2 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        },
        {
            name: "Dr. Anosha",
            specialization: "Neuro Psychiatrist",
            experience: "5 Years Experience",
            rating: "4.9/5",
            fees: "Rs.1000"

        }
    ]

    const location = useLocation()

    const { name:specializationName } = location.state

    return (
        <div className='w-5xl mx-auto mt-4'>
            <h1 className='text-2xl font-semibold my-2'>Best {specializationName}s </h1>
            <div className='flex gap-2 my-4'>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Doctors Near Me</button>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Most Experienced</button>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Lowest Fee</button>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Highest Rated</button>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Available Today</button>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Discounts</button>
                <button className='py-1 px-3 border border-[#000066] text-[#000066] rounded-full '>Video Consultation</button>
            </div>


            <div className='grid grid-cols-3 gap-4  mx-auto p-2 my-2'>
                {
                    doctors.map(({ name, specialization, experience, rating, fees }) => (
                    <DoctorCard name={name} specialization={specialization} experience={experience} rating={rating} fees={fees} specializationName={specializationName}/>
                ))
                }

            </div>
        </div>
    )
}

export default DoctorsList
