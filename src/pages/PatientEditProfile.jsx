import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { set } from 'date-fns'
import { apiBaseUrl } from '../constants/constants'

const PatientEditProfile = () => {

  const [patientData, setPatientData] = React.useState(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [bloodGroup, setBloodGroup] = React.useState("");
  const [isEditName, setIsEditName] = React.useState(false);
  const [isEditEmail, setIsEditEmail] = React.useState(false);
  const [isEditPhone, setIsEditPhone] = React.useState(false);
  const [isEditBloodGroup, setIsEditBloodGroup] = React.useState(false);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/v1/patients/${localStorage.getItem("patientId")}`)
      .then((res) => {
        console.log(res.data.patient)
        setPatientData(res.data.patient);
        setName(res.data.patient.pname);
        setEmail(res.data.patient.pemail);
        setPhone(res.data.patient.pmobile);
        setBloodGroup(res.data.patient.blood_group);
      })
      .catch((err) => {
        console.error("Error fetching patient data:", err);
      });
  }, [])

  const EditName = async () => {
    try {
      const res = await axios.put(`${apiBaseUrl}/api/v1/patients/edit-name/${localStorage.getItem("patientId")}`, {
        pname: name
      });

      if (res.data.success) {
        setPatientData(prev => ({ ...prev, pname: name }));
        setIsEditName(false);
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  }

  const EditEmail = async () => {
    try {
      const res = await axios.put(`${apiBaseUrl}/api/v1/patients/edit-email/${localStorage.getItem("patientId")}`, {
        pemail: email
      });

      if (res.data.success) {
        setPatientData(prev => ({ ...prev, pemail: email }));
        setIsEditEmail(false);
      }

    } catch (error) {
      console.error("Error updating email:", error);
    }
  }

  const EditPhone = async () => {
    try {
      const res = await axios.put(`${apiBaseUrl}/api/v1/patients/edit-phone/${localStorage.getItem("patientId")}`, {
        pmobile: phone
      });

      if (res.data.success) {
        setPatientData(prev => ({ ...prev, pmobile: phone }));
        setIsEditPhone(false);
      }
    } catch (error) {
      console.error("Error updating phone:", error);
    }
  }

  const EditBloodGroup = async () => {
    try {
      const res = await axios.put(`${apiBaseUrl}/api/v1/patients/edit-blood-group/${localStorage.getItem("patientId")}`, {
        blood_group: bloodGroup
      });

      if (res.data.success) {
        setPatientData(prev => ({ ...prev, blood_group: bloodGroup }));
        setIsEditBloodGroup(false);
      }
    } catch (error) {
      console.error("Error updating blood group:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <ToastContainer />
      <div className="max-w-96 md:max-w-5xl  mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <BackButton />
        {/* Doctor Header */}
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="flex items-center justify-between mr-5 gap-6 border-b pb-6 mb-6">
          <div className="flex items-center gap-6">
            {/* <div className="w-24 h-24 rounded-full overflow-hidden border">
              <img
                src={personalInfo?.selectedImage || "/placeholder.png"}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div> */}
            <div>
              {/* {doctor?.map((doc) => ( */}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-3'>
                  <h3 className="text-xl text-gray-600">Name: {patientData?.pname}</h3>
                  <button className='cursor-pointer' onClick={() => {
                    setIsEditName(true);
                  }}>Edit</button>
                </div>
                {
                  isEditName && <div className='flex items-center gap-3'>
                    <input type="text" className='w-full outline-none border border-gray-400 p-1 mt-2 mb-3' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)} />
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={EditName}>Save</button>
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setIsEditName(false)}>Cancel</button>
                  </div>
                }
                <div className='flex items-center gap-3'>
                  <p className="text-xl text-gray-600">Email: {patientData?.pemail}</p>
                  <button className='cursor-pointer' onClick={() => {
                    setIsEditEmail(true);
                  }}>Edit</button>
                </div>
                {
                  isEditEmail && <div className='flex items-center gap-3'>
                    <input type="text" className='w-full outline-none border border-gray-400 p-1 mt-2 mb-3' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={EditEmail}>Save</button>
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setIsEditEmail(false)}>Cancel</button>
                  </div>
                }
                <div className='flex items-center gap-3'>
                  <p className="text-xl text-gray-600">Phone: {patientData?.pmobile}</p>
                  <button className='cursor-pointer' onClick={() => {
                    setIsEditPhone(true);
                  }}>Edit</button>

                </div>
                {
                  isEditPhone && <div className='flex items-center gap-3'>
                    <input type="text" className='w-full outline-none border border-gray-400 p-1 mt-2 mb-3' placeholder='Enter phone number' value={phone} onChange={e => setPhone(e.target.value)} />
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={EditPhone}>Save</button>
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setIsEditPhone(false)}>Cancel</button>
                  </div>
                }
                <div className='flex items-center gap-3'>
                  <p className="text-xl text-gray-600">Blood Group: {patientData?.blood_group}</p>
                  <button className='cursor-pointer' onClick={() => {
                    setIsEditBloodGroup(true);
                  }}>Edit</button>

                </div>
                {
                  isEditBloodGroup && <div className='flex items-center gap-3'>
                    <input type="text" className='w-full outline-none border border-gray-400 p-1 mt-2 mb-3' placeholder='Enter blood group' value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} />
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={EditBloodGroup}>Save</button>
                    <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setIsEditBloodGroup(false)}>Cancel</button>
                  </div>
                }

              </div>
              {/* ))} */}
            </div>
          </div>
          <div className="">
            {/* <button className="py-1 px-3 bg-blue-500 text-white rounded " onClick={handleAllSave}>Save</button> */}
          </div>

        </div>
      </div>
    </div>
  )
}

export default PatientEditProfile
