import { useLocation } from "react-router-dom";
import 'react-phone-number-input/style.css'
import BookingForm from "./BookingForm";

export default function InclinicAppointment() {
    const location = useLocation()

    let { availability, mode, videoTimings } = location.state

    console.log("availability from appointment", availability)
    console.log("video availability from appointment", videoTimings)

    console.log("mode", mode)

    return (
        // <div className="max-w-4xl mx-auto p-6">
        //     <ToastContainer />
        //     {/* Hospital Selection */}
        //     <div className="bg-white border rounded-lg shadow mb-6 p-6">
        //         <h2 className="text-lg font-semibold mb-4">Select Hospital/Clinic</h2>
        //         <div className="space-y-4">
        //             {availability.map((h, i) => {
        //                 const match = hospitalMaps.find((m) => m.name === h.hospital_name);
        //                 return <div
        //                     key={i}
        //                     className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 ${selectedHospital === h.hospital_name ? "border-green-500" : "border-gray-300"
        //                         }`}
        //                     onClick={() => setSelectedHospital(h.hospital_name)}
        //                 >
        //                     <div className="flex justify-between items-center">
        //                         <div>
        //                             <h3 className="font-semibold">{h.hospital_name}</h3>
        //                             <p className="text-sm text-gray-600">Rs. {h.fees}</p>
        //                             <p className="text-sm text-gray-600">Available today {h.timein}AM - {h.timeout}PM</p>
        //                             <p className="text-sm text-gray-500">{h.address}</p>
        //                         </div>
        //                     </div>
        //                     {selectedHospital === h.hospital_name && (
        //                         <div className="mt-4 w-50 h-40">
        //                             {/* <iframe
        //                                 src={h.map}
        //                                 className="w-full h-full rounded-lg border"
        //                                 allowFullScreen=""
        //                                 loading="lazy"
        //                             ></iframe> */}

        //                             {match ? match.iframe : <p>No map available</p>}

        //                         </div>
        //                     )}
        //                 </div>
        //             })}
        //         </div>
        //     </div>

        //     {/* Date & Time */}
        //     <form action={formAction} className="bg-white border rounded-lg shadow mb-6 p-6 space-y-4">
        //         <h2 className="text-lg font-semibold">Select Date & Time</h2>
        //         <div className="grid grid-cols-2 gap-4">
        //             <select name="day" className="p-2 border rounded">
        //                 {/* <option>Wed - 24 Sep</option> */}
        //                 {days.map((d) => (
        //                     <option key={d.format("YYYY-MM-DD")} value={d.format("YYYY-MM-DD")}>
        //                         {d.format("ddd - DD MMM")}
        //                     </option>
        //                 ))}
        //             </select>
        //             <select name="time" className="p-2 border rounded">
        //                 {/* <option>03:15 PM</option> */}
        //                 {times.map((t) => (
        //                     <option key={t.value} value={t.value}>
        //                         {t.label}
        //                     </option>
        //                 ))}
        //             </select>
        //         </div>
        //         <div className="grid grid-cols-2 gap-4">
        //             <input type="hidden" name="dr" value={availability?.[0]?.dr} />
        //             <input type="hidden" name="fees" value={availability?.[0]?.fees} />
        //             <input type="text" placeholder="Phone Number" name="phone" className="p-2 border rounded" value={phone}
        //                 onChange={(e) => setPhone(e.target.value)} />
        //             {/* <PhoneInput
        //                 className="border rounded pl-2"
        //                 placeholder="Enter phone number"
        //                 international
        //                 countryCallingCodeEditable={false}
        //                 defaultCountry="PK"
        //                 value={phone}
        //                 onChange={(e) => setPhone(e?.target?.value)}
        //                 numberInputProps={{
        //                     name: "phone",
        //                     id: "phone",
        //                     className: "p-2 outline-none"
        //                 }} /> */}

        //             <input type="text" placeholder="Patient Name" name="patientName" className="p-2 border rounded" value={patientName}
        //                 onChange={(e) => setPatientName(e.target.value)} />
        //             {lookingUp && (
        //                 <p className="text-sm text-gray-500">Looking up patient...</p>
        //             )}
        //         </div>
        //         {/* <div className="flex items-center space-x-2">
        //             <input type="checkbox" />
        //             <p className="text-sm">Are you booking from outside Rawalpindi?</p>
        //         </div> */}
        //         <button type="submit" className={isPending ? "w-full  text-white py-2 rounded bg-blue-400" : "w-full  text-white py-2 rounded bg-blue-600"} disabled={isPending}>{isPending ? "Loading..." : "Book Appointment"}</button>
        //     </form>

        //     {/* Reviews */}
        //     <div className="bg-white border rounded-lg shadow p-6 space-y-4">
        //         <h2 className="text-lg font-semibold">1,107 Reviews</h2>
        //         <p className="text-xl font-bold">5/5 Average rating based on 1,107 reviews.</p>
        //         <div className="grid grid-cols-2 gap-4 text-sm">
        //             <p>Wait Time: <b>11 mins</b></p>
        //             <p>Avg. Time to Patient: <b>11 mins</b></p>
        //         </div>
        //         <div className="space-y-2">
        //             <div className="flex justify-between"><span>Patient Satisfaction</span><span>4.85/5</span></div>
        //             <div className="flex justify-between"><span>Diagnosis</span><span>4.85/5</span></div>
        //             <div className="flex justify-between"><span>Staff Behaviour</span><span>4.95/5</span></div>
        //             <div className="flex justify-between"><span>Clinic Environment</span><span>5/5</span></div>
        //         </div>
        //         <div className="border-t pt-4">
        //             <p className="font-semibold">I am satisfied with the doctor.</p>
        //             <p className="text-sm text-gray-600">Very intelligent - Nelson Medical Complex</p>
        //         </div>
        //         <button className="w-full border py-2 rounded">View All Reviews</button>
        //     </div>
        // </div>



        <>
            {mode === "clinic" ? (
                <BookingForm
                    mode="clinic"
                    availability={availability}
                    showMaps={true}
                    reviews={{ total: 1107, average: 5 }}
                />
            ) : (
                <BookingForm
                    mode="video"
                    availability={videoTimings}
                />
            )}
        </>
    );
}
