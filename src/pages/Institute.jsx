import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export const Institute = () => {
    const [institute, setInstitute] = useState("")
    const [instituteCode, setInstituteCode] = useState()
    const [cityCode, setCityCode] = useState()
    const [institutes, setInstitutes] = useState([])
    const [institutesFilter, setInstitutesFilter] = useState([])
    const [cities, setCities] = useState([])
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

        axios.get("/api/v1/institutes/get-institutes")
            .then(res => {
                console.log(res)
                setInstitutes(res.data.institutes)
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

    

    const AddInstitute = async () => {
        setLoading(true)
        setError(null)
        console.log("Add institute")
        const city = cities.find(({city_name})=> city_name == cityCode)
        setCityCode(city.city_code)
        try {
            const resp = await axios.post("/api/v1/institutes/add-institute", { institute, cityCode })
            const newInstitute = resp.data.institute
            console.log("new institute", newInstitute)
            setInstitutes([...institutes, { ...newInstitute }])
            toast.success("Saved successfuly")
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
        setInstitute("")
    }

    const editInstitute = async (institute_code) => {
        if (!institute_code) {
            setError("Please select a institute")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.patch(`/api/v1/institutes/edit-institute/${institute_code}`, { institute })

                console.log(res.data)

                const newInstitute = { ...res.data.data }

                let instituteIndex = institutes.findIndex(institute => institute.institute_code == institute_code)

                institutes[instituteIndex] = newInstitute
                // console.log(newInstitutes)
                setInstitutes(institutes)
                toast.success(res.data.message)
                setInstitute("")
                setInstituteCode()
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const deleteInstitute = async (institute_code) => {
        if (!institute_code) {
            setError("Please select a institute")
        } else {
            setLoading(true)
            setError(null)
            setIsOpen(true)
            try {
                const res = await axios.delete(`/api/v1/institutes/delete-institute/${institute_code}`)

                const newInstitutes = institutes.filter(institute => institute.university != university)
                console.log(newInstitutes)
                setInstitutes(newInstitutes)
                toast.success(res.data.message)
                setInstitute("")
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const handleLocate = (selectedCity) => {
        setInstitute(selectedCity);
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
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Institutes</h2>
                        <p className="text-gray-500 text-sm">Add, edit, or locate institutes easily</p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder={`Enter institute name`}
                        value={institute}
                        onChange={(e) => {
                            setInstitute(e.target.value);
                            setMessage("");
                        }}
                        className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select name="countries" id="countries" className='w-full outline outline-gray-300 p-2 rounded mt-2' onChange={(e) => {
                        setCityCode(e.target.value)
                        console.log(cityCode)
                        }}>
                            <option value="" disabled selected hidden>Select City</option>
                        {
                            cities.map(city => (
                                <option key={city.city_code} value={city.city_name} onClick={()=> {
                                    console.log("city code", city.city_code)
                                }}>{city.city_name}</option>
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
                        <button onClick={AddInstitute} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
                        <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
                        <button onClick={() => editInstitute(instituteCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
                        <button onClick={() => deleteInstitute(instituteCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
                        <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
                    </div>
                </div>
            </main>

            {/* Locate Modal */}
            {locate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Locate {institute}</h3>
                        <input
                            type="text"
                            placeholder={`Search institute`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setInstitutesFilter(institutes.filter(institute => institute.university_name.toLowerCase().includes(e.target.value.toLowerCase())))
                                console.log(institutesFilter)
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="max-h-40 overflow-y-auto">
                            {
                                search.length == 0 ? (

                                    institutes.map((c, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setInstituteCode(c.university)
                                                handleLocate(c.university_name)
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                        >
                                            {c.university_name}
                                        </div>
                                    ))

                                ) : (
                                    institutesFilter.length > 0 ? (
                                        institutesFilter.map((c, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setInstituteCode(c.university)
                                                    handleLocate(c.university_name)
                                                }}
                                                className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                            >
                                                {c.university}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No matching institute found</p>
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
