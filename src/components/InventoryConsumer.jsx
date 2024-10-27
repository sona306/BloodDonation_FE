import axios from 'axios';
import React, { useEffect, useState } from 'react'
    
    const InventoryConsumer = () => {
        const [requests, setRequests] = useState([]); // State for blood requests
        const [selectedRequest, setSelectedRequest] = useState(null); // State for selected request
        const [responseMessage, setResponseMessage] = useState(''); // State for response message
        const [urgency, setUrgency] = useState(''); // State for urgency level
        const [remainingAmount, setRemainingAmount] = useState(null); // State for remaining blood units
        const [loading, setLoading] = useState(false); // State for loading indicator
    
        // Fetch approved blood requests from the backend based on urgency
        useEffect(() => {
            const fetchBloodRequests = async () => {
                if (!urgency) return; // Don't fetch if urgency is not set
    
                setLoading(true); // Set loading state to true
    
                try {
                    const response = await axios.post('http://localhost:8080/admin/bloodRequestsByUrgency', {
                        urgency // Pass urgency level to the backend
                    }, {
                        headers: {
                            "token": sessionStorage.getItem("token"),
                            "Content-Type": "application/json"
                        }
                    });
                    setRequests(response.data.requests); // Assuming backend returns an array of approved requests
                } catch (error) {
                    console.error("Error fetching blood requests:", error);
                    setResponseMessage("Failed to fetch blood requests.");
                } finally {
                    setLoading(false); // Set loading state to false after fetching
                }
            };
    
            fetchBloodRequests();
        }, [urgency]); // Dependency on urgency
    
        // Handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!selectedRequest) {
                setResponseMessage("Please select a valid request.");
                return;
            }
    
            const { BloodGroup, Amount } = selectedRequest; // Extract values from selected request
    
            try {
                const response = await axios.post("http://localhost:8080/admin/bloodinventoryconsumer", {
                    BloodGroup, // Pass the correct blood group
                    Amount, // Pass the correct amount
                    urgency // Pass the urgency level from state
                }, {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });
    
                // Update the response message and remaining amount on successful request
                setResponseMessage(response.data.message);
                setRemainingAmount(response.data.remainingAmount); // Assuming backend returns remaining inventory
    
                // Clear urgency after submission
                setUrgency('');
            } catch (error) {
                // Handle errors and set the response message
                console.error("Error submitting request:", error);
                setResponseMessage(error.response?.data?.error || "An error occurred. Please try again.");
            }
        };
    
        return (
            <div className="container">
                <h3>Request Blood</h3>
    
                <div className="form-group">
                    <label>Select Urgency Level:</label>
                    <select
                        className="form-control"
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
                <br />
    
                {loading ? (
                    <div>Loading requests...</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Select Blood Request:</label>
                            <select
                                className="form-control"
                                value={selectedRequest ? selectedRequest._id : ''}
                                onChange={(e) => {
                                    const requestId = e.target.value;
                                    const request = requests.find(req => req._id === requestId);
                                    setSelectedRequest(request || null); // Set the selected request
                                }}
                                required
                            >
                                <option value="">Select a Blood Request</option>
                                {requests.map((request) => (
                                    <option key={request._id} value={request._id}>
                                        {request.fullname} - {request.BloodGroup} - {request.Amount} units - ({request.location})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">
                            Submit Request
                        </button>
                    </form>
                )}
    
                {responseMessage && (
                    <div className="alert alert-info mt-3">{responseMessage}</div>
                )}
    
                {remainingAmount !== null && selectedRequest?.BloodGroup && (
                    <div className="alert alert-success mt-3">
                        Remaining Inventory for {selectedRequest.BloodGroup}: {remainingAmount} units
                    </div>
                )}
            </div>
        );
    };

export default InventoryConsumer