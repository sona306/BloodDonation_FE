import React, { useState } from 'react';

const RequestBlood = () => {
    const [fullname, setFullname] = useState('');
    const [requestedDate, setRequestedDate] = useState('');
    const [urgency, setUrgency] = useState('Normal');
    const [location, setLocation] = useState('');
    const [BloodGroup, setBloodGroup] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        const payload = {
            fullname,
            requestedDate,
            urgency,
            location,
            BloodGroup,
            Amount: amount,
        };

        try {
            const response = await fetch('http://localhost:8080/consumer/requestBlood', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setMessage(result.message);
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error('Error making the request:', err);
            setError('An error occurred while posting the blood request.');
        }
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f4f6f9' }}>
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '12px' }}>
                <h3 className="text-center text-danger mb-4">Post a Blood Request</h3>
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label fw-bold">Full Name</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="fullname"
                            placeholder="Enter full name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            required
                        />
                    </div>

                    {/* Requested Date */}
                    <div className="mb-3">
                        <label htmlFor="requestedDate" className="form-label fw-bold">Requested Date</label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            id="requestedDate"
                            value={requestedDate}
                            onChange={(e) => setRequestedDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Urgency */}
                    <div className="mb-3">
                        <label htmlFor="urgency" className="form-label fw-bold">Urgency</label>
                        <select
                            className="form-select rounded-3"
                            id="urgency"
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value)}
                            required
                        >
                            <option value="Normal">Normal</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label fw-bold">Location</label>
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="location"
                            placeholder="Enter your location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Blood Group */}
                    <div className="mb-3">
                        <label htmlFor="BloodGroup" className="form-label fw-bold">Blood Group</label>
                        <select
                            className="form-select rounded-3"
                            id="BloodGroup"
                            value={BloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            required
                        >
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    {/* Amount */}
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label fw-bold">Amount (in units)</label>
                        <input
                            type="number"
                            className="form-control rounded-3"
                            id="amount"
                            placeholder="Enter amount in units"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-danger w-100 rounded-3 fw-bold py-2">
                        Submit Request
                    </button>
                </form>

                {/* Success or Error Message */}
                {message && (
                    <div className="alert alert-success mt-3 text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger mt-3 text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestBlood;
