import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarlogin from './Navbarlogin';


const DonorReq = () => {
    const [donationreq, setData] = useState({
        "userId":sessionStorage.getItem("userId"),
        "fullname":'',
        "requestedDate": '',
        "location": '',
        "BloodGroup": '',
        "Amount": '',
        "confirmavalibility": '',
        "donationHistory": false,
        "date": '',
        "hospitalName": '',
        "quality": ''
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
                navigate('/')
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
        <div>
            <Navbarlogin />
            <div className="container">
                <form onSubmit={readvalue}> {/* Add onSubmit to the form */}
                    <div className="row">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                            <label className="label_label">Full Name</label>
                            <input type="text" className="form-control" name='fullname' value={donationreq.fullname} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                            <label className="label_label">Requested Date</label>
                            <input type="date" className="form-control" name='requestedDate' value={donationreq.requestedDate} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                            <label className="label_label">Confirm Availability</label>
                            <input type="text" className="form-control" name='confirmavalibility' value={donationreq.confirmavalibility} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                            <label className="label_label">Location</label>
                            <input type="text" className="form-control" name='location' value={donationreq.location} onChange={inputHandler} />
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                            <label className="form-label">Blood Group</label>
                            <select name="BloodGroup" className="form-control" value={donationreq.BloodGroup} onChange={inputHandler}>
                                <option value="select">------------Select--------------</option>
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
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br />
                            <label className="label_label">Amount (in units)</label>
                            <input type="number" className="form-control" name='Amount' value={donationreq.Amount} onChange={inputHandler} />
                        </div>

                        <label>Donation History:</label>
                        <input type="checkbox" name="donationHistory" checked={donationreq.donationHistory} onChange={inputHandler} />

                        {/* Conditionally render fields based on donationHistory */}
                        {donationreq.donationHistory && (
                            <>
                                <label>Date of Last Donation:</label>
                                <input type="date" name="date" value={donationreq.date} onChange={inputHandler} required />

                                <label>Hospital Name:</label>
                                <input type="text" name="hospitalName" value={donationreq.hospitalName} onChange={inputHandler} required />

                                <label>Quality of Donation:</label>
                                <input type="text" name="quality" value={donationreq.quality} onChange={inputHandler} required />
                            </>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button> {/* Add a submit button */}
                </form>
            </div>
        </div>
    );
}

export default DonorReq;