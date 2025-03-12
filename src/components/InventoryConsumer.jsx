import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryConsumer = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [urgency, setUrgency] = useState('');
    const [remainingAmount, setRemainingAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch approved blood requests from the backend based on urgency
    useEffect(() => {
        const fetchBloodRequests = async () => {
            if (!urgency) return;
            setLoading(true);

            try {
                const response = await axios.post('http://localhost:8080/admin/bloodRequestsByUrgency', {
                    urgency
                }, {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });
                setRequests(response.data.requests);
            } catch (error) {
                console.error("Error fetching blood requests:", error);
                setResponseMessage("Failed to fetch blood requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchBloodRequests();
    }, [urgency]);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRequest) {
            setResponseMessage("Please select a valid request.");
            return;
        }

        const { BloodGroup, Amount, _id } = selectedRequest;

        try {
            const response = await axios.post("http://localhost:8080/admin/bloodinventoryconsumer", {
                BloodGroup,
                Amount,
                urgency
            }, {
                headers: {
                    "token": sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });

            // ✅ Update response message and remaining amount
            setResponseMessage(response.data.message);
            setRemainingAmount(response.data.remainingAmount);

            // ✅ Remove the submitted request from the list
            setRequests((prevRequests) => prevRequests.filter(req => req._id !== _id));
            setSelectedRequest(null);

            // ✅ Clear urgency after submission
            setUrgency('');
        } catch (error) {
            console.error("Error submitting request:", error);
            setResponseMessage(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: '600px', margin: 'auto' }}>
                <div className="card-body">
                    <h3 className="text-center text-danger mb-4">🩸 Request Blood</h3>

                    {/* ✅ Select Urgency */}
                    <div className="form-group mb-3">
                        <label className="fw-bold">Select Urgency Level:</label>
                        <select
                            className="form-select"
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value)}
                            required
                        >
                            <option value="">Select Urgency</option>
                            <option value="Normal">Normal</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>

                    {/* ✅ Show loading state */}
                    {loading ? (
                        <div className="d-flex justify-content-center my-3">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* ✅ Select Blood Request */}
                            <div className="form-group mb-3">
                                <label className="fw-bold">Select Blood Request:</label>
                                <select
                                    className="form-select"
                                    value={selectedRequest ? selectedRequest._id : ''}
                                    onChange={(e) => {
                                        const requestId = e.target.value;
                                        const request = requests.find(req => req._id === requestId);
                                        setSelectedRequest(request || null);
                                    }}
                                    required
                                >
                                    <option value="">Select a Blood Request</option>
                                    {requests.map((request) => (
                                        <option key={request._id} value={request._id}>
                                            {`${request.fullname} - ${request.BloodGroup} - ${request.Amount} units - (${request.location})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* ✅ Submit Button */}
                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-danger fw-bold shadow-sm"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ✅ Show response message */}
                    {responseMessage && (
                        <div className={`alert ${responseMessage.includes('Failed') ? 'alert-danger' : 'alert-success'} mt-3`}>
                            {responseMessage}
                        </div>
                    )}

                    {/* ✅ Show remaining inventory */}
                    {remainingAmount !== null && selectedRequest?.BloodGroup && (
                        <div className="alert alert-info mt-3">
                            Remaining Inventory for <strong>{selectedRequest.BloodGroup}</strong>: {remainingAmount} units
                        </div>
                    )}

                    {/* ✅ Back to Admin Page */}
                    <div className="text-center mt-4">
                        <button
                            className="btn btn-outline-secondary shadow-sm"
                            onClick={() => navigate('/admin')}
                        >
                            ⬅️ Back to Admin Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryConsumer;
