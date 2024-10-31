import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarlogin from './Navbarlogin';

const DonorReq = () => {
    const [donationreq, setData] = useState({
        "userId": sessionStorage.getItem("userId"),
        "fullname": '',
        "requestedDate": '',
        "location": '',
        "BloodGroup": '',
        "Amount": '',
        "confirmavalibility": '',
        "donationHistory": false,
        "date": '',
        "hospitalName": '',
        "quality": '',
        "ageRequirement": '',
        "generalHealthCondition": '',
        "hemoglobinLevel": '',
        "pulseRate": '',
        "medicalAndLifestyleHistory": '',
        "medicationRestrictions": '',
        "waitingPeriodBetweenDonations": ''
    });

    const inputHandler = (event) => {
        const { name, value, type, checked } = event.target;
        setData({
            ...donationreq,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const readvalue = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        console.log("Payload being sent:", JSON.stringify(donationreq, null, 2));
        try {
            const response = await axios.post("http://localhost:8080/donar/requestBloodDonation", donationreq, {
                headers: {
                    "token": sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });

            if (response.data.status === "success") {
                alert("Request sent successfully");
                navigate('/');
            } else {
                alert(response.data.status);
            }
        } catch (error) {
            console.error("Error in Axios request:", error.response ? error.response.data : error.message);
            alert("An error occurred: " + (error.response ? error.response.data.message : error.message));
        }
    };

    let navigate = useNavigate();

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <Navbarlogin />
            <div className="container mt-5">
                <h3 className="text-center text-danger mb-4">Blood Donation Request</h3>
                <form onSubmit={readvalue}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" name='fullname' placeholder='Enter full name' value={donationreq.fullname} onChange={inputHandler} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Requested Date</label>
                            <input type="date" className="form-control" name='requestedDate' value={donationreq.requestedDate} onChange={inputHandler} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Confirm Availability</label>
                            <input type="text" className="form-control" name='confirmavalibility' placeholder='Are you available to donate?' value={donationreq.confirmavalibility} onChange={inputHandler} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Location</label>
                            <input type="text" className="form-control" name='location' placeholder='Enter your location' value={donationreq.location} onChange={inputHandler} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Blood Group</label>
                            <select name="BloodGroup" className="form-select" value={donationreq.BloodGroup} onChange={inputHandler} required>
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
                        <div className="col-md-6">
                            <label className="form-label">Amount (in units)</label>
                            <input type="number" className="form-control" name='Amount' placeholder='Enter amount' value={donationreq.Amount} onChange={inputHandler} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Age Requirement</label>
                            <select name="ageRequirement" className="form-select" value={donationreq.ageRequirement} onChange={inputHandler} required>
                                <option value="">Select Age Requirement</option>
                                <option value="18-65 years old">18-65 years old</option>
                                <option value="Older than 65 (check eligibility)">Older than 65 (check eligibility)</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">General Health Condition</label>
                            <select name="generalHealthCondition" className="form-select" value={donationreq.generalHealthCondition} onChange={inputHandler} required>
                                <option value="">Select Health Condition</option>
                                <option value="Good Health">Good Health</option>
                                <option value="Recent Illness">Recent Illness</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Hemoglobin Level</label>
                            <select name="hemoglobinLevel" className="form-select" value={donationreq.hemoglobinLevel} onChange={inputHandler} required>
                                <option value="">Select Hemoglobin Level</option>
                                <option value="Adequate">Adequate</option>
                                <option value="Inadequate">Inadequate</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Pulse Rate</label>
                            <select name="pulseRate" className="form-select" value={donationreq.pulseRate} onChange={inputHandler} required>
                                <option value="">Select Pulse Rate</option>
                                <option value="Normal (50-100 bpm)">Normal (50-100 bpm)</option>
                                <option value="Irregular">Irregular</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Medical and Lifestyle History</label>
                            <select name="medicalAndLifestyleHistory" className="form-select" value={donationreq.medicalAndLifestyleHistory} onChange={inputHandler} required>
                                <option value="">Select Medical History</option>
                                <option value="Yes, recent major surgeries">Yes, recent major surgeries</option>
                                <option value="Yes, history of blood-transmissible diseases">Yes, history of blood-transmissible diseases</option>
                                <option value="Yes, recent vaccinations">Yes, recent vaccinations</option>
                                <option value="Yes, high-risk lifestyle behaviors">Yes, high-risk lifestyle behaviors</option>
                                <option value="Yes, chronic conditions">Yes, chronic conditions</option>
                                <option value="No Issues">No Issues</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Medication Restrictions</label>
                            <select name="medicationRestrictions" className="form-select" value={donationreq.medicationRestrictions} onChange={inputHandler} required>
                                <option value="">Select Medication Restrictions</option>
                                <option value="No Restrictions">No Restrictions</option>
                                <option value="Antibiotics: Wait at least 48 hours">Antibiotics: Wait at least 48 hours</option>
                                <option value="Aspirin: Wait before platelet donation">Aspirin: Wait before platelet donation</option>
                                <option value="Insulin and other medications need assessment">Insulin and other medications need assessment</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Waiting Period Between Donations</label>
                            <select name="waitingPeriodBetweenDonations" className="form-select" value={donationreq.waitingPeriodBetweenDonations} onChange={inputHandler} required>
                                <option value="">Select Waiting Period</option>
                                <option value="8 weeks (Whole Blood)">8 weeks (Whole Blood)</option>
                                <option value="2-4 weeks (Platelets)">2-4 weeks (Platelets)</option>
                                <option value="4 weeks (Plasma)">4 weeks (Plasma)</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Donation History</label>
                            <input type="checkbox" name='donationHistory' checked={donationreq.donationHistory} onChange={inputHandler} /> <span>Have you donated before?</span>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonorReq;
