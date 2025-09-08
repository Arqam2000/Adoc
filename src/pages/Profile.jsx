import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

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
    selectedImage: ""
  })
  const [rows, setRows] = useState([
    {
      institute: "KU",
      degree: "Mbbs"
    } // initial row
  ]);
  console.log("rows", rows)
  const fileInputRef = useRef(null);

  useEffect(() => {

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setPersonalInfo((prev) => ({ ...prev, selectedImage: savedImage }));
    }
    if (JSON.parse(localStorage.getItem("personalInfo"))) {
      setPersonalInfo(JSON.parse(localStorage.getItem("personalInfo")))
    }
    if (JSON.parse(localStorage.getItem("rows"))) {
      setRows(JSON.parse(localStorage.getItem("rows")))
    }
    if (localStorage.getItem("qualifications")) {

      const { institute, degree } = JSON.parse(localStorage.getItem("qualifications"))

      setInstitute(institute)
      setDegree(degree)
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
    }
  };

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

  return (
    <div className='flex flex-col items-center gap-2'>
      <ToastContainer />
      <div className="flex items-center gap-6 pb-4 p-3 my-5 border w-1/2 box-content">
        <div className='w-[133px] h-[100px] rounded-full border self-start flex items-center justify-center overflow-hidden'>
          <img
            src={personalInfo?.selectedImage}
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className='flex flex-col gap-1'>
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
                    const objectUrl = URL.createObjectURL(file);

                    // Update state
                    setPersonalInfo((prev) => ({
                      ...prev,
                      selectedImage: objectUrl,
                    }));

                    // Save to localStorage (or send to backend)
                    localStorage.setItem("profileImage", objectUrl);

                    // Cleanup old object URL
                    return () => URL.revokeObjectURL(objectUrl);
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
                {/* <div>
              <h1 className='text-xl font-semibold'>Institute</h1>
            </div>

            <div>
              <h1 className='text-xl font-semibold'>Degree</h1>
            </div> */}

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

        </div>
      </div>

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
