import React, { useState } from 'react';
import { FaUser, FaTint, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa'; // Icons for better UI

const SearchDonar = () => {
    const [BloodGroup, setBloodGroup] = useState('');
    const [donors, setDonors] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDonors([]);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/consumer/searchDonor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ BloodGroup }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                setError('No donor has registered yet!');
                return;
            }

            const result = await response.json();

            if (result.status === 'success') {
                setDonors(result.donors);
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('No donor has registered yet!');
        }
    };

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f4f6f9' }}>
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px', borderRadius: '12px' }}>
                <h3 className="text-center text-danger mb-4">Search for Donors</h3>

                {/* Search Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="BloodGroup" className="form-label fw-bold">Select Blood Group</label>
                        <select
                            className="form-select rounded-3"
                            id="BloodGroup"
                            value={BloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            required
                        >
                            <option value="">Select Blood Group</option>
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

                    <button type="submit" className="btn btn-danger w-100 rounded-3 fw-bold py-2">
                        Search Donors
                    </button>
                </form>

                {/* Error Message */}
                {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}

                {/* Donor List */}
                {donors.length > 0 && (
                    <div className="mt-4">
                        <h5 className="text-success text-center">Donors Found:</h5>
                        <ul className="list-group">
                            {donors.map((donor, index) => (
                                <li
                                    key={index}
                                    className="list-group-item border rounded-3 shadow-sm mb-2"
                                    style={{ backgroundColor: '#e6f7f2' }}
                                >
                                    <p className="mb-1">
                                        <FaUser className="text-primary me-2" />
                                        <strong>{donor.fullname}</strong>
                                    </p>
                                    <p className="mb-1">
                                        <FaTint className="text-danger me-2" />
                                        <strong>Blood Group:</strong> {donor.BloodGroup}
                                    </p>
                                    <p className="mb-1">
                                        <FaEnvelope className="text-info me-2" />
                                        <strong>Email:</strong> {donor.email}
                                    </p>
                                    <p className="mb-1">
                                        <FaPhone className="text-success me-2" />
                                        <strong>Phone Number:</strong> {donor.phonenumber}
                                    </p>
                                    <p className="mb-0">
                                        <FaCalendarAlt className="text-warning me-2" />
                                        <strong>Last Donation Date:</strong> {donor.lastdonationdate}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonar;
