import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DoctorTiming = ({ hospitals, designations, setClickedFrom, setIsOpen }) => {
    const [hospitalBlocks, setHospitalBlocks] = useState([
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

    const handleOpenModal = (source) => {
        setClickedFrom(source);
        setIsOpen(true);
    };

    console.log("hospital blocks", hospitalBlocks)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("hospitals_schedules"))) {
            setHospitalBlocks(JSON.parse(localStorage.getItem("hospitals_schedules")))
            
        }
    }, [])

    //   const hospitals = [
    //     {
    //         hospital_code: 1,
    //         hospital_name: "Agha Khan Hospital"
    //     }
    //   ]

    //   const designations = [
    //     {
    //         Desig: 1,
    //         DDesig: "MBBS"
    //     }
    //   ]

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

    return (
        <div className="flex flex-col gap-4 mt-2">
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
                                onChange={(e) =>
                                    handleHospitalChange(blockIndex, "hospital", e.target.value)
                                }
                            >
                                {
                                block.hospital? <option value={block.hospital}>{block.hospital}</option>: <option value="" disabled>Select Hospital</option>
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
                                onChange={(e) =>
                                    handleHospitalChange(blockIndex, "designation", e.target.value)
                                }
                            >
                                {
                                block.designation? <option value={block.designation}>{block.designation}</option>: <option value="" disabled>Select Designation</option>
                                }
                                
                                {designations.map((desig) => (
                                    <option key={desig.Desig} value={desig.DDesig}>
                                        {desig.DDesig}
                                    </option>
                                ))}
                            </select>
                            <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Designation")}>+</button>
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

                    <button
                        onClick={() => saveHospitalSchedule(blockIndex)}
                        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    >
                        Save Schedule
                    </button>
                </div>
            ))}

            {/* Add More Hospitals */}
            <button
                onClick={addMoreHospitals}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
                + Add More Hospital
            </button>
        </div>
    );
};

export default DoctorTiming;
