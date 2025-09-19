import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ name, specialization, experience, rating, fees, specializationName }) => {

    const navigate = useNavigate()

    return (
        <div className='p-2 rounded-md bg-blue-950 text-white w-sm'>
            <div className='flex gap-3'>
                <div>
                    <img
                        src={"https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1756738618796"}
                        alt="doc-img"
                        className="w-16 h-16 rounded-full border-2 border-white object-cover"
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='underline font-semibold'>{name}</h2>
                    <h2 className='text-xs'>{specializationName ? specializationName : specialization}</h2>
                    <h2 className='text-xs'>{experience}</h2>
                    <p className='text-xs'>{rating}</p>
                </div>
            </div>
            <div className='flex justify-between'>
                {/* <div>
                    <p className='text-sm'>online</p>
                </div> */}
                <p className='text-sm'>{fees}</p>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-2 gap-2'>
                    <button className='px-2 py-1 rounded bg-green-500 cursor-pointer'>Call Now</button>
                    <button className='px-2 py-1 rounded bg-green-500 cursor-pointer'>Video Consultation</button>
                </div>
                <button className='px-2 py-1 rounded bg-amber-300 cursor-pointer font-semibold'>Book Appointment</button>

                <button className='px-2 py-1 rounded bg-[#004d70] cursor-pointer' onClick={() => navigate("/view-profile", { state: { name, specialization: specializationName || specialization, experience, rating, fees } })}>View Profile</button>
            </div>
        </div>
    )
}

export default DoctorCard
