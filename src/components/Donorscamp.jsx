import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donorscamp = () => {
    const [camps, setCamps] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the list of camps on component mount
    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const response = await axios.get('http://localhost:8080/donor/camps');
                
                // Sort camps based on the date and time posted by admin
                const sortedCamps = response.data.camps.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest date & time
                setCamps(sortedCamps); // Store camps in the state
            } catch (err) {
                setError('Failed to fetch camps'); // Error handling
            } finally {
                setIsLoading(false); // Stop loading when data is fetched
            }
        };

        fetchCamps();
    }, []); // Empty dependency array, so the effect runs only once after initial render

    if (isLoading) {
        return <div className="text-center"><h4>Loading camps...</h4></div>;  // Show loading message
    }

    if (error) {
        return <div className="text-center text-danger"><h4>{error}</h4></div>;  // Display an error message if the fetch fails
    }

    if (camps.length === 0) {
        return <div className="text-center"><h4>No camps available at the moment.</h4></div>;  // Display if no camps are available
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Upcoming Blood Donation Camps</h2>
            {camps.map((camp) => (
                <div key={camp._id} className="camp-item card mb-4 shadow-sm" style={{ borderRadius: '10px' }}>
                    <div className="card-body">
                        <h5 className="card-title text-primary">{camp.title}</h5>
                        <p className="card-text"><strong>Location:</strong> {camp.location}</p>
                        <p className="card-text"><strong>Date:</strong> {new Date(camp.date).toLocaleString()}</p>  {/* Show date and time */}
                        <p className="card-text"><strong>Contact:</strong> {camp.contact}</p>
                        <p className="card-text"><strong>Description:</strong> {camp.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Donorscamp;
