// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// const ViewDocProfile = () => {
//     const [doctor, setDoctor] = useState({})

//     const location = useLocation()

//     useEffect(() => {

//         if (location.state) {
//             // const { name, specializationName, experience, rating, fees } = location.state
//             setDoctor(location.state)
//         } else {

//             const doctor = JSON.parse(localStorage.getItem("doctor"))
//             axios.post("/api/v1/doctors/get-doctor")
//                 .then(res => setDoctor(res.data.doctor))
//                 .catch(err => {
//                     console.log("Error:", err)
//                 })

//         }
//     }, [])

//     let mdiff
//     let ydiff

//     if (new Date(doctor?.FromDate) < new Date(doctor?.TillDate)) {
//         let fdate = new Date(doctor?.FromDate)
//         let tdate = new Date(doctor?.TillDate)

//         mdiff = tdate.getMonth() - fdate.getMonth()
//         ydiff = tdate.getFullYear() - fdate.getFullYear()


//     } else {
//         console.log("false")
//     }

//     console.log("from", new Date(doctor?.FromDate)) 
//     console.log("till", new Date(doctor?.TillDate)) 

//     return (
//         <div>
//             <div className='flex justify-between items-center w-5xl border rounded p-3 mx-auto mt-4' >
//                 <div className='flex items-center gap-3'>
//                     <div>
//                         <img
//                             src={"https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1756738618796"}
//                             alt="doc-img"
//                             className="w-30 h-30 rounded-full border-2 border-white object-cover"
//                         />
//                     </div>
//                     <div className='flex flex-col gap-1'>
//                         <h2 className='font-bold text-base'>{doctor.name}</h2>
//                         <h2 className='font-semibold text-sm'>{doctor.specializationName || doctor.Specialization_name}</h2>
//                         <h2 className='font-semibold text-sm'>{doctor.city_name}</h2>
//                         <h2 className='font-semibold text-sm'>{ydiff == 0 ? `${mdiff} months experience`: `${ydiff} years experience`}</h2>
//                         <h2 className='font-semibold text-sm'>{doctor.rating}</h2>
//                         <h2 className='font-semibold text-sm'>{doctor.fees}</h2>
//                     </div>
//                 </div>
//                 <div className='flex flex-col gap-3'>
//                     <button className='py-1 px-2 bg-[#004d70] text-white rounded'>Consult Online</button>
//                     <button className='py-1 px-2 bg-[#4ca685] text-white rounded'>Visit In clinic</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ViewDocProfile



















// export default function ViewDocProfile() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Doctor Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
//           <img
//             src="https://via.placeholder.com/150"
//             alt="Doctor"
//             className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-md"
//           />
//           <div className="flex-1 space-y-2">
//             <h1 className="text-2xl font-bold text-gray-800">
//               Dr. Sarah Khan
//             </h1>
//             <p className="text-gray-600">
//               Dermatologist | MBBS, FCPS (Dermatology)
//             </p>
//             <p className="text-gray-500">
//               Lahore, Pakistan • 10 Years Experience
//             </p>
//             <div className="flex gap-4 mt-3">
//               <button className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow">
//                 Book Appointment
//               </button>
//               <button className="px-5 py-2 border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50">
//                 Contact
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Rating & Reviews */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Reviews</h2>
//           <div className="flex items-center gap-2 mb-4">
//             <span className="text-3xl font-bold text-green-500">4.9</span>
//             <span className="text-yellow-400 text-xl">★★★★★</span>
//             <span className="text-gray-500">(120 reviews)</span>
//           </div>
//           <div className="space-y-4">
//             <div className="p-4 border rounded-lg bg-gray-50">
//               <p className="text-gray-700">
//                 “Dr. Sarah is very professional and caring. Highly recommend!”
//               </p>
//               <span className="text-sm text-gray-400">– Ayesha, Jan 2025</span>
//             </div>
//             <div className="p-4 border rounded-lg bg-gray-50">
//               <p className="text-gray-700">
//                 “Amazing experience. The treatment really helped my skin.”
//               </p>
//               <span className="text-sm text-gray-400">– Ahmed, Dec 2024</span>
//             </div>
//           </div>
//         </div>

//         {/* Appointment Section */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Clinics</h2>
//           <div className="space-y-4">
//             <div className="border p-4 rounded-lg">
//               <h3 className="font-semibold text-gray-800">Skin Care Clinic, Lahore</h3>
//               <p className="text-gray-500">Mon - Fri | 5 PM - 8 PM</p>
//               <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                 Book Slot
//               </button>
//             </div>
//             <div className="border p-4 rounded-lg">
//               <h3 className="font-semibold text-gray-800">Dermacenter, DHA</h3>
//               <p className="text-gray-500">Sat - Sun | 2 PM - 6 PM</p>
//               <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
//                 Book Slot
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Experience & Education */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience & Education</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>10+ years of experience in Dermatology</li>
//             <li>Consultant Dermatologist at Lahore Skin Hospital</li>
//             <li>MBBS from King Edward Medical University</li>
//             <li>FCPS in Dermatology from CPSP Pakistan</li>
//           </ul>
//         </div>

//         {/* About */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
//           <p className="text-gray-700 leading-relaxed">
//             Dr. Sarah Khan is a highly skilled dermatologist with over a decade of 
//             experience in treating various skin, hair, and nail conditions. She is 
//             passionate about patient care and is dedicated to providing advanced 
//             treatments tailored to each patient’s needs.
//           </p>
//         </div>

//         {/* Similar Doctors */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Other Dermatologists</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {["Dr. Ali Raza", "Dr. Maria Ahmed", "Dr. Usman Tariq"].map((doc, i) => (
//               <div key={i} className="p-4 border rounded-lg flex flex-col items-center bg-gray-50 hover:shadow-lg transition">
//                 <img
//                   src="https://via.placeholder.com/100"
//                   alt={doc}
//                   className="w-20 h-20 rounded-full mb-3"
//                 />
//                 <h3 className="font-semibold text-gray-800">{doc}</h3>
//                 <p className="text-gray-500 text-sm">Dermatologist</p>
//                 <button className="mt-3 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
//                   View Profile
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ViewDocProfile() {
    const [doctor, setDoctor] = useState({})
    const [doctorvd, setDoctorvd] = useState([])
    const [doctorhd, setDoctorhd] = useState([])
    const [doctorexp, setDoctorexp] = useState([])
    const [experience, setExperience] = useState("")
    const [otherDoctors, setOtherDoctors] = useState([])

    const location = useLocation()

    const groupedHospitals = doctorhd.reduce((acc, item) => {
        if (!acc[item.hospital_name]) {
            acc[item.hospital_name] = [];
        }
        acc[item.hospital_name].push(item);
        return acc;
    }, {});

    useEffect(() => {

        if (location.state) {
            // const { name, specializationName, experience, rating, fees } = location.state
            setDoctor(location.state)
        } else {

            // const doctor = JSON.parse(localStorage.getItem("doctor"))
            axios.post("/api/v1/doctors/get-doctor")
                .then(res => {
                    setDoctor(res.data.doctor)
                    setDoctorvd(res.data.doctorvd)
                    setDoctorhd(res.data.doctorhd)
                    setDoctorexp(res.data.doctorexp)
                    setOtherDoctors(res.data.otherDoctors)

                })
                .catch(err => {
                    console.log("Error:", err)
                })

        }
    }, [])


    useEffect(() => {
        calculateExperience()
    }, [doctorexp])


    const calculateExperience = () => {
        let experiences = doctorexp?.map(exp => {
            return {
                FromDate: exp.FromDate,
                TillDate: exp.TillDate,
            }
        })

        // let experiences = [
        //     {
        //         FromDate: "2025-06-17T19:00:00.000Z",
        //         TillDate: '2025-09-14T19:00:00.000Z'
        //     }
        // ]

        console.log("experiences", experiences)

        // const experiences = [
        //     { FromDate: '2025-06-30T19:00:00.000Z', TillDate: '2025-09-14T19:00:00.000Z' },
        //     { FromDate: '1998-12-26T19:00:00.000Z', TillDate: null }
        // ];

        const today = new Date();

        // Convert all dates to JS Date objects
        const parsed = experiences.map(exp => ({
            from: new Date(exp.FromDate),
            till: exp.TillDate ? new Date(exp.TillDate) : today
        }));

        // Find minimum FromDate
        const minFrom = new Date(Math.min(...parsed.map(exp => exp.from.getTime())));

        // Find maximum TillDate
        const maxTill = new Date(Math.max(...parsed.map(exp => exp.till.getTime())));

        // Calculate difference in years, months, days
        let diffMs = maxTill - minFrom;
        let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        let diffYears = Math.floor(diffDays / 365);
        let diffMonths = Math.floor((diffDays % 365) / 30);

        console.log(`Experience: ${diffYears} years, ${diffMonths} months`);

        if (diffYears) {
            setExperience(`${diffYears} years`)
        } else {
            setExperience(`${diffMonths} months`)
        }

    }

    console.log("After calculating exp doc is", doctor)
    console.log("image", doctor.picture)


    // if (new Date(startDate) < new Date(endDate)) {
    //     let fdate = new Date(startDate)
    //     let tdate = new Date(endDate)

    //     mdiff = tdate.getMonth() - fdate.getMonth()
    //     ydiff = tdate.getFullYear() - fdate.getFullYear()


    // } else {
    //     console.log("false")
    // }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Doctor Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                        src={doctor?.picture}
                        alt="Doctor"
                        className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-md"
                    />
                    <div className="flex-1 space-y-2">
                        <h1 className="text-2xl font-bold text-gray-800">{doctor?.name}</h1>
                        <p className="text-gray-600">
                            {/* {doctor.Specialization_name} | MBBS, FCPS (Dermatology) */}
                            {doctor?.Specialization_name} | {doctor?.qualifications}
                        </p>
                        <p className="text-gray-600">{experience} of experience</p>
                        <p className="text-gray-500">
                            {/* Lahore, Pakistan • 10 Years Experience */}
                            {doctor?.city_name}, {doctor?.country_name}
                        </p>
                        <div className="flex gap-4 mt-3">
                            <button className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow">
                                Book Appointment
                            </button>
                            <button className="px-5 py-2 border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50">
                                Contact
                            </button>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {/* Dr. Sarah Khan is a highly skilled dermatologist with over a decade
                        of experience in treating various skin, hair, and nail conditions.
                        She is passionate about patient care and is dedicated to providing
                        advanced treatments tailored to each patient’s needs. */}
                        {doctor?.about}
                    </p>
                </div>

                {/* Experience & Education */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Experience & Education
                    </h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>{experience} of experience in {doctor?.Specialization_name}</li>
                        <li>Consultant {doctor?.Specialization_name} at {doctor?.city_name} Skin Hospital</li>
                        {doctor?.qualifications?.split(";").map(item => <li>{item}</li>)}
                        {/* <li> from King Edward Medical University</li>
                        <li>FCPS in Dermatology from CPSP Pakistan</li> */}
                    </ul>
                </div>


                {/* Video Consultation */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Video Consultation
                    </h2>
                    <p className="text-gray-600 mb-2">Fee: PKR {doctorvd[0]?.fees}</p>
                    <h2 className="text-base font-semibold text-gray-800 mb-2">Available Timings</h2>
                    <div className="flex flex-col gap-2">
                        {
                            doctorvd.map(docvd => (
                                <div key={docvd.doctorvd} className="border-b border-gray-300 py-1">

                                    <div className="space-y-2 text-gray-700 flex justify-between w-sm ">
                                        <p className="text-[#004D71] font-semibold">{docvd.day}</p>
                                        <p>{docvd.timein} PM – {docvd.timeout} PM</p>
                                        {/* <p>Sat | 12:00 PM – 3:00 PM</p>
                                        <p>Sun | 10:00 AM – 1:00 PM</p> */}

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow">
                        Book Video Consultation
                    </button>
                </div>

                {/* Clinic Consultation */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        In-Person Clinics
                    </h2>
                    <div className="space-y-4">
                        {
                            Object.entries(groupedHospitals).map(([hospitalName, doctors]) => {
                                return <div className="border p-4 rounded-lg flex flex-col gap-3">
                                    <h3 className="font-semibold text-gray-800">
                                        {/* Skin Care Clinic, Lahore */}
                                        {hospitalName}
                                    </h3>
                                    <p className="text-gray-500">Fee: PKR {doctors[0].fees}</p>
                                    <h2 className="text-base font-semibold text-gray-800 mb-2">Available Timings</h2>
                                    {
                                        doctors.map(dochd => (
                                            <div className="border-b border-gray-300 py-1">
                                                <div key={dochd.doctorhd} className=" flex justify-between w-sm  ">

                                                    {/* <p className="text-gray-600">Mon - Fri | 5 PM - 8 PM</p> */}
                                                    <p className="text-[#004D71] font-semibold">{dochd.day}</p>
                                                    <p>{dochd.timein} PM - {dochd.timeout} PM</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div>
                                        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                            Book Slot
                                        </button>
                                    </div>
                                </div>

                            })
                        }

                        {/* <div className="border p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800">
                                Dermacenter, DHA
                            </h3>
                            <p className="text-gray-500">Fee: PKR 2,500</p>
                            <p className="text-gray-600">Sat - Sun | 2 PM - 6 PM</p>
                            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                Book Slot
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Rating & Reviews */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Patient Reviews
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl font-bold text-green-500">4.9</span>
                        <span className="text-yellow-400 text-xl">★★★★★</span>
                        <span className="text-gray-500">(120 reviews)</span>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="text-gray-700">
                                “Dr. Sarah is very professional and caring. Highly recommend!”
                            </p>
                            <span className="text-sm text-gray-400">– Ayesha, Jan 2025</span>
                        </div>
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="text-gray-700">
                                “Amazing experience. The treatment really helped my skin.”
                            </p>
                            <span className="text-sm text-gray-400">– Ahmed, Dec 2024</span>
                        </div>
                    </div>
                </div>

                {/* Similar Doctors */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Other Dermatologists
                    </h2>
                    {/* ["Dr. Ali Raza", "Dr. Maria Ahmed", "Dr. Usman Tariq"] */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {otherDoctors.map(
                            (doc, i) => (
                                <div
                                    key={i}
                                    className="p-4 border rounded-lg flex flex-col items-center bg-gray-50 hover:shadow-lg transition"
                                >
                                    <img
                                        src="https://via.placeholder.com/100"
                                        alt={doc.name}
                                        className="w-20 h-20 rounded-full mb-3"
                                    />
                                    <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                                    <p className="text-gray-500 text-sm">Dermatologist</p>
                                    <button className="mt-3 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                                        View Profile
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


