import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export const Designation = () => {
    const [designation, setDesignation] = useState("")
    const [designationCode, setDesignationCode] = useState()
    const [designations, setDesignations] = useState([])
    const [designationsFilter, setDesignationsFilter] = useState([])
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

        axios.get("/api/v1/designations/get-designations")
            .then(res => {
                console.log(res)
                setDesignations(res.data.designations)
            })
            .catch(err => {
                console.log("error", err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    const AddDesignation = async () => {
        setLoading(true)
        setError(null)
        console.log("Add designation")
        try {
            const resp = await axios.post("/api/v1/designations/add-designation", { designation })
            const newDesignation = resp.data.designation
            console.log("new designation", newDesignation)
            setDesignations([...designations, { ...newDesignation }])
            toast.success("Saved successfuly")
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
        setDesignation("")
    }

    const editDesignation = async (designation_code) => {
        if (!designation_code) {
            setError("Please select a designation")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.patch(`/api/v1/designations/edit-designation/${designation_code}`, { designation })

                console.log(res.data)

                const newDesignation = { ...res.data.data }

                let designationIndex = designations.findIndex(designation => designation.Desig == designation_code)

                designations[designationIndex] = newDesignation
                // console.log(newDesignations)
                setDesignations(designations)
                toast.success(res.data.message)
                setDesignation("")
                setDesignationCode()
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const deleteDesignation = async (designation_code) => {
        if (!designation_code) {
            setError("Please select a designation")
        } else {
            setLoading(true)
            setError(null)
            setIsOpen(true)
            try {
                const res = await axios.delete(`/api/v1/designations/delete-designation/${designation_code}`)

                const newDesignations = designations.filter(designation => designation.Desig != designation_code)
                console.log(newDesignations)
                setDesignations(newDesignations)
                toast.success(res.data.message)
                setDesignation("")
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const handleLocate = (selectedCity) => {
        setDesignation(selectedCity);
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
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Designations</h2>
                        <p className="text-gray-500 text-sm">Add, edit, or locate designations easily</p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder={`Enter designation name`}
                        value={designation}
                        onChange={(e) => {
                            setDesignation(e.target.value);
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
                        <button onClick={AddDesignation} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
                        <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
                        <button onClick={() => editDesignation(designationCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
                        <button onClick={() => deleteDesignation(designationCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
                        <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
                    </div>
                </div>
            </main>

            {/* Locate Modal */}
            {locate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Locate {designation}</h3>
                        <input
                            type="text"
                            placeholder={`Search designation`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setDesignationsFilter(designations.filter(designation => designation.DDesig.toLowerCase().includes(e.target.value.toLowerCase())))
                                console.log(designationsFilter)
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="max-h-40 overflow-y-auto">
                            {
                                search.length == 0 ? (

                                    designations.map((c, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setDesignationCode(c.Desig)
                                                handleLocate(c.DDesig)
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                        >
                                            {c.DDesig}
                                        </div>
                                    ))

                                ) : (
                                    designationsFilter.length > 0 ? (
                                        designationsFilter.map((c, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setDesignationCode(c.Desig)
                                                    handleLocate(c.DDesig)
                                                }}
                                                className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                            >
                                                {c.DDesig}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No matching designation found</p>
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
