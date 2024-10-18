import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ApproveDonationReq = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState("");
    const [status, setStatus] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    // Fetch donation requests from the backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/getPendingRequests", {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                    }
                });
                setRequests(response.data.requests); // Assume backend returns an array of pending requests
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/admin/approveDonationRequest",
                {
                    requestId: selectedRequestId, // Automatically filled when selecting a request
                    status: status // 'Approved' or 'Rejected'
                },
                {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                }
            );
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error("Error approving/rejecting donation request:", error);
            setResponseMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div>

<div className="container">
        <div className="row">
          <div className="col">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">


            <h3>Approve or Reject Donation Requests</h3><br></br>
            <form onSubmit={handleApprove}>
                <div className="form-group">
                    <label>Select Request:</label>
                    <select
                        className="form-control"
                        value={selectedRequestId}
                        onChange={(e) => setSelectedRequestId(e.target.value)}
                        required
                    >
                        <option value="">Select Request ID</option>
                        {requests.map((request) => (
                            <option key={request._id} value={request._id}>
                                {request._id} - {request.fullname} {request.BloodGroup} {request.Amount} ({request.location})
                            </option>
                        ))}
                    </select>
                </div><br></br>
                <div className="form-group">
                    <label>Status:</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div><br></br>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            {responseMessage && (
                <div className="alert alert-info mt-3">{responseMessage}</div>
            )}

            </div>
          </div>
        </div>
      </div>
            
        </div>
    );
};


export default ApproveDonationReq