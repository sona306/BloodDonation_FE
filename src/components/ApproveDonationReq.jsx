import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const ApproveDonationReq = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState("");
    const [status, setStatus] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

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
        <div className="container my-5">
            <h3 className="text-center text-primary mb-4">Approve or Reject Donation Requests</h3>
            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleApprove}>
                        <div className="form-group mb-4">
                            <label className="fw-bold">Select Request:</label>
                            <select
                                className="form-control"
                                value={selectedRequestId}
                                onChange={(e) => setSelectedRequestId(e.target.value)}
                                required
                            >
                                <option value="">Select Request ID</option>
                                {requests.map((request) => (
                                    <option key={request._id} value={request._id}>
                                        {request.fullname} ({request.BloodGroup}) - {request.Amount} units - 
                                        AGE: {request.ageRequirement} - DATE: {request.requestedDate} - 
                                        HEALTH: {request.generalHealthCondition}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label className="fw-bold">Status:</label>
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
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {responseMessage && (
                        <div className="alert alert-info mt-3">{responseMessage}</div>
                    )}
                    <button className="btn btn-secondary mt-3" onClick={() => navigate('/admin')}>
                        Back to Admin Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApproveDonationReq;
