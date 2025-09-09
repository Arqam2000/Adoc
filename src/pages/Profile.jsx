import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import DoctorTiming from '../components/DocHospital';
import DocExperience from '../components/DocExperience';

export const Profile = () => {
  const [doctor, setDoctor] = useState([])
  const [profile, setProfile] = useState({
    specialization: "",
    city: "",
    about: "",
    experience: "",
    qualifications: ""
  });
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [specializations, setSpecializations] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [clickedFrom, setClickedFrom] = useState(null);
  const [city, setCity] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [qualifications, setQualifications] = useState([])
  const [degree, setDegree] = useState("")
  const [institute, setInstitute] = useState("")
  const [institutes, setInstitutes] = useState([])
  const [cityCode, setCityCode] = useState()
  const [personalInfo, setPersonalInfo] = useState({
    city: "",
    specialization: "",
    about: "",
    selectedImage: null
  })
  const [rows, setRows] = useState([
    {
      institute: "KU",
      degree: "Mbbs"
    } // initial row
  ]);
  const [hospitals, setHospitals] = useState([])
  const [hospital, setHospital] = useState("")
  const [designation, setDesignation] = useState("")
  const [designations, setDesignations] = useState([])

  // console.log("rows", rows)
  const fileInputRef = useRef(null);


  useEffect(() => {

    if (JSON.parse(localStorage.getItem("personalInfo"))) {
      setPersonalInfo(JSON.parse(localStorage.getItem("personalInfo")))
    }

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setPersonalInfo((prev) => ({ ...prev, selectedImage: savedImage }));
    }

    if (JSON.parse(localStorage.getItem("rows"))) {
      setRows(JSON.parse(localStorage.getItem("rows")))
    }
    if (localStorage.getItem("qualifications")) {

      const { institute, degree } = JSON.parse(localStorage.getItem("qualifications"))

      setInstitute(institute)
      setDegree(degree)
    }
    if (localStorage.getItem("video time")) {
      setSchedule(JSON.parse(localStorage.getItem("video time")))
    }
    if (localStorage.getItem("hospital time")) {
      setSchedule2(JSON.parse(localStorage.getItem("hospital time")))
    }

    setQualifications([
      {
        degree_code: 1,
        degree_name: "MBBS"
      },
      {
        degree_code: 2,
        degree_name: "Engineering"
      }
    ])

    setInstitutes([
      {
        university: 1,
        university_name: "KU"
      },
      {
        university: 2,
        university_name: "NED"
      },
    ])
  }, [])


  useEffect(() => {

    setLoading(true)
    setError(null)

    axios.get("/api/v1/cities/get-cities")
      .then(res => {
        console.log(res)
        setCities(res.data.cities)
      })
      .catch(err => {
        console.log("error", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))

    console.log(JSON.parse(localStorage.getItem("doctor")))
    setDoctor(JSON.parse(localStorage.getItem("doctor")))
  }, [])

  useEffect(() => {
    getSpecializations()
  }, [])

  useEffect(() => {
    getDegree()
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)

    axios.get("/api/v1/institutes/get-institutes")
      .then(res => {
        console.log(res.data)
        setInstitutes(res.data.institutes)
      })
      .catch(err => {
        console.log("error", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  const getSpecializations = () => {
    setLoading(true)
    setError(null)

    axios.get("/api/v1/specializations/get-specializations")
      .then(res => {
        console.log(res)
        setSpecializations(res.data.specializations)
      })
      .catch(err => {
        console.log("error", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }

  const getDegree = () => {
    setLoading(true)
    setError(null)

    axios.get("/api/v1/degrees/get-degrees")
      .then(res => {
        console.log(res.data)
        setQualifications(res.data.degrees)
      })
      .catch(err => {
        console.log("error", err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }

  const handleOpenModal = (source) => {
    setClickedFrom(source);
    setIsOpen(true);
  };

  const AddCity = async () => {
    setLoading(true)
    setError(null)
    try {
      const resp = await axios.post("/api/v1/cities/add-city", { city })
      const newCity = resp.data.city
      console.log("new city", newCity)
      setCities([...cities, { ...newCity }])
      toast.success("Saved successfuly")
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    setCity("")
  }

  const AddSpecialization = async () => {
    setLoading(true)
    setError(null)
    try {
      const resp = await axios.post("/api/v1/specializations/add-specialization", { specialization })
      if (resp.data.success) {
        const newSpecialization = resp.data.specialization
        console.log("newSpecialization", newSpecialization)
        setSpecializations([...specializations, { ...newSpecialization }])
        toast.success("Saved successfuly")
      }
    } catch (error) {
      setError(error.response.data.message)
    }
    setLoading(false)
    setSpecialization("")
  }

  const AddQualification = async () => {
    setLoading(true)
    setError(null)
    console.log("Add degree")
    try {
      const resp = await axios.post("/api/v1/degrees/add-degree", { degree })
      const newDegree = resp.data.degree
      console.log("new degree", newDegree)
      setQualifications([...qualifications, { ...newDegree }])
      toast.success("Saved successfuly")
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    setDegree("")
  }

  const AddInstitute = async () => {
    setLoading(true)
    setError(null)
    console.log("Add institute")
    const city = cities.find(({ city_name }) => city_name == cityCode)
    setCityCode(city.city_code)
    try {
      const resp = await axios.post("/api/v1/institutes/add-institute", { institute, cityCode })
      const newInstitute = resp.data.institute
      console.log("new institute", newInstitute)
      setInstitutes([...institutes, { ...newInstitute }])
      toast.success("Saved successfuly")
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    setInstitute("")
  }

  const handleChange = (e) => {
    if (clickedFrom == "City") {
      setCity(e.target.value)
    } else if (clickedFrom == "Specialization") {
      setSpecialization(e.target.value)
    } else if (clickedFrom == "Qualification") {
      setDegree(e.target.value)
    } else if (clickedFrom == "Institute") {
      setInstitute(e.target.value)
    } else if (clickedFrom == "Hospital") {
      setHospital(e.target.value)
    } else if (clickedFrom == "Designation") {
      setDesignation(e.target.value)
    }
  };

  const AddHospital = async () => {
    setLoading(true)
    setError(null)
    try {
      const resp = await axios.post("/api/v1/hospitals/add-hospital", { hospital })
      console.log("response", resp.data)
      if (resp.data.success) {
        const newHospital = resp.data.hospital
        console.log("newHospital", newHospital)
        setHospitals([...hospitals, { ...newHospital }])
        toast.success("Saved successfuly")
      } else {
        setError(resp.data.message)
      }
    } catch (error) {
      console.log("Error", error)
      setError(error.response.data.message)
    }
    setLoading(false)
    setHospital("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);

    if (clickedFrom == "City") {
      AddCity()
    } else if (clickedFrom == "Specialization") {
      AddSpecialization()
    } else if (clickedFrom == "Qualification") {
      AddQualification()
    } else if (clickedFrom == "Institute") {
      AddInstitute()
    } else if (clickedFrom == "Hospital") {
      let i = 0
      AddHospital()
      setHospitals([...hospitals, { hospital_code: ++i, hospital_name: hospital }])
    } else if (clickedFrom == "Designation") {
      let i = 0
      setDesignation(e.target.value)
      setDesignations([...designations, { Desig: ++i, DDesig: designation }])
    }
    setIsOpen(false); // close modal after submit
  };



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Selected file name:', selectedFile.name);
      console.log('Selected file:', selectedFile);
      setIsImageSelected(true)
      setImage(selectedFile)
      // You can now handle the file, e.g., preview it or upload it
    }
  };

  const handleButtonClick = () => {
    // setIsImageSelected(false)
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [schedule, setSchedule] = useState(
    days.map((day) => ({
      day,
      start: "",
      end: "",
    }))
  );
  const [schedule2, setSchedule2] = useState(
    days.map((day) => ({
      day,
      start: "",
      end: "",
    }))
  );

  const handleTimeChange = (index, field, value, source) => {
    if (source == "video") {
      const updated = [...schedule];
      updated[index][field] = value;
      setSchedule(updated);
    } else if (source == "hospital") {
      const updated = [...schedule2];
      updated[index][field] = value;
      setSchedule2(updated);
    }
  };

  // helper function to format time to 12hr with AM/PM
  const formatTime = (time) => {
    if (!time) return "";
    let [h, m] = time.split(":");
    h = parseInt(h);
    const suffix = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${m} ${suffix}`;
  };

  return (
    <div className='flex flex-col items-center gap-2 bg-gray-100'>
      <ToastContainer />
      <div className="flex items-center gap-6 pb-4 p-3 my-5 box-content">
        <div className='w-[100px] h-[100px] rounded-full border self-start flex items-center justify-center overflow-hidden'>
          <img
            src={personalInfo?.selectedImage}
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className='flex flex-col gap-3'>
          {
            doctor?.map(doc => (

              <div key={doc.Dr_Id}>
                <h1 className="text-2xl font-bold">{doc.Dr_Name}</h1>
                <p className="text-sm text-gray-600">{doc.Dr_Email}</p>
                <p className="text-sm text-gray-600">{doc.Dr_Phone}</p>
              </div>

            ))
          }

          {/* Personal Information */}
          <div>
            <div>
              <h1 className='text-xl font-semibold'>Personal Information</h1>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-2'>
              <div className='flex'>
                <select name="city" id="city" className="w-full border p-2 py-0 rounded-lg" value={personalInfo?.city} onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}>
                  <option value="" disabled selected hidden>Select City</option>
                  {
                    cities.map(city => (

                      <option key={city.city_code} value={city.city_name}>{city.city_name}</option>

                    ))
                  }
                </select>
                <button className='bg-blue-500 py-1 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("City")}>+</button>
              </div>
              <div className='flex'>
                <select name="specialization" id="specialization" className="w-full border p-2 py-0 rounded-lg" value={personalInfo?.specialization} onChange={(e) => setPersonalInfo({ ...personalInfo, specialization: e.target.value })}>
                  <option value="" disabled selected hidden>Select specialization</option>
                  {
                    specializations.map(specialization => (
                      <>
                        <option key={specialization.Specialization_code} value={specialization.Specialization_name}>{specialization.Specialization_name}</option>
                      </>
                    ))
                  }
                </select>
                <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Specialization")}>+</button>
              </div>


            </div>

            <textarea
              name="about"
              placeholder="About yourself"
              value={personalInfo?.about}
              onChange={(e) => setPersonalInfo({ ...personalInfo, about: e.target.value })}
              className="w-full border p-2 rounded-lg mt-3"
              rows="3"
            />

            <input
              type="file"
              accept="image/*" // Accept only image files
              ref={fileInputRef}
              // onChange={handleFileChange}
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {

                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result;

                      setPersonalInfo((prev) => ({
                        ...prev,
                        selectedImage: base64String,
                      }));

                      // Save in localStorage
                      localStorage.setItem("profileImage", base64String);
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
              name='image'
            />
            <button className='bg-[#007bff] text-white py-2 px-5 rounded-sm cursor-pointer text-base' onClick={handleButtonClick}>
              Upload Profile Image
            </button>
            <button className='bg-[#007bff] text-white py-2 px-5 rounded-sm cursor-pointer text-base ml-2' onClick={() => {
              console.log(personalInfo)
              localStorage.setItem("personalInfo", JSON.stringify(personalInfo))
              toast.success("Saved")
            }}>
              Save
            </button>


          </div>

          {/* Qualification */}

          <div>
            <h1 className='text-xl font-semibold'>Qualification</h1>
          </div>

          {
            rows.map((row, index) => (
              <div className='grid grid-cols-2 gap-2'>

                <div className='flex'>
                  <select name="Institute" id="Institute" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index]["institute"] = e.target.value;
                    setRows(newRows);
                  }} value={row.institute}>
                    <option value="" disabled selected hidden>Select Institute</option>
                    {
                      institutes.map(institute => (
                        <>
                          <option key={institute.university} value={institute.university_name}>{institute.university_name}</option>
                        </>
                      ))
                    }
                  </select>
                  <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Institute")}>+</button>
                </div>



                <div className='flex'>
                  <select name="Qualification" id="Qualification" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index]["degree"] = e.target.value;
                    setRows(newRows);
                  }} value={row.degree}>
                    <option value="" disabled selected hidden>Select degree</option>
                    {
                      qualifications.map(qualification => (
                        <>
                          <option key={qualification.degree_code} value={qualification.degree_name}>{qualification.degree_name}</option>
                        </>
                      ))
                    }
                  </select>
                  <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Qualification")}>+</button>
                </div>
              </div>
            ))
          }

          {/* <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Qualification")}>+</button> */}

          <div className='flex justify-center mt-2'>
            <button className='bg-blue-500 py-1 px-2 pr-3 rounded cursor-pointer text-white text-base w-fit text-center' onClick={() => setRows([...rows, { institute: "", degree: "" }])}>Add more</button>
            <button className='bg-[#007bff] text-white py-2 px-5 rounded-sm cursor-pointer text-base ml-2' onClick={() => {
              console.log(rows)
              localStorage.setItem("rows", JSON.stringify(rows))
              // localStorage.setItem("qualifications", JSON.stringify({ institute, degree }))
              toast.success("Saved")
            }}>
              Save
            </button>

          </div>

          {/* video timings */}

          <div className='flex flex-col gap-2 mt-2'>
            <h1 className='text-[17px] font-semibold'>Practice Timings</h1>
            <div className='shadow-md rounded-md p-2 flex flex-col gap-2 bg-white'>
              <h1 className='text-base font-semibold underline cursor-pointer'>Video Consultation</h1>
              <p className='text-sm'>Online</p>
              <input
                type="text"
                placeholder='Your Fees'
                onChange={() => { }}
                className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-19"
              />
              <h2 className='text-sm font-semibold cursor-pointer'>Select Timings</h2>

              <div className="divide-y    rounded bg-white">
                <div
                  className="flex justify-between items-center py-2 px-4 border-b-gray-300"
                >
                  {/* Day Name */}
                  <span className="font-semibold w-16 text-sm">Day</span>

                  {/* Time Inputs */}
                  <div className="flex items-center gap-20">
                    <h2 className='text-base font-semibold'>From</h2>
                    <h2 className='text-base font-semibold'>To</h2>
                  </div>

                  {/* Display formatted */}
                  <div className="text-sm w-33 text-center">
                    <h2 className='text-base font-semibold'>Time</h2>
                  </div>

                  {/* <div>
                      <h2 className='text-base font-semibold mr-32'>Fees</h2>
                    </div> */}

                  {/* Display Status */}
                  <div>
                    <h2 className='text-base font-semibold'>Status</h2>
                  </div>
                </div>
                {schedule.map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-4 border-b-gray-300 gap-2"
                  >
                    {/* Day Name */}
                    <span className="font-bold text-[#004D71] w-16 text-sm">{slot.day}</span>

                    {/* Time Inputs */}
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => handleTimeChange(index, "start", e.target.value, "video")}
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500"
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => handleTimeChange(index, "end", e.target.value, "video")}
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Display formatted */}
                    <div className="text-gray-700 text-sm w-33 text-right">
                      {formatTime(slot.start)} - {formatTime(slot.end)}
                    </div>

                    {/* <input
                        type="text"
                        placeholder='Fees'
                        onChange={() => {}}
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-12"
                      /> */}
                    {/* <input
                      type="text"
                      placeholder='Eg: working/not working'
                      onChange={() => { }}
                      className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-48"
                    /> */}
                    {
                      slot.start && slot.end ? <p>Working</p> : <p>Off</p>
                    }
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  console.log(schedule)
                  localStorage.setItem("video time", JSON.stringify(schedule))
                  toast.success("Saved")
                }}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Save Schedule
              </button>

            </div>
          </div>

          {/* hospital timings */}

          <DoctorTiming hospitals={hospitals} designations={designations} setClickedFrom={setClickedFrom} setIsOpen={setIsOpen} />

          {/* <div className='flex flex-col gap-2 mt-2'>
            <h1 className='text-[17px] font-semibold'>Practice Address and Timings</h1>
            <div className='shadow-md rounded-md p-2 px-5 flex flex-col gap-4 bg-white'>
              <h1 className='text-base font-semibold underline cursor-pointer'>Please select your hospital and designation</h1>

              <div class="grid grid-cols-2 gap-2">
                <div className='flex'>
                  <select name="Hospital" id="Hospital" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
                    // const newRows = [...rows];
                    // newRows[index]["degree"] = e.target.value;
                    // setRows(newRows);
                  }} >
                    <option value="" disabled selected hidden>Select hospital</option>
                    {
                      hospitals.map(hos => (
                        <>
                          <option key={hos.hospital_code} value={hos.hospital_name}>{hos.hospital_name}</option>
                        </>
                      ))
                    }
                  </select>
                  <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Hospital")}>+</button>
                </div>
                <div className='flex'>
                  <select name="Designation" id="Designation" className="w-full border p-2 py-1 rounded-lg" onChange={(e) => {
                    // const newRows = [...rows];
                    // newRows[index]["degree"] = e.target.value;
                    // setRows(newRows);
                  }} >
                    <option value="" disabled selected hidden>Select Designation</option>
                    {
                      designations.map(desig => (
                        <>
                          <option key={desig.Desig} value={desig.DDesig}>{desig.DDesig}</option>
                        </>
                      ))
                    }
                  </select>
                  <button className='bg-blue-500 py-0 px-5 rounded cursor-pointer text-white text-base ml-2' onClick={() => handleOpenModal("Designation")}>+</button>
                </div>
              </div>

              {/* <p className='text-sm'>Online</p> 
              <input
                type="text"
                placeholder='Your Fees'
                onChange={() => { }}
                className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-19"
              />
              <h2 className='text-sm font-semibold cursor-pointer'>Select Timings</h2>

              <div className="divide-y    rounded bg-white">
                <div
                  className="flex justify-between items-center py-2 px-4 border-b-gray-300"
                >
                  {/* Day Name 
                  <span className="font-semibold w-16 text-sm">Day</span>

                  {/* Time Inputs 
                  <div className="flex items-center gap-20">
                    <h2 className='text-base font-semibold'>From</h2>
                    <h2 className='text-base font-semibold'>To</h2>
                  </div>

                  {/* Display formatted 
                  <div className="text-sm w-33 text-center">
                    <h2 className='text-base font-semibold'>Time</h2>
                  </div>

                  {/* <div>
                      <h2 className='text-base font-semibold mr-32'>Fees</h2>
                    </div> 

                  {/* Display Status 
                  <div>
                    <h2 className='text-base font-semibold'>Status</h2>
                  </div>
                </div>
                {schedule2.map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-4 border-b-gray-300 gap-3"
                  >
                    {/* Day Name 
                    <span className="font-bold text-[#004D71] w-16 text-sm">{slot.day}</span>

                    {/* Time Inputs 
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => handleTimeChange(index, "start", e.target.value, "hospital")}
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500"
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => handleTimeChange(index, "end", e.target.value, "hospital")}
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Display formatted }
                    <div className="text-gray-700 text-sm w-33 text-right">
                      {formatTime(slot.start)} - {formatTime(slot.end)}
                    </div>

                    {/* <input
                        type="text"
                        placeholder='Fees'
                        onChange={() => {}}
                        className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-12"
                      /> }
                    {/* <input
                      type="text"
                      placeholder='Eg: working/not working'
                      onChange={() => { }}
                      className="border rounded p-1 text-sm focus:ring-2 focus:ring-purple-500 w-48"
                    /> }
                    {
                      slot.start && slot.end ? <p>Working</p> : <p>Not Working</p>
                    }
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  console.log(schedule2)
                  localStorage.setItem("hospital time", JSON.stringify(schedule2))
                  toast.success("Saved")
                }}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >
                Save Schedule
              </button>

            </div>
          </div> */}
          
        </div>
      </div>
      <DocExperience institutes={institutes} designations={designations} handleOpenModal={handleOpenModal} />



      <div className="mt-4 space-y-3 w-1/2 mx-auto">

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add {clickedFrom}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✖
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    // value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                    required
                  />
                </div>



                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>



    </div>
  )
}
