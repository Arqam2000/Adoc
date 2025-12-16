import React, { useEffect } from 'react'
import LabTestForm from './LabTestForm';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const LabTestResult = ({ appointments }) => {
  const [file, setFile] = React.useState(null);
  const [labTestForm, setLabTestForm] = React.useState(false);
  const [labTestInfo, setLabTestInfo] = React.useState({
    date: "",
    doctor: "",
    labTestFor: "",
    labReport: null
  });
  const [labTests, setLabTests] = React.useState([]);

  const getLabTests = async () => {
    try {
      const res = await axios.get(`/api/v1/labTests/${localStorage.getItem("patientId")}` )

      console.log(res.data.labTests)

      setLabTests(res.data.labTests);

    } catch (error) {
      console.error("Error fetching lab tests:", error);
      toast.error("Failed to fetch lab tests. Please try again.");
    }
  }

  useEffect(() => {
    getLabTests();
  }, [])

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <ToastContainer />
      {labTestForm && <LabTestForm setLabTestForm={setLabTestForm} labTestInfo={labTestInfo} setLabTestInfo={setLabTestInfo} />}
      <div className='flex justify-between items-center'>
        <h3 className="text-lg font-semibold mb-4">Lab Test Results</h3>
        <button className='bg-blue-500 text-white py-1 px-2 cursor-pointer rounded' onClick={() => setLabTestForm(true)}>Add Lab Test</button>
      </div>
      <table className="w-full text-left border-collapse mt-4">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="pb-2">Date</th>
            <th className="pb-2">Doctor</th>
            <th className="pb-2">Lab Test For</th>
            <th className="pb-2">
              <button>File</button>
            </th>
          </tr>
        </thead>
        <tbody>
          
            {labTests.map((vc, idx) => (
              <tr key={vc.id} className="border-b text-sm">
                <td className="py-2">{new Date(vc.date).toLocaleDateString()}</td>
                {/* {Object.keys(patientData).length > 0 && <td className="py-2">{vc.doctor}</td>} */}
                <td className="py-2">{vc.doctor}</td>
                <td className="py-2">
                  {vc.lab_test_for}
                </td>
                <td className="py-2">
                  <a href={`http://localhost:4000/${vc.lab_report}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View Report</a>
                </td>
                <td className="py-2">
                  {/* <button className='cursor-pointer' onClick={handleSave}>Save</button> */}
                </td>
              </tr>
            ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default LabTestResult
