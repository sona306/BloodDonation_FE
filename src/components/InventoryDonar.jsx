import axios from 'axios';
import React, { useEffect, useState } from 'react'

const InventoryDonar = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequestId, setSelectedRequestId] = useState("");
    const [amount, setAmount] = useState(1); // State for amount
    const [responseMessage, setResponseMessage] = useState("");
    const [totalInventory, setTotalInventory] = useState(null); // State to hold total inventory

    // Fetch approved donation requests from the backend
    useEffect(() => {
        const fetchApprovedRequests = async () => {
            try {
                const response = await axios.post("http://localhost:8080/admin/getApprovedRequests", {}, {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });
                setRequests(response.data.requests); // Assume backend returns an array of approved requests
            } catch (error) {
                console.error("Error fetching approved requests:", error);
            }
        };

        fetchApprovedRequests();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/admin/updateInventoryFromApprovedRequests",
                {
                    requestId: selectedRequestId, // ID of the selected request
                    Amount: amount // Use the amount from the input
                },
                {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                }
            );

            // Update the response message and total inventory
            setResponseMessage(response.data.message);
            setTotalInventory(response.data.totalQuantity); // Set the total inventory from response
        } catch (error) {
            console.error("Error updating inventory:", error);
            setResponseMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div className="container">
            <h3>Update Blood Inventory</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Select Approved Request:</label>
                    <select
                        className="form-control"
                        value={selectedRequestId}
                        onChange={(e) => setSelectedRequestId(e.target.value)}
                        required
                    >
                        <option value="">Select Request ID</option>
                        {requests.map((request) => (
                            <option key={request._id} value={request._id}>
                                {request._id} - {request.fullname} ({request.BloodGroup}) - {request.Amount} units ({request.location})
                            </option>
                        ))}
                    </select>
                </div><br />
                <div className="form-group">
                    <label>Amount to Add:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min="1" // Ensure a positive number
                        required
                    />
                </div><br />
                <button type="submit" className="btn btn-primary">
                    Update Inventory
                </button>
            </form>
            {responseMessage && (
                <div className="alert alert-info mt-3">{responseMessage}</div>
            )}
            {totalInventory !== null && (
                <div className="alert alert-success mt-3">
                    Total Inventory for {requests.find(request => request._id === selectedRequestId)?.BloodGroup}: {totalInventory} units
                </div>
            )}
        </div>
    );
};

export default InventoryDonar