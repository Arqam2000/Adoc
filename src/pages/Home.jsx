import React, { useEffect, useState } from 'react'
import Search from '../components/home/Search'
import instantDoctor from '../assets/instant-doctorlogo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useDoctor from '../context/DoctorContext'
import useExperience from '../hooks/useExperience'
import ad from '../assets/lam-aesthetic-ad.png'
import ErrorModal from '../components/ErrorModal'
import useSpecializations from '../hooks/useSpecializations'
import { apiBaseUrl } from '../constants/constants'

export const Home = () => {
  const [doctors, setDoctors] = useState([])
  const [doctorExp, setDoctorExp] = useState([])
  const [reviews, setReviews] = useState()
  const [hospitals, setHospitals] = useState([])
  const [videoTimings, setVideoTimings] = useState([])
  const [error, setError] = useState(false)
  const [city, setCity] = useState("")
  const [specialization, setSpecialization] = useState("")
  // const doctors = [
  //   {
  //     name: "Assoc. Prof. Dr. Muhammad Ilyas",
  //     specialty: "Dentist",
  //     experience: "22 years experience",
  //     rating: "4.9/5",
  //     fee: "Rs. 500",
  //     image: "https://via.placeholder.com/80", // replace with real image
  //   },
  //   {
  //     name: "Dr. Zafar Ahmed",
  //     specialty: "Dermatologist",
  //     experience: "27 years experience",
  //     rating: "4.9/5",
  //     fee: "Rs. 3,000",
  //     image: "https://via.placeholder.com/80",
  //   },
  //   {
  //     name: "Prof. Dr. Muhammad Noman Rashid",
  //     specialty: "Gastroenterologist",
  //     experience: "18 years experience",
  //     rating: "4.9/5",
  //     fee: "Rs. 2,500",
  //     image: "https://via.placeholder.com/80",
  //   },
  // ];

  // const specializations = [
  //   { name: "Dermatologist", image: "https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1756738618796" },
  //   { name: "Gynecologist", image: "https://d1t78adged64l7.cloudfront.net/specialty-icons3/gynecologist.png?v=1756738618796" },
  //   { name: "Urologist", image: "https://via.placeholder.com/80" },
  //   { name: "Gastroenterologist", image: "https://via.placeholder.com/80" },
  //   { name: "Dentist", image: "https://via.placeholder.com/80" },
  //   { name: "Obesity Specialist", image: "https://via.placeholder.com/80" },
  //   { name: "ENT Specialist", image: "https://via.placeholder.com/80" },
  //   { name: "Orthopedic Surgeon", image: "https://via.placeholder.com/80" },
  //   { name: "Sexologist", image: "https://via.placeholder.com/80" },
  //   { name: "Neurologist", image: "https://via.placeholder.com/80" },
  //   { name: "Child Specialist", image: "https://via.placeholder.com/80" },
  //   { name: "Pulmonologist", image: "https://via.placeholder.com/80" },
  //   { name: "Eye Specialist", image: "https://via.placeholder.com/80" },
  //   { name: "General Physician", image: "https://via.placeholder.com/80" },
  // ];

  const myreviews = [
    {
      text: "Great platform, very efficient and works really well on both phone and web. I think this is the most easiest way of booking appointments in Pakistan as it has made the whole process much more efficient.",
      name: "Umer Fayyaz",
      image: "https://via.placeholder.com/60", // replace with real user image
    },
    {
      text: "A very helpful app for booking appointments and searching for the required doctors. Has made my life a lot easy. I would strongly recommend this to all.",
      name: "Aneeb Ryan",
      image: "https://via.placeholder.com/60",
    },
    {
      text: "Literally the best website to book the appointments online for Doctors. The service is great, helpline guys are very cooperative and understanding. And I don't have to hassle through different hospitals anymore now.",
      name: "Zainab Tariq",
      image: "https://via.placeholder.com/60",
    },
    {
      text: "Super smooth booking experience! No more waiting in lines and the reminders help me a lot.",
      name: "Ali Khan",
      image: "https://via.placeholder.com/60",
    },
    {
      text: "Excellent service, very user friendly and efficient. I will recommend it to everyone.",
      name: "Sara Ahmed",
      image: "https://via.placeholder.com/60",
    },
    {
      text: "Booking a doctor has never been this easy before. Highly recommended!",
      name: "Hamza Riaz",
      image: "https://via.placeholder.com/60",
    }
  ];

  const navigate = useNavigate()

  const [experiences] = useExperience(doctorExp, doctors)

  console.log("experiences from home", experiences)

  const [current, setCurrent] = useState(0);
  // const [specializations, setSpecializations] = useState([])

  const {specializations} = useSpecializations()

  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(reviews?.length / itemsPerSlide);

  const { doctorData } = useDoctor()

  console.log("doctorData from home", doctorData)

   const filterByVideoConsultation = doctors?.filter(doc => doc["is available for free video consultation"] === "Yes")

  console.log("filterByVideoConsultation ", filterByVideoConsultation)

  const getAllDoctors = async () => {
    try {
      const resp = await axios.post(`${apiBaseUrl}/api/v1/doctors/get-alldoctors`)

      if (resp.data.success) {
        setDoctors(resp.data.data)
        setDoctorExp(resp.data.doctorexp)
        setReviews(resp.data.reviews)
        setHospitals(resp.data.hospitals)
        setVideoTimings(resp.data.videoTimings)
      }

    } catch (error) {
      console.log("Error in getting doctors", error)
    }
  }

  useEffect(() => {

    getAllDoctors()

    // axios.get("http://localhost:4000/api/v1/specializations/get-specializations")
    //   .then((res) => {
    //     setSpecializations(res.data.specializations)
    //   })
    //   .catch((err) => {
    //     console.log("Error fetching specializations", err)
    //   })
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };


  return (
    <div className='relative'>
      <Search city={city} setCity={setCity} specialization={specialization} setSpecialization={setSpecialization}/>

      {/* How can we help you today? */}
      <div className='md:w-7xl mx-auto'>
        <h1 className='text-lg text-[#3A3A3A] font-bold '>How can we help you today?</h1>
        <div className='flex flex-wrap md:flex-nowrap justify-center gap-3 md:w-6xl mx-auto my-8 cursor-pointer'>
          <button className='w-1/3 shadow-md p-2 rounded-lg bg-[#DFEFEB] pl-5 flex flex-col justify-center items-center' onClick={() => navigate('/doctors', { state: { city, specialization, OnCallDoctor: true } })}>
            {/* <div className='w-40'>
              <img src={instantDoctor} alt="instant-doctorlogo.png" />
            </div> */}
            <h2 className='text-[#014e78] text-base font-bold'>On Call Doctor</h2>
            <p className='text-sm text-[#4B4B4B] font-semibold'>One Click to Comfort</p>
          </button>

          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#FBE0D0] flex justify-center items-center'>
            <button onClick={() => {
              if ((!city || city === "Enter City") && (!specialization || specialization === "Enter Specialization")) {
                setError(true)
              } else {
                // alert("Booking Clinic Visit for " + specialization + " in " + city)

                navigate('/doctors', { state: { city, specialization, OnCallDoctor: false } })

              }
            }} className='cursor-pointer'>
              <h2 className='text-[#014e78] text-base font-bold'>Visit Clinic</h2>
              <p className='text-sm text-[#4B4B4B] font-semibold'>Book Appointment</p>
            </button>
            {/* <div className='w-35 flex justify-end'>
              <img src={femaleDoc} alt="" />

            </div> */}
          </div>

          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#DFEFEB] flex justify-center items-center'>
            <button onClick={() => {
              navigate('/doctors', { state: { city, specialization, OnCallDoctor: false, videoConsultation: true } })
            }}>
              <h2 className='text-[#014e78] text-base font-bold'>Video Consultation</h2>
              {/* <p className='text-sm text-[#4B4B4B] font-semibold'>PMC Verified Doctors</p> */}
            </button>
          </div>
          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#FBE0D0] flex justify-center items-center'>
            <div>
              <h2 className='text-[#014e78] text-base font-bold'>Donate Blood/Organs</h2>

            </div>
          </div>

          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#DFEFEB] flex justify-center items-center'>
            <div>
              <h2 className='text-[#014e78] text-base font-bold'>Who Am I?</h2>

            </div>
          </div>
        </div>
      </div>

      {/* Consult Doctors World Wide Free of Cost */}
      <div className="bg-[#f0f8fa] p-4 rounded-lg md:w-7xl mx-auto my-5">
        <h1 className='text-lg text-[#3A3A3A] font-bold '>Consult Doctors World Wide Free of Cost</h1>
        {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 my-4 lg:overflow-x-scroll overflow-y-visible scroll-smooth">
          {filterByVideoConsultation.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-gradient-to-r from-[#3fa9d0] to-[#167aa8] text-white rounded-lg p-4 shadow-md overflow-hidden shrink-0 md:w-1/3"
            >
              <Link to={`view-profile/${doc.dr}`} className="flex items-center gap-3">
                <img
                  src={doc.picture}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full border-2 border-white object-cover"
                />
                <div className='flex flex-col gap-1'>
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="text-sm">{doc.Specialization_name}</p>
                  <p className="text-sm">{doc.qualifications}</p>
                  <div className='flex justify-between'>
                    <p className="text-xs">{experiences[index]?.years ? experiences[index].years + " years experience" : experiences[index]?.months + " months experience"}</p>

                    <div>
                      <h2 className='text-xs font-semibold'>Satisfaction</h2>
                      <h2 className='text-xs'>{reviews?.[index].satisfaction_percentage.split(".")[0]}%</h2>

                    </div>
                  </div>
                </div>
              </Link>

              {/* <div className="flex justify-between items-center mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span>{doc.rating}</span>
                </div>
                {/* <span className="font-semibold">{doc.fee}</span>
              </div> */} 
            </div>
          ))}
        </div>
      </div>

      {/* Consult Doctors by Specialization */}
      <div className="p-6 md:w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* <h2 className="text-lg font-semibold">Consult best doctors online</h2> */}
          <h1 className='text-lg text-[#3A3A3A] font-bold '>Consult Doctors by Specialization</h1>
          <a href="#" className="text-blue-900 font-medium hover:underline">
            View All
          </a>
        </div>

        {/* Grid of Specializations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {specializations?.map(({ Specialization_code, Specialization_name, picture }, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer w-fit" onClick={() => navigate('/doctors', { state: { specialization: Specialization_name } })}>
              {/* <Link to='/doctors' > */}
              <div className="w-20 h-20 rounded-full bg-[#e9f2f9] flex items-center justify-center shadow-sm">
                <img
                  src={picture}
                  alt={Specialization_name}
                  className="w-full object-fill"
                />
              </div>
              <p className="mt-2 text-sm text-center">{Specialization_name}</p>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="py-10 ">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">
            Our Customers <span className="text-blue-900">love us</span>
          </h2>
          <p className="text-gray-600">
            Check out the reviews from our satisfied customers
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4"
                >
                  {myreviews
                    .slice(
                      slideIndex * itemsPerSlide,
                      slideIndex * itemsPerSlide + itemsPerSlide
                    )
                    .map((review, index) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 text-center border flex flex-col h-[338px]"
                      >
                        {/* Stars */}
                        <div className="flex justify-center mb-4">
                          <span className="bg-[#fff1dc] text-yellow-500 px-3 py-1 rounded-md text-lg">
                            ★★★★★
                          </span>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 italic mb-6 flex-1">
                          “{review.text}”
                        </p>

                        {/* Reviewer */}
                        <div className="flex flex-col items-center">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-14 h-14 rounded-full border-2 border-yellow-400 object-cover"
                          />
                          <h4 className="mt-2 font-semibold text-blue-900">
                            {review.name}
                          </h4>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100"
          >
            ›
          </button>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center text-xl py-2 md:w-5xl mx-auto mb-4 gap-2'>
        <h3>Advertisement</h3>
        <Link to="https://lamaesthetic.co.uk" target='_blank'><img src={ad} alt="ad" className='h-72'/></Link> 
      </div>

      {error && <ErrorModal setError={setError}/>}
    </div>
  )
}
