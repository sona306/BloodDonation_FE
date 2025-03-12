import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaInfoCircle } from 'react-icons/fa';

const Donorscamp = () => {
    const [camps, setCamps] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCamps = async () => {
            try {
                const response = await axios.get('http://localhost:8080/donor/camps');
                
                // Sort camps based on the latest date
                const sortedCamps = response.data.camps.sort((a, b) => new Date(b.date) - new Date(a.date));
                setCamps(sortedCamps);
            } catch (err) {
                setError('Failed to fetch camps');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCamps();
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-danger mt-4"><h4>{error}</h4></div>;
    }

    if (camps.length === 0) {
        return <div className="text-center text-secondary mt-4"><h4>No camps available at the moment.</h4></div>;
    }

    return (
        <div className="container py-5">
            <h2 className="text-center text-danger mb-4">🏥 Upcoming Blood Donation Camps</h2>
            <div className="row">
                {camps.map((camp) => (
                    <div key={camp._id} className="col-md-6 mb-4">
                        <div className="card shadow-sm border-0" style={{ borderRadius: '12px', backgroundColor: '#f8f9fa' }}>
                            <div className="card-body">
                                <h5 className="card-title text-danger fw-bold">{camp.title}</h5>
                                
                                <p className="card-text">
                                    <FaMapMarkerAlt className="text-primary me-2" />
                                    <strong>Location:</strong> {camp.location}
                                </p>

                                <p className="card-text">
                                    <FaCalendarAlt className="text-warning me-2" />
                                    <strong>Date:</strong> {new Date(camp.date).toLocaleString()}
                                </p>

                                <p className="card-text">
                                    <FaPhone className="text-success me-2" />
                                    <strong>Contact:</strong> {camp.contact}
                                </p>

                                <p className="card-text">
                                    <FaInfoCircle className="text-info me-2" />
                                    <strong>Description:</strong> {camp.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Donorscamp;
