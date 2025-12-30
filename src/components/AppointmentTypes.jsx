import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { apiBaseUrl } from '../constants/constants';

const AppointmentTypes = () => {
  const [appointmentType, setAppointmentType] = useState('');
  const [availableForFreeVideoConsultation, setAvailableForFreeVideoConsultation] = useState('');

  const handleRadioChange = (event) => {
    console.log(event.target.value)
    setAppointmentType(event.target.value);
  };

  const handleSave = async () => {
    // Save the appointmentType and availableForFreeVideoConsultation values to the server or database
    console.log("Saving Appointment Type:", appointmentType);
    console.log("Saving Available for Free Video Consultation:", availableForFreeVideoConsultation);  
    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/doctors/appointment-type`, {
        dr: JSON.parse(localStorage.getItem("doctor")).dr,
        appointmentType,
        availableForFreeVideoConsultation
      });

      if(res.data.success){
        toast.success("Appointment Types saved successfully");
      }

    } catch (error) {
      toast.error("Error in saving Appointment Types");
      console.log("Error in saving Appointment Types", error);
    }
  }

  return (
    <div>
      {/* <h3 className='text-lg font-semibold'>Appointment Types</h3> */}
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Appointment Types</h3>
        <h3 className='text-lg font-semibold'>Available for Free Video Consultation</h3>
        <h3 className='text-lg font-semibold'></h3>
      </div>
      <div className='flex justify-between items-center mb-3'>
        <div className='flex gap-1'>
          <input type="radio" name="Clinic Visit" id="Clinic Visit" value="Walk in" onChange={handleRadioChange} checked={appointmentType === "Walk in"}/>
          <label htmlFor="">Walk in</label>
          <input type="radio" name="Clinic Visit" id="Clinic Visit" value="Through Appointment" onChange={handleRadioChange} checked={appointmentType === "Through Appointment"}/>
          <label htmlFor="">Through Appointment</label>
          <input type="radio" name="Clinic Visit" id="Clinic Visit" value="Both" onChange={handleRadioChange} checked={appointmentType === "Both"} />
          <label htmlFor="">Both</label>
        </div>

        <div className='flex gap-1'>
          <input type="radio" name="Free Video Consultation" id="Available for Free Video Consultation"  onChange={(e) => {
            console.log(e.target.value)
            setAvailableForFreeVideoConsultation(e.target.value)
            }} value="Yes" checked={availableForFreeVideoConsultation === "Yes"}/>
          <label htmlFor="Available for Free Video Consultation">Yes</label>
          <input type="radio" name="Free Video Consultation" id="Not Available for Free Video Consultation" onChange={(e) => {
            console.log(e.target.value)
            setAvailableForFreeVideoConsultation(e.target.value)
            }} value="No" checked={availableForFreeVideoConsultation === "No"}/>
          <label htmlFor="Not Available for Free Video Consultation">No</label>
        </div>
        <div className='w-1/3'>

        </div>

      </div>
      <button className='bg-blue-500 py-1 px-3 rounded text-white cursor-pointer' onClick={handleSave}>Save</button>
    </div>
  )
}

export default AppointmentTypes
