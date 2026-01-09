import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Subcomponents
import DoctorTiming from "../components/DocHospital";
import DocExperience from "../components/DocExperience";
import useDoctor from "../context/DoctorContext";
import useCities from "../hooks/useCities";
import useSpecializations from "../hooks/useSpecializations";
import useHospitals from "../hooks/useHospitals";
import BackButton from "../components/BackButton";
import AppointmentTypes from "../components/AppointmentTypes";
import { apiBaseUrl } from "../constants/constants";
import { set } from "date-fns";

export const Profile = () => {
  const [doctor, setDoctor] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    city: "",
    specialization: "",
    about: "",
    selectedImage: null,
  });

  const { cities } = useCities();
  const { specializations } = useSpecializations()
  const { hospitals } = useHospitals()

  const [qualifications, setQualifications] = useState([]);
  const [institutes, setInstitutes] = useState([]);
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
  const [docExp, setDocExp] = useState([])
  const [waitingTime, setWaitingTime] = useState("")
  const [isEditName, setIsEditName] = React.useState(false);
  const [isEditEmail, setIsEditEmail] = React.useState(false);
  const [isEditUsername, setIsEditUsername] = React.useState(false);
  const [isEditPhone, setIsEditPhone] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const usernameInputRef = useRef(null);

  const { doctorData, fetchDoctorData, setDoctorData } = useDoctor();
  console.log("doctorData from profile", doctorData)

  // console.log("sorted doctorvd", doctorData?.doctorvd?.sort((a, b) => {
  //     const indexA = schedule.indexOf(a.day);
  //     const indexB = schedule.indexOf(b.day);
  //     return indexA - indexB;
  // })) 

  const setHospitals = () => {
    const daysTemplate = [
      { day: "Mon", start: "", end: "" },
      { day: "Tue", start: "", end: "" },
      { day: "Wed", start: "", end: "" },
      { day: "Thu", start: "", end: "" },
      { day: "Fri", start: "", end: "" },
      { day: "Sat", start: "", end: "" },
      { day: "Sun", start: "", end: "" },
    ];

    const result = doctorData?.doctorhd && Object.values(
      doctorData?.doctorhd?.reduce((acc, item) => {
        const key = `${item.hospital_name}-${item.DDesig}`;

        // Create new hospital entry if not exists
        if (!acc[key]) {
          acc[key] = {
            hospital: item.hospital_name,
            designation: item.DDesig,
            fees: item.fees,
            schedule: daysTemplate.map(d => ({ ...d })),
          };
        }

        // Fill correct day timing
        const dayObj = acc[key].schedule.find(d => d.day === item.day);

        if (dayObj) {
          dayObj.start = item.timein;
          dayObj.end = item.timeout;
        }

        return acc;
      }, {})
    )

    setHospitalBlocks(result || hospitalBlocks)

    console.log("hos result", result)
  }

  useEffect(() => {
    // const newSch = schedule.map((slot, idx) => { // slot = { day: "Mon", start: "", end: "" } 
    //   // doctorData?.doctorvd[0] = { day: "tue", timein: "10:00", timeout: "14:00" }, { day: "Tue", timein: "10:00", timeout: "14:00" }

    //   if (slot.day == doctorData?.doctorvd?.[idx]?.day) {
    //     slot.start = doctorData?.doctorvd?.[idx]?.timein || ""
    //     slot.end = doctorData?.doctorvd?.[idx]?.timeout || ""
    //     return slot
    //   }
    //   slot.start = ""
    //   slot.end = ""
    //   return slot
    // })

    const newSch = schedule.map(slot => {
      const matchedDay = doctorData?.doctorvd?.find(
        d => d.day?.toLowerCase() === slot.day.toLowerCase()
      );

      return {
        ...slot,
        start: matchedDay?.timein || "",
        end: matchedDay?.timeout || "",
      };
    });

    console.log("newSch", newSch)

    setSchedule(newSch)
    setVideoFees(doctorData?.doctorvd?.[0]?.fees || "")

    // doctorData?.doctorhd && setHospitalBlocks(
    //   doctorData?.doctorhd?.map(hd => {
    //     const hosBlock = {
    //       hospital: hd.hospital_name || "",
    //       designation: hd.DDesig || "",
    //       fees: hd.fees || "",
    //       schedule: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
    //         const daySchedule = doctorData?.doctorhd?.filter(dh => dh.day === day)[0];

    //         return {
    //           day,
    //           start: daySchedule ? daySchedule.timein : "",
    //           end: daySchedule ? daySchedule.timeout : "",
    //         }
    //       }),
    //     }
    //     return hosBlock
    //   })
    // )

    setHospitals()

    setDocExp(doctorData?.doctorexp?.map(exp => {
      const hospital = hospitals.find(hos => hos.hospital_code == exp.hospital_code)
      const designation = designations.find(des => des.Desig == exp.Desig)
      return {
        hospital: hospital?.hospital_name || "",
        designation: designation?.DDesig || "",
        fromDate: exp.FromDate,
        tillDate: exp.TillDate,
        comments: exp.comments || "",
      }
    }) || [
      {
        hospital: "",
        designation: "",
        fromDate: "",
        tillDate: "",
        comments: ""
      }
    ])

    const result = doctorData?.doctor?.qualifications?.split(";").map((item, index) => {
      const trimmed = item.trim();

      // Extract degree and institute using regex
      const match = trimmed.match(/^(.+?)\s*\((.+?)\)$/);

      return {
        id: index,
        institute: match ? match[2] : "",
        degree: match ? match[1] : "",
      };
    });

    setRows(result || [{ institute: "", degree: "" }]);
    // console.log("result rows", result)

  }, [doctorData])
 
  // console.log("hosps", hospitals)

  // Initial Load
  useEffect(() => {
    const savedDoctor = JSON.parse(localStorage.getItem("doctor")) || [];
    const savedPersonalInfo =
      JSON.parse(localStorage.getItem("personalInfo")) || {};
    const savedImage = localStorage.getItem("profileImage");

    fetchDoctorData(savedDoctor?.dr);

    setDoctor(savedDoctor);

    setName(savedDoctor?.name || "")
    setEmail(savedDoctor?.email || "")
    setPhone(savedDoctor?.phone || "")
    setUsername(savedDoctor?.username || "")
    // setPersonalInfo((prev) => ({
    //   ...prev,
    //   ...savedPersonalInfo,
    //   selectedImage: savedImage || prev.selectedImage,
    // }));
    setPersonalInfo((prev) => ({
      about: savedDoctor.about,
      city: savedDoctor.city_name,
      specialization: savedDoctor.Specialization_name,
      selectedImage: savedImage || prev.selectedImage,
    }));

    // setRows(JSON.parse(localStorage.getItem("rows")) || [{ institute: "", degree: "" }]);
    setSchedule(JSON.parse(localStorage.getItem("video time")) || schedule);
    setVideoFees(localStorage.getItem("video fees"))
    // setHospitalBlocks(
    //   JSON.parse(localStorage.getItem("hospitals_schedules")) || hospitalBlocks
    // );

    doctorData?.doctorvd?.map((vd, idx) => {
      schedule[idx].start = vd.timein;
      schedule[idx].end = vd.timeout;
      schedule[idx].day = vd.day;
    })

    fetchInitialData();
  }, []);

  // console.log("schedule", schedule)
  // console.log("personalInfo", personalInfo)

  // console.log("new hospitals", hospitalBlocks.map((hos, idx) => {

  //   hos.designation = doctorData?.doctorhd?.[idx]?.DDesig || ""
  //   hos.fees = doctorData?.doctorhd?.[idx]?.fees || ""
  //   hos.hospital = doctorData?.doctorhd?.[idx]?.hospital_name || ""


  //   hos.schedule = doctorData?.doctorhd?.map((hd) => {
  //     if (hos.schedule[idx]?.day === hd.day) {
  //       hos.schedule[idx].start = hd.timein
  //       hos.schedule[idx].end = hd.timeout
  //       return hos.schedule[idx]
  //     }
  //   })
  //   return hos

  // }))


  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [degreeRes, instRes, desigRes, docRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/v1/degrees/get-degrees`),
        axios.get(`${apiBaseUrl}/api/v1/institutes/get-institutes`),
        axios.get(`${apiBaseUrl}/api/v1/designations/get-designations`),
        // axios.get(`/api/v1/doctors/get-doctor/${doctor?.dr}`),
      ]);

      setQualifications(degreeRes.data.degrees);
      setInstitutes(instRes.data.institutes);
      setDesignations(desigRes.data.designations)
      // setDocExp(docRes.data.doctorexp)
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

  // Save doctor info to backend
  const submit = async () => {
    try {

      const city = cities.find((c) => c.city_name === personalInfo.city);
      const spec = specializations.find(
        (s) => s.Specialization_name === personalInfo.specialization
      );

      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/edit-doctor`, {
        dr: doctor.dr,
        city_code: city?.city_code,
        specialization_code: spec?.Specialization_code,
        about: personalInfo.about,
        image: personalInfo.selectedImage,
        name,
        email,
        phone,
        username,
      });

      if (resp.data.success) {
        // toast.success("Profile updated successfully");
        setDoctorData(prev => ({
          ...prev,
          name,
          email,
          phone,
          username
        }));
      }

    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const deleteDocProfile = async () => {
    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctor`, {
        dr: doctor.dr
      })
      if (resp.data.success) {

        localStorage.setItem("personalInfo", JSON.stringify({
          city: "",
          specialization: "",
          about: "",
          selectedImage: null,
        }))

        localStorage.setItem("profileImage", "")

        toast.success("Profile deleted successfully");
      }

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
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/edit-doctorqd`, {
        dr: doctor.dr,
        qualifications: newArr
      })

      if (resp.data.success) {
        // toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  }

  const deleteQualifications = async () => {
    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctorqd`, {
        dr: doctor.dr
      })

      if (resp.data.success) {
        localStorage.setItem("rows", JSON.stringify([{ institute: "", degree: "" }]))
        toast.success("Deleted")
      }
    } catch (error) {
      toast.error("Error while deleting")
      console.log("Error while deleting", error)
    }
  }

  const saveVDToDB = async () => {
    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/edit-doctorvd`, {
        dr: doctor.dr,
        videoTimings: schedule,
        videoFees,
      })

      if (resp.data.success) {
        // toast.success("Profile updated successfully");
      }
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
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/edit-doctorhd`, {
        dr: doctor.dr,
        hospitalTimings: newHosBlock,

      })

      if (resp.data.success) {
        localStorage.setItem("hospitals_schedules", JSON.stringify(hospitalBlocks))
        // toast.success("Profile updated successfully")
      }
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
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/edit-doctorexp`, {
        dr: doctor.dr,
        experience: newExp,

      })

      if (resp.data.success) {
        localStorage.setItem("rows2", JSON.stringify(experience))
        // toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  }

  const saveQualifications = () => {
    localStorage.setItem("rows", JSON.stringify(rows))
    toast.success("Saved")
  }

  // console.log("hos blocks from profile", hospitalBlocks)

  const deleteDoctorVD = async () => {
    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/delete-doctorvd`, {
        dr: doctor.dr
      })

      if (resp.data.success) {
        localStorage.setItem("video time", JSON.stringify(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
          day,
          start: "",
          end: "",
        }))))
        localStorage.setItem("video fees", "")
        toast.success("Deleted")
      }
    } catch (error) {
      toast.error("Error while deleting")
      console.log("Error while deleting", error)
    }
  }

  // function hasEmptyProperties(arrayOfObjects) {
  //   for (const obj of arrayOfObjects) {
  //     for (const key in obj) {
  //       if (Object.prototype.hasOwnProperty.call(obj, key)) {
  //         const value = obj[key];

  //         // Check for various definitions of "empty"
  //         if (value === null || value === undefined || value === "") {
  //           return true; // Found an empty property
  //         }

  //         // Check if it's an empty array
  //         if (Array.isArray(value) && value.length === 0) {
  //           return true; // Found an empty array property
  //         }

  //         // Check if it's an empty object (only if it's an object and not null/undefined)
  //         if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
  //           return true; // Found an empty object property
  //         }
  //       }
  //     }
  //   }
  //   return false; // No empty properties found in any object
  // }

  function hasEmptyPropertiesInObj(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (value === null || value === undefined || value === "") {
          return true; // Found an empty property
        }
      }
    }
    return false; // No empty properties found
  }

  const handleAllSave = async () => {
    try {
      await submit()
      await saveQDToDB()
      await saveVDToDB()
      await saveHDToDB()
      await saveExpToDB()
      await saveWaitingTime()

      toast.success("Saved successfuly")

    } catch (error) {
      toast.error("Cannot save to database")
      console.log("Error while saving the details", error)
    }
  }

  const handleFocus = () => {
    console.log("onFocus running")

    if (!hasEmptyPropertiesInObj()) {
      localStorage.setItem("personalInfo", JSON.stringify(personalInfo))
      // toast.success("Saved")
    }

    if (videoFees) {
      console.log("video timing save running", schedule, videoFees)

      localStorage.setItem("video time", JSON.stringify(schedule))
      localStorage.setItem("video fees", videoFees)
      // toast.success("Saved")
    }


    const newBlock = hospitalBlocks.filter(block => {
      if (block.fees != "" && block.hospital != "" && block.designation != "") return block

    })

    // console.log(newBlock.length, newBlock)

    if (newBlock.length > 0) {
      localStorage.setItem(
        `hospitals_schedules`,
        JSON.stringify(hospitalBlocks)
      );
      // toast.success("Saved Schedule");
    }
  }

  const saveWaitingTime = async () => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/doctors/edit-doctorwt`, {
        dr: doctor.dr,
        waitingTime
      })

      toast.success("Waiting time saved successfuly")

    } catch (error) {
      toast.error("Error saving waiting time")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <ToastContainer />
      <div className="max-w-96 md:max-w-5xl  mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <BackButton />
        {/* Doctor Header */}
        <div className="flex items-center justify-between mr-5 gap-6 border-b pb-6 mb-6">
          <div className="flex items-center gap-6">
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
          <div className="">
            <button className="py-1 px-3 bg-blue-500 text-white rounded " onClick={handleAllSave}>Save</button>
          </div>

        </div>

        {/* Personal Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
          <div className="grid grid-cols-2 lg:gap-4 gap-2 mb-3">
            {/* City */}
            <div className="w-full">
              <input ref={nameInputRef} className="w-[75%] mr-2 border py-2 px-2 rounded-md" type="text" placeholder="Enter your name" value={name} disabled={!isEditName} onChange={e => setName(e.target.value)} /><button onClick={() => {
                setIsEditName(prev => {
                  const nextState = !prev;

                  // focus ONLY when switching to edit mode
                  if (nextState) {
                    setTimeout(() => {
                      nameInputRef.current?.focus();
                    }, 0);
                  }

                  return nextState;
                });
              }}>Edit</button>
              <button className="ml-2" onClick={() => {
                setName(doctor?.name)
                setIsEditName(false)
              }}>Cancel</button>
            </div>
            <div className="w-full">
              <input ref={emailInputRef} className="w-[75%] mr-2 border py-2 px-2 rounded-md" type="text" placeholder="Enter your email" value={email} disabled={!isEditEmail} onChange={e => setEmail(e.target.value)} /><button onClick={() => {
                setIsEditEmail(prev => {
                  const nextState = !prev;

                  // focus ONLY when switching to edit mode
                  if (nextState) {
                    setTimeout(() => {
                      emailInputRef.current?.focus();
                    }, 0);
                  }

                  return nextState;
                })
              }}>Edit</button>
              <button className="ml-2" onClick={() => {
                setEmail(doctor?.email)
                setIsEditEmail(false)
              }}>Cancel</button>
            </div>
            <div className="w-full">
              <input ref={usernameInputRef} className="w-[75%] mr-2 border py-2 px-2 rounded-md" type="text" placeholder="Enter your username" value={username} disabled={!isEditUsername} onChange={e => setUsername(e.target.value)} /><button onClick={() => setIsEditUsername(prev => {
                const nextState = !prev;

                // focus ONLY when switching to edit mode
                if (nextState) {
                  setTimeout(() => {
                    usernameInputRef.current?.focus();
                  }, 0);
                }

                return nextState;
              })}>Edit</button>
              <button className="ml-2" onClick={() => {
                setUsername(doctor?.username)
                setIsEditUsername(false)
              }}>Cancel</button>
            </div>
            <div className="w-full">
              <input ref={phoneInputRef} className="w-[75%] mr-2 border py-2 px-2 rounded-md" type="text" placeholder="Enter your phone" value={phone} disabled={!isEditPhone} onChange={e => setPhone(e.target.value)} /><button onClick={() => setIsEditPhone(prev => {
                const nextState = !prev;

                // focus ONLY when switching to edit mode
                if (nextState) {
                  setTimeout(() => {
                    phoneInputRef.current?.focus();
                  }, 0);
                }

                return nextState;
              })}>Edit</button>
              <button className="ml-2" onClick={() => {
                setPhone(doctor?.phone)
                setIsEditPhone(false)
              }}>Cancel</button>
            </div>
            <select
              className="border rounded-lg p-2"
              // value={doctor.city_name}
              value={personalInfo.city}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              {cities?.map((c) => (
                <option key={c.city_code} value={c.city_name}>
                  {c.city_name}
                </option>
              ))}
            </select>

            {/* Specialization */}
            <select
              className="border rounded-lg p-2"
              // value={doctor.Specialization_name}
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
            value={doctor.about}
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
            {/* <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                localStorage.setItem("personalInfo", JSON.stringify(personalInfo))
                                toast.success("Saved")
                            }}
                        >
                            Save
                        </button> */}
            {/* Submit */}
            {/* <div className="text-right mt-6"> */}
            <button
              onClick={submit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              Save
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
                  onFocus={handleFocus}
                  onChange={(e) => {
                    const updated = [...rows];
                    updated[idx].institute = e.target.value;
                    setRows(updated);
                  }}
                >
                  <option value="">Select Institute</option>
                  {institutes?.map((i) => (
                    <option key={i.university} value={i.university_name}>
                      {i.university_name}
                    </option>
                  ))}
                </select>

                <select
                  name="degree"
                  className="border rounded-lg p-2"
                  value={row.degree}
                  onFocus={handleFocus}
                  onChange={(e) => {
                    const updated = [...rows];
                    updated[idx].degree = e.target.value;
                    setRows(updated);
                  }}
                >
                  <option value="">Select Degree</option>
                  {qualifications?.map((q) => (
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
              onClick={() => {
                localStorage.setItem("rows", JSON.stringify(rows))
                setRows([...rows, { institute: "", degree: "" }])
              }}
            >
              Add More
            </button>
            {/* <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={saveQualifications}
                        >
                            save
                        </button> */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={saveQDToDB}
            >
              save
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={deleteQualifications}
            >
              delete
            </button>
          </div>
        </section>

        <AppointmentTypes />

        <div className="my-2">
          <h3 className="text-lg font-semibold mb-1">Waiting Time</h3>
          <input type="text" className="outline-none border border-gray-300 py-1 px-2" onChange={e => setWaitingTime(e.target.value)} />
          <button className='bg-blue-500 py-1 px-3 rounded text-white cursor-pointer ml-2' onClick={saveWaitingTime}>Save</button>
        </div>

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
            {/* <button
                            onClick={() => {
                                localStorage.setItem("video time", JSON.stringify(schedule))
                                localStorage.setItem("video fees", videoFees)
                                toast.success("Saved")
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                        >
                            Save Schedule
                        </button> */}
            <button
              onClick={saveVDToDB}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={deleteDoctorVD}
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
          handleFocus={handleFocus}
          dr={doctor.dr}
        />

        {/* Experience */}
        <DocExperience
          hospitals={hospitals}
          designations={designations}
          handleRows2fromDocExperience={(rows2) => setExperience(rows2)}
          saveExpToDB={saveExpToDB}
          handleFocus={handleFocus}
          docExperience={docExp}
          dr={doctor.dr}
        />


      </div>
    </div>
  );
};
