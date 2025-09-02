import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

export const Admin = () => {
    const country = useRef()
    const city = useRef()
    const hospital = useRef()
    const navigate = useNavigate()
  return (
    <div className='pl-6 flex flex-col gap-2'> 
        <h1 className='text-3xl font-semibold p-3'>
          {/* <Link to="/admin/country" ref={country} onClick={(e) => {
            e.preventDefault()
            console.log(country.current.innerText)
            navigate(`/admin/${country.current.innerText}`)
          }}>Countries</Link> */}
          <Link to="/admin/country">Countries</Link>
        </h1>
        <h1 className='text-3xl font-semibold p-3'>
          {/* <Link to="/admin/city" ref={city} onClick={(e) => {
            e.preventDefault()
            console.log(city.current.innerText)
            navigate(`/admin/${city.current.innerText}`)
          }}>Cities</Link> */}
          <Link to="/admin/city">Cities</Link>
        </h1>
        <h1 className='text-3xl font-semibold p-3'>
          {/* <Link to="/admin/hospitals" 
          ref={hospital} onClick={(e) => {
            e.preventDefault()
            console.log(hospital.current.innerText)
            navigate(`/admin/${hospital.current.innerText}`)
          }}
          >Hospitals</Link> */}
          <Link to="/admin/hospital">Hospitals</Link>
          
        </h1>
        <h1 className='text-3xl font-semibold p-3'>
          <Link to="/admin/specialization">Specializations</Link>
        </h1>
        <h1 className='text-3xl font-semibold p-3'>
          <Link to="/admin/institute">Institute</Link>
        </h1>
        <h1 className='text-3xl font-semibold p-3'>
          <Link to="/admin/degree">Degree</Link>
        </h1>
        <h1 className='text-3xl font-semibold p-3'>
          <Link to="/admin/designation">Designation</Link>
        </h1>
        
    </div>
  )
}
