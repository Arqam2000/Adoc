import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ViewDocProfile = () => {
    const [doctor, setDoctor] = useState({})

    const location = useLocation()

    if (location.state) {
        // const { name, specializationName, experience, rating, fees } = location.state
        setDoctor(location.state)   
    } else {

        useEffect(() => {
            axios.get("/api/v1/doctors/get-doctor")
            .then(res => {
                console.log(res.data.data) 
                setDoctor(res.data.data)
            })
            .catch(err => {
                console.log("Error:", err)
            })
            
        }, [])
    }

    return (
        <div>
            <div className='flex justify-between items-center w-5xl border rounded p-3 mx-auto mt-4' >
                <div className='flex items-center gap-3'>
                    <div>
                        <img
                            src={"https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1756738618796"}
                            alt="doc-img"
                            className="w-30 h-30 rounded-full border-2 border-white object-cover"
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-bold text-base'>{doctor.name}</h2>
                        <h2 className='font-semibold text-sm'>{doctor.specializationName || doctor.specialization_code}</h2>
                        <h2 className='font-semibold text-sm'>{doctor.experience}</h2>
                        <h2 className='font-semibold text-sm'>{doctor.rating}</h2>
                        <h2 className='font-semibold text-sm'>{doctor.fees}</h2>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <button className='py-1 px-2 bg-[#004d70] text-white rounded'>Consult Online</button>
                    <button className='py-1 px-2 bg-[#4ca685] text-white rounded'>Visit In clinic</button>
                </div>
            </div>
        </div>
    )
}

export default ViewDocProfile
