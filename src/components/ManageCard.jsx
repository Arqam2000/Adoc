import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants/constants";

export default function CityManager({AddCountry, setLocate}) {
    const params = useParams()
    console.log(params)
    const [inputVal, setInputVal] = useState("");
    const [data, setData] = useState([]);
    const [isLocateOpen, setIsLocateOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        axios.get(`${apiBaseUrl}/api/v1/${params.name.charAt(0).toLowerCase() + params.name.slice(1)}/get-${params.name.charAt(0).toLowerCase() + params.name.slice(1)}`)
            .then(res => {
                console.log(res)
                setData(res.data.countries)
            })
            .catch(err => {
                console.log("error", err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleAdd = async () => {
        setLoading(true)
            setError(null)
            try {
              const resp = await axios.post(`${apiBaseUrl}/api/v1/${params.name.charAt(0).toLowerCase() + params.name.slice(1)}/add-country`, { inputVal })
              const newCountry = resp.data.country
              console.log("new country", newCountry)
              setCountries([...countries, { ...newCountry }])
            } catch (error) {
              setError(error.message)
            }
            setLoading(false)
            setCountry("")
    };

    const handleEdit = () => {
        if (!city.trim()) {
            setMessage("Please select a city to edit");
            setMessageType("error");
            return;
        }
        if (!cities.includes(city.trim())) {
            setMessage("City not found to edit");
            setMessageType("error");
            return;
        }
        const updatedCities = data.map((c) => (c === city ? city.trim() : c));
        setCities(updatedCities);
        setMessage("City updated successfully");
        setMessageType("success");
    };

    const handleDelete = () => {
        if (!city.trim()) {
            setMessage("Please select a city to delete");
            setMessageType("error");
            return;
        }
        if (!data.includes(city.trim())) {
            setMessage("City not found to delete");
            setMessageType("error");
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${city}?`)) {
            setData(data.filter((c) => c !== city));
            setMessage("City deleted successfully");
            setMessageType("success");
            setCity("");
        }
    };

    const handleLocate = (selectedCity) => {
        setCity(selectedCity);
        setIsLocateOpen(false);
        setMessage(""); // clear old messages
    };

    // const filteredCities = data.filter((c) => c.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            {/* Header */}

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center w-full px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full mb-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-4a2 2 0 012-2h3v6m6 0v-6h3a2 2 0 012 2v4M9 9V5a2 2 0 012-2h2a2 2 0 012 2v4m5 0H4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">Manage {params.name}</h2>
                        <p className="text-gray-500 text-sm">Add, edit, or locate {params.name} easily</p>
                    </div>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder={`Enter ${params.name.charAt(0).toLowerCase() + params.name.slice(1)} name`}
                        value={inputVal}
                        onChange={(e) => {
                            setInputVal(e.target.value);
                            setMessage("");
                        }}
                        className="w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Messages */}
                    {message && (
                        <div className={`mb-4 px-3 py-2 rounded-lg text-sm ${messageType === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                            {message}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button onClick={AddCountry} className="px-3 py-2 bg-blue-600 text-white text-base rounded-lg hover:bg-blue-700">Add</button>
                        <button onClick={() => setLocate(true)} className="px-3 py-2 bg-green-600 text-white text-base rounded-lg hover:bg-green-700">Locate</button>
                        <button onClick={handleEdit} className="px-3 py-2 bg-yellow-500 text-white text-base rounded-lg hover:bg-yellow-600">Edit</button>
                        <button onClick={handleDelete} className="px-3 py-2 bg-red-600 text-white text-base rounded-lg hover:bg-red-700">Delete</button>
                    </div>
                </div>
            </main>

            {/* Locate Modal */}
            {/* {isLocateOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Locate {params.name}</h3>
                        <input
                            type="text"
                            placeholder={`Search ${params.name}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="max-h-40 overflow-y-auto">
                            {filteredCities.length > 0 ? (
                                filteredCities.map((c, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleLocate(c)}
                                        className="px-3 py-2 cursor-pointer hover:bg-blue-100 rounded-md"
                                    >
                                        {c}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No matching {params.name} found</p>
                            )}
                        </div>

                        <div className="mt-4 text-right">
                            <button onClick={() => setIsLocateOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Close</button>
                        </div>
                    </div>
                </div>
            )} */}

            {/* Footer */}

        </div>
    );
}
