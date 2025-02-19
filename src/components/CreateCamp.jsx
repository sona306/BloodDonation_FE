import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbarlogin from './Navbarlogin';

const CreateCamp = () => {
    const [campDetails, setCampDetails] = useState({
        title: '',
        location: '',
        date: '',
        contact: '',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Input handler to update campDetails state
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setCampDetails({
            ...campDetails,
            [name]: value
        });
    };

    // Form submission handler
    const submitCamp = async (event) => {
        event.preventDefault();

        if (!campDetails.title || !campDetails.location || !campDetails.date || !campDetails.contact || !campDetails.description) {
            setMessage("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            const token = sessionStorage.getItem("token");

            if (!token) {
                alert("No token found, please log in again.");
                return;
            }

            const response = await axios.post("http://localhost:8080/admin/createcamp", campDetails, {
                headers: {
                    "token": token,
                    "Content-Type": "application/json"
                }
            });

            // Handle response from the backend API
            if (response.data.status === "Success") {
                alert("Camp created successfully and notifications sent to donors!");
                navigate('/admin');
            } else {
                setMessage(response.data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error in Axios request:", error.response ? error.response.data : error.message);
            setMessage("An error occurred: " + (error.response ? error.response.data.message : error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <Navbarlogin />
            <div className="container mt-5">
                <h3 className="text-center text-danger mb-4">Create Blood Donation Camp</h3>

                {message && <div className="alert alert-warning">{message}</div>}

                <form onSubmit={submitCamp}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label">Camp Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={campDetails.title}
                                onChange={inputHandler}
                                placeholder="Enter camp title"
                                required
                                style={{ borderRadius: '8px' }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                value={campDetails.location}
                                onChange={inputHandler}
                                placeholder="Enter camp location"
                                required
                                style={{ borderRadius: '8px' }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={campDetails.date}
                                onChange={inputHandler}
                                required
                                style={{ borderRadius: '8px' }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                name="contact"
                                value={campDetails.contact}
                                onChange={inputHandler}
                                placeholder="Enter contact number"
                                required
                                style={{ borderRadius: '8px' }}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={campDetails.description}
                                onChange={inputHandler}
                                placeholder="Provide a brief description of the camp"
                                required
                                style={{ borderRadius: '8px' }}
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            style={{
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontSize: '16px',
                            }}
                        >
                            {isSubmitting ? 'Creating Camp...' : 'Create Camp'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCamp;
