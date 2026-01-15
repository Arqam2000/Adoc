import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/ReviewCard'
import axios from 'axios'
import { apiBaseUrl } from '../constants/constants'

const ReviewsByDoctor = ({id}) => {
  const [reviews,setReviews] = useState([])
  
    const getReviewsByDoctor = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/v1/reviews/get-reviews-by-doctor/${id}`);

        if (res.data.success) {
          console.log("Reviews by doctor fetched successfully", res.data.reviews);
          setReviews(res.data.reviews);
        }
  
      } catch (error) {
        console.log("An error occurred while fetching the reviews", error)
      }
    }
  
    useEffect(() => {
      getReviewsByDoctor()
    }, [])
  return (
    <div className='space-y-4 '>
      <h1 className='text-2xl font-semibold'>Reviews</h1>
      {
        reviews.map((review, idx) => (
          <ReviewCard key={review.id} review={review} docId={id}/>
        ))
      }
    </div>
  )
}

export default ReviewsByDoctor
