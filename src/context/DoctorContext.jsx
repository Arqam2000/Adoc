// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// export const DoctorContext = createContext(null);

// export const DoctorProvider = ({ children }) => {
//     const [doctorData, setDoctorData] = useState(null);

//     const fetchDoctorData = async (doctorId) => {
//         try {
//             const response = await axios.post(`/api/v1/doctors/get-doctor/${doctorId}`);
//             const data = response.data;

//             setDoctorData({ 
//                 doctor: data.doctor, 
//                 doctorvd: data.doctorvd, 
//                 doctorhd: data.doctorhd, 
//                 doctorexp: data.doctorexp, 
//                 otherDoctors: data.otherDoctors });

//             console.log("Doctor data fetched successfully:", data);

//         } catch (error) {
//             console.error("Error fetching doctor data:", error);
//         }
//     };

//     useEffect(() => {
//         const storedDoctor = localStorage.getItem("doctor");


//             const { dr } = JSON.parse(storedDoctor);
//             fetchDoctorData(dr);

//     }, []);

//     return (
//         <DoctorContext.Provider value={{doctorData, fetchDoctorData, setDoctorData}}>
//             {children}
//         </DoctorContext.Provider>
//     );
// }

// export default function useDoctor() {
//     return useContext(DoctorContext);
// }



import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const DoctorContext = createContext(null);

export const DoctorProvider = ({ children }) => {
  const [doctorData, setDoctorData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDoctorData = async (doctorId, abortController) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/v1/doctors/get-doctor/${doctorId}`, {
        signal: abortController?.signal
      });
      const data = response.data;

      setDoctorData({
        doctor: data.doctor,
        doctorvd: data.doctorvd,
        doctorhd: data.doctorhd,
        doctorexp: data.doctorexp,
        otherDoctors: data.otherDoctors,
      });

      if (data.doctor.isLoggedIn) {
        localStorage.setItem("doctor", JSON.stringify(data.doctor));
        // localStorage.setItem("isLoggedIn", JSON.stringify(data.doctor.isLoggedIn));
        localStorage.setItem("profileImage", data.doctor.picture);
      }

      console.log("Doctor data fetched successfully in DoctorContext:", data);

    } catch (error) {
      console.error("Error fetching doctor data:", error);
      setDoctorData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      const doctorId = JSON.parse(localStorage.getItem("doctorId"));
      if (doctorId) {
        fetchDoctorData(doctorId);
      }
  }, []);

  return (
    <DoctorContext.Provider value={{ doctorData, setDoctorData, loading, fetchDoctorData }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default function useDoctor() {
  return useContext(DoctorContext);
}
