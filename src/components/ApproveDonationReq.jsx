import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApproveDonationReq = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState('');
    const [status, setStatus] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    // Fetch donation requests from the backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/getPendingRequests", {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                    }
                });
                setRequests(response.data.requests);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setResponseMessage('Failed to fetch requests. Please try again.');
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
                    requestId: selectedRequestId,
                    status
                },
                {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                }
            );
            setResponseMessage(response.data.message);

            // Refresh requests after approval/rejection
            setRequests((prev) => prev.filter((req) => req._id !== selectedRequestId));
            setSelectedRequestId('');
            setStatus('');
        } catch (error) {
            console.error("Error approving/rejecting donation request:", error);
            setResponseMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="container py-5">
            <h3 className="text-center text-primary mb-4">🚑 Approve or Reject Donation Requests</h3>
            <div className="card shadow-lg border-0" style={{ borderRadius: '12px' }}>
                <div className="card-body">
                    <form onSubmit={handleApprove}>
                        {/* Request Dropdown */}
                        <div className="mb-4">
                            <label className="form-label fw-bold">Select Request:</label>
                            <select
                                className="form-select"
                                value={selectedRequestId}
                                onChange={(e) => setSelectedRequestId(e.target.value)}
                                required
                            >
                                <option value="">-- Select Request --</option>
                                {requests.map((request) => (
                                    <option key={request._id} value={request._id}>
                                        {`${request.fullname} (${request.BloodGroup}) - ${request.Amount} units - Age: ${request.ageRequirement} - Date: ${new Date(request.requestedDate).toLocaleDateString()} - Health: ${request.generalHealthCondition}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div className="mb-4">
                            <label className="form-label fw-bold">Status:</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">-- Select Status --</option>
                                <option value="Approved">✅ Approved</option>
                                <option value="Rejected">❌ Rejected</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-3">
                            <button type="submit" className="btn btn-success px-4">Submit</button>
                            <button
                                type="button"
                                className="btn btn-secondary px-4"
                                onClick={() => navigate('/admin')}
                            >
                                Back to Admin Page
                            </button>
                        </div>
                    </form>

                    {/* Response Message */}
                    {responseMessage && (
                        <div className={`alert ${responseMessage.includes('error') ? 'alert-danger' : 'alert-success'} mt-4`}>
                            {responseMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApproveDonationReq;
