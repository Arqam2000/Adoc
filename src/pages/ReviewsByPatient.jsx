import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/ReviewCard';
import axios from 'axios';

const ReviewsByPatient = () => {
  const [reviews,setReviews] = useState([])

  const getReviewsByPatient = async () => {
    try {
      const res = await axios.get(`/api/v1/reviews/get-reviews-by-patient/${localStorage.getItem("patientId")}`);

      if (res.data.success) {
        console.log("Reviews by patient fetched successfully", res.data.reviews);
        setReviews(res.data.reviews);
      }

    } catch (error) {
      console.log("An error occurred while fetching the reviews", error)
    }
  }

  useEffect(() => {
    getReviewsByPatient()
  }, [])

  return (
    <div className='space-y-4 '>
      <h1 className='text-2xl font-semibold'>Reviews</h1>
      {
        reviews.map((review, idx) => (
          <ReviewCard key={review.id} review={review}/>
        ))
      }
    </div>
  )
}

export default ReviewsByPatient
