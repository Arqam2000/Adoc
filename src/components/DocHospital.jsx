import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import delIcon from "../assets/delete.png"
import { apiBaseUrl } from "../constants/constants";

const DoctorTiming = ({ hospitals, designations, setClickedFrom, setIsOpen, hospitalBlocks, setHospitalBlocks, saveHDToDB, handleFocus, dr }) => {

    // console.log("hospitals", hospitals)

    const handleOpenModal = (source) => {
        setClickedFrom(source);
        setIsOpen(true);
    };


    // console.log("hospital blocks", hospitalBlocks)


    const formatTime = (time) => {
        if (!time) return "--";
        const [hour, minute] = time.split(":");
        let h = parseInt(hour, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return `${h}:${minute} ${ampm}`;
    };

    const handleHospitalChange = (blockIndex, field, value) => {
        const updated = [...hospitalBlocks];
        updated[blockIndex][field] = value;
        setHospitalBlocks(updated);
    };

    const handleTimeChange = (blockIndex, dayIndex, field, value) => {
        const updated = [...hospitalBlocks];
        updated[blockIndex].schedule[dayIndex][field] = value;
        setHospitalBlocks(updated);
    };


    const addMoreHospitals = () => {
        localStorage.setItem(
            `hospitals_schedules`,
            JSON.stringify(hospitalBlocks)
        );
        setHospitalBlocks([
            ...hospitalBlocks,
            {
                hospital: "",
                designation: "",
                fees: "",
                schedule: [
                    { day: "Mon", start: "", end: "" },
                    { day: "Tue", start: "", end: "" },
                    { day: "Wed", start: "", end: "" },
                    { day: "Thu", start: "", end: "" },
                    { day: "Fri", start: "", end: "" },
                    { day: "Sat", start: "", end: "" },
                    { day: "Sun", start: "", end: "" },
                ],
            },
        ]);
    };

    const saveHospitalSchedule = (blockIndex) => {
        const block = hospitalBlocks[blockIndex];
        localStorage.setItem(
            `hospitals_schedules`,
            JSON.stringify(hospitalBlocks)
        );
        toast.success("Saved Schedule");
    };

    const deleteDoctorHD = async () => {
        try {
            const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctorhd`, {
                dr
            })

            if (resp.data.success) {
                localStorage.setItem(
                    `hospitals_schedules`,
                    JSON.stringify([
                        {
                            hospital: "",
                            designation: "",
                            fees: "",
                            schedule: [
                                { day: "Mon", start: "", end: "" },
                                { day: "Tue", start: "", end: "" },
                                { day: "Wed", start: "", end: "" },
                                { day: "Thu", start: "", end: "" },
                                { day: "Fri", start: "", end: "" },
                                { day: "Sat", start: "", end: "" },
                                { day: "Sun", start: "", end: "" },
                            ],
                        },
                    ])
                );
                toast.success("Deleted successfully")
            }
        } catch (error) {
            toast.error("Error while deleting")
            console.log("Error while deleting", error)
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

    const deleteHosRow = async (block) => {
        try {
            if (areAllObjectPropertiesEmpty(hospitalBlocks)) {
                localStorage.setItem("hospitals_schedules", JSON.stringify([
                    {
                        hospital: "",
                        designation: "",
                        fees: "",
                        schedule: [
                            { day: "Mon", start: "", end: "" },
                            { day: "Tue", start: "", end: "" },
                            { day: "Wed", start: "", end: "" },
                            { day: "Thu", start: "", end: "" },
                            { day: "Fri", start: "", end: "" },
                            { day: "Sat", start: "", end: "" },
                            { day: "Sun", start: "", end: "" },
                        ],
                    },
                ]))
                toast.success("row removed")
            } else {
                const hosObj = hospitals.find(hosp => hosp.hospital_name == block.hospital)

                const desigObj = designations.find(desig => desig.DDesig == block.designation)

                const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctorhd/${dr}`, {
                    hospital_code: hosObj.hospital_code,
                    Desig: desigObj.Desig
                })

                if (resp.data.success) {
                    const newArr = hospitalBlocks.filter(row2 => row2.hospital != block.hospital && row2.designation != block.designation)

                    if (newArr.length == 0) {
                        localStorage.setItem("hospitals_schedules", JSON.stringify([
                            {
                                hospital: "",
                                designation: "",
                                fees: "",
                                schedule: [
                                    { day: "Mon", start: "", end: "" },
                                    { day: "Tue", start: "", end: "" },
                                    { day: "Wed", start: "", end: "" },
                                    { day: "Thu", start: "", end: "" },
                                    { day: "Fri", start: "", end: "" },
                                    { day: "Sat", start: "", end: "" },
                                    { day: "Sun", start: "", end: "" },
                                ],
                            },
                        ]))
                    } else {
                        localStorage.setItem("hospitals_schedules", JSON.stringify(newArr))
                    }

                    toast.success("Deleted Successfuly")
                }
            }
        } catch (error) {
            toast.error("Error deleting hospital row")
            console.log("Error deleting hospital row", error)
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-2">
            <ToastContainer />
            <h1 className="text-[17px] font-semibold">Practice Address and Timings</h1>

            {hospitalBlocks.map((block, blockIndex) => (
                <div
                    key={blockIndex}
                    className="shadow-md rounded-md p-2 px-5 flex flex-col gap-4 bg-white"
                >
                    <h1 className="text-base font-semibold underline cursor-pointer">
                        Hospital #{blockIndex + 1}
                    </h1>

                    {/* Hospital & Designation */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex">
                            <select
                                className="w-full border p-2 py-1 rounded-lg"
                                value={block.hospital}
                                onFocus={handleFocus}
                                onChange={(e) =>
                                    handleHospitalChange(blockIndex, "hospital", e.target.value)
                                }
                            >
                                {
                                    block.hospital ? <option value={block.hospital}>{block.hospital}</option> : <option value="" disabled>Select Hospital</option>
                                }
                                {hospitals.map((hos) => (
                                    <option key={hos.hospital_code} value={hos.hospital_name}>
                                        {hos.hospital_name}
                                    </option>
                                ))}
                            </select>
                            <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Hospital")}>+</button>
                        </div>

                        <div className="flex">
                            <select
                                className="w-full border p-2 py-1 rounded-lg"
                                value={block.designation}
                                onFocus={handleFocus}
                                onChange={(e) =>
                                    handleHospitalChange(blockIndex, "designation", e.target.value)
                                }
                            >
                                {
                                    block.designation ? <option value={block.designation}>{block.designation}</option> : <option value="" disabled>Select Designation</option>
                                }

                                {designations?.map((desig) => (
                                    <option key={desig.Desig} value={desig.DDesig}>
                                        {desig.DDesig}
                                    </option>
                                ))}
                            </select>
                            <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Designation")}>+</button>
                            <div className='flex items-end ml-2'>
                                <button className='flex items-center cursor-pointer mb-2' onClick={() => deleteHosRow(block)}>
                                    <img src={delIcon} alt="delIcon" width={32} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Fees */}
                    <input
                        type="text"
                        placeholder="Your Fees"
                        value={block.fees}
                        onChange={(e) =>
                            handleHospitalChange(blockIndex, "fees", e.target.value)
                        }
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-19"
                    />

                    {/* Timings */}
                    <h2 className="text-sm font-semibold cursor-pointer">Select Timings</h2>
                    <div className="divide-y rounded bg-white">
                        <div className="flex justify-between items-center py-2 px-4 border-b-gray-300">
                            <span className="font-semibold w-16 text-sm">Day</span>
                            <div className="flex items-center gap-20">
                                <h2 className="text-base font-semibold">From</h2>
                                <h2 className="text-base font-semibold">To</h2>
                            </div>
                            <div className="text-sm w-33 text-center">
                                <h2 className="text-base font-semibold">Time</h2>
                            </div>
                            <div>
                                <h2 className="text-base font-semibold">Status</h2>
                            </div>
                        </div>

                        {block.schedule.map((slot, dayIndex) => (
                            <div
                                key={dayIndex}
                                className="flex justify-between items-center py-2 px-4 border-b-gray-300 gap-3"
                            >
                                <span className="font-bold text-[#004D71] w-16 text-sm">
                                    {slot.day}
                                </span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="time"
                                        value={slot.start}
                                        onChange={(e) =>
                                            handleTimeChange(blockIndex, dayIndex, "start", e.target.value)
                                        }
                                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                    <span>-</span>
                                    <input
                                        type="time"
                                        value={slot.end}
                                        onChange={(e) =>
                                            handleTimeChange(blockIndex, dayIndex, "end", e.target.value)
                                        }
                                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="text-gray-700 text-sm w-33 text-right">
                                    {formatTime(slot.start)} - {formatTime(slot.end)}
                                </div>
                                <p>{slot.start && slot.end ? "Working" : "Off"}</p>
                            </div>
                        ))}
                    </div>


                </div>
            ))}
            <div className="max-w-md mx-auto flex items-center gap-2">
                {/* <button
                    onClick={() => saveHospitalSchedule(blockIndex)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                    Save Schedule
                </button> */}
                <button
                    onClick={saveHDToDB}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={deleteDoctorHD}
                >
                    delete
                </button>
            </div>

            {/* Add More Hospitals */}
            <button
                onClick={addMoreHospitals}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded max-w-sm mx-auto"
            >
                + Add More Hospital
            </button>
        </div>
    );
};

export default DoctorTiming;
