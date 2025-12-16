import React from 'react'

const ReviewCard = ({review}) => {

  if (review.staff_behaviour === 1) {
    review.staff_behaviour = "Unprofessional staff behaviour"
  } else if (review.staff_behaviour === 2) {
    review.staff_behaviour = "Poor staff behaviour"
  } else if (review.staff_behaviour === 3) {
    review.staff_behaviour = "Average staff behaviour"
  } else if (review.staff_behaviour === 4) {
    review.staff_behaviour = "Professional staff behaviour"
  } else if (review.staff_behaviour === 5) {
    review.staff_behaviour = "Excellent staff behaviour"
  }
  return (
    <div className='rounded p-3 bg-white shadow flex flex-col gap-1'>
      <p className='text-base font-medium'>{review.dr_name}</p>
      <p className='text-base font-medium'>Review Date {review.date.split("T")[0]}</p>
      <p className='text-lg font-medium'>{review.overall_satisfaction === 'Y'? "I am satisfied with the doctor": "I am not satisfied with the doctor"}</p>
      <p>{review.remarks}</p>

      <div className='flex items-center gap-3'>
        <p className='text-xs text-[#4CA585] bg-[#f0fff3] border border-[#4CA585] rounded py-1 px-4'>{review.waiting_time ? review.waiting_time + "mins wait time" : "No waiting time"}</p>
        {/* <p className='text-xs text-[#4CA585] bg-[#f0fff3] border border-[#4CA585] rounded py-1 px-4'>Doctor's Behaviour</p> */}
        {review.staff_behaviour != 0 && <p className='text-xs text-[#4CA585] bg-[#f0fff3] border border-[#4CA585] rounded py-1 px-4'>{review.staff_behaviour}</p>}
        <p className='text-xs text-[#4CA585] bg-[#f0fff3] border border-[#4CA585] rounded py-1 px-4'>{review.clinic_environment > 3 ? "Good Clinic Environment": "Poor Clinic Environment"}</p>
        <p className='text-xs text-[#4CA585] bg-[#f0fff3] border border-[#4CA585] rounded py-1 px-4'>{review.consultation_time + "mins meetup"}</p>
      </div>
    </div>
  )
}

export default ReviewCard
