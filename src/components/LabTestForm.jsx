import axios from 'axios';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { apiBaseUrl } from '../constants/constants';

const LabTestForm = ({ setLabTestForm, labTestInfo, setLabTestInfo }) => {
  const [addDoctor, setAddDoctor] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    try {
      const formData = new FormData();
      formData.append("file", labTestInfo.labReport);
      formData.append("date", labTestInfo.date);
      formData.append("doctor", labTestInfo.doctor);
      formData.append("labTestFor", labTestInfo.labTestFor);
      formData.append("patientId", localStorage.getItem("patientId"));

      const res = await axios.post(`${apiBaseUrl}/api/v1/labTests`, formData)

      setLabTestForm(false);
      toast.success("Lab Test added successfully");

    } catch (error) {
      console.error("Error submitting lab test form:", error);
      toast.error("Failed to add lab test. Please try again.");
    }
  };

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black/30 z-50'>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white rounded-xl shadow p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:w-1/3 w-4/5">
        <h3 className='text-xl font-semibold text-center'>Lab Test Form</h3>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" className='w-full outline-none border border-gray-400 p-1 mt-1 mb-3' onChange={e => setLabTestInfo(prev => ({ ...prev, date: e.target.value }))} />
        </div>
        <div>
          <label htmlFor="doctor">Doctor</label>
          <div className='flex items-center gap-1'>
            <select name="doctor" id="doctor" className='w-full outline-none border border-gray-400 p-1 mt-1 ' onChange={e => setLabTestInfo(prev => ({ ...prev, doctor: e.target.value }))}></select>
            <button type='button' className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => {
              if (!addDoctor) {
                setAddDoctor(true)
              }
              }}>+</button>
          </div>
          {
            addDoctor && <div className='flex items-center gap-1'>
              <input type="text" className='w-full outline-none border border-gray-400 p-1 mt-2 mb-3' placeholder='Enter doctor name if not found above' onChange={e => setLabTestInfo(prev => ({ ...prev, doctor: e.target.value }))} />
              <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setAddDoctor(false)}>x</button>
              </div>
          }
        </div>
        <div>
          <label htmlFor="lab-test-for">Lab Test For</label>
          <input type="text" className='w-full outline-none border border-gray-400 p-1 mt-1 mb-3' onChange={e => setLabTestInfo(prev => ({ ...prev, labTestFor: e.target.value }))} />
        </div>
        <div>
          <h3>Lab Report</h3>
          <label htmlFor="lab-report"></label>
          <input type="file" id="lab-report" name="file" className='w-full outline-none border border-gray-400 p-1 mt-1 mb-3' onChange={e => setLabTestInfo(prev => ({ ...prev, labReport: e.target.files[0] }))} />
        </div>
        <div className='flex justify-center gap-2'>
          <button type='submit' className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded'>Submit</button>
          <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setLabTestForm(false)}>Close/Cancel</button>

        </div>
      </form>
    </div>

  )
}

export default LabTestForm
