import { useState } from "react";
import { FaTint, FaHeartbeat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DonorEducation() {
  const [activeTab, setActiveTab] = useState("before");
  const navigate = useNavigate();

  const beforeDonation = [
    { icon: "\uD83D\uDCA7", text: "Stay Hydrated - Drink plenty of water." },
    { icon: "\uD83E\uDD57", text: "Eat a healthy meal rich in iron and vitamin C." },
    { icon: <FaHeartbeat />, text: "Get enough sleep (6-8 hours)." },
    { icon: <FaTint />, text: "Avoid alcohol & fatty foods before donation." },
    { icon: "\uD83C\uDFC5", text: "Avoid intense workouts before donation." },
    { icon: "\uD83E\uDDE0", text: "Check your hemoglobin and iron levels." },
    { icon: "\uD83D\uDEAD", text: "Avoid smoking at least 2 hours before donation." },
    { icon: "⚕️", text: "Ensure you are not suffering from any infections or illnesses." },
    { icon: "\uD83E\uDD8C", text: "Stay relaxed and avoid stress before donation." },
  ];

  const afterDonation = [
    { icon: "\uD83C\uDF7D", text: "Eat nutritious food to replenish lost nutrients." },
    { icon: <FaHeartbeat />, text: "Avoid heavy lifting & strenuous exercise for 24 hours." },
    { icon: "\uD83D\uDCA6", text: "Drink plenty of fluids to stay hydrated." },
    { icon: <FaTint />, text: "Keep the bandage on for at least 4-6 hours." },
    { icon: "\uD83D\uDECC", text: "Take adequate rest and avoid stressful activities." },
    { icon: "\uD83D\uDEB6", text: "If you feel dizzy, sit or lie down immediately." },
    { icon: "\uD83D\uDEAD", text: "Avoid smoking and alcohol for at least 24 hours." },
    { icon: "\uD83E\uDDE1", text: "Avoid touching or scratching the puncture site to prevent infection." },
    { icon: "\uD83D\uDCC5", text: "Wait at least 8 weeks before donating blood again." },
  ];

  const bloodCompatibility = [
    { bloodType: "O-", canDonateTo: "All blood groups", canReceiveFrom: "O-" },
    { bloodType: "O+", canDonateTo: "O+, A+, B+, AB+", canReceiveFrom: "O+, O-" },
    { bloodType: "A-", canDonateTo: "A+, A-, AB+, AB-", canReceiveFrom: "A-, O-" },
    { bloodType: "A+", canDonateTo: "A+, AB+", canReceiveFrom: "A+, A-, O+, O-" },
    { bloodType: "B-", canDonateTo: "B+, B-, AB+, AB-", canReceiveFrom: "B-, O-" },
    { bloodType: "B+", canDonateTo: "B+, AB+", canReceiveFrom: "B+, B-, O+, O-" },
    { bloodType: "AB-", canDonateTo: "AB+, AB-", canReceiveFrom: "AB-, A-, B-, O-" },
    { bloodType: "AB+", canDonateTo: "AB+", canReceiveFrom: "All blood groups" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center text-danger fw-bold">Blood Donation Guidelines</h2>
      <div className="d-flex justify-content-center my-3">
        <button 
          className={`btn me-2 ${activeTab === "before" ? "btn-danger" : "btn-outline-danger"}`} 
          onClick={() => setActiveTab("before")}
        >
          Before Donation
        </button>
        <button 
          className={`btn me-2 ${activeTab === "after" ? "btn-danger" : "btn-outline-danger"}`} 
          onClick={() => setActiveTab("after")}
        >
          After Donation
        </button>
        <button 
          className={`btn ${activeTab === "compatibility" ? "btn-danger" : "btn-outline-danger"}`} 
          onClick={() => setActiveTab("compatibility")}
        >
          Blood Compatibility
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {activeTab === "compatibility" ? (
          <table className="table table-bordered table-striped bg-white">
            <thead className="table-danger">
              <tr>
                <th>Blood Type</th>
                <th>Can Donate To</th>
                <th>Can Receive From</th>
              </tr>
            </thead>
            <tbody>
              {bloodCompatibility.map((item, index) => (
                <tr key={index}>
                  <td>{item.bloodType}</td>
                  <td>{item.canDonateTo}</td>
                  <td>{item.canReceiveFrom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          (activeTab === "before" ? beforeDonation : afterDonation).map((item, index) => (
            <div key={index} className="col">
              <div className="card shadow-sm p-3 border-0 bg-light">
                <div className="d-flex align-items-center">
                  <span className="fs-3 me-3">{item.icon}</span>
                  <p className="mb-0">{item.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/donors")}>Back</button>
      </div>
    </div>
  );
}