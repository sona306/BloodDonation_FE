import { useState } from "react";
import { FaTint, FaHeartbeat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DonorEducation() {
  const [activeTab, setActiveTab] = useState("before");
  const navigate = useNavigate();

  const beforeDonation = [
    { icon: "💧", text: "Stay Hydrated - Drink plenty of water." },
    { icon: "🥗", text: "Eat a healthy meal rich in iron and vitamin C." },
    { icon: <FaHeartbeat />, text: "Get enough sleep (6-8 hours)." },
    { icon: <FaTint />, text: "Avoid alcohol & fatty foods before donation." },
    { icon: "🏋️", text: "Avoid intense workouts before donation." },
    { icon: "🩸", text: "Check your hemoglobin and iron levels." },
    { icon: "🚭", text: "Avoid smoking at least 2 hours before donation." },
    { icon: "⚕️", text: "Ensure you are not suffering from any infections or illnesses." },
    { icon: "🧘", text: "Stay relaxed and avoid stress before donation." },
  ];

  const afterDonation = [
    { icon: "🍽", text: "Eat nutritious food to replenish lost nutrients." },
    { icon: <FaHeartbeat />, text: "Avoid heavy lifting & strenuous exercise for 24 hours." },
    { icon: "💦", text: "Drink plenty of fluids to stay hydrated." },
    { icon: <FaTint />, text: "Keep the bandage on for at least 4-6 hours." },
    { icon: "🛌", text: "Take adequate rest and avoid stressful activities." },
    { icon: "🚶", text: "If you feel dizzy, sit or lie down immediately." },
    { icon: "🚭", text: "Avoid smoking and alcohol for at least 24 hours." },
    { icon: "🩹", text: "Avoid touching or scratching the puncture site to prevent infection." },
    { icon: "📅", text: "Wait at least 8 weeks before donating blood again." },
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
          className={`btn ${activeTab === "after" ? "btn-danger" : "btn-outline-danger"}`} 
          onClick={() => setActiveTab("after")}
        >
          After Donation
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {(activeTab === "before" ? beforeDonation : afterDonation).map((item, index) => (
          <div key={index} className="col">
            <div className="card shadow-sm p-3 border-0 bg-light">
              <div className="d-flex align-items-center">
                <span className="fs-3 me-3">{item.icon}</span>
                <p className="mb-0">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/donors")}>Back</button>
      </div>
    </div>
  );
}
