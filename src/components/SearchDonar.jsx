import React, { useState } from 'react';

const SearchDonar = () => {
    const [bloodType, setBloodType] = useState(''); // State to store blood type input
    const [donors, setDonors] = useState([]); // State to store fetched donors
    const [error, setError] = useState(''); // State to store error messages

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Reset previous results
        setDonors([]);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/consumer/searchDonor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bloodtype: bloodType }),
            });

            // Check if the response is OK
            if (!response.ok) {
                const errorText = await response.text(); // Read the error response as text
                console.error('Error response:', errorText); // Log the error response
                setError('An error occurred while fetching donors.'); // Set a generic error message
                return;
            }

            const result = await response.json(); // Parse the response as JSON

            if (result.status === 'success') {
                setDonors(result.donors); // Set donors if successful
            } else {
                setError(result.message); // Set error message if no donors found
            }
        } catch (err) {
            console.error('Fetch error:', err); // Log any fetch error
            setError('An error occurred while fetching donors.');
        }
    };

    return (
        <div className="container">
            <h3 className="text-center">Search for Donors</h3>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-3">
                    <label htmlFor="bloodType" className="form-label">Blood Type</label>
                    <select
                        className="form-control"
                        id="bloodType"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        required
                    >
                        <option value="">Select blood type</option>
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
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            {donors.length > 0 && (
                <div>
                    <h5>Donors Found:</h5>
                    <ul className="list-group">
                        {donors.map((donor, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Name:</strong> {donor.fullname}<br />
                                <strong>Blood Type:</strong> {donor.bloodtype}<br />
                                <strong>Email:</strong> {donor.email}<br />
                                <strong>Phone Number:</strong> {donor.phonenumber}<br />
                                <strong>Last Donation Date:</strong> {donor.lastdonationdate}<br />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchDonar;