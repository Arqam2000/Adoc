import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Profile = () => {
  const [doctor, setDoctor] = useState([])
  const [profile, setProfile] = useState({
    specialization: "",
    city: "",
    about: "",
    experience: "",
    qualifications: ""
  });

  useEffect(() => {
    // axios.get("/api/v1/doctors/get-doctor")
    // .then(res => {
    //   setDoctor(res.data.data)
    // })
    // .catch(err => {
    //   console.log("Error:", err)
    // })
    console.log(JSON.parse(localStorage.getItem("doctor")))
    setDoctor(JSON.parse(localStorage.getItem("doctor")))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className="flex items-center gap-6 pb-4 my-3">
        <img
          src="https://via.placeholder.com/120"
          alt="Doctor"
          className="w-28 h-28 rounded-full border"
        />
        <div>
          {
            doctor?.map(doc => (
              <>
                <h1 className="text-2xl font-bold">{doc.Dr_Name}</h1>
                <p className="text-sm text-gray-600">{doc.Dr_Email}</p>
                <p className="text-sm text-gray-600">{doc.Dr_Phone}</p>
              </>
            ))
          }
          <div className='grid grid-cols-3 gap-3 mt-2'>
            <input
              type="text"
              name="Enter your specialization"
              placeholder="Specialization (e.g. Dermatologist)"
              value={profile.specialization}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="text"
              name="Enter your city"
              placeholder="City"
              value={profile.city}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
            <input
            type="text"
            name="Enter your qualifications"
            placeholder="Qualifications (e.g. MBBS, FCPS)"
            value={profile.qualifications}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
          
          </div>
          <textarea
          name="about"
          placeholder="About yourself"
          value={profile.about}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg mt-3"
          rows="3"
        />
        </div>
      </div>

      <div className="mt-4 space-y-3 w-1/2 mx-auto">

        
      </div>
    </div>
  )
}
