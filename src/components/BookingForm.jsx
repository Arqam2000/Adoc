import axios from "axios";
import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-phone-number-input/style.css';
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { ConfirmBox } from "./ConfirmBox";
import { apiBaseUrl } from "../constants/constants";

export default function BookingForm({
  mode = "clinic", // "clinic" or "video"
  availability = [],
  showMaps = false,
  reviews,
  onBook
}) {
  const [selectedOption, setSelectedOption] = useState(availability?.[0]?.hospital_name || "");
  const [phone, setPhone] = useState("");
  const [patientName, setPatientName] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [patient, setPatient] = useState({});
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const navigate = useNavigate()

  const formRef = useRef(null);

  const patientId = JSON.parse(localStorage.getItem("patientId"));

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/v1/patients/${patientId}`)
      .then(res => {
        setPatient(res.data.patient)
        setPatientName(res.data.patient.pname)
        setPhone(res.data.patient.pmobile)
      }).catch(err => {
        toast.error("Cannot fetch patient")
      })
  }, [])


  // 🔹 Auto-fetch patient info by phone
  useEffect(() => {
    if (!phone || phone.length < 7) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLookingUp(true);
        const res = await axios.post(`${apiBaseUrl}/api/v1/appointments/find-patient`, {
          signal: controller.signal,
          data: phone
        });

        if (res.data?.patient) {
          setPatientName(res.data.patient.pname);
          toast.success("Patient found & autofilled!");
        } else {
          setPatientName("");
        }
      } catch (err) {
        if (!axios.isCancel(err)) toast.error("Failed to fetch patient info");
      } finally {
        setLookingUp(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [phone]);

  // 🔹 Date & Time slots
  // const days = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day"));
  // const times = [];
  // for (let hour = 9; hour <= 17; hour++) {
  //   ["00", "30"].forEach((min) => {
  //     const value = `${hour.toString().padStart(2, "0")}:${min}`;
  //     const label = dayjs(`2025-01-01 ${value}`).format("hh:mm A");
  //     times.push({ value, label });
  //   });
  // }
  console.log("availability from booking form", JSON.stringify(availability));
  console.log("availability from booking form", availability);

  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    try {
      const payload = Object.fromEntries(formData.entries());
      payload.dr = availability?.[0]?.dr; // Assuming all availability entries are for the same doctor
      payload.phone = phone;
      payload.patientName = patientName;
      payload.day = selectedDate;
      payload.time = selectedTime;

      if (mode === "clinic") {
        const selectedHospital = availability.find(h => h.hospital_name === selectedOption);

        console.log("selectedHospital", selectedHospital)

        if (!selectedHospital) throw new Error("Please select a hospital/clinic");

        payload.hospital_name = selectedHospital.hospital_name;
        payload.fees = selectedHospital.fees;
        payload.vc = "no"; // Indicate in-person consultation

      } else if (mode === "video") {
        payload.hospital_code = "no";
        payload.fees = availability?.[0]?.fees || 0;
        payload.vc = "yes"; // Indicate video consultation
      }

      const res = await axios.post(`${apiBaseUrl}/api/v1/appointments/book`, { ...payload, actionType });

      toast.success("Appointment booked successfully!");
      onBook?.(res.data);

      return { ...prevState, ...payload, success: true, error: null };
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Booking failed. Please try again.";
      toast.error(message);
      return { ...prevState, error: message, success: false };
    }
  }, { success: false });


  let hospitalMaps = [];

  if (mode == "clinic") {
    hospitalMaps = [
      {
        name: "Memon Hospital",
        iframe: (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57881.67736127678!2d67.08807061973663!3d24.945528392984098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3386342271637%3A0x14569da3ac00a17b!2sMemon%20Medical%20Institute%20Hospital!5e0!3m2!1sen!2s!4v1758776499265!5m2!1sen!2s"
            width="300"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-1/2 h-full"
          />
        ),
      },
      {
        name: "Agha Khan Hospital",
        iframe: (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57906.80280693643!2d67.00261762167972!3d24.892005700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33edc8e0a1b45%3A0x95854329956118e7!2sThe%20Aga%20Khan%20University%20Hospital%20(AKUH)!5e0!3m2!1sen!2s!4v1758776714095!5m2!1sen!2s"
            width="300"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-1/2 h-full"
          />
        ),
      },
      {
        name: "Darul Sehat Hospital",
        iframe: (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14474.082099471192!2d67.10889188200375!3d24.91433156455823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb338e30b3fd8ed%3A0x85b96905bfc7a882!2sDarul%20Sehat%20Hospital!5e0!3m2!1sen!2s!4v1758776778239!5m2!1sen!2s"
            width="300"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-1/2 h-full"
          />
        ),
      },
      {
        name: "Dow Hospital",
        iframe: (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57896.331220212465!2d67.07799147050751!3d24.91432555138066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3390007819513%3A0x1e37dadc7fc9deac!2sDow%20University%20Hospital!5e0!3m2!1sen!2s!4v1758781244810!5m2!1sen!2s"
            width="300"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-1/2 h-full"
          />
        ),
      },
    ];
  }

  const uniqueDays = [...new Set(availability.map((a) => a.day))];

  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const allowedDays = availability.map((a) => dayMap[a.day]);

  // get current hospital data
  const hospital = availability.find((h) => h.hospital_name === selectedOption);

  // filter only available doctor slots
  // const availableSlots = hospital ? hospital.doctors.filter((d) => d.isAvailable) : [];
  const availableSlots = hospital?.doctors || [];

  console.log("availableSlots", availableSlots);

  const allowedHosDays = availableSlots?.map((a) => dayMap[a.day]);

  console.log("allowedHosDays", allowedHosDays);

  const handleDateChange = (e) => {
    setAlreadyBooked(false)
    const dateValue = e.target.value;
    console.log("selected date", dateValue)
    const dateObj = new Date(dateValue);
    const weekday = dateObj.getDay();

    console.log("selected date", dateValue, "which is weekday", weekday);

    if (!allowedDays.includes(weekday) && !allowedHosDays.includes(weekday)) {
      alert("Doctor not available on this day. Please choose another date.");
      e.target.value = "";
      setSelectedDate("");
      return;
    }

    setSelectedDate(dateValue);
    setSelectedTime("");
  };

  // find slot for selected date
  const slotForDay =
    selectedDate &&
    availability.find(
      (a) => dayMap[a.day] === new Date(selectedDate).getDay()
    );

  console.log("slotForDay", slotForDay)

  const slotForHosDay =
    selectedDate &&
    availableSlots.find((d) => dayMap[d.day] === new Date(selectedDate).getDay());

  console.log("slotForHosDay", slotForHosDay)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(selectedTime);

  // Update the debounced term after a delay
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(selectedTime);
    }, 500); // 500ms debounce delay

    // Cleanup function to clear the timeout if the search term changes
    return () => {
      clearTimeout(handler);
    };
  }, [selectedTime]);

  // Fetch data only when the debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchResults = async () => {
        try {
          const response = await axios.post(`${apiBaseUrl}/api/v1/appointments/search?query=${selectedDate}:${debouncedSearchTerm}`, {
            dr: availability[0].dr
          });

          if (response.status === 200) {

            setAlreadyBooked(true);
          } else if (response.status === 202) {
            setBookedAppointments(response.data.appointments)
          }
        } catch (error) {
          console.log("Something went wrong while searching appointments for date")
        }
      }
      fetchResults();
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <ToastContainer />

      <BackButton />

      {/* 🔹 Selection Section */}
      {mode === "clinic" && (
        <div className="bg-white border rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold mb-4">Select Hospital/Clinic</h2>
          <div className="space-y-4">
            {availability.length > 0 ? availability.map((h, i) => {
              const match = hospitalMaps.find((m) => m.name === h.hospital_name) || null;
              return <div
                key={i}
                className={`p-4 border rounded-lg cursor-pointer flex justify-between items-center ${selectedOption === h.hospital_name ? "border-green-500" : "border-gray-300"
                  }`}
                onClick={() => setSelectedOption(h.hospital_name)}
              >
                <div className="space-y-1">
                  <h3 className="font-semibold">{h.hospital_name}</h3>
                  <p className="text-sm text-gray-600">Rs. {h.fees}</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <h2 className="text-l font-semibold">Available days</h2>
                    <div>
                      {
                        h.doctors.map((doc, idx) => {
                          return <div key={idx} className="mb-1">
                            <div className="flex justify-between gap-5">
                              <p>{doc.day}</p>
                              <p>{doc.timein}AM - {doc.timeout}PM</p>
                            </div>
                          </div>
                        })
                      }
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{h.address}</p>
                </div>
                {showMaps && selectedOption === h.hospital_name && match?.iframe && (
                  match?.iframe
                )}
              </div>
            }) : <p>No Available hospitals</p>}
          </div>
        </div>
      )}

      {mode === "video" && (
        <div className="bg-white border rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold mb-4">Book Video Consultation</h2>
          {
            availability.length > 0 ? <div className="text-sm text-gray-600 space-y-1">
              <h2 className="text-l font-semibold">Available days</h2>
              <div className="w-1/2">
                {
                  availability.map((avail, idx) => {
                    return <div key={idx} className="mb-1">
                      <div className="flex justify-between gap-5">
                        <p>{avail.day}</p>
                        <div>
                          <p>{avail.timein}AM - {avail.timeout}PM</p>

                        </div>
                      </div>
                    </div>
                  })
                }
              </div>

            </div> : <p className="text-sm text-gray-500">No video slots available today</p>
          }
        </div>
      )}

      {/* 🔹 Date & Time */}
      <form ref={formRef} action={formAction} className="bg-white border rounded-lg shadow mb-6 p-6 space-y-4">
        <h2 className="text-lg font-semibold">Select Date & Time for appointment</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input type="text" placeholder="Phone Number" className="p-2 border rounded"
              value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input type="text" placeholder="Patient Name" name="patientName" className="p-2 border rounded"
              value={patientName} onChange={(e) => setPatientName(e.target.value)} required />

          </div>
          {lookingUp && <p className="text-sm text-gray-500">Looking up patient...</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="flex flex-col gap-5">
            <label className="block font-medium mb-1">Select Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]} // disable past dates
              value={selectedDate || ""}
              onChange={handleDateChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {selectedDate && (slotForDay || slotForHosDay) ? (
            <>
              <div>
                <label className="block font-medium mb-1">
                  Select Time ({slotForDay?.day || slotForHosDay?.day})
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Available: {slotForDay?.timein || slotForHosDay?.timein} – {slotForDay?.timeout || slotForHosDay?.timeout} <br />
                  Fees: Rs. {slotForDay?.fees || slotForHosDay?.fees}
                </p>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => {
                    // setAlreadyBooked(false);
                    // console.log("selected time", e.target.value);
                    // setSelectedTime(e.target.value)


                    const now = new Date();
                    // const currentTime = new Date();
                    if (selectedDate === now.toISOString().split("T")[0]) {
                      // current time in "HH:MM"
                      const currentTime = now.toTimeString().slice(0, 5);

                      console.log("currentTime", currentTime)

                      const picked = e.target.value;
                      // const picked = new Date(`${selectedDate}T${e.target.value}:00`);

                      console.log("picked", picked)

                      // if picked time is older than now, block it
                      // if (Number(picked) < Number(currentTime)) {
                      //   // Option 1: Do nothing
                      //   // Option 2: Reset
                      //   console.log("picked is less than current time")
                      //   toast.error("Time not available")
                      //   setSelectedTime(currentTime);
                      //   return;
                      // }
                      if (picked < currentTime) {
                        // Option 1: Do nothing
                        // Option 2: Reset
                        console.log("picked is less than current time")
                        toast.error("Time not available")
                        setSelectedTime(currentTime);
                        return;
                      }
                      console.log("picked is greater than current time")
                      setAlreadyBooked(false);
                      setSelectedTime(picked);
                    } else {
                      const picked = e.target.value;
                      setAlreadyBooked(false);
                      setSelectedTime(picked);
                    }
                  }}
                  min={slotForDay?.timein || slotForHosDay?.timein}
                  max={slotForDay?.timeout || slotForHosDay?.timeout}
                  // step="900"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block font-medium mb-1">
                  Select Time ({slotForDay?.day || slotForHosDay?.day})
                </label>
                {/* <h2 className="block font-medium mb-1">Please select date first</h2> */}
                <p className="text-sm text-gray-600 mt-1">
                  Available: {slotForDay?.timein || slotForHosDay?.timein} – {slotForDay?.timeout || slotForHosDay?.timeout} <br />
                  Fees: Rs. {slotForDay?.fees || slotForHosDay?.fees}
                </p>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  min={slotForDay?.timein || slotForHosDay?.timein}
                  max={slotForDay?.timeout || slotForHosDay?.timeout}
                  step="900"
                  className="w-full p-2 border rounded"
                  // disabled
                  onClick={() => alert("Please select date first")}
                  required
                />
              </div>
            </>
          )}
        </div>

        {/* Booked Slots */}
        <div className="w-full">
          <h3 className="text-lg font-semibold">Booked Slots</h3>
          <div className="flex gap-6 w-full flex-wrap">
            {
              bookedAppointments.map(appt => (
                <div className="w-fit">
                  <p className={patientId === appt.patient && `font-semibold text-red-500`} on>{new Date(appt.bdate).toLocaleString().split(", ")[1]}</p>
                </div>
              ))}

          </div>
        </div>

        {alreadyBooked && <p className="text-sm text-center text-red-500 mt-1">This slot is already booked. Please choose another time.</p>}

        <button
          type="button"
          disabled={isPending}
          className={`w-full text-white py-2 rounded ${isPending ? "bg-blue-400" : "bg-blue-600"}`}
          onClick={() => {
            if (patientName && phone && selectedDate && selectedTime)
              setIsOpen(true)
          }}
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>
      {
        isOpen &&
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"

          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl relative ">
              <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setIsOpen(false)}>✕</button>
              <p className="mt-3">Do you want to modify or add the appointment?</p>
              <div className="flex gap-3 mt-3">
                <button className="py-1 px-3 rounded text-white cursor-pointer bg-blue-500" onClick={() => {
                  setActionType("modify")
                  formRef.current?.requestSubmit()
                  setIsOpen(false)
                }}>Modify</button>
                <button className="py-1 px-3 rounded text-white cursor-pointer bg-blue-500" onClick={() => {
                  setActionType("add")
                  formRef.current?.requestSubmit()
                  setIsOpen(false)
                }}>Add</button>
                <button className="py-1 px-3 rounded text-white cursor-pointer bg-blue-500" onClick={() => setIsOpen(false)}>Cancel</button>
              </div>

            </div>
          </div>
        </>
      }
      {
        bookedAppointments.length > 0 && <p className="text-lg font-semibold text-red-500">Your same day appointment in red</p>
      }
    </div>
  );
}







{/* 🔹 Reviews Section (optional) */ }
{/* {reviews && (
        <div className="bg-white border rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">{reviews.total} Reviews</h2>
          <p className="text-xl font-bold">
            {reviews.average}/5 Average rating based on {reviews.total} reviews.
          </p>
          <button className="w-full border py-2 rounded">View All Reviews</button>
        </div>
      )} */}
