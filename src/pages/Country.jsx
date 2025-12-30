import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ConfirmBox } from '../components/ConfirmBox'
import { apiBaseUrl } from '../constants/constants'
// import CityManager from '../components/ManageCard'

export const Country = () => {
  const [country, setCountry] = useState("")
  const [countryCode, setCountryCode] = useState()
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locate, setLocate] = useState(false)
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios.get(`${apiBaseUrl}/api/v1/countries/get-countries`)
      .then(res => {
        console.log(res)
        setCountries(res.data.countries)
      })
      .catch(err => {
        console.log("error", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  const AddCountry = async () => {
    setLoading(true)
    setError(null)
    console.log("Add country")
    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/countries/add-country`, { country })
      const newCountry = resp.data.country
      console.log("new country", newCountry)
      setCountries([...countries, { ...newCountry }])
      toast.success("Saved successfuly")
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    setCountry("")
  }

  const editCountry = async (country_code) => {
    if (!country_code) {
      setError("Please select a country")
    } else {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.patch(`${apiBaseUrl}/api/v1/countries/edit-country/${country_code}`, { country })

        console.log(res.data)

        const newCountry = { ...res.data.data }

        let countryIndex = countries.findIndex(country => country.country_code == country_code)

        countries[countryIndex] = newCountry
        // console.log(newCountries)
        setCountries(countries)
        toast.success(res.data.message)
        setCountry("")
        setCountryCode()
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }
  }

  const deleteCountry = async (country_code) => {
    if (!country_code) {
      setError("Please select a country")
    } else {
      setLoading(true)
      setError(null)
      setIsOpen(true)
      try {
        const res = await axios.delete(`${apiBaseUrl}/api/v1/countries/delete-country/${country_code}`)

        const newCountries = countries.filter(country => country.country_code != country_code)
        console.log(newCountries)
        setCountries(newCountries)
        toast.success(res.data.message)
        setCountry("")
      } catch (error) {
        setError(error.message)
      }
      setLoading(false)
    }
  }

  const handleLocate = (selectedCity) => {
    setCountry(selectedCity);
    setLocate(false);
    setMessage(""); // clear old messages
  };

  const Exit = () => {
    navigate("/admin")
  }

  return (
    <div className='flex flex-col items-center bg-gray-50'>
     
      {/* {isOpen && (<ConfirmBox />)} */}
      <main className="flex-grow flex items-center justify-center w-full px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
         <ToastContainer />
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4a2 2 0 012-2h3v6m6 0v-6h3a2 2 0 012 2v4M9 9V5a2 2 0 012-2h2a2 2 0 012 2v4m5 0H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Manage Countries</h2>
            <p className="text-gray-500 text-sm">Add, edit, or locate countries easily</p>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder={`Enter country name`}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setMessage("");
            }}
            className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button onClick={AddCountry} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
            <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
            <button onClick={() => editCountry(countryCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
            <button onClick={() => deleteCountry(countryCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
            <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
          </div>
        </div>
      </main>

      {/* Locate Modal */}
      {locate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Locate {country}</h3>
            <input
              type="text"
              placeholder={`Search country`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCountriesFilter(countries.filter(country => country.country_name.toLowerCase().includes(e.target.value.toLowerCase())))
                console.log(countriesFilter)
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="max-h-40 overflow-y-auto">
              {
                search.length == 0 ? (

                  countries.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setCountryCode(c.country_code)
                        handleLocate(c.country_name)
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                    >
                      {c.country_name}
                    </div>
                  ))

                ) : (
                  countriesFilter.length > 0 ? (
                    countriesFilter.map((c, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setCountryCode(c.country_code)
                          handleLocate(c.country_name)
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                      >
                        {c.country_name}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No matching country found</p>
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
