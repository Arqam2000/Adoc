import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Subcomponents
import DoctorTiming from "../components/DocHospital";
import DocExperience from "../components/DocExperience";

export const Profile = () => {
    const [doctor, setDoctor] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({
        city: "",
        specialization: "",
        about: "",
        selectedImage: null,
    });

    const [cities, setCities] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [institutes, setInstitutes] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [rows, setRows] = useState([
        {
            id: 0, 
            institute: "", 
            degree: "" 
        }
    ]);
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
    const [schedule, setSchedule] = useState(
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
            day,
            start: "",
            end: "",
        }))
    );
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoFees, setVideoFees] = useState("")
    const [canDelete, setCanDelete] = useState(false)

    const [selectedRowId, setSelectedRowId] = useState(null);

    const fileInputRef = useRef(null);

    // Initial Load
    useEffect(() => {
        const savedDoctor = JSON.parse(localStorage.getItem("doctor")) || [];
        const savedPersonalInfo =
            JSON.parse(localStorage.getItem("personalInfo")) || {};
        const savedImage = localStorage.getItem("profileImage");

        setDoctor(savedDoctor);
        setPersonalInfo((prev) => ({
            ...prev,
            ...savedPersonalInfo,
            selectedImage: savedImage || prev.selectedImage,
        }));

        setRows(JSON.parse(localStorage.getItem("rows")) || [{ institute: "", degree: "" }]);
        setSchedule(JSON.parse(localStorage.getItem("video time")) || schedule);
        setVideoFees(localStorage.getItem("video fees"))
        setHospitalBlocks(
            JSON.parse(localStorage.getItem("hospitals_schedules")) || hospitalBlocks
        );

        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [citiesRes, specRes, degreeRes, instRes, desigRes, hosRes] = await Promise.all([
                axios.get("/api/v1/cities/get-cities"),
                axios.get("/api/v1/specializations/get-specializations"),
                axios.get("/api/v1/degrees/get-degrees"),
                axios.get("/api/v1/institutes/get-institutes"),
                axios.get("/api/v1/designations/get-designations"),
                axios.get("/api/v1/hospitals/get-hospitals"),
            ]);

            setCities(citiesRes.data.cities);
            setSpecializations(specRes.data.specializations);
            setQualifications(degreeRes.data.degrees);
            setInstitutes(instRes.data.institutes);
            setDesignations(desigRes.data.designations)
            setHospitals(hosRes.data.hospitals)
        } catch (error) {
            toast.error("Error fetching initial data");
        } finally {
            setLoading(false);
        }
    };

    // File upload
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPersonalInfo((prev) => ({ ...prev, selectedImage: base64String }));
                localStorage.setItem("profileImage", base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const setDelete = () => {
        console.log("setDelete Called")
        setCanDelete(true)
        submit()
    }

    // Save doctor info to backend
    const submit = async () => {
        console.log(canDelete)
        try {
            if (!canDelete) {
                const city = cities.find((c) => c.city_name === personalInfo.city);
                const spec = specializations.find(
                    (s) => s.Specialization_name === personalInfo.specialization
                );

                const resp = await axios.post("/api/v1/doctors/edit-doctor", {
                    dr: doctor.dr,
                    city_code: city?.city_code,
                    specialization_code: spec?.Specialization_code,
                    about: personalInfo.about,
                    image: personalInfo.selectedImage,
                });

                if (resp.data.success) toast.success("Profile updated successfully");
            } else {
                const resp = await axios.post("/api/v1/doctors/edit-doctor", {
                    dr: doctor.dr,
                    canDelete
                })

                if (resp.data.success) toast.success("Profile deleted successfully");
            }
        } catch (error) {
            toast.error("Error updating profile");
        } finally {
            setCanDelete(false)
        }
    };

    const deleteDocProfile = async () => {
        try {
            const resp = await axios.post("/api/v1/doctors/delete-doctor", {
                dr: doctor.dr
            })
            if (resp.data.success) toast.success("Profile deleted successfully");

        } catch (error) {
            toast.error("Cannot delete the info")
        }
    }


    const saveQDToDB = async () => {
        const newArr = rows.map(item => {
            const instituteObj = institutes.find(inst => inst.university_name === item.institute);
            const degreeObj = qualifications.find(deg => deg.degree_name === item.degree);

            return {
                institute_id: instituteObj ? instituteObj.university : null,
                degree_id: degreeObj ? degreeObj.degree_code : null
            };
        });

        try {
            const resp = await axios.post("/api/v1/doctors/edit-doctorqd", {
                dr: doctor.dr,
                qualifications: newArr
            })

            if (resp.data.success) toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error updating profile");
        }
    }

    const deleteQualifications = async () => {
        try {
            axios.post("/api/v1/doctors/delete-doctorqd", {
                dr: doctor.dr,
                qualifications
            })
        } catch (error) {

        }
    }

    const saveVDToDB = async () => {


        try {
            const resp = await axios.post("/api/v1/doctors/edit-doctorvd", {
                dr: doctor.dr,
                videoTimings: schedule,
                videoFees,
            })

            if (resp.data.success) toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error updating profile");
        }
    }
    const saveHDToDB = async () => {
        const newHosBlock = hospitalBlocks.map(hos => {
            const hosObj = hospitals.find(hosp => hosp.hospital_name == hos.hospital)

            const desigObj = designations.find(desig => desig.DDesig == hos.designation)

            return {
                hospital: hosObj ? hosObj.hospital_code : null,
                desig: desigObj ? desigObj.Desig : null,
                fees: hos.fees,
                schedule: hos.schedule
            }


        })

        try {
            const resp = await axios.post("/api/v1/doctors/edit-doctorhd", {
                dr: doctor.dr,
                hospitalTimings: newHosBlock,

            })

            if (resp.data.success) toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error updating profile");
        }
    }
    const saveExpToDB = async () => {
        const newExp = experience.map(exp => {
            const hosObj = hospitals.find(hosp => hosp.hospital_name == exp.hospital)

            const desigObj = designations.find(desig => desig.DDesig == exp.designation)

            return {
                hospital: hosObj ? hosObj.hospital_code : null,
                desig: desigObj ? desigObj.Desig : null,
                fromDate: exp.fromDate,
                tillDate: exp.tillDate,
                comments: exp.comments
            }
        })

        try {
            const resp = await axios.post("/api/v1/doctors/edit-doctorexp", {
                dr: doctor.dr,
                experience: newExp,

            })

            if (resp.data.success) toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Error updating profile");
        }
    }

    const saveQualifications = () => {
        localStorage.setItem("rows", JSON.stringify(rows))
        toast.success("Saved")
    }

    console.log("hos blocks from profile", hospitalBlocks)

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <ToastContainer />
            <div className="max-w-96 md:max-w-5xl  mx-auto bg-white p-6 rounded-2xl shadow-lg">
                {/* Doctor Header */}
                <div className="flex items-center gap-6 border-b pb-6 mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border">
                        <img
                            src={personalInfo?.selectedImage || "/placeholder.png"}
                            alt="Doctor"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        {/* {doctor?.map((doc) => ( */}
                        <div key={doctor.dr}>
                            <h1 className="text-2xl font-bold">{doctor.name}</h1>
                            <p className="text-sm text-gray-600">{doctor.email}</p>
                            <p className="text-sm text-gray-600">{doctor.phone}</p>
                        </div>
                        {/* ))} */}
                    </div>
                </div>

                {/* Personal Information */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
                    <div className="grid grid-cols-2 lg:gap-4 gap-2 mb-3">
                        {/* City */}
                        <select
                            className="border rounded-lg p-2"
                            value={personalInfo.city}
                            onChange={(e) =>
                                setPersonalInfo({ ...personalInfo, city: e.target.value })
                            }
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c.city_code} value={c.city_name}>
                                    {c.city_name}
                                </option>
                            ))}
                        </select>

                        {/* Specialization */}
                        <select
                            className="border rounded-lg p-2"
                            value={personalInfo.specialization}
                            onChange={(e) =>
                                setPersonalInfo({
                                    ...personalInfo,
                                    specialization: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Specialization</option>
                            {specializations.map((s) => (
                                <option key={s.Specialization_code} value={s.Specialization_name}>
                                    {s.Specialization_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* About */}
                    <textarea
                        className="w-full border rounded-lg p-2 mb-3"
                        rows="3"
                        placeholder="About yourself"
                        value={personalInfo.about}
                        onChange={(e) =>
                            setPersonalInfo({ ...personalInfo, about: e.target.value })
                        }
                    />

                    {/* Image Upload */}
                    <div className="flex items-center gap-3">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Upload Profile Image
                        </button>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                localStorage.setItem("personalInfo", JSON.stringify(personalInfo))
                                toast.success("Saved")
                            }}
                        >
                            Save
                        </button>
                        {/* Submit */}
                        {/* <div className="text-right mt-6"> */}
                        <button
                            onClick={submit}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                        >
                            Save to Database
                        </button>
                        {/* </div> */}
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={deleteDocProfile}
                        >
                            delete
                        </button>
                    </div>
                </section>

                {/* Qualification */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Qualifications</h2>

                    {rows.map((row, idx) => (
                        <div className="">
                            {/* <input type="radio" name="" id="" /> */}
                            <div key={idx} className="grid grid-cols-2 gap-4 mb-3">
                                <select
                                    name="institute"
                                    className="border rounded-lg p-2"
                                    value={row.institute}
                                    onChange={(e) => {
                                        const updated = [...rows];
                                        updated[idx].institute = e.target.value;
                                        setRows(updated);
                                    }}
                                >
                                    <option value="">Select Institute</option>
                                    {institutes.map((i) => (
                                        <option key={i.university} value={i.university_name}>
                                            {i.university_name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="degree"
                                    className="border rounded-lg p-2"
                                    value={row.degree}
                                    onChange={(e) => {
                                        const updated = [...rows];
                                        updated[idx].degree = e.target.value;
                                        setRows(updated);
                                    }}
                                >
                                    <option value="">Select Degree</option>
                                    {qualifications.map((q) => (
                                        <option key={q.degree_code} value={q.degree_name}>
                                            {q.degree_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setRows([...rows, { id: id++,institute: "", degree: "" }])}
                        >
                            Add More
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={saveQualifications}
                        >
                            save
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={saveQDToDB}
                        >
                            save to database
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                localStorage.setItem("rows", JSON.stringify([{ institute: "", degree: "" }]))
                                toast.success("Deleted")
                            }}
                        >
                            delete
                        </button>
                    </div>
                </section>

                {/* Practice Timings */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Practice Timings</h2>
                    <div className="flex flex-col gap-2">
                        <h1 className='text-base font-semibold underline cursor-pointer'>Video Consultation</h1>
                        <p className='text-sm'>Online</p>
                        <input
                            type="text"
                            placeholder='Your Fees'
                            onChange={(e) => setVideoFees(e.target.value)}
                            value={videoFees}
                            className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-19"
                        />
                        <h2 className='text-sm font-semibold cursor-pointer'>Select Timings</h2>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 shadow mt-2">
                        {schedule.map((slot, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between mb-2 text-sm"
                            >
                                <span className="w-16 font-semibold">{slot.day}</span>
                                <input
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => {
                                        const updated = [...schedule];
                                        updated[index].start = e.target.value;
                                        setSchedule(updated);
                                    }}
                                    className="border rounded p-1"
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => {
                                        const updated = [...schedule];
                                        updated[index].end = e.target.value;
                                        setSchedule(updated);
                                    }}
                                    className="border rounded p-1"
                                />
                                <span>
                                    {slot.start && slot.end ? "Working" : "Off"}
                                </span>
                            </div>
                        ))}

                    </div>
                    <div className="max-w-md mx-auto flex justify-center items-center gap-2 mt-4">
                        <button
                            onClick={() => {
                                localStorage.setItem("video time", JSON.stringify(schedule))
                                localStorage.setItem("video fees", videoFees)
                                toast.success("Saved")
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        >
                            Save Schedule
                        </button>
                        <button
                            onClick={saveVDToDB}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        >
                            Save to Database
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                localStorage.setItem("video time", "")
                                localStorage.setItem("video fees", "")
                                toast.success("Deleted")
                            }}
                        >
                            delete
                        </button>
                    </div>
                </section>

                {/* Hospital Timings */}
                <DoctorTiming
                    hospitals={hospitals}
                    designations={designations}
                    hospitalBlocks={hospitalBlocks}
                    setHospitalBlocks={setHospitalBlocks}
                    saveHDToDB={saveHDToDB}
                />

                {/* Experience */}
                <DocExperience
                    hospitals={hospitals}
                    designations={designations}
                    handleRows2fromDocExperience={(rows2) => setExperience(rows2)}
                    saveExpToDB={saveExpToDB}
                />


            </div>
        </div>
    );
};
