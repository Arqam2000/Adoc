import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../constants/constants";

const ReviewModal = ({ isOpen, onClose, appointment }) => {
  if (!isOpen) return null;

  const [selectedWaitingTime, setSelectedWaitingTime] = React.useState("");
  const [overallSatisfaction, setOverallSatisfaction] = React.useState(null);
  const [waitingTimeMins, setWaitingTimeMins] = React.useState("");
  const [consultationTimeMins, setConsultationTimeMins] = React.useState("");
  const [recommend, setRecommend] = React.useState(null);
  const [patientSatisfaction, setPatientSatisfaction] = React.useState(null);
  const [staffBehaviour, setStaffBehaviour] = React.useState(null);
  const [clinicEnvironment, setClinicEnvironment] = React.useState(null);
  const [remarks, setRemarks] = React.useState("");
  const [postAnonymously, setPostAnonymously] = React.useState(false);

  console.log("appointment from reviewModal", appointment)

  const addReview = async (e) => {
    e.preventDefault();
    try {
      console.log("submitted data", overallSatisfaction,
        waitingTimeMins,
        consultationTimeMins,
        recommend,
        patientSatisfaction,
        staffBehaviour,
        clinicEnvironment,
        remarks,
        postAnonymously)

      await axios.post(`${apiBaseUrl}/api/v1/reviews/add-review`, {
        dr: appointment?.dr,
        patient: JSON.parse(localStorage.getItem("patientId")),
        overallSatisfaction,
        waitingTimeMins: waitingTimeMins || "0",
        consultationTimeMins,
        recommend,
        patientSatisfaction,
        staffBehaviour,
        clinicEnvironment,
        remarks,
        postAnonymously
      });

      

      toast.success("Review added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Post a review for Dr {appointment?.name}</h2>

        <form className="space-y-4">
          <p className="text-lg text-center font-semibold">Were you satisfied with your overall experience? <span className="text-xl">*</span></p>
          <div class="flex justify-center items-center mt-3">
            <div data-item="yes" data-hospitalid="2217" class="overallexperience card box-shadow-sm col-md-2 col-6 p-3 text-center">
              <svg style={{ margin: "auto", marginTop: "10px" }} id="Group_4963" data-name="Group 4963" xmlns="http://www.w3.org/2000/svg" width="47" height="49" viewBox="0 0 47.5 49.092">
                <path id="Path_2" data-name="Path 2" d="M1537.561-723.828a1.357,1.357,0,0,0-1.357-1.357h-5.285a1.357,1.357,0,0,0-1.357,1.357v20.806a1.357,1.357,0,0,0,1.357,1.357h5.285a1.357,1.357,0,0,0,1.357-1.357Zm34.233,20.145c-1.109,3.3-5.08,3.5-7.968,3.5-6.225,0-12.471-1.531-18.685-2.035-4.659-.378-6.122-1.486-6.122-5.919,0-4.021.05-10.165.05-14.393,0-2.333,1.632-3.995,3.672-5.84,5.055-4.572,9.729-8.111,12.448-14.582,1.1-2.619.432-6.74,4.278-6.287,2.635.31,3.84,3.689,4.057,6.219a16.4,16.4,0,0,1-2.134,8.773c-1.391,2.434-4.907,5.681-.374,6,3.961.275,14.892-2.954,15.988,3.16a5.116,5.116,0,0,1-1.054,3.617c-1.1,1.868.112,1.425-.036,3.674-.119,1.82-1.274,2.133-1.846,3.416-.5,1.117.448,2.207.278,3.53-.247,1.932-1.594,2.054-2.386,3.362C1571.29-706.385,1572.256-705.059,1571.794-703.683Z" transform="translate(-1529.561 749.274)" fill=" #006400"></path>
              </svg>
              <label htmlFor="overallexperience-yes" class="form-check-label">
                <input id="overallexperience-yes" type="radio" class="form-check-input mt-3 overallexperience-yes" data-item="yes" data-hospitalid="2217" name="overallexperience" value="Yes" checked={overallSatisfaction === "Yes"} onChange={(e) => {
                  setOverallSatisfaction(e.target.value)
                  // console.log(e.target.value)
                }} />
                <span className="font-semibold ml-1">Yes</span>
              </label>
            </div>
            <div style={{ marginLeft: "40px" }} class="overallexperience d-sm-flex card box-shadow-sm col-md-2 col-6 p-3 text-center" data-item="no" data-hospitalid="2217">
              <svg style={{ margin: "auto", marginTop: "15px" }} xmlns="http://www.w3.org/2000/svg" width="47" height="49" viewBox="0 0 33.945 35.082">
                <path id="Path_5318" data-name="Path 5317" d="M1557.789-732.375a.97.97,0,0,0,.97.969h3.777a.969.969,0,0,0,.97-.969v-14.869a.97.97,0,0,0-.97-.97h-3.777a.97.97,0,0,0-.97.97Zm-24.464-14.4c.792-2.359,3.63-2.5,5.694-2.5,4.448,0,8.913,1.094,13.353,1.454,3.329.27,4.375,1.062,4.375,4.23,0,2.874-.036,7.264-.036,10.286,0,1.667-1.166,2.855-2.624,4.174-3.612,3.267-6.952,5.8-8.9,10.421-.786,1.872-.309,4.816-3.057,4.493-1.883-.222-2.744-2.636-2.9-4.444a11.723,11.723,0,0,1,1.525-6.27c.994-1.74,3.507-4.06.267-4.285-2.831-.2-10.642,2.111-11.425-2.258a3.657,3.657,0,0,1,.754-2.585c.786-1.335-.08-1.018.026-2.625.085-1.3.911-1.525,1.319-2.441.356-.8-.32-1.578-.2-2.523.176-1.381,1.139-1.468,1.7-2.4C1533.685-744.84,1532.995-745.788,1533.325-746.771Z" transform="translate(-1529.561 749.273)" fill="#FF0000"></path>
              </svg>
              <label htmlFor="overallexperience-no" class="form-check-label">
                <input id="overallexperience-no" type="radio" className="form-check-input overallexperience-no" data-item="no" name="overallexperience" value="No" checked={overallSatisfaction === "No"} onChange={(e) => {
                  setOverallSatisfaction(e.target.value)
                  // console.log(e.target.value)
                }} />
                <span className="font-semibold ml-1">No</span>
              </label>
            </div>
          </div>

          {/* Review ID */}
          {/* <div>
            <label className="block text-sm font-medium">Review ID</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div> */}

          {/* Reviewed To (Doctor) */}
          {/* <div>
            <label className="block text-sm font-medium">Reviewed To (Dr)</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div> */}

          {/* BR (Patient ID) */}
          {/* <div>
            <label className="block text-sm font-medium">Patient ID</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div> */}

          {/* Review Date */}
          {/* <div>
            <label className="block text-sm font-medium">Review Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div> */}
          {/* Waiting Time */}
          <div>
            <label htmlFor="waiting-time" className="block text-sm font-medium">Waiting Time (mins) <span className="text-xl">*</span></label>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="no-waiting-time"
                  className=" border px-3 py-2 rounded-lg"
                  name="waiting-time"
                  value="No Waiting Time"
                  checked={selectedWaitingTime === "No Waiting Time"}
                  onChange={(e) => {
                    setSelectedWaitingTime(e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <label htmlFor="no-waiting-time">No Waiting Time</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="waiting-time"
                  className=" border px-3 py-2 rounded-lg"
                  name="waiting-time"
                  value="Waiting Time"
                  checked={selectedWaitingTime === "Waiting Time"}
                  onChange={(e) => {
                    setSelectedWaitingTime(e.target.value)
                    console.log(e.target.value)
                  }}
                />
                <label htmlFor="waiting-time">Waiting Time</label>
              </div>
              {
                selectedWaitingTime === "Waiting Time" && (
                  <input
                    type="number"
                    className="w-20 border px-3 py-2 rounded-lg"
                    placeholder="mins"
                    value={waitingTimeMins}
                    onChange={(e) => setWaitingTimeMins(e.target.value)}
                  />
                )
              }
            </div>
          </div>

          {/* Consultation Time */}

          <div>
            <label htmlFor="consultation-time" className="block text-sm font-medium">Consultation Time (mins) <span className="text-xl">*</span></label>
            <input type="text" className=" border px-3 py-2 rounded-lg" placeholder="Consultation Time (mins)" value={consultationTimeMins} onChange={(e) => setConsultationTimeMins(e.target.value)} />
          </div>

          {/* Recommend */}
          <div>
            <label htmlFor="recommend" className="block text-sm font-medium flex items-center gap-1">Recommend <span className="text-xl">*</span></label>

            <div className="flex gap-2 mt-2">
              {/* <label htmlFor="recommend">Recommend</label> */}
              <input type="radio" name="recommend" id="yes" value="Yes" checked={recommend === "Yes"} onChange={(e) => setRecommend(e.target.value)} /> <label htmlFor="yes">Yes</label>
              {/* <label htmlFor="recommend">No</label> */}
              <input type="radio" name="recommend" id="no" value="No" checked={recommend === "No"} onChange={(e) => setRecommend(e.target.value)} /> <label htmlFor="no">No</label>
            </div>

          </div>

          {/* Patient Satisfaction */}
          <div>
            <label className="block text-sm font-medium flex items-center gap-1">Satisfied with diagnosis <span className="text-xl">*</span></label>
            <div className="flex gap-2 mt-2">
              <input
                id="Very Poor"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="patient-satisfaction"
                value="Yes"
                checked={patientSatisfaction === "Yes"}
                onChange={(e) => setPatientSatisfaction(e.target.value)}
              /> <label htmlFor="Very Poor">Yes</label>
              <input
                id="poor"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="patient-satisfaction"
                value="No"
                checked={patientSatisfaction === "No"}
                onChange={(e) => setPatientSatisfaction(e.target.value)}
              /> <label htmlFor="poor">No</label>
              
            </div>
          </div>

          {/* Staff Behaviour */}
          <div>
            <label className="block text-sm font-medium">Staff Behaviour</label>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="very unprofessional"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="staff-behaviour"
                value="Unprofessional"
                checked={staffBehaviour === "Unprofessional"}
                onChange={(e) => setStaffBehaviour(e.target.value)}
              /> <label htmlFor="very unprofessional">Unprofessional</label>
              <input
                id="needs improvement"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="staff-behaviour"
                value="Needs Improvement"
                checked={staffBehaviour === "Needs Improvement"}
                onChange={(e) => setStaffBehaviour(e.target.value)}
              /> <label htmlFor="needs improvement">Needs Improvement</label>
              <input
                id="Average"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="staff-behaviour"
                value="Average"
                checked={staffBehaviour === "Average"}
                onChange={(e) => setStaffBehaviour(e.target.value)}
              /> <label htmlFor="Average">Average</label>
              <input
                id="professional"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="staff-behaviour"
                value="Professional"
                checked={staffBehaviour === "Professional"}
                onChange={(e) => setStaffBehaviour(e.target.value)}
              /> <label htmlFor="professional">Professional</label>
              <input
                id="excellent & courteous"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="staff-behaviour"
                value="Excellent & Courteous"
                checked={staffBehaviour === "Excellent & Courteous"}
                onChange={(e) => setStaffBehaviour(e.target.value)}
              /> <label htmlFor="excellent & courteous">Excellent</label>
            </div>
          </div>

          {/* Clinic Environment */}
          <div>
            <label className="block text-sm font-medium">Clinic Environment</label>
            <div className="flex gap-2 mt-2">
              <input
                id="Very-Poor"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="clinic-environment"
                value="Bad"
                checked={clinicEnvironment === "Bad"}
                onChange={(e) => setClinicEnvironment(e.target.value)}
              /> <label htmlFor="Very-Poor">Bad</label>
              <input
                id="Poor"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="clinic-environment"
                value="Poor"
                checked={clinicEnvironment === "Poor"}
                onChange={(e) => setClinicEnvironment(e.target.value)}
              /> <label htmlFor="Poor">Poor</label>
              <input
                id="Aaverage"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="clinic-environment"
                value="Average"
                checked={clinicEnvironment === "Average"}
                onChange={(e) => setClinicEnvironment(e.target.value)}
              /> <label htmlFor="Aaverage">Average</label>
              <input
                id="Good"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="clinic-environment"
                value="Good"
                checked={clinicEnvironment === "Good"}
                onChange={(e) => setClinicEnvironment(e.target.value)}
              /> <label htmlFor="Good">Good</label>
              <input
                id="Excellent"
                type="radio"
                className=" border px-3 py-2 rounded-lg"
                name="clinic-environment"
                value="Excellent"
                checked={clinicEnvironment === "Excellent"}
                onChange={(e) => setClinicEnvironment(e.target.value)}
              /> <label htmlFor="Excellent">Excellent</label>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium">Remarks</label>
            <textarea
              rows="2"
              className="w-full border px-3 py-2 rounded-lg"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center gap-1 text-base font-medium">
            <input type="checkbox" name="anonymous" id="anonymous" value={postAnonymously} onChange={(e) => setPostAnonymously(e.target.checked)} />
            <label htmlFor="anonymous">Post anonymously</label>
          </div>

          <div>
            <p className="text-[#7d879c] text-base">Write thoughtfully — your experience can make a difference in someone’s life.</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={addReview}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
