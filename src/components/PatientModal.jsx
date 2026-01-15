import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { apiBaseUrl } from '../constants/constants'
import useLoginName from '../context/LoginContext'

const PatientModal = ({ setOpen, apt }) => {
  const [symptom, setSymptom] = useState("")
  const [prescription, setPrescription] = useState("")
  const [nextFollowUp, setNextFollowUp] = useState("")
  const [labTestAdvice, setLabTestAdvice] = useState("")

  const {pd} = useLoginName()
  console.log("apt", apt)

  const handleSave = async () => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/appointments/edit-appointment`, {
        bappoint: apt.bappoint,
        symptom,
        prescription,
        nextFollowUp,
        labTestAdvice
      })

      toast.success("Saved successfuly")

    } catch (error) {
      console.log("Error while editing the appointment:", error)
      toast.error("Something went wrong")
    }
  }

  const getAppointment = async () => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/v1/appointments/get-appointment`, {
        bappoint: apt.bappoint
      })

      console.log(res.data.data)
      setSymptom(res.data.data.symptom)
      setPrescription(res.data.data.prescription)
      setNextFollowUp(res.data.data.next_follow_up)
      setLabTestAdvice(res.data.data.lab_test_advice)

    } catch (error) {
      console.log("Cannot get appointmets", error)
    }
  }

  useEffect(() => {
    getAppointment()
  }, [])

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black/30 z-50">
      <ToastContainer />
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg relative">
        <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setOpen(false)}>✕</button>
        {/* <h3 className='text-center text-xl text-red-500 '>Error</h3> */}
        <h2 className='text-center text-2xl'>Patient</h2>
        <div className='flex flex-col gap-1'>
          <p className='text-base font-medium'>Name: <span className='font-normal'>{apt.patient}</span></p>
          <p className='text-base font-medium'>Phone: <span className='font-normal'>{apt.phone}</span></p>
          {apt.hospital && <p className='text-base font-medium'>Hospital: <span className='font-normal'>{apt.hospital}</span></p>}
          <p className='text-base font-medium'>Fees: <span className='font-normal'>{apt.fees}</span></p>

          <div className='flex flex-col gap-1'>
            <label className='text-base font-medium'>Symptom: </label>
            <textarea
              type="text"
              className='outline-0 border border-gray-400 w-full p-1'
              cols="30"
              rows="3"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
            />
          </div>
          <label className='text-base font-medium'>Prescription: </label>
          <textarea
            className='outline-0 border border-gray-400 p-1'
            cols="30"
            rows="4"
            value={prescription}
            onChange={e => setPrescription(e.target.value)}
          ></textarea>
          <div className='flex gap-1'>
            <label className='text-base font-medium'>Next follow up: </label>
            <input
              type="text"
              className='outline-0 border border-gray-400  p-1'
              value={nextFollowUp}
              onChange={e => setNextFollowUp(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-base font-medium'>Lab test advice: </label>
            <textarea
              type="text"
              className='outline-0 border border-gray-400  p-1'
              cols="30"
              rows="3"
              value={labTestAdvice}
              onChange={e => setLabTestAdvice(e.target.value)}
            />

          </div>

          <div className='flex justify-center gap-2 mt-2'>
            {pd === "d" && <><button
              className='py-1 px-2 bg-blue-500 text-white rounded cursor-pointer'
              onClick={handleSave}
            >Save</button>
            <button
              className='py-1 px-2 bg-blue-500 text-white rounded cursor-pointer'
              onClick={() => setOpen(false)}
            >Cancel</button></>
            }
            <button
              className='py-1 px-2 bg-blue-500 text-white rounded cursor-pointer'
              onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientModal
