import React, { useState } from 'react'
import Search from '../components/home/Search'
import femaleDoc from "../assets/female-doc.avif"
import instantDoctor from '../assets/instant-doctorlogo.png'
import { Link, useNavigate } from 'react-router-dom'

export const Home = () => {
  const doctors = [
    {
      name: "Assoc. Prof. Dr. Muhammad Ilyas",
      specialty: "Dentist",
      experience: "22 years experience",
      rating: "4.9/5",
      fee: "Rs. 500",
      image: "https://via.placeholder.com/80", // replace with real image
    },
    {
      name: "Dr. Zafar Ahmed",
      specialty: "Dermatologist",
      experience: "27 years experience",
      rating: "4.9/5",
      fee: "Rs. 3,000",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "Prof. Dr. Muhammad Noman Rashid",
      specialty: "Gastroenterologist",
      experience: "18 years experience",
      rating: "4.9/5",
      fee: "Rs. 2,500",
      image: "https://via.placeholder.com/80",
    },
  ];

  const specializations = [
    { name: "Dermatologist", image: "https://d1t78adged64l7.cloudfront.net/specialty-icons3/skin-specialist.png?v=1756738618796" },
    { name: "Gynecologist", image: "https://d1t78adged64l7.cloudfront.net/specialty-icons3/gynecologist.png?v=1756738618796" },
    { name: "Urologist", image: "https://via.placeholder.com/80" },
    { name: "Gastroenterologist", image: "https://via.placeholder.com/80" },
    { name: "Dentist", image: "https://via.placeholder.com/80" },
    { name: "Obesity Specialist", image: "https://via.placeholder.com/80" },
    { name: "ENT Specialist", image: "https://via.placeholder.com/80" },
    { name: "Orthopedic Surgeon", image: "https://via.placeholder.com/80" },
    { name: "Sexologist", image: "https://via.placeholder.com/80" },
    { name: "Neurologist", image: "https://via.placeholder.com/80" },
    { name: "Child Specialist", image: "https://via.placeholder.com/80" },
    { name: "Pulmonologist", image: "https://via.placeholder.com/80" },
    { name: "Eye Specialist", image: "https://via.placeholder.com/80" },
    { name: "General Physician", image: "https://via.placeholder.com/80" },
  ];

  const reviews = [
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

  const [current, setCurrent] = useState(0);
  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };


  return (
    <div>
      <Search />

      {/* How can we help you today? */}
      <div className='w-7xl mx-auto'>
        <h1 className='text-lg text-[#3A3A3A] font-bold '>How can we help you today?</h1>
        <div className='flex gap-3 w-6xl mx-auto my-8 cursor-pointer'>
          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#DFEFEB] pl-5 flex flex-col justify-center items-center'>
            <div className='w-40'>
              <img src={instantDoctor} alt="instant-doctorlogo.png" />
            </div>
            <p className='text-sm text-[#4B4B4B] font-semibold'>Get Instant Relief in a Click</p>
          </div>

          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#FBE0D0] flex justify-center items-center'>
            <div>
              <h2 className='text-[#014e78] text-base font-bold'>In-clinic Visit</h2>
              <p className='text-sm text-[#4B4B4B] font-semibold'>Book Appointment</p>
            </div>
            {/* <div className='w-35 flex justify-end'>
              <img src={femaleDoc} alt="" />

            </div> */}
          </div>

          <div className='w-1/3 shadow-md p-2 rounded-lg bg-[#DFEFEB] flex justify-center items-center'>
            <div>
              <h2 className='text-[#014e78] text-base font-bold'>Video Consultation</h2>
              <p className='text-sm text-[#4B4B4B] font-semibold'>PMC Verified Doctors</p>
            </div>
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
      <div className="bg-[#f0f8fa] p-4 rounded-lg w-7xl mx-auto my-5">
        <h1 className='text-lg text-[#3A3A3A] font-bold '>Consult Doctors World Wide Free of Cost</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-gradient-to-r from-[#3fa9d0] to-[#167aa8] text-white rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-16 h-16 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="text-sm">{doc.specialty}</p>
                  <p className="text-xs">{doc.experience}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span>{doc.rating}</span>
                </div>
                {/* <span className="font-semibold">{doc.fee}</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consult Doctors by Specialization */}
      <div className="p-6 w-7xl mx-auto">
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
          {specializations.map((spec, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/doctors', { state: {name: spec.name} })}>
              {/* <Link to='/doctors' > */}
              <div className="w-20 h-20 rounded-full bg-[#e9f2f9] flex items-center justify-center shadow-sm">
                <img
                  src={spec.image}
                  alt={spec.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="mt-2 text-sm text-center">{spec.name}</p>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="py-10 bg-white">
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
                  {reviews
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

      <div className='text-center border text-xl py-2 w-5xl mx-auto mb-4'>
        Advertisement
      </div>
    </div>
  )
}
