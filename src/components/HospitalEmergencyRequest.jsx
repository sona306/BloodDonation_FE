import axios from 'axios';
import React, { useState } from 'react';
import Navbarlogin from './Navbarlogin';

const HospitalEmergencyRequest = () => {
    const [request, setRequest] = useState({
        hospitalName: '',
        bloodType: '',
        unitsRequired: '',
        urgencyLevel: '',
        contactNumber: '',
        location: '',
        additionalNotes: '',
        expectedDeliveryTime: ''
    });

    const inputHandler = (event) => {
        setRequest({ ...request, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        if (!request.hospitalName || !request.bloodType || !request.unitsRequired || !request.urgencyLevel || !request.contactNumber) {
            alert("Please fill in all required fields!");
            return false;
        }
        if (request.expectedDeliveryTime && isNaN(new Date(request.expectedDeliveryTime).getTime())) {
            alert("Invalid expected delivery time format!");
            return false;
        }
        return true;
    };

    const submitRequest = () => {
        if (!validateForm()) return;

        axios.post('http://localhost:8080/api/hospitals/emergency-blood-request', request)
            .then((response) => {
                alert(response.data.message);
                setRequest({
                    hospitalName: '',
                    bloodType: '',
                    unitsRequired: '',
                    urgencyLevel: '',
                    contactNumber: '',
                    location: '',
                    additionalNotes: '',
                    expectedDeliveryTime: ''
                });
            })
            .catch((error) => {
                console.error('Error submitting request:', error);
                alert('Failed to submit request.');
            });
    };

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#FFF8E1', fontFamily: 'Roboto, sans-serif' }}>
            <Navbarlogin />
            <div className="container my-auto">
                <h3 className="text-center text-danger">🚨 Emergency Blood Request</h3>
                <h5 className="text-center text-secondary mb-4">Hospital Request Form</h5>
                <div className="d-flex justify-content-center">
                    <div className="card shadow-lg p-4 rounded" style={{ width: '75%', maxWidth: '1000px' }}>
                        <div className="row g-3">
                            {/* Left Column */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Hospital Name</label>
                                    <input type="text" className="form-control" name="hospitalName" placeholder="Enter hospital name" value={request.hospitalName} onChange={inputHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Blood Type</label>
                                    <select className="form-control" name="bloodType" value={request.bloodType} onChange={inputHandler}>
                                        <option value="">Select Blood Type</option>
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Units Required</label>
                                    <input type="number" className="form-control" name="unitsRequired" placeholder="Enter number of units" value={request.unitsRequired} onChange={inputHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Urgency Level</label>
                                    <select className="form-control" name="urgencyLevel" value={request.urgencyLevel} onChange={inputHandler}>
                                        <option value="">Select Urgency Level</option>
                                        {['High', 'Medium', 'Low'].map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Contact Number</label>
                                    <input type="text" className="form-control" name="contactNumber" placeholder="Enter contact number" value={request.contactNumber} onChange={inputHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-control" name="location" placeholder="Enter hospital location" value={request.location} onChange={inputHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Expected Delivery Time</label>
                                    <input type="datetime-local" className="form-control" name="expectedDeliveryTime" value={request.expectedDeliveryTime} onChange={inputHandler} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Additional Notes</label>
                                    <textarea className="form-control" name="additionalNotes" placeholder="Enter any additional information" value={request.additionalNotes} onChange={inputHandler}></textarea>
                                </div>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button className="btn btn-danger w-100 mt-3 py-2" style={{ fontSize: '18px', fontWeight: 'bold' }} onClick={submitRequest}>
                            🚑 Send Emergency Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalEmergencyRequest;
