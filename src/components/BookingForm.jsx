import axios from "axios";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-phone-number-input/style.css';
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

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

  const navigate = useNavigate()


  // 🔹 Auto-fetch patient info by phone
  useEffect(() => {
    if (!phone || phone.length < 7) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLookingUp(true);
        const res = await axios.post(`/api/v1/appointments/find-patient`, {
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

      const res = await axios.post("/api/v1/appointments/book", payload);

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
            className="w-full h-full"
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
            className="w-full h-full"
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
            className="w-full h-full"
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
            className="w-full h-full"
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

  const slotForHosDay =
    selectedDate &&
    availableSlots.find((d) => dayMap[d.day] === new Date(selectedDate).getDay());


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
        const response = await axios.get(`/api/v1/appointments/search?query=${selectedDate}:${debouncedSearchTerm}`);
        
        if (response.status === 200) {
          setAlreadyBooked(true);
        }
      };
      fetchResults();
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-6">
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
                  {/* <p className="text-sm text-gray-600">
                                        Available today {h.timein}AM - {h.timeout}PM
                                    </p> */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <h2 className="text-l font-semibold">Available days</h2>
                    <div>
                      {
                        h.doctors.map((doc, idx) => {
                          return <div key={idx} className="mb-1">
                            <p className="flex gap-5">
                              {doc.day}
                              <p>{doc.timein}AM - {doc.timeout}PM</p>
                            </p>
                          </div>
                        })
                      }
                      {/* <p className="flex gap-5">
                                                {h.day}
                                                <p>{h.timein}AM - {h.timeout}PM</p>
                                            </p> */}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{h.address}</p>
                </div>
                {showMaps && selectedOption === h.hospital_name && match?.iframe && (
                  // <iframe
                  //     src={h.map}
                  //     className="w-40 h-28 rounded border"
                  //     allowFullScreen
                  //     loading="lazy"
                  // />
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
          {/* {
                        availability.length > 0 ? <p className="text-sm text-gray-500">Available today {availability?.[0]?.timein}AM - {availability?.[0]?.timeout}PM</p> : <p className="text-sm text-gray-500">No video slots available today</p>
              } */
          }

          {
            availability.length > 0 ? <div className="text-sm text-gray-600 space-y-1">
              <h2 className="text-l font-semibold">Available days</h2>
              <div>
                {
                  availability.map((avail, idx) => {
                    return <div key={idx} className="mb-1">
                      <p className="flex gap-5">
                        {avail.day}
                        <p>{avail.timein}AM - {avail.timeout}PM</p>
                      </p>
                    </div>
                  })
                }
                {/* <p className="flex gap-5">
                                                {h.day}
                                                <p>{h.timein}AM - {h.timeout}PM</p>
                                            </p> */}
              </div>
            </div> : <p className="text-sm text-gray-500">No video slots available today</p>
          }
          {/* <p className="text-sm text-gray-500">
                        Select a date and time for your online consultation with{" "}
                        {availability?.[0]?.doctorName || "Doctor"}.
                    </p> */}
        </div>
      )}

      {/* 🔹 Date & Time */}
      <form action={formAction} className="bg-white border rounded-lg shadow mb-6 p-6 space-y-4">
        <h2 className="text-lg font-semibold">Select Date & Time for appointment</h2>
        <div className="grid grid-cols-2 gap-4 items-end">
          {/* <select name="day" className="p-2 border rounded">
                        {days.map((d) => (
                            <option key={d.format("YYYY-MM-DD")} value={d.format("YYYY-MM-DD")}>
                                {d.format("ddd - DD MMM")}
                            </option>
                        ))}
                    </select> */}

          {/* <select
                        value={selectedDay}
                        onChange={(e) => {
                            setSelectedDay(e.target.value);
                            setSelectedTime("");
                        }}
                        className="w-full p-2 border rounded mb-4 h-fit"
                    >
                        <option value="">-- Select Day --</option>
                        {uniqueDays.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select> */}

          <div className="flex flex-col gap-5">
            <label className="block font-medium mb-1">Select Date</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]} // disable past dates
              onChange={handleDateChange}
              className="w-full p-2 border rounded"
              value={selectedDate}
            />
          </div>

          {/* <select name="time" className="p-2 border rounded">
                        {times.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select> */}


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
                    setAlreadyBooked(false);
                    console.log("selected time", e.target.value);
                    setSelectedTime(e.target.value)
                  }}
                  min={slotForDay?.timein || slotForHosDay?.timein}
                  max={slotForDay?.timeout || slotForHosDay?.timeout}
                  step="900"
                  className="w-full p-2 border rounded"
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
                />

              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Phone Number" className="p-2 border rounded"
            value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input type="text" placeholder="Patient Name" name="patientName" className="p-2 border rounded"
            value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
          {lookingUp && <p className="text-sm text-gray-500">Looking up patient...</p>}
        </div>

        {alreadyBooked && <p className="text-sm text-center text-red-500 mt-1">This slot is already booked. Please choose another time.</p>}

        <button type="submit"
          disabled={isPending}
          className={`w-full text-white py-2 rounded ${isPending ? "bg-blue-400" : "bg-blue-600"}`}>
          {isPending ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* 🔹 Reviews Section (optional) */}
      {/* {reviews && (
        <div className="bg-white border rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold">{reviews.total} Reviews</h2>
          <p className="text-xl font-bold">
            {reviews.average}/5 Average rating based on {reviews.total} reviews.
          </p>
          <button className="w-full border py-2 rounded">View All Reviews</button>
        </div>
      )} */}
    </div>
  );
}
