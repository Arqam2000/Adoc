import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import BackButton from '../components/BackButton';

const VideoConsultation = ({ historyVideo }) => {
  const [status, setStatus] = useState([]);
  const navigate = useNavigate()
  let videoConsultations = [];

  if (!historyVideo) {
    const location = useLocation();

    console.log("location.state", location.state)

    historyVideo = location.state?.historyVideo

    videoConsultations = location.state?.videoConsultations
  }

  console.log("historyVideo in VideoConsultation", historyVideo)

  const handleQuit = async () => {
    try {
      const res = await axios.post('/api/v1/appointments/close-appointment', {
        dr: JSON.parse(localStorage.getItem('doctor')).dr,
        date: videoConsultations[0].time,
        status: "closed"
      });

      if (res.data.success) {
        navigate('/dashboard');
        // window.location.reload();
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data.message);
    }
  }

  const handleSave = async () => {
    try {
      console.log(videoConsultations)
      const res = await axios.post('/api/v1/appointments/save-appointment-status', {
        dr: JSON.parse(localStorage.getItem('doctor')).dr,
        appointments: videoConsultations
      })

      toast.success(res.data.message)


    } catch (error) {
      console.log("Cannot save appointments", error)

      toast.error(error?.response?.data.message);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <ToastContainer />
      <BackButton />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold mb-4">Video Consultations</h3>
        <div className='flex gap-1'>
          <button className='bg-blue-500 p-1 px-3 rounded text-white cursor-pointer' onClick={handleSave}>Save</button>
          <button className='bg-blue-500 p-1 px-3 rounded text-white cursor-pointer' onClick={handleQuit}>Quit for today</button>
        </div>

      </div>
      {/* {historyVideo?.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="pb-2">Patient</th>
              <th className="pb-2">Time</th>
              <th className="pb-2">Fees</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {historyVideo.map((vc, idx) => (
              <tr key={idx} className="border-b text-sm">
                <td className="py-2">{vc.patient}</td>
                <td className="py-2">{vc.time}</td>
                <td className="py-2">{vc.fees}</td>
                <td className="py-2">{vc.status}</td>
                <td className="py-2">{vc.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No past video consultations.</p>
      )} */}



      {videoConsultations?.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="pb-2">Patient</th>
              <th className="pb-2">Time</th>
              <th className="pb-2">Fees</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {videoConsultations.map((vc, idx) => (
              <tr key={idx} className="border-b text-sm">
                <td className="py-2">{vc.patient}</td>
                <td className="py-2">{vc.time}</td>
                <td className="py-2">{vc.fees}</td>
                <td className="py-2">
                  <select name="status" id="status" value={vc.status} onChange={(e) => {
                    // setStatus(e.target.value)
                    console.log(e.target.value)
                    setStatus(prev => {
                      const copy = [...prev];
                      copy[idx] = e.target.value;
                      return copy;
                    });
                    vc.status = e.target.value
                    console.log("vc.status", vc.status)
                  }}>
                    <option value="pending">pending</option>
                    <option value="done">done</option>
                    <option value="missed">missed</option>
                  </select>

                </td>
                <td className="py-2">{vc.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No past video consultations.</p>
      )}
    </div>
  )
}

export default VideoConsultation
