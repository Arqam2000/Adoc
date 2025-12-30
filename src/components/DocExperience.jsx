import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import delIcon from "../assets/delete.png"
import { apiBaseUrl } from '../constants/constants';

const DocExperience = ({ hospitals, designations, handleOpenModal, handleRows2fromDocExperience, saveExpToDB, handleFocus, docExperience, dr }) => {
    const [rows2, setRows2] = useState([
        {
            hospital: "",
            designation: "",
            fromDate: "",
            tillDate: "",
            comments: ""
        }
    ]);

    // console.log("rows2", rows2)

    // console.log("hospitals", hospitals)
    // console.log("designations", designations)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("rows2"))) {
            setRows2(JSON.parse(localStorage.getItem("rows2")))
            handleRows2fromDocExperience(JSON.parse(localStorage.getItem("rows2")))
        }
    }, [])

    const [experience, setExperience] = useState({
        hospital: "",
        designation: "",
        from: "",
        to: "",
        comments: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExperience((prev) => ({ ...prev, [name]: value }));
    };

    const deleteDoctorExp = async () => {
        try {
            const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctorexp`, {
                dr
            })

            if (resp.data.success) {
                localStorage.setItem("rows2", JSON.stringify([
                    {
                        hospital: "",
                        designation: "",
                        fromDate: "",
                        tillDate: "",
                        comments: ""
                    }
                ]))
                toast.success("Deleted successfully")
            }
        } catch (error) {
            toast.error("Error while deleting")
        }
    }

    function areAllObjectPropertiesEmpty(arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return false; // Not an array or empty array
        }

        return arr.every(obj => {
            // Check if the object itself is null or undefined
            if (obj === null || typeof obj === 'undefined') {
                return true; // Consider null/undefined objects as having "empty" properties
            }

            // Get all enumerable property names of the object
            const keys = Object.keys(obj);

            // If the object has no properties, it's considered "empty"
            if (keys.length === 0) {
                return true;
            }

            // Check if every property value is considered "empty"
            return keys.every(key => {
                const value = obj[key];
                // Define what "empty" means for your properties (e.g., null, undefined, empty string, empty array)
                return value === null || typeof value === 'undefined' || value === '' || (Array.isArray(value) && value.length === 0);
            });
        });
    }

    const deleteExpRow = async (row) => {
        try {

            if (areAllObjectPropertiesEmpty(rows2)) {
                localStorage.setItem("rows2", JSON.stringify([
                    {
                        hospital: "",
                        designation: "",
                        fromDate: "",
                        tillDate: "",
                        comments: ""
                    }
                ]))
                toast.success("row removed")
            } else {
                const hosObj = hospitals.find(hosp => hosp.hospital_name == row.hospital)

                const desigObj = designations.find(desig => desig.DDesig == row.designation)

                const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctorexp/${dr}`, {
                    hospital_code: hosObj.hospital_code,
                    Desig: desigObj.Desig
                })

                if (resp.data.success) {
                    const newArr = rows2.filter(row2 => row2.hospital != row.hospital && row2.designation != row.designation)

                    if (newArr.length == 0) {
                        localStorage.setItem("rows2", JSON.stringify([
                            {
                                hospital: "",
                                designation: "",
                                fromDate: "",
                                tillDate: "",
                                comments: ""
                            }
                        ]))
                    } else {
                        localStorage.setItem("rows2", JSON.stringify(newArr))
                    }

                    toast.success("Deleted Successfuly")
                }
            }


        } catch (error) {
            toast.error("Error deleting experience row")
            console.log("Error deleting experience row", error)
        }
    }

    return (
        // <div className='w-full md:max-w-6xl'>
        //     <h1 className='text-[17px] font-semibold mb-3'>Experience</h1>
        //     <div className='grid grid-cols-1 lg:grid-cols-5 gap-3'>

        //         {
        //             rows2.map((row, index) => (
        //                 <>

        //                     <div className=' gap-2'>
        //                         <div>
        //                             <h1 className='text-base font-semibold'>Hospital</h1>
        //                         </div>
        //                         <div className='flex'>
        //                             <select name="Institute" id="Institute" className="w-fit border p-2 py-1 rounded-lg" onChange={(e) => {
        //                                 const newRows = [...rows2];
        //                                 newRows[index]["hospital"] = e.target.value;
        //                                 setRows2(newRows);
        //                             }} value={row.hospital}>
        //                                 <option value="" disabled selected hidden>Select Hospital</option>
        //                                 {
        //                                     hospitals.map(institute => (

        //                                         <option key={institute.hospital_code} value={institute.hospital_name}>{institute.hospital_name}</option>

        //                                     ))
        //                                 }
        //                             </select>
        //                             <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Institute")}>+</button>
        //                         </div>
        //                     </div>

        //                     <div className=' gap-2'>
        //                         <div>
        //                             <h1 className='text-base font-semibold'>Designation</h1>
        //                         </div>
        //                         <select name="Designation" id="Designation" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
        //                             const newRows = [...rows2];
        //                             newRows[index]["designation"] = e.target.value;
        //                             setRows2(newRows);
        //                         }} value={row.designation}>
        //                             <option value="" disabled selected hidden>Select designation</option>
        //                             {
        //                                 designations?.map(designation => (
        //                                     <>
        //                                         <option key={designation.Desig} value={designation.DDesig}>{designation.DDesig}</option>
        //                                     </>
        //                                 ))
        //                             }
        //                         </select>
        //                         <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Designation")}>+</button>
        //                     </div>

        //                     <div className='gap-2'>
        //                         <div>
        //                             <h1 className='text-base font-semibold'>From</h1>
        //                         </div>
        //                         <input type="date" className='outline rounded p-1' onChange={(e) => {
        //                             const newRows = [...rows2];
        //                             newRows[index]["fromDate"] = e.target.value
        //                             setRows2(newRows)
        //                         }} value={row.fromDate} />
        //                     </div>

        //                     <div className=' gap-2'>
        //                         <div>
        //                             <h1 className='text-base font-semibold'>to</h1>
        //                         </div>
        //                         <input type="date" className='outline rounded p-1' onChange={(e) => {
        //                             const newRows = [...rows2];
        //                             newRows[index]["tillDate"] = e.target.value
        //                             setRows2(newRows)
        //                         }} value={row.tillDate} />
        //                     </div>
        //                     <div className=' gap-2'>
        //                         <div>
        //                             <h1 className='text-base font-semibold'>Comments</h1>
        //                         </div>
        //                         <input type="text" className='outline rounded p-1' placeholder='Comments' onChange={(e) => {
        //                             const newRows = [...rows2];
        //                             newRows[index]["comments"] = e.target.value
        //                             setRows2(newRows)
        //                         }} value={row.comments} />
        //                     </div>

        //                 </>

        //             ))
        //         }
        //     </div>
        //     <div className='flex justify-center mt-2 gap-2'>
        //         <button className='bg-blue-500 py-1 px-2 pr-3 rounded cursor-pointer text-white text-base w-fit text-center' onClick={() => setRows2([...rows2, { hospital: "", designation: "" }])}>Add more</button>
        //         <button className='bg-[#007bff] text-white py-2 px-5 rounded-sm cursor-pointer text-base ml-2' onClick={() => {

        //             localStorage.setItem("rows2", JSON.stringify(rows2))
        //             // localStorage.setItem("qualifications", JSON.stringify({ institute, degree }))
        //             toast.success("Saved")
        //             handleRows2fromDocExperience(rows2)
        //         }}>
        //             Save
        //         </button>
        //         {/* <button onClick={() => handleRows2fromDocExperience(rows2)}>Send data to parent</button> */}
        //         <button
        //             className="bg-red-600 text-white px-4 py-2 rounded-md"
        //             onClick={() => {
        //                 localStorage.setItem("rows2", JSON.stringify([
        //                     {
        //                         hospital: "",
        //                         designation: "",
        //                         fromDate: "",
        //                         tillDate: "",
        //                         comments: ""
        //                     }
        //                 ]))
        //                 toast.success("Saved")
        //             }}
        //         >
        //             delete
        //         </button>

        //     </div>
        // </div>



        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <ToastContainer />
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Experience</h2>

            {
                rows2.map((row, index) => (
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {/* Hospital */}

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Hospital</label>
                            <select
                                name="hospital"
                                value={row.hospital}
                                onFocus={handleFocus}
                                onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["hospital"] = e.target.value;
                                    setRows2(newRows)
                                    handleRows2fromDocExperience(newRows)
                                }
                                }
                                className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select hospital</option>
                                {
                                    hospitals.map(institute => (

                                        <option key={institute.hospital_code} value={institute.hospital_name}>{institute.hospital_name}</option>

                                    ))
                                }

                            </select>
                        </div>

                        {/* Designation */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Designation</label>
                            <select
                                type="text"
                                name="designation"
                                onFocus={handleFocus}
                                onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["designation"] = e.target.value;
                                    setRows2(newRows);
                                    handleRows2fromDocExperience(newRows)
                                }} value={row.designation}
                                placeholder="e.g. Eye Specialist"
                                className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select Designation</option>
                                {
                                    designations?.map(designation => (
                                        <>
                                            <option key={designation.Desig} value={designation.DDesig}>{designation.DDesig}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>

                        {/* From Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">From</label>
                            <input
                                type="date"
                                name="from"
                                onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["fromDate"] = e.target.value
                                    setRows2(newRows)
                                    handleRows2fromDocExperience(newRows)
                                }} value={row.fromDate}
                                className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* To Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">To</label>
                            <input
                                type="date"
                                name="to"
                                onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["tillDate"] = e.target.value
                                    setRows2(newRows)
                                    handleRows2fromDocExperience(newRows)
                                }} value={row.tillDate}
                                className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Comments */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Comments</label>
                            <input
                                type="text"
                                name="comments"
                                onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["comments"] = e.target.value
                                    setRows2(newRows)
                                    handleRows2fromDocExperience(newRows)
                                }} value={row.comments}
                                placeholder="Completed"
                                className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className='flex items-end'>
                            <button className='flex items-center cursor-pointer mb-3' onClick={() => deleteExpRow(row)}>
                                <img src={delIcon} alt="delIcon" />
                            </button>
                            <button className='bg-blue-500 py-1 px-5 rounded cursor-pointer text-white text-base ml-2 mb-2' onClick={() => {
                                localStorage.setItem("rows2", JSON.stringify(rows2))
                                setRows2([...rows2, { hospital: "", designation: "" }])
                                handleRows2fromDocExperience([...rows2, { hospital: "", designation: "" }])
                            }}>+</button>
                        </div>
                    </div>
                ))
            }

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
                {/* <button className="bg-blue-500 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-600 transition" onClick={() => {
                    localStorage.setItem("rows2", JSON.stringify(rows2))
                    setRows2([...rows2, { hospital: "", designation: "" }])
                    handleRows2fromDocExperience([...rows2, { hospital: "", designation: "" }])

                }}>
                    Add More
                </button> */}
                {/* <button className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 transition" onClick={() => {

                    localStorage.setItem("rows2", JSON.stringify(rows2))
                    toast.success("Saved")
                    handleRows2fromDocExperience(rows2)
                }}>
                    Save
                </button> */}
                <button className="bg-green-500 text-white px-5 py-2 rounded-xl shadow hover:bg-green-600 transition" onClick={saveExpToDB}>
                    Save
                </button>
                <button className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:bg-red-600 transition" onClick={deleteDoctorExp}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DocExperience
