import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryDonar = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState('');
    const [amount, setAmount] = useState(1);
    const [responseMessage, setResponseMessage] = useState('');
    const [totalInventory, setTotalInventory] = useState(null);
    const [bloodGroup, setBloodGroup] = useState('');
    const navigate = useNavigate();

    // ✅ Fetch approved donation requests from the backend
    useEffect(() => {
        const fetchApprovedRequests = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/admin/getApprovedRequests',
                    {},
                    {
                        headers: {
                            'token': sessionStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setRequests(response.data.requests || []);
            } catch (error) {
                console.error('Error fetching approved requests:', error);
                setResponseMessage('Failed to load approved requests.');
            }
        };

        fetchApprovedRequests();
    }, []);

    // ✅ Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!selectedRequestId) {
            setResponseMessage('Please select a valid request.');
            return;
        }

        if (amount <= 0) {
            setResponseMessage('Amount should be a positive value.');
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                setResponseMessage('Session expired. Please log in again.');
                return;
            }

            const response = await axios.post(
                'http://localhost:8080/admin/updateInventoryFromApprovedRequests',
                {
                    requestId: selectedRequestId,
                    Amount: parseInt(amount), // ✅ Capitalized to match backend key
                },
                {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // ✅ Remove the request from the dropdown after update
            setRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== selectedRequestId)
            );

            // ✅ Display success message and updated inventory
            setResponseMessage(response.data.message);
            setTotalInventory(response.data.totalQuantity);
            setBloodGroup(response.data.bloodGroup);

            // ✅ Reset form after successful update
            setSelectedRequestId('');
            setAmount(1);
        } catch (error) {
            console.error('Error updating inventory:', error);
            setResponseMessage(
                error.response?.data?.message || 'An error occurred while updating inventory.'
            );
        }
    };

    return (
        <div className="container py-5">
            <h3 className="text-center text-primary mb-4">🩸 Update Blood Inventory</h3>
            
            {/* Back Button */}
            <div className="mb-4">
                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                    Back to Admin Page
                </button>
            </div>

            {/* Form Card */}
            <div className="card shadow-lg border-0" style={{ borderRadius: '12px' }}>
                <div className="card-body">
                    <form onSubmit={handleUpdate}>
                        {/* Approved Request Dropdown */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Select Approved Request:</label>
                            <select
                                className="form-select"
                                value={selectedRequestId}
                                onChange={(e) => setSelectedRequestId(e.target.value)}
                                required
                            >
                                <option value="">-- Select Request --</option>
                                {requests.map((request) => (
                                    <option key={request._id} value={request._id}>
                                        {` ${request.fullname} (${request.BloodGroup}) -> ${request.Amount} units - ${request.location} -  ${request.ageRequirement}  - ${request.generalHealthCondition} - ${request.pulseRate} - ${new Date(request.requestedDate).toLocaleDateString()}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Amount Input */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Amount to Add:</label>
                            <input
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                min="1"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                                Update Inventory
                            </button>
                        </div>
                    </form>

                    {/* Response Message */}
                    {responseMessage && (
                        <div
                            className={`alert ${
                                responseMessage.includes('Failed') ? 'alert-danger' : 'alert-success'
                            } mt-3`}
                        >
                            {responseMessage}
                        </div>
                    )}

                    {/* Total Inventory */}
                    {totalInventory !== null && (
                        <div className="alert alert-info mt-3">
                            Total Inventory for <strong>{bloodGroup}</strong>: {totalInventory} units
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryDonar;
