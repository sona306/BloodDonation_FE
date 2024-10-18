import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Viewdonationreq = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        <div>


<div className="container">
        <div className="row">
          <div className="col">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">


            <h2>All Donation Requests</h2>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Donar Name</th>
                            <th>Requested Date</th>
                            <th>Blood Group</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Donation History</th>
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
                                <td>{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            </div>
          </div>
        </div>
      </div>


        </div>
    );
};


export default Viewdonationreq