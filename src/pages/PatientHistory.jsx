import React from 'react'
import ReviewModal from '../components/ReviewModal';

const PatientHistory = ({
  patientData,
  historyAppointments,
  historyVideo,
  remarks,
  setRemarks,
  inputRefs,
  setApt,
  apt,
  open,
  setOpen,
  PatientModal,
  appointments
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState(null);

  return (
    <div className='relative'>
      {/* History */}
      <section id="history" className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">History</h2>

        {/* Appointment History */}
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Appointments</h3>
          {historyAppointments.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead className='hidden lg:table-header-group'>
                <tr className="text-gray-600 border-b">
                  <th className="pb-2">Time</th>
                  {Object.keys(patientData).length > 0 && <th className="pb-2">Doctor</th>}
                  <th className="pb-2">Hospital</th>
                  <th className="pb-2">Appointment Type</th>
                  {/* <th className="pb-2">Patient</th> */}
                  {/* <th className="pb-2">Fees</th> */}
                  <th className="pb-2">Symptom</th>
                  <th className="pb-2">Prescription</th>
                  <th className="pb-2">Next Follow Up</th>
                  <th className="pb-2">Lab Test Advice</th>
                  {/* <th className="pb-2">Visited</th> */}
                  {/* <th className="pb-2">Remarks </th> */}
                </tr>
              </thead>
              <tbody>
                {
                  appointments.map((apt, idx) => (
                    // console.log("historyAppointments", historyAppointments),
                    <tr key={idx} className="border-b text-sm flex flex-col lg:table-row mb-4 md:mb-0">
                      {/* {console.log("historyAppointments", historyAppointments)} */}
                      <td className="py-2">{new Date(apt.bdate).toLocaleString()}</td>
                      {Object.keys(patientData).length > 0 && <td className="py-2">{apt.name}</td>}
                      <td className="py-2">{apt.hospital_name === "no" ? "-" : apt.hospital_name}</td>
                      <td className="py-2">{apt.hospital_name === "no" ? "Video" : "In Clinic"}</td>
                      {/* <td className="py-2">{apt.patient}</td> */}
                      {/* <td className="py-2">{apt.fees}</td> */}
                      <td className="py-2">
                        <textarea disabled value={apt.symptom} cols={25} rows={3}></textarea>
                      </td>
                      <td className="py-2">
                        <textarea disabled value={apt.prescription} cols={25} rows={3}></textarea>
                      </td>
                      <td className="py-2">{apt.next_follow_up}</td>
                      <td className="py-2">
                        <textarea disabled value={apt.lab_test_advice} cols={25}></textarea>
                      </td>
                      <td className="py-2">
                        <button className='cursor-pointer' onClick={() => {
                          setIsReviewModalOpen(true)
                          setClickedIndex(idx)
                        }}>Add review</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No past appointments.</p>
          )}
        </div>

        {open && <PatientModal setOpen={setOpen} apt={apt} />}

        {/* Video History */}
        {/* <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Video Consultations</h3>
          {historyVideo.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="pb-2">Patient</th>
                  {Object.keys(patientData).length > 0 && <th className="pb-2">Doctor</th>}
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
                    {Object.keys(patientData).length > 0 && <td className="py-2">{vc.doctor}</td>}
                    <td className="py-2">{vc.time}</td>
                    <td className="py-2">{vc.fees}</td>
                    <td className="py-2">{vc.status}</td>
                    <td className="py-2">{vc.remarks}</td>
                    <td>
                      <button className="cursor-pointer" onClick={() => {
                        setApt(vc)
                        setOpen(true)
                      }}>Click here for details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No past video consultations.</p>
          )}
        </div> */}

        {/* <VideoConsultation historyVideo={historyVideo} /> */}
      </section>
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          appointment={appointments[clickedIndex]}
        />
      )}
    </div>
  )
}

export default PatientHistory
