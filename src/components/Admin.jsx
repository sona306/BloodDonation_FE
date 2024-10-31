import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bloodalert from './Bloodalert'; // Import the Bloodalert component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Admin = () => {
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to check blood inventory alerts
    const checkInventoryAlerts = async () => {
        try {
            const response = await axios.post('http://localhost:8080/admin/checkbloodinventory', {}, {
                headers: {
                    "token": sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });
            setAlerts(response.data.alerts);
        } catch (error) {
            console.error("Error fetching alerts:", error);
        }
    };

    // Use useEffect to automatically check for alerts on component mount
    useEffect(() => {
        checkInventoryAlerts();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className="container my-5">
            <h2 className="text-center text-black mb-4">Admin Dashboard</h2>

            {/* Back to Home Button */}
            <div className="text-center mb-4">
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>

            <div className="row">
                {/* Donor Requests Management Card */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow border-primary">
                        <h5 className="card-header bg-primary text-white">Donor Requests Management</h5>
                        <div className="card-body">
                            <h3 className="card-title text-uppercase text-primary fw-bold">Manage Donor Requests</h3>
                            <p className="card-text text-muted fs-6">
                                Easily manage all donor requests and approvals in this section. Ensure efficient processing and track the status of each request.
                            </p>
                            <div className="d-flex flex-column">
                                <a href="/approvedonationreq" className="btn btn-primary mb-2">Pending Donor Requests</a>
                                <a href="/viewdonationreq" className="btn btn-primary mb-2">View Status</a>
                                <a href="/inventorydonar" className="btn btn-primary">Manage Inventory</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consumer Requests Management Card */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow border-success">
                        <h5 className="card-header bg-success text-white">Consumer Requests Management</h5>
                        <div className="card-body">
                            <h3 className="card-title text-uppercase fw-bold">Manage Consumer Requests</h3>
                            <p className="card-text text-muted fs-6">
                                Easily manage all consumer requests and approvals in this section.
                            </p>
                            <div className="d-flex flex-column">
                                <a href="/approvebloodreq" className="btn btn-primary mb-2">New Blood Requests</a>
                                <a href="/inventoryconsumer" className="btn btn-primary">Manage Inventory</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blood Inventory Management Card with New Border Color */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow border-info"> {/* Changed to border-info for blue color */}
                        <h5 className="card-header bg-info text-white">Blood Inventory</h5> {/* Header color changed to match border */}
                        <div className="card-body">
                            <h3 className="card-title text-uppercase fw-bold">Manage Blood Inventory</h3>
                            <p className="card-text text-muted fs-6">
                                Easily manage the Blood Inventory list.
                            </p>
                            <div className="d-flex flex-column">
                                <a href="/BloodInventorylist" className="btn btn-primary mb-2">Inventory List</a>
                                <a 
                                    href="/Bloodalert" 
                                    className={`btn ${alerts.length > 0 ? 'btn-danger' : 'btn-primary'}`}
                                >
                                    Alert {alerts.length > 0 && `(${alerts.length})`}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Largest Donors Management Card */}
                <div className="col-md-6 mb-4">
                    <div className="card shadow border-warning">
                        <h5 className="card-header bg-warning text-dark">Largest Donors</h5>
                        <div className="card-body">
                            <h3 className="card-title text-uppercase fw-bold">Check Largest Donors</h3>
                            <p className="card-text text-muted fs-6">
                                See who has donated the maximum amount of blood.
                            </p>
                            <div className="d-flex flex-column">
                                <a href="/largestdonars" className="btn btn-primary mb-2">Check Largest Donor</a>
                                <a href="/create" className="btn btn-primary">Add Post</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
