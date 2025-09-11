import React from 'react'

const DoctorCard = ({ name, specialization, experience, rating, fees, specializationName }) => {

    return (
        <div className='p-2 rounded-md bg-blue-950 text-white w-xs'>
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
                    <h2 className='text-xs'>{specializationName? specializationName: specialization}</h2>
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
            <div>
                <button>Call Now</button>
            </div>
        </div>
    )
}

export default DoctorCard
