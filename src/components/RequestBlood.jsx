import React, { useState } from 'react'

const RequestBlood = () => {
    // State variables to capture form inputs
    
    const [fullname, setFullname] = useState('');
    const [requestedDate, setRequestedDate] = useState('');
    const [urgency, setUrgency] = useState('Normal');
    const [location, setLocation] = useState('');
    const [BloodGroup, setBloodGroup] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState(''); // State to store API response message
    const [error, setError] = useState(''); // State to store error messages

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission

        setMessage(''); // Clear previous message
        setError(''); // Clear previous error

        // Create the request payload
        const payload = {
            
            fullname,
            requestedDate,
            urgency,
            location,
            BloodGroup,
            Amount: amount
        };

        try {
            const response = await fetch('http://localhost:8080/consumer/requestBlood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            // Check if the API request was successful
            if (result.status === 'success') {
                setMessage(result.message); // Set success message
            } else {
                setError(result.message); // Set error message
            }
        } catch (err) {
            console.error('Error making the request:', err);
            setError('An error occurred while posting the blood request.');
        }
    };

    return (
        <div className="container">
            <h3 className="text-center">Post a Blood Request</h3>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="requestedDate" className="form-label">Requested Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="requestedDate"
                        value={requestedDate}
                        onChange={(e) => setRequestedDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="urgency" className="form-label">Urgency</label>
                    <select
                        className="form-control"
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
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="BloodGroup" className="form-label">Blood Type</label>
                    <select
                        className="form-control"
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
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount (in units)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Post Request</button>
            </form>

            {/* Display success or error messages */}
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default RequestBlood