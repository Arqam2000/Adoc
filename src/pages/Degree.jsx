import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { apiBaseUrl } from '../constants/constants'

export const Degree = () => {
    const [degree, setDegree] = useState("")
    const [degreeCode, setDegreeCode] = useState()
    const [degrees, setDegrees] = useState([])
    const [degreesFilter, setDegreesFilter] = useState([])
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

        axios.get(`${apiBaseUrl}/api/v1/degrees/get-degrees`)
            .then(res => {
                console.log(res)
                setDegrees(res.data.degrees)
            })
            .catch(err => {
                console.log("error", err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    const AddDegree = async () => {
        setLoading(true)
        setError(null)
        console.log("Add degree")
        try {
            const resp = await axios.post(`${apiBaseUrl}/api/v1/degrees/add-degree`, { degree })
            const newDegree = resp.data.degree
            console.log("new degree", newDegree)
            setDegrees([...degrees, { ...newDegree }])
            toast.success("Saved successfuly")
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
        setDegree("")
    }

    const editDegree = async (degree_code) => {
        if (!degree_code) {
            setError("Please select a degree")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.patch(`${apiBaseUrl}/api/v1/degrees/edit-degree/${degree_code}`, { degree })

                console.log(res.data)

                const newDegree = { ...res.data.data }

                let degreeIndex = degrees.findIndex(degree => degree.degree_code == degree_code)

                degrees[degreeIndex] = newDegree
                // console.log(newDegrees)
                setDegrees(degrees)
                toast.success(res.data.message)
                setDegree("")
                setDegreeCode()
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const deleteDegree = async (degree_code) => {
        if (!degree_code) {
            setError("Please select a degree")
        } else {
            setLoading(true)
            setError(null)
            setIsOpen(true)
            try {
                const res = await axios.delete(`${apiBaseUrl}/api/v1/degrees/delete-degree/${degree_code}`)

                const newDegrees = degrees.filter(degree => degree.degree_code != degree_code)
                console.log(newDegrees)
                setDegrees(newDegrees)
                toast.success(res.data.message)
                setDegree("")
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const handleLocate = (selectedCity) => {
        setDegree(selectedCity);
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
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Degrees</h2>
                        <p className="text-gray-500 text-sm">Add, edit, or locate degrees easily</p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder={`Enter degree name`}
                        value={degree}
                        onChange={(e) => {
                            setDegree(e.target.value);
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
                        <button onClick={AddDegree} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
                        <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
                        <button onClick={() => editDegree(degreeCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
                        <button onClick={() => deleteDegree(degreeCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
                        <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
                    </div>
                </div>
            </main>

            {/* Locate Modal */}
            {locate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Locate {degree}</h3>
                        <input
                            type="text"
                            placeholder={`Search degree`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setDegreesFilter(degrees.filter(degree => degree.degree_name.toLowerCase().includes(e.target.value.toLowerCase())))
                                console.log(degreesFilter)
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="max-h-40 overflow-y-auto">
                            {
                                search.length == 0 ? (

                                    degrees.map((c, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setDegreeCode(c.degree_code)
                                                handleLocate(c.degree_name)
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                        >
                                            {c.degree_name}
                                        </div>
                                    ))

                                ) : (
                                    degreesFilter.length > 0 ? (
                                        degreesFilter.map((c, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setDegreeCode(c.degree_code)
                                                    handleLocate(c.degree_name)
                                                }}
                                                className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                            >
                                                {c.degree_name}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No matching degree found</p>
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
