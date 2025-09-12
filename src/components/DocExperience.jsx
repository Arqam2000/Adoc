import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const DocExperience = ({ institutes, designations, handleOpenModal, handleRows2fromDocExperience}) => {
    const [rows2, setRows2] = useState([
        {
            institute: "",
            designation: "",
            fromDate: "",
            tillDate: "",
            comments: ""
        }
    ]);

    // console.log("rows2", rows2)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("rows2"))) {
            setRows2(JSON.parse(localStorage.getItem("rows2")))
        }
    }, [])

    return (
        <div className='max-w-6xl'>
            <h1 className='text-[17px] font-semibold mb-3'>Experience</h1>
            <div className='grid grid-cols-5 gap-3'>
                <div>
                    <h1 className='text-base font-semibold'>Institute</h1>
                </div>
                <div>
                    <h1 className='text-base font-semibold'>Designation</h1>
                </div>
                <div>
                    <h1 className='text-base font-semibold'>From</h1>
                </div>
                <div>
                    <h1 className='text-base font-semibold'>to</h1>
                </div>
                <div>
                    <h1 className='text-base font-semibold'>Comments</h1>
                </div>


                {
                    rows2.map((row, index) => (
                        <>

                            <div className='flex'>
                                <select name="Institute" id="Institute" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["institute"] = e.target.value;
                                    setRows2(newRows);
                                }} value={row.institute}>
                                    <option value="" disabled selected hidden>Select Institute</option>
                                    {
                                        institutes.map(institute => (
                                            
                                            <option key={institute.university} value={institute.university_name}>{institute.university_name}</option>
                                            
                                        ))
                                    }
                                </select>
                                <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Institute")}>+</button>
                            </div>

                            <div className='flex'>
                                <select name="Designation" id="Designation" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["designation"] = e.target.value;
                                    setRows2(newRows);
                                }} value={row.designation}>
                                    <option value="" disabled selected hidden>Select designation</option>
                                    {
                                        designations?.map(designation => (
                                            <>
                                                <option key={designation.Desig} value={designation.DDesig}>{designation.DDesig}</option>
                                            </>
                                        ))
                                    }
                                </select>
                                <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Designation")}>+</button>
                            </div>

                            <div>
                                <input type="date" className='outline rounded p-1' onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["fromDate"] = e.target.value
                                    setRows2(newRows)
                                }} value={row.fromDate}/>
                            </div>

                            <div>
                                <input type="date" className='outline rounded p-1' onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["tillDate"] = e.target.value
                                    setRows2(newRows)
                                }} value={row.tillDate}/>
                            </div>
                            <div>
                                <input type="text" className='outline rounded p-1' placeholder='Comments' onChange={(e) => {
                                    const newRows = [...rows2];
                                    newRows[index]["comments"] = e.target.value
                                    setRows2(newRows)
                                }} value={row.comments}/>
                            </div>

                        </>

                    ))
                }
            </div>
            <div className='flex justify-center mt-2'>
                <button className='bg-blue-500 py-1 px-2 pr-3 rounded cursor-pointer text-white text-base w-fit text-center' onClick={() => setRows2([...rows2, { institute: "", designation: "" }])}>Add more</button>
                <button className='bg-[#007bff] text-white py-2 px-5 rounded-sm cursor-pointer text-base ml-2' onClick={() => {

                    localStorage.setItem("rows2", JSON.stringify(rows2))
                    // localStorage.setItem("qualifications", JSON.stringify({ institute, degree }))
                    toast.success("Saved")
                    handleRows2fromDocExperience(rows2)
                }}>
                    Save
                </button>
                {/* <button onClick={() => handleRows2fromDocExperience(rows2)}>Send data to parent</button> */}

            </div>
        </div>
    )
}

export default DocExperience
