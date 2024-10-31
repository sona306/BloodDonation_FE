import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Largestdonars = () => {
    const [highestDonors, setHighestDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchHighestDonors = async () => {
            try {
                const response = await axios.post('http://localhost:8080/admin/highestDonorsPerSixMonths'); // Updated endpoint
                console.log('API Response:', response.data); // Log the API response
                setHighestDonors(response.data.highestDonors);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchHighestDonors();
    }, []);

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Highest Blood Donors Per 6 Months</h2>
            <div className="row">
                {highestDonors.length > 0 ? (
                    highestDonors.map((donor, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Period: {donor.period || 'N/A'}</h5>
                                    <p className="card-text">
                                        <strong>Donor Name:</strong> {donor.donor ? donor.donor.fullname : 'N/A'} <br />
                                        <strong>Date of Birth:</strong> {donor.donor ? donor.donor.dateofbirth : 'N/A'} <br />
                                        <strong>Gender:</strong> {donor.donor ? donor.donor.gender : 'N/A'} <br />
                                        <strong>Blood Type:</strong> {donor.donor ? donor.donor.bloodtype : 'N/A'} <br />
                                        <strong>Phone Number:</strong> {donor.donor ? donor.donor.phonenumber : 'N/A'} <br />
                                        <strong>Email:</strong> {donor.donor ? donor.donor.email : 'N/A'} <br />
                                        <strong>Home Address:</strong> {donor.donor ? donor.donor.homeaddress : 'N/A'} <br />
                                        <strong>Location:</strong> {donor.donor ? donor.donor.location : 'N/A'} <br />
                                        <strong>Total Amount Donated:</strong> {donor.totalAmount} units
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-warning">No highest donors available.</div>
                    </div>
                )}
            </div>
            {/* Back to Admin Page button */}
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                    Back to Admin Page
                </button>
            </div>
        </div>
    );
};

export default Largestdonars;
