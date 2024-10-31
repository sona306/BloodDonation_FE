import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Viewdonationreq = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch all donation requests from the backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/getAllDonationRequests", {
                    headers: {
                        "token": sessionStorage.getItem("token"),
                    },
                });
                setRequests(response.data.requests);
            } catch (error) {
                setError(error.response ? error.response.data.message : "Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <div>Loading requests...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Donation Requests</h2>
            <button className="btn btn-secondary mb-4" onClick={() => navigate('/admin')}>
                Back to Admin Page
            </button>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Request ID</th>
                                <th>Donor Name</th>
                                <th>Requested Date</th>
                                <th>Blood Group</th>
                                <th>Location</th>
                                <th>Amount</th>
                                <th>Donation History</th>
                                <th>Age Requirement</th>
                                <th>General Health Condition</th>
                                <th>Hemoglobin Level</th>
                                <th>Pulse Rate</th>
                                <th>Medical & Lifestyle History</th>
                                <th>Medical Restrictions</th>
                                <th>Waiting Period Between Donations</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td>{request._id}</td>
                                    <td>{request.fullname}</td>
                                    <td>{new Date(request.requestedDate).toLocaleDateString()}</td>
                                    <td>{request.BloodGroup}</td>
                                    <td>{request.location}</td>
                                    <td>{request.Amount}</td>
                                    <td>{request.donationHistory ? "Yes" : "No"}</td>
                                    <td>{request.ageRequirement}</td>
                                    <td>{request.generalHealthCondition}</td>
                                    <td>{request.hemoglobinLevel}</td>
                                    <td>{request.pulseRate}</td>
                                    <td>{request.medicalAndLifestyleHistory}</td>
                                    <td>{request.medicationRestrictions}</td>
                                    <td>{request.waitingPeriodBetweenDonations}</td>
                                    <td>{request.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Viewdonationreq;
