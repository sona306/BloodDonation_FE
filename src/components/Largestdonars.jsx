import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Largestdonars = () => {
    const [highestDonors, setHighestDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHighestDonors = async () => {
            try {
                const response = await axios.post('http://localhost:8080/admin/highestDonorsPerMonth');
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Highest Blood Donors Per Month</h2>
            <div className="row">
                {highestDonors.map((donor, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Month: {donor.month ? donor.month : 'N/A'}</h5>
                                <p className="card-text">
                                    Donor Name: {donor.donor ? donor.donor.fullname : 'N/A'} <br />
                                    Date of Birth: {donor.donor ? donor.donor.dateofbirth : 'N/A'} <br />
                                    Gender: {donor.donor ? donor.donor.gender : 'N/A'} <br />
                                    Blood Type: {donor.donor ? donor.donor.bloodtype : 'N/A'} <br />
                                    Phone Number: {donor.donor ? donor.donor.phonenumber : 'N/A'} <br />
                                    Email: {donor.donor ? donor.donor.email : 'N/A'} <br />
                                    Home Address: {donor.donor ? donor.donor.homeaddress : 'N/A'} <br />
                                    Location: {donor.donor ? donor.donor.location : 'N/A'} <br />
                                    Total Amount Donated: {donor.totalAmount} units
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Largestdonars