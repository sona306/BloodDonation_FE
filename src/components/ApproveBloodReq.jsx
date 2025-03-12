import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApproveBloodReq = () => {
    const [urgency, setUrgency] = useState('');
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setRequests([]);
        setSubmitted(false);
        setLoading(true);

        if (!urgency) {
            setError('Please select an urgency level.');
            setLoading(false);
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
                setRequests(result.requests);
            } else {
                setError(result.message || 'Error fetching blood requests.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Error fetching blood requests.');
        } finally {
            setLoading(false);
            setSubmitted(true);
        }
    };

    return (
        <div className="container py-5">
            <h3 className="text-center text-primary mb-4">🚑 Fetch Blood Requests by Urgency</h3>
            
            {/* Back Button */}
            <div className="mb-4">
                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                    Back to Admin Page
                </button>
            </div>

            {/* Form */}
            <div className="card shadow-lg border-0" style={{ borderRadius: '12px' }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Urgency Dropdown */}
                        <div className="mb-3">
                            <label htmlFor="urgency" className="form-label fw-bold">Urgency Level:</label>
                            <select
                                className="form-select"
                                id="urgency"
                                value={urgency}
                                onChange={(e) => setUrgency(e.target.value)}
                                required
                            >
                                <option value="">-- Select Urgency Level --</option>
                                <option value="Normal">Normal</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Fetching...' : 'Fetch Requests'}
                            </button>
                        </div>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Display Results */}
            {submitted && !loading && !error && (
                <div className="mt-4">
                    {requests.length > 0 ? (
                        <>
                            <h5 className="text-success mb-3">
                                Blood Requests with Urgency: <strong>{urgency}</strong>
                            </h5>
                            <ul className="list-group">
                                {requests.map((request, index) => (
                                    <li key={index} className="list-group-item">
                                        <div className="mb-1">
                                            <strong>Full Name:</strong> {request.fullname}
                                        </div>
                                        <div className="mb-1">
                                            <strong>Blood Type:</strong> {request.BloodGroup}
                                        </div>
                                        <div className="mb-1">
                                            <strong>Requested Date:</strong> {new Date(request.requestedDate).toLocaleDateString()}
                                        </div>
                                        <div className="mb-1">
                                            <strong>Location:</strong> {request.location}
                                        </div>
                                        <div className="mb-1">
                                            <strong>Amount Required:</strong> {request.Amount} units
                                        </div>
                                        <div>
                                            <strong>Urgency:</strong> {request.urgency}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <div className="alert alert-info">
                            No blood requests found for urgency: <strong>{urgency}</strong>.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ApproveBloodReq;
