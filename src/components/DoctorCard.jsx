import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DoctorCard = ({ 
  dr, 
  picture, 
  name, 
  specialization, 
  experience, 
  review, 
  fees, 
  specializationName, 
  qualifications, 
  pmdc_verification, 
  hospitals,
  videoTimings }) => {

  const [availability, setAvailability] = useState([]);
  const [videoAvailability, setVideoAvailability] = useState([]);
  const [grouped, setGrouped] = useState([]);

  const navigate = useNavigate()

  console.log("experience in DoctorCard", experience)

  const calculateAvailability = () => {
    // JS getDay(): 0=Sun, 1=Mon, ..., 6=Sat
    const days = [
      { day: 0, day_name: "Sun" },
      { day: 1, day_name: "Mon" },
      { day: 2, day_name: "Tue" },
      { day: 3, day_name: "Wed" },
      { day: 4, day_name: "Thu" },
      { day: 5, day_name: "Fri" },
      { day: 6, day_name: "Sat" },
    ];

    const todayDay = new Date().getDay();

    const dayObj = days.find((day) => day.day === todayDay);

    console.log("Today:", dayObj.day_name);

    // Map all hospitals with today's availability status
    const mapped = hospitals?.map((hos) => ({
      ...hos,
      isAvailable: hos.day === dayObj.day_name,
      nextAvailableDay: days.find((day) => day.day_name === hos.day)?.day_name
    }));

    console.log("mapped", mapped);

    const videoAvailability = videoTimings?.map((video) => ({
      ...video,
      isAvailable: video.day === dayObj.day_name,

    }));

    setVideoAvailability(videoAvailability || []);

    setAvailability(mapped || []);
  };

  // console.log('availability', availability)
  // console.log('videoAvailability', videoAvailability)
  // console.log('hospitals', hospitals)
  // console.log("videoTimings", videoTimings)

  useEffect(() => {
    const grouped = availability.reduce((acc, item) => {
      if (!acc[item.hospital_name]) {
        acc[item.hospital_name] = {
          dr: item.dr,
          hospital_name: item.hospital_name,
          fees: item.fees,
          nextAvailableDay: item.nextAvailableDay,
          doctors: []
        };
      }

      acc[item.hospital_name].doctors.push({
        designation: item.DDesig,
        fees: item.fees,
        day: item.day,
        isAvailable: item.isAvailable,
        timein: item.timein,
        timeout: item.timeout
      });

      return acc;
    }, {});

    // console.log("grouped", grouped)

    setGrouped(Object.values(grouped));
  }, [availability])


  useEffect(() => {
    calculateAvailability()
  }, [hospitals])

  return (
    <div className='p-2 rounded-md bg-white w-sm text-black shadow-md flex flex-col justify-center'>
      <div className='flex gap-3'>
        <div>
          <img
            src={picture}
            alt="doc-img"
            className="w-16 h-16 rounded-full border-2 border-white object-cover"
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='underline font-semibold'>{name}</h2>
          <h2 className='underline font-semibold'>PMDC {pmdc_verification?.charAt(0).toUpperCase() + pmdc_verification?.slice(1)}</h2>
          <h2 className='text-xs'>{specializationName ? specializationName : specialization}</h2>
          <h2 className='text-xs'>{qualifications}</h2>
          <div className='flex justify-between mb-3'>
            <div>
              <h2 className='text-xs font-semibold'>Experience</h2>
              <h2 className='text-xs'>{(experience?.years) ? `${experience.years} years` : `${experience?.months} months`}</h2>
            </div>
            <div>
              <h2 className='text-xs font-semibold'>Reviews</h2>
              <h2 className='text-xs'>{review?.rew}</h2>
            </div>
            <div>
              <h2 className='text-xs font-semibold'>Satisfaction</h2>
              <h2 className='text-xs'>{review?.satisfaction_percentage.split(".")[0]}%</h2>

            </div>
          </div>
          {/* <p className='text-xs'>{rating}</p> */}
        </div>
      </div>
      <div className='flex justify-between'>
        {/* <div>
                    <p className='text-sm'>online</p>
                </div> */}
        <p className='text-sm'>{fees}</p>
      </div>

      <div className='mb-2'>
        {/* {
                    hospitals?.map((hos, index) => (
                        <div className='p-2 border mb-2'>
                            <h1>{hos.hospital_name}</h1>
                            

                            {



                                // hos.day == foundDays[index]?.day ? <h1 className={`text-green-400`}>{"Available today"}</h1> : <h1 className={`text-white`}>{"Not available today"}</h1>
                            }

                        </div>
                    ))
                } */}

        <ul className="space-y-2">
          {/* {availability.map((hosp) => (
                        <li
                            key={hosp.doctorhd}
                            className="p-3 border rounded-lg flex justify-between items-center"
                        >
                            <span className="font-medium">{hosp.hospital_name}</span>
                            {hosp.isAvailable ? (
                                <span className="text-green-600 font-bold">Available Today</span>
                            ) : (
                                <span className="text-red-600 font-bold">Not Available</span>
                            )}
                        </li>
                    ))} */}

          {grouped.map((hosp) => (
            <li
              key={hosp.hospital_name}
              className="p-3 border rounded-lg"
            >
              <div className='flex justify-between items-center mb-2'>
                <span className="font-medium">{hosp.hospital_name}</span>
                {hosp.doctors.some(doc => doc.isAvailable) ? (
                  <span className="text-green-600 font-bold">Available Today</span>
                ) : (
                  <span className="text-gray-600 font-bold"> Available on {hosp.nextAvailableDay}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-3 gap-2'>
          <button className='px-2 py-1 rounded bg-green-500 cursor-pointer text-white'>Call Now</button>
          <button className='px-2 py-1 rounded bg-green-500 cursor-pointer text-white' onClick={() => {
            navigate("/book-appointment", { state: { videoTimings: videoAvailability, mode: "video" } })

            // console.log("videoTimings", videoTimings)
          }}>Video Consultation</button>
          <button className='px-2 py-1 rounded bg-amber-400 cursor-pointer font-semibold text-white' onClick={() => {
            navigate("/book-appointment", { state: { availability: grouped, mode: "clinic" } })
          }}>Book Appointment</button>
        </div>

        <button className='px-2 py-1 rounded bg-[#004d70] cursor-pointer text-white' onClick={() => navigate(`/view-profile/${dr}`, { state: { name, specialization: specializationName || specialization, experience, fees } })}>View Profile</button>
      </div>
    </div>
  )
}

export default DoctorCard
