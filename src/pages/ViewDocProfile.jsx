import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useExperience from "../hooks/useExperience";
import useDoctor from "../context/DoctorContext";
import BackButton from "../components/BackButton";

export default function ViewDocProfile() {
  const { doctorData, fetchDoctorData } = useDoctor()

  const [experiences] = useExperience(doctorData?.doctorexp, [doctorData?.doctor])

  console.log("experiences from ViewDocProfile", experiences)

  const navigate = useNavigate()

  const { id } = useParams()

  console.log("id from params", id)

  let groupedHospitals = {};

  if (doctorData && Array.isArray(doctorData.doctorhd)) {
    groupedHospitals = doctorData.doctorhd.reduce((acc, item) => {
      if (!acc[item.hospital_name]) {
        acc[item.hospital_name] = [];
      }
      acc[item.hospital_name].push(item);
      return acc;
    }, {});
  }

  useEffect(() => {
    // axios.post(`/api/v1/doctors/get-doctor/${id}`)
    //   .then(res => {
    //     console.log("doctor", res.data.doctor)
    //     setDoctor(res.data.doctor)

    //     if (Object.keys(res.data.doctor).length === 0) {
    //       navigate("/profile")
    //     }
    //     setDoctorvd(res.data.doctorvd)
    //     setDoctorhd(res.data.doctorhd)
    //     setDoctorexp(res.data.doctorexp)
    //     setOtherDoctors(res.data.otherDoctors)

    //   })
    //   .catch(err => {
    //     console.log("Error:", err)
    //   })
    const abortController = new AbortController();
    fetchDoctorData(id, abortController);

    console.log("doctorData from ViewDocProfile", doctorData)

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: adds a smooth scrolling animation
    });
    // }

    return () => {
      abortController.abort();
    };
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton />
        {/* Doctor Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            // src={doctor?.picture}
            src={doctorData?.doctor?.picture}
            alt="Doctor"
            className="w-40 h-40 rounded-full object-cover border-4 border-green-500 shadow-md"
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">{doctorData?.doctor?.name}</h1>
            <p className="text-gray-600">
              {/* {doctor.Specialization_name} | MBBS, FCPS (Dermatology) */}
              {doctorData?.doctor?.Specialization_name} | {doctorData?.doctor?.qualifications}
            </p>
            <p className="text-gray-600">{(experiences[0]?.years) ? `${experiences[0].years} years` : `${experiences[0]?.months} months`} of experience</p>
            <p className="text-gray-500">
              {/* Lahore, Pakistan • 10 Years Experience */}
              {doctorData?.doctor?.city_name}, {doctorData?.doctor?.country_name}
            </p>
            <div className="flex gap-4 mt-3">
              {/* <button className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow">
                                Book Appointment
                            </button>
                            <button className="px-5 py-2 border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50">
                                Contact
                            </button> */}
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
            {doctorData?.doctor?.about}
          </p>
        </div>

        {/* Experience & Education */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Experience & Education
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>{(experiences[0]?.years) ? `${experiences[0].years} years` : `${experiences[0]?.months} months`} of experience in {doctorData?.doctor?.Specialization_name}</li>
            <li>Consultant {doctorData?.doctor?.Specialization_name} at {doctorData?.doctor?.city_name} Skin Hospital</li>
            {doctorData?.doctor?.qualifications?.split(";").map(item => <li>{item}</li>)}
            {/* <li> from King Edward Medical University</li>
                        <li>FCPS in Dermatology from CPSP Pakistan</li> */}
          </ul>
        </div>


        {/* Video Consultation */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Video Consultation
          </h2>
          <p className="text-gray-600 mb-2">Fee: PKR {doctorData?.doctorvd[0]?.fees}</p>
          <h2 className="text-base font-semibold text-gray-800 mb-2">Available Timings</h2>
          <div className="flex flex-col gap-2">
            {
              doctorData?.doctorvd.map(docvd => (
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
          <button className="mt-4 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow" onClick={() => {
            navigate("/book-appointment", { state: { videoTimings: doctorData?.doctorvd, mode: "video" } })
          }}>
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
                    <Link to={"/book-appointment"} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Book Slot
                    </Link>
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
            Other {doctorData?.doctor.Specialization_name}
          </h2>
          {/* ["Dr. Ali Raza", "Dr. Maria Ahmed", "Dr. Usman Tariq"] */}
          <div className="grid md:grid-cols-3 gap-6">
            {doctorData?.otherDoctors.map(
              (doc, i) => (

                <div
                  key={doc.dr}
                  className="p-4 border rounded-lg flex flex-col items-center bg-gray-50 hover:shadow-lg transition"
                >
                  <img
                    src={doc.picture}
                    alt={doc.name}
                    className="w-20 h-20 rounded-full mb-3"
                  />
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-gray-500 text-sm">Dermatologist</p>
                  <Link to={`/view-profile/${doc.dr}`} className="mt-3 px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                    View Profile
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


