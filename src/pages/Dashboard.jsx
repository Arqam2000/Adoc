import React, { useEffect, useMemo, useRef, useState } from "react";
import { format, isToday, isAfter, isBefore, parseISO, set } from "date-fns";
import {
  Home,
  User,
  Calendar,
  Video,
  History,
  LogOut,
} from "lucide-react";
import useDoctor from "../context/DoctorContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useExperience from "../hooks/useExperience";
import { toast, ToastContainer } from "react-toastify";
import BackButton from "../components/BackButton";
import VideoConsultation from "./VideoConsultation";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [patientData, setPatientData] = useState({});
  const [patientsWaiting, setPatientsWaiting] = useState(null);

  const { doctorData, setDoctorData, fetchDoctorData } = useDoctor();
  const navigate = useNavigate();

  const [experiences] = useExperience(doctorData?.doctorexp, [doctorData?.doctor])

  const inputRefs = useRef([]);

  console.log("Doctor Data on Dashboard:", doctorData);

  // console.log("experiences from Dashboard", experiences)

  const patientId = JSON.parse(localStorage.getItem("patientId"));

  useEffect(() => {
    const doctorId = JSON.parse(localStorage.getItem("doctorId"))

    if (!patientId && !doctorId) {
      navigate("/login")
    }
    if (doctorId) {
      fetchDoctorData(doctorId);
    } else {
      axios.get(`/api/v1/patients/${patientId}`)
        .then(res => {
          console.log("Patient data:", res.data.patient);
          setPatientData(res.data.patient);
        })
        .catch(err => {
          console.error("Error fetching patient data:", err);
        })
    }

    const storedRemarks = JSON.parse(localStorage.getItem("remarks")) || [];
    setRemarks(storedRemarks);


  }, [])

  useEffect(() => {
    console.log(patientId)

    if (!patientId) {
      axios.get(`/api/v1/appointments/book/${doctorData?.doctor?.dr}`)
        .then(res => {
          console.log("Appointments data:", res.data.appointments);
          setAppointments(res.data.appointments);
        })
        .catch(err => {
          console.log("Error fetching appointments:", err);
        });
    } else {
      // axios.get(`/api/v1/patients/${patientId}`)
      // .then(res => {
      //   console.log("Patient data:", res.data.patient);
      //   setDoctorData({patient: res.data.patient});
      // })
      // .catch(err => {
      //   console.error("Error fetching patient data:", err);
      // })
      axios.post(`/api/v1/appointments/book/patient/${patientId}`, {

        date: new Date()
      })
        .then(res => {
          console.log("Appointments data:", res.data.appointments);
          setAppointments([...res.data.appointments]);
          setPatientsWaiting(res.data.patients_waiting)
        })
        .catch(err => {
          console.log("Error fetching appointments:", err);
        });
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Optional: adds a smooth scrolling animation
    });

  }, [doctorData])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const patientId = JSON.parse(localStorage.getItem("patientId"));
  //       console.log("patientId:", patientId);

  //       if (!patientId) {
  //         // fetch appointments of doctor only
  //         const res = await axios.get(`/api/v1/appointments/book/${doctorData?.doctor?.dr}`);
  //         console.log("Appointments data:", res.data.appointments);
  //         setAppointments(res.data.appointments);
  //       } else {
  //         // fetch patient details
  //         const patientRes = await axios.get(`/api/v1/patients/${patientId}`);
  //         console.log("Patient data:", patientRes.data.patient);

  //         setDoctorData(prev => ({
  //           ...prev,
  //           patient: patientRes.data.patient
  //         }));

  //         // fetch appointments for patient + by doctor
  //         const apptRes = await axios.post(`/api/v1/appointments/book/patient/${patientId}`, {
  //           date: new Date()
  //         });

  //         console.log("Appointments data:", apptRes.data.appointments);

  //         setAppointments([
  //           ...apptRes.data.appointments,
  //           ...apptRes.data.appointmentsByDoctor
  //         ]);
  //         setAppointmentsByDoctor(apptRes.data.appointmentsByDoctor);
  //       }

  //       // Scroll
  //       window.scrollTo({ top: 0, behavior: "smooth" });

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   if (doctorData?.doctor?.dr) {
  //     fetchData();
  //   }
  // }, [doctorData?.doctor?.dr]);


  console.log("appointments", appointments)

  // console.log("doctorExp from Dashboard", doctorData?.doctorexp)

  // Filter appointments into categories
  const {
    todaysAppointments,
    comingAppointments,
    historyAppointments,
    videoConsultations,
    upcomingVideoConsultations,
    historyVideo,
  } = useMemo(() => {
    const today = new Date();

    const todays = [];
    const coming = [];
    const history = [];
    const video = [];
    const upcomingVideo = [];
    const videoHistory = [];

    appointments.forEach((apt) => {
      const date = parseISO(apt.bdate);

      // Video consultation
      if (apt.vc !== "no") {
        if (isToday(date)) {
          video.push({
            bappoint: apt.bappoint,
            patient: `${apt.pname}`, // replace with actual patient name if available
            // time: format(date, "hh:mm a"),
            doctor: apt.name,
            dr_status: apt.dr_status || "open",
            time: format(date, "PPpp"),
            phone: apt.pmobile,
            fees: apt.fees,
            // status: apt.done === "yes" ? "Completed" : (apt.done === null ? "Pending" : "Missed"),
            status: apt.status === null ? "Pending" : apt.status,

          });
        } else if (isAfter(date, today)) {
          upcomingVideo.push({
            patient: `${apt.pname}`, // replace with actual patient name if available
            time: format(date, "PPpp"),
            fees: apt.fees,
          });
        } else {
          videoHistory.push({
            patient: `${apt.pname}`,
            doctor: apt.name,
            time: format(date, "PPpp"),
            fees: apt.fees,
            // status: apt.done === "yes" ? "Completed" : "Missed",
            status: apt.status,
            remarks: apt.drcoment || "",
          });
        }
      }

      // Normal appointments
      if (apt.vc === "no" && apt.hospital_code !== "no") {
        if (isToday(date)) {
          todays.push({
            hospital: `${apt.hospital_name}`, // replace with actual hospital name
            patient: `${apt.pname}`,
            time: format(date, "hh:mm a"),
            fees: apt.fees,
          });
        } else if (isAfter(date, today)) {
          coming.push({
            hospital: `${apt.hospital_name}`,
            patient: `${apt.pname}`,
            time: format(date, "PPpp"),
            fees: apt.fees,
            // status: apt.done === "yes" ? "Completed" : (apt.done === null ? "Pending" : "Missed"),
            status: apt.status,
          });
        } else if (isBefore(date, today)) {
          history.push({
            hospital: `${apt.hospital_name}`,
            patient: `${apt.pname}`,
            doctor: apt.name,
            time: format(date, "PPpp"),
            fees: apt.fees,
            visited: apt.status !== "pending" && apt.status !== "missed" ? "Yes" : "No",
            remarks: apt.drcoment || "",
          });
        }
      }
    });

    return {
      todaysAppointments: todays,
      comingAppointments: coming,
      historyAppointments: history,
      videoConsultations: video,
      upcomingVideoConsultations: upcomingVideo,
      historyVideo: videoHistory,
    };
  }, [appointments]);

  console.log("video consultations", videoConsultations)

  const logout = async () => {
    try {
      const resp = await axios.post("/api/v1/doctors/logout", {})

      if (resp.data.success) {
        localStorage.removeItem("doctor");
        localStorage.removeItem("doctorId");
        setDoctorData({});
        // setIsLoggedIn(0);
        toast.success(resp.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // toast.error("Logout failed. Please try again.");
      localStorage.removeItem("patientId");
      // setIsLoggedIn(0);
      setPatientData({});
      navigate("/login");
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <ToastContainer />
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Doctor Portal</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <Home size={18} /> Dashboard
          </a>
          <Link to={`/view-profile/${doctorData?.doctor?.dr}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <User size={18} /> Profile
          </Link>
          <Link to="/profile" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <User size={18} /> Edit Profile
          </Link>
          <a href="#appointments" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <Calendar size={18} /> Appointments
          </a>
          <Link to="/dashboard/video-consultation" state={{ historyVideo, videoConsultations, }} className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <Video size={18} /> Video Consultations
          </Link>
          <a href="#history" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <History size={18} /> History
          </a>
          <a href="#history" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <History size={18} /> Doctor Remarks
          </a>
          <a href="#reviews" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <History size={18} /> Reviews
          </a>
          <button className="flex items-center gap-3 text-red-600 hover:text-red-800 mt-auto cursor-pointer" onClick={logout}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Profile Card */}
        <BackButton />
        {
          Object.keys(doctorData).length > 0 ? (
            <section id="profile" className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile</h2>
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex gap-3 items-center">
                  <div>
                    <img
                      src={doctorData?.doctor?.picture}
                      alt="Doctor"
                      className="w-30 h-30 rounded-full object-cover border-4 border-green-500 shadow-md"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-lg">{doctorData?.doctor?.name}</p>

                    {/* <p className="font-medium text-gray-800 text-lg">{doctorData?.patient?.pemail}</p> */}
                    <p className="text-gray-500 text-sm">{doctorData?.doctor?.Specialization_name} | {doctorData?.doctor?.qualifications}</p>
                    <p className="text-gray-500 text-sm">{(experiences[0]?.years) ? `${experiences[0].years} years` : `${experiences[0]?.months} months`} of experience</p>
                    <p className="text-gray-500 text-sm">{doctorData?.doctor?.city_name}, {doctorData?.doctor?.country_name}</p>
                  </div>
                </div>
                {/* <div className="flex gap-3">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                View Profile
                            </button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                Edit Profile
                            </button>
                        </div> */}
              </div>
            </section>
          ) : (
            <section id="profile" className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Profile</h2>
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex gap-3 items-center">
                  {/* <div>
                    <img
                      src={doctorData?.doctor?.picture}
                      alt="Doctor"
                      className="w-30 h-30 rounded-full object-cover border-4 border-green-500 shadow-md"
                    />
                  </div> */}
                  <div>
                    <p className="font-medium text-gray-800 text-lg">Name: <span>{patientData?.pname}</span></p>
                    <p className="font-medium text-gray-800 text-lg">Phone: <span className="text-gray-800 text-base">{patientData?.pmobile}</span></p>
                  </div>
                </div>
              </div>
            </section>
          )
        }


        {/* Appointment Status */}
        <section id="appointments" className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Appointment Status</h2>

          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Today's Appointments</h3>
            <h3 className="text-lg font-semibold mb-4 ">In Clinic Appointments</h3>
            {todaysAppointments.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="pb-2">Hospital</th>
                    <th className="pb-2">Patient</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {todaysAppointments.map((apt, idx) => (
                    <tr key={idx} className="border-b text-sm">
                      <td className="py-2">{apt.hospital}</td>
                      <td className="py-2">{apt.patient}</td>
                      <td className="py-2">{apt.time}</td>
                      <td className="py-2">{apt.fees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No appointments today.</p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 ">Video Consultations</h3>
              {videoConsultations.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-600 border-b">
                      <th className="pb-2">Patient</th>
                      {Object.keys(patientData).length > 0 &&
                        <>
                          <th className="pb-2">Doctor</th>
                          <th className="pb-2">call</th>
                          <th className="pb-2">Patients in Queue</th>
                          <th className="pb-2">Doctor Status</th>
                        </>
                      }
                      <th className="pb-2">Time</th>
                      <th className="pb-2">Fees</th>
                      <th className="pb-2">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoConsultations.map((vc, idx) => (
                      <tr key={idx} className="border-b text-sm">
                        <td className="py-2">{vc.patient}</td>
                        {
                          Object.keys(patientData).length > 0 &&
                          <>
                          <td className="py-2">{vc.doctor}</td>
                          <td className="py-2"><button className="bg-blue-500 py-1 px-2 rounded text-white cursor-pointer">Call Doctor</button></td>
                          <td className="py-2">{patientsWaiting}</td>
                          <td className="py-2">{vc.dr_status}</td>
                          </>
                        }
                        <td className="py-2">{vc.time}</td>
                        <td className="py-2">{vc.fees}</td>
                        <td className="py-2">{vc.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No video consultations today.</p>
              )}
            </div>
          </div>

          {/* Video Consultations */}
          {/* <div id="video" className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Video Consultations</h3>
            {videoConsultations.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="pb-2">Patient</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">status</th>
                  </tr>
                </thead>
                <tbody>
                  {videoConsultations.map((vc, idx) => (
                    <tr key={idx} className="border-b text-sm">
                      <td className="py-2">{vc.patient}</td>
                      <td className="py-2">{vc.time}</td>
                      <td className="py-2">{vc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No video consultations today.</p>
            )}
          </div> */}

          {/* Coming Days */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Coming Days Appointments</h3>
            <h1 className="text-lg font-semibold mb-4">Video Consultations</h1>

            {upcomingVideoConsultations.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="pb-2">Patient</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingVideoConsultations.map((apt, idx) => (
                    <tr key={idx} className="border-b text-sm">
                      <td className="py-2">{apt.patient}</td>
                      <td className="py-2">{apt.time}</td>
                      <td className="py-2">{apt.fees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No upcoming appointments.</p>
            )}

            <h1 className="text-lg font-semibold mb-4 mt-6">Hospital Appointments</h1>

            {comingAppointments.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="pb-2">Hospital</th>
                    <th className="pb-2">Patient</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Fees</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {comingAppointments.map((apt, idx) => (
                    <tr key={idx} className="border-b text-sm">
                      <td className="py-2">{apt.hospital}</td>
                      <td className="py-2">{apt.patient}</td>
                      <td className="py-2">{apt.time}</td>
                      <td className="py-2">{apt.fees}</td>
                      <td className="py-2">{apt.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No upcoming appointments.</p>
            )}
          </div>
        </section>

        {/* History */}
        <section id="history" className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">History</h2>

          {/* Appointment History */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">In Clinic Appointments</h3>
            {historyAppointments.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="pb-2">Hospital</th>
                    <th className="pb-2">Patient</th>
                    {Object.keys(patientData).length > 0 && <th className="pb-2">Doctor</th>}
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Fees</th>
                    <th className="pb-2">Visited</th>
                    <th className="pb-2">Remarks </th>
                  </tr>
                </thead>
                <tbody>
                  {historyAppointments.map((apt, idx) => (

                    <tr key={idx} className="border-b text-sm">
                      {/* {console.log("historyAppointments", historyAppointments)} */}
                      <td className="py-2">{apt.hospital}</td>
                      <td className="py-2">{apt.patient}</td>
                      {Object.keys(patientData).length > 0 && <td className="py-2">{apt.doctor}</td>}
                      <td className="py-2">{apt.time}</td>
                      <td className="py-2">{apt.fees}</td>
                      <td className="py-2">{apt.visited}</td>
                      <td className="py-2">
                        <input type="text" id={idx} value={remarks[idx]?.remarks} disabled ref={(el) => (inputRefs.current[idx] = el)} onChange={(e) => {
                          const newRemarks = [...remarks];
                          newRemarks[idx] = { ...newRemarks[idx], remarks: e.target.value };
                          setRemarks(newRemarks);

                          localStorage.setItem("remarks", JSON.stringify(newRemarks));
                        }} />
                        <i className="fas fa-edit cursor-pointer" onClick={() => {
                          inputRefs.current[idx].disabled = !(inputRefs.current[idx].disabled);
                          inputRefs.current[idx].focus();
                          console.log("ref.current", inputRefs.current[idx]);
                        }}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No past appointments.</p>
            )}
          </div>

          {/* Video History */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Video Consultations</h3>
            {historyVideo.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="pb-2">Patient</th>
                    {Object.keys(patientData).length > 0 && <th className="pb-2">Doctor</th>}
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Fees</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {historyVideo.map((vc, idx) => (
                    <tr key={idx} className="border-b text-sm">
                      <td className="py-2">{vc.patient}</td>
                      {Object.keys(patientData).length > 0 && <td className="py-2">{vc.doctor}</td>}
                      <td className="py-2">{vc.time}</td>
                      <td className="py-2">{vc.fees}</td>
                      <td className="py-2">{vc.status}</td>
                      <td className="py-2">{vc.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No past video consultations.</p>
            )}
          </div>

          {/* <VideoConsultation historyVideo={historyVideo} /> */}
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Reviews</h2>

          <div className="bg-white rounded-xl shadow p-6">Reviews Section</div>
        </section>
      </main>
    </div>
  );
}