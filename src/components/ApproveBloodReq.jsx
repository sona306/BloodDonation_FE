import React, { useState } from 'react'

const ApproveBloodReq = () => {
    const [urgency, setUrgency] = useState(''); // State to store urgency input
    const [requests, setRequests] = useState([]); // State to store fetched requests
    const [error, setError] = useState(''); // State to store error messages
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [submitted, setSubmitted] = useState(false); // State to track if form has been submitted

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setError(''); // Reset error
        setRequests([]); // Reset previous results
        setSubmitted(false); // Reset the submission state
        setLoading(true); // Start loading

        if (!urgency) {
            setError('Please select an urgency level.');
            setLoading(false); // Stop loading if validation fails
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/admin/bloodRequestsByUrgency', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ urgency }),
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                setRequests(result.requests); // Set the blood requests
            } else {
                setError(result.message || 'Error fetching blood requests.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error fetching blood requests.');
        } finally {
            setLoading(false); // Stop loading
            setSubmitted(true); // Set the form submission state to true
        }
    };

    return (
        <div className="container">
            <h3 className="text-center">Fetch Blood Requests by Urgency</h3>

            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="urgency" className="form-label">Urgency Level</label>
                    <select
                        className="form-control"
                        id="urgency"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        required
                    >
                        <option value="">Select urgency level</option>
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch Requests'}
                </button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {requests.length > 0 && (
                <div className="mt-3">
                    <h5>Blood Requests with Urgency: {urgency}</h5>
                    <ul className="list-group">
                        {requests.map((request, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Full Name:</strong> {request.fullname}<br />
                                <strong>Blood Type:</strong> {request.BloodGroup}<br />
                                <strong>Requested Date:</strong> {new Date(request.requestedDate).toLocaleDateString()}<br />
                                <strong>Location:</strong> {request.location}<br />
                                <strong>Amount Required:</strong> {request.Amount} units<br />
                                <strong>Urgency:</strong> {request.urgency}<br />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {requests.length === 0 && submitted && !loading && !error && (
                <div className="mt-3 alert alert-info">
                    No blood requests found for urgency: {urgency}.
                </div>
            )}
        </div>
    );
};


export default ApproveBloodReq