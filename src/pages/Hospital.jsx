import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import useHospitals from '../hooks/useHospitals'
import useCountries from '../hooks/useCountries'
import useCities from '../hooks/useCities'

export const Hospital = () => {
  
  // const [hospitals, setHospitals] = useState([])

  const {hospitals, hospital, setHospital, hospitalCode, setHospitalCode, addHospital, getHospitals, editHospital, deleteHospital, error} = useHospitals()
  const { cities }= useCities()
  const [selectedCity, setSelectedCity] = useState("")
  const [hospitalsFilter, setHospitalsFilter] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [locate, setLocate] = useState(false)
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate()

  console.log("hospitals", hospitals)

  // useEffect(() => {
  //   axios.get("/api/v1/hospitals/get-hospitals")
  //   .then((res) => {
  //     setHospitals(res.data.hospitals)
  //   })
  //   .catch((err) => {
  //     console.log("Err while fetching hospitals", err)
  //   })
  // }, [])

  // const AddHospital = async () => {
  //   setLoading(true)
  //   setError(null)
  //   try {
  //     const resp = await axios.post("/api/v1/hospitals/add-hospital", { hospital })
  //     console.log("response", resp.data)
  //     if (resp.data.success) {
  //       const newHospital = resp.data.hospital
  //       console.log("newHospital", newHospital)
  //       setHospitals([...hospitals, { ...newHospital }])
  //       toast.success("Saved successfuly")
  //     } else {
  //       setError(resp.data.message)
  //     }
  //   } catch (error) {
  //     console.log("Error",error)
  //     setError(error.response.data.message)
  //   }
  //   setLoading(false)
  //   setHospital("")
  // }

  

  
  const handleLocate = (selectedHospital) => {
    const hospital = hospitals.find(hos => {
      return hos.hospital_name === selectedHospital
    })

    const city = cities.find(city => city.city_code === hospital.city_code)
    console.log("", city)
    setHospital(selectedHospital);
    setSelectedCity(city.city_name)
    setLocate(false);
    setMessage(""); // clear old messages
  };

  const Exit = () => {
    navigate("/admin")
  }

  return (
    <div className='flex flex-col items-center'>
      <ToastContainer />
      <main className="flex-grow flex items-center justify-center w-full px-4 my-5">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4a2 2 0 012-2h3v6m6 0v-6h3a2 2 0 012 2v4M9 9V5a2 2 0 012-2h2a2 2 0 012 2v4m5 0H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Manage Hospitals</h2>
            <p className="text-gray-500 text-sm">Add, edit, or locate hospitals easily</p>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder={`Enter hospital name`}
            value={hospital}
            onChange={(e) => {
              setHospital(e.target.value);
              setMessage("");
            }}
            className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select name="countries" id="countries" className='w-full outline outline-gray-300 p-2 rounded mt-2' value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {
              cities.map(country => (
                <option key={country.city_code} value={country.city_name}>{country.city_name}</option>
              ))
            }
          </select>

          {/* Error */}

          {
            error && <p className='text-red-500'>Error: {error}</p>
          }

          {/* Messages */}
          {message && (
            <div className={`mb-4 px-3 py-2 rounded-lg text-sm ${messageType === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
            <button onClick={() => {
              const city = cities.find(city => city.city_name === selectedCity)
              addHospital(hospital, city.city_code)
            }} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
            <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
            <button onClick={() => editHospital(hospitalCode, hospital)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
            <button onClick={() => deleteHospital(hospitalCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
            <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
          </div>
        </div>
      </main>

      {locate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Locate {hospital}</h3>
            <input
              type="text"
              placeholder={`Search hospital`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setHospitalsFilter(hospitals.filter(hospital => hospital.hospital_name.toLowerCase().includes(e.target.value.toLowerCase())))
                console.log(hospitalsFilter)
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="max-h-40 overflow-y-auto">
              {
                search.length == 0 ? (

                  hospitals.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setHospitalCode(c.hospital_code)
                        handleLocate(c.hospital_name)
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                    >
                      {c.hospital_name}
                    </div>
                  ))

                ) : (
                  hospitalsFilter.length > 0 ? (
                    hospitalsFilter.map((c, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setHospitalCode(c.hospital_code)
                          handleLocate(c.hospital_name)
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                      >
                        {c.hospital_name}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No matching hospital found</p>
                  )
                )

              }
            </div>

            <div className="mt-4 text-right">
              <button onClick={() => setLocate(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
