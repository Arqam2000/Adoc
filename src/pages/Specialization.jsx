import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export const Specialization = () => {
  const [specialization, setSpecialization] = useState("")
  const [specializationCode, setSpecializationCode] = useState("")
  const [specializations, setSpecializations] = useState([])
  const [countries, setCountries] = useState([])
  const [specializationsFilter, setSpecializationsFilter] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locate, setLocate] = useState(false)
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate()


  useEffect(() => {
    axios.get("/api/v1/specializations/get-specializations")
    .then(res => setSpecializations(res.data.specializations))
    .catch(err => {
        console.log("error", err)
        setError(err.message)
    })
  }, [])

  const AddSpecialization = async () => {
    setLoading(true)
    setError(null)
    try {
      const resp = await axios.post("/api/v1/specializations/add-specialization", { specialization })
      if (resp.data.success) {
        const newSpecialization = resp.data.specialization
        console.log("newSpecialization", newSpecialization)
        setSpecializations([...specializations, { ...newSpecialization }])
        toast.success("Saved successfuly")
      }
    } catch (error) {
      setError(error.response.data.message)
    }
    setLoading(false)
    setSpecialization("")
  }

  const editSpecialization = async (specialization_code) => {
    if (!specialization_code) {
      setError("Please select a specialization")
    } else {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.patch(`/api/v1/specializations/edit-specialization/${specialization_code}`, { specialization })

        console.log(res.data)

        const newSpecialization = { ...res.data.data }

        let specializationIndex = specializations.findIndex(specialization => specialization.Specialization_code == specialization_code)

        specializations[specializationIndex] = newSpecialization
        // console.log(newSpecializations)
        setSpecializations(specializations)
        toast.success(res.data.message)
        setSpecialization("")
        setSpecializationCode()
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }
  }

  const deleteSpecialization = async (specialization_code) => {
    if (!specialization_code) {
      setError("Please select a specialization")
    } else {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.delete(`/api/v1/specializations/delete-specialization/${specialization_code}`)

        const newSpecializations = specializations.filter(specialization => specialization.Specialization_code != specialization_code)
        console.log(newSpecializations)
        setSpecializations(newSpecializations)
        toast.success(res.data.message)
        setSpecialization("")
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }
  }
  const handleLocate = (selectedSpecialization) => {
    setSpecialization(selectedSpecialization);
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
            <h2 className="text-2xl font-semibold text-gray-800">Manage Specializations</h2>
            <p className="text-gray-500 text-sm">Add, edit, or locate specializations easily</p>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder={`Enter specialization name`}
            value={specialization}
            onChange={(e) => {
              setSpecialization(e.target.value);
              setMessage("");
            }}
            className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* <select name="countries" id="countries" className='w-full outline outline-gray-300 p-2 rounded mt-2'>
            {
              countries.map(country => (
                <option key={country.country_code} value={country.country_name}>{country.country_name}</option>
              ))
            }
          </select> */}

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
            <button onClick={AddSpecialization} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
            <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
            <button onClick={() => editSpecialization(specializationCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
            <button onClick={() => deleteSpecialization(specializationCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
            <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
          </div>
        </div>
      </main>

      {locate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Locate {specialization}</h3>
            <input
              type="text"
              placeholder={`Search specialization`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSpecializationsFilter(specializations.filter(specialization => specialization.Specialization_name.toLowerCase().includes(e.target.value.toLowerCase())))
                console.log(specializationsFilter)
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="max-h-40 overflow-y-auto">
              {
                search.length == 0 ? (

                  specializations.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSpecializationCode(c.Specialization_code)
                        handleLocate(c.Specialization_name)
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                    >
                      {c.Specialization_name}
                    </div>
                  ))

                ) : (
                  specializationsFilter.length > 0 ? (
                    specializationsFilter.map((c, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSpecializationCode(c.Specialization_code)
                          handleLocate(c.Specialization_name)
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                      >
                        {c.Specialization_name}
                      </div> 
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No matching specialization found</p>
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
