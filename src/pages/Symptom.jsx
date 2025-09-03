import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export const Symptom = () => {
    const [symptom, setSymptom] = useState("")
    const [symptomCode, setSymptomCode] = useState("")
    const [symptoms, setSymptoms] = useState([])
    const [countries, setCountries] = useState([])
    const [symptomsFilter, setSymptomsFilter] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [locate, setLocate] = useState(false)
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate()


    useEffect(() => {
        axios.get("/api/v1/symptoms/get-symptoms")
            .then(res => {
                console.log(res.data.symptoms)
                setSymptoms(res.data.symptoms)
            })
            .catch(err => {
                console.log("error", err)
                setError(err.message)
            })
    }, [])

    const AddSymptom = async () => {
        setLoading(true)
        setError(null)
        const formData = new FormData()
            
            formData.append("symptom", symptom)
            
            formData.append("image", image)
        try {
            const resp = await axios.post("/api/v1/symptoms/add-symptom", formData)
            if (resp.data.success) {
                const newSymptom = resp.data.symptom
                console.log("newSymptom", newSymptom)
                setSymptoms([...symptoms, { ...newSymptom }])
                toast.success("Saved successfuly")
            }
        } catch (error) {
            setError(error.response.data.message)
        }
        setLoading(false)
        setSymptom("")
    }

    const editSymptom = async (symptom_code) => {
        if (!symptom_code) {
            setError("Please select a symptom")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.patch(`/api/v1/symptoms/edit-symptom/${symptom_code}`, { symptom })

                console.log(res.data)

                const newSymptom = { ...res.data.data }

                let symptomIndex = symptoms.findIndex(symptom => symptom.symptom == symptom_code)

                symptoms[symptomIndex] = newSymptom
                // console.log(newSymptoms)
                setSymptoms(symptoms)
                toast.success(res.data.message)
                setSymptom("")
                setSymptomCode()
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const deleteSymptom = async (symptom_code) => {
        if (!symptom_code) {
            setError("Please select a symptom")
        } else {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.delete(`/api/v1/symptoms/delete-symptom/${symptom_code}`)

                const newSymptoms = symptoms.filter(symptom => symptom.symptom != symptom_code)
                console.log(newSymptoms)
                setSymptoms(newSymptoms)
                toast.success(res.data.message)
                setSymptom("")
            } catch (error) {
                setError(error.message)
            }
            setLoading(false)
        }
    }

    const handleLocate = (selectedSymptom) => {
        setSymptom(selectedSymptom);
        setLocate(false);
        setMessage(""); // clear old messages
    };

    const Exit = () => {
        navigate("/admin")
    }


    const fileInputRef = useRef(null);
    const [isImageSelected, setIsImageSelected] = useState(false)
    const [image, setImage] = useState()

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log('Selected file name:', selectedFile.name);
            console.log('Selected file:', selectedFile);
            setIsImageSelected(true)
            setImage(selectedFile)
            // You can now handle the file, e.g., preview it or upload it
        }
    };

    const handleButtonClick = () => {
        setIsImageSelected(false)
        fileInputRef.current.click(); // Trigger the hidden file input click
    };

    return (
        <div className='flex flex-col items-center'>
            <ToastContainer />
            {/* <img src={symptoms[1]?.spict} /> */}
            <main className="flex-grow flex items-center justify-center w-full px-4 my-5">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full mb-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4a2 2 0 012-2h3v6m6 0v-6h3a2 2 0 012 2v4M9 9V5a2 2 0 012-2h2a2 2 0 012 2v4m5 0H4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Manage Symptoms</h2>
                        <p className="text-gray-500 text-sm">Add, edit, or locate symptoms easily</p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder={`Enter symptom name`}
                        value={symptom}
                        onChange={(e) => {
                            setSymptom(e.target.value);
                            setMessage("");
                        }}
                        className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="file"
                        accept="image/*" // Accept only image files
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        name='image'
                    />
                    <button className='bg-[#007bff] text-white py-2 px-5 rounded-sm cursor-pointer text-base' onClick={handleButtonClick}>
                        Upload Image
                    </button>

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
                        <button onClick={AddSymptom} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
                        <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
                        <button onClick={() => editSymptom(symptomCode)} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Save edit</button>
                        <button onClick={() => deleteSymptom(symptomCode)} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
                        <button onClick={Exit} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Exit</button>
                    </div>
                </div>
            </main>

            {locate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Locate {symptom}</h3>
                        <input
                            type="text"
                            placeholder={`Search symptom`}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setSymptomsFilter(symptoms.filter(symptom => symptom.symptoms.toLowerCase().includes(e.target.value.toLowerCase())))
                                console.log(symptomsFilter)
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="max-h-40 overflow-y-auto">
                            {
                                search.length == 0 ? (

                                    symptoms.map((c, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setSymptomCode(c.symptom)
                                                handleLocate(c.symptoms)
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                        >
                                            {c.symptoms}
                                        </div>
                                    ))

                                ) : (
                                    symptomsFilter.length > 0 ? (
                                        symptomsFilter.map((c, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setSymptomCode(c.symptom)
                                                    handleLocate(c.symptoms)
                                                }}
                                                className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                            >
                                                {c.symptoms}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No matching symptom found</p>
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
