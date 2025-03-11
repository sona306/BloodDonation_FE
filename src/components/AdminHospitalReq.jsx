import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminEmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approving, setApproving] = useState(null);
  const navigate = useNavigate();

  // Fetch pending blood requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8080/api/hospitals/emergency-blood-requests");

      if (data.requests.length === 0) {
        setError("No pending requests.");
      } else {
        setRequests(data.requests);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("⚠ Failed to load requests. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve a request
  const approveRequest = async (requestId, bloodType, unitsRequired) => {
    setApproving(requestId);

    // Optimistically remove the request from UI
    setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));

    try {
      const { data } = await axios.post("http://localhost:8080/api/admin/approve-emergency-request", { requestId });
      alert(data.message); // Success message
    } catch (err) {
      console.error("❌ Approval error:", err.response?.data || err.message);
      alert(`⚠ Approval failed: ${err.response?.data?.message || "Unknown error"}`);

      // Re-fetch requests in case of failure
      fetchRequests();
    }

    setApproving(null);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-100 p-4 bg-white rounded shadow-lg">
        <h1 className="text-center mb-4">🚑 Emergency Blood Requests</h1>
        <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin")}>
          ⬅ Back to Admin Page
        </button>

        {loading ? (
          <div className="text-center"><p>Loading...</p></div>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-muted text-center">No pending requests.</p>
        ) : (
          <div className="row">
            {requests.map((req) => (
              <div key={req._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{req.hospitalName}</h5>
                    <p className="card-text"><strong>Blood Type:</strong> {req.bloodType}</p>
                    <p className="card-text"><strong>Units Required:</strong> {req.unitsRequired}</p>
                    <p className="card-text"><strong>Urgency:</strong> {req.urgencyLevel}</p>
                    <p className="card-text"><strong>Contact:</strong> {req.contactNumber}</p>
                    <p className="card-text"><strong>Location:</strong> {req.location || "Not provided"}</p>
                    <p className="card-text"><strong>Additional Notes:</strong> {req.additionalNotes || "None"}</p>
                    <p className="card-text"><strong>Expected Delivery Time:</strong> {req.expectedDeliveryTime ? new Date(req.expectedDeliveryTime).toLocaleString() : "Not specified"}</p>
                    <button 
                      className="btn btn-success w-100"
                      disabled={approving === req._id}
                      onClick={() => approveRequest(req._id, req.bloodType, req.unitsRequired)}
                    >
                      {approving === req._id ? "Approving..." : "Approve"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
