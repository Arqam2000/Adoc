import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export const City = () => {
    const [city, setCity] = useState("")
    const [cityCode, setCityCode] = useState("")
    const [cities, setCities] = useState([])
    const [countries, setCountries] = useState([])
    const [citiesFilter, setCitiesFilter] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [locate, setLocate] = useState(false)
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        setError(null)

        axios.get("/api/v1/cities/get-cities")
            .then(res => {
                console.log(res)
                setCities(res.data.cities)
            })
            .catch(err => {
                console.log("error", err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setLoading(true)
        setError(null)

        axios.get("/api/v1/countries/get-countries")
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

    const AddCity = async () => {
        setLoading(true)
        setError(null)
        try {
            const resp = await axios.post("/api/v1/cities/add-city", { city })
            const newCity = resp.data.city
            console.log("new city", newCity)
            setCities([...cities, { ...newCity }])
            toast.success("Saved successfuly")
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
        setCity("")
    }

    const editCity = async (city_code) => {
        if (!city_code) {
            setError("Please select a city")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.patch(`/api/v1/cities/edit-city/${city_code}`, { city })

                console.log(res.data)

                const newCity = { ...res.data.data }

                let cityIndex = cities.findIndex(city => city.city_code == city_code)

                cities[cityIndex] = newCity
                // console.log(newCities)
                setCities(cities)
                toast.success(res.data.message)
                setCity("")
                setCityCode()
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const deleteCity = async (city_code) => {
        if (!city_code) {
            setError("Please select a city")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.delete(`/api/v1/cities/delete-city/${city_code}`)

                const newCities = cities.filter(city => city.city_code != city_code)
                console.log(newCities)
                setCities(newCities)
                toast.success(res.data.message)
                setCity("")
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const handleLocate = (selectedCity) => {
        setCity(selectedCity);
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
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Cities</h2>
                        <p className="text-gray-500 text-sm">Add, edit, or locate cities easily</p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder={`Enter city name`}
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setMessage("");
                        }}
                        className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select name="countries" id="countries" className='w-full outline outline-gray-300 p-2 rounded mt-2'>
                        {
                            countries.map(country => (
                                <option key={country.country_code} value={country.country_name}>{country.country_name}</option>
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
                        <button onClick={AddCity} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
                        <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
                        <button onClick={() => editCity(cityCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
                        <button onClick={() => deleteCity(cityCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
                        <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
                    </div>
                </div>
            </main>
            
            {
                error && <p>Error: {error}</p>
            }

            {/* {
                locate && <div className='bg-gray-400 p-2 rounded backdrop-blur-2xl '>
                    <input type="text" placeholder='Locate City' onChange={(e) => {
                        setCitiesFilter(cities.filter(city => city.city_name.toLowerCase().includes(e.target.value.toLowerCase())))
                        // console.log(citiesFilter)
                    }} />
                    <div>
                        {
                            citiesFilter.map(city => <p onClick={() => {
                                setCity(city.city_name)
                                setCityCode(city.city_code)
                                setCitiesFilter([])
                                setLocate(false)
                            }} className='cursor-pointer'>{city.city_name}</p>)
                        }
                    </div>
                </div>
            } */}


            {locate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Locate {city}</h3>
                        <input
                            type="text"
                            placeholder={`Search city`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCitiesFilter(cities.filter(city => city.city_name.toLowerCase().includes(e.target.value.toLowerCase())))
                                console.log(citiesFilter)
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="max-h-40 overflow-y-auto">
                            {
                                search.length == 0 ? (

                                    cities.map((c, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setCityCode(c.city_code)
                                                handleLocate(c.city_name)
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                        >
                                            {c.city_name}
                                        </div>
                                    ))

                                ) : (
                                    citiesFilter.length > 0 ? (
                                        citiesFilter.map((c, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setCityCode(c.city_code)
                                                    handleLocate(c.city_name)
                                                }}
                                                className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                            >
                                                {c.city_name}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No matching city found</p>
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
        </div >
    )
}
