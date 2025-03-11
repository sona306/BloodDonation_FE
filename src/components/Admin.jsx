import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [alerts, setAlerts] = useState([]);
    const navigate = useNavigate();

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

    useEffect(() => {
        checkInventoryAlerts();
    }, []);

    return (
        <div className="container my-5">

            {/* Back to Home Button at Right Top */}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                >
                    ⬅️ Back to Home
                </button>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {/* Donor Requests Management Card */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-primary h-100 rounded-3">
                        <h5 className="card-header bg-primary text-white text-center">Donor Requests</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase text-primary fw-bold">Manage Donor Requests</h3>
                            <p className="card-text text-muted fs-6">
                                Approve or reject donor requests quickly and track each status.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/approvedonationreq" className="btn btn-outline-primary mb-2">Pending Requests</a>
                                <a href="/viewdonationreq" className="btn btn-outline-primary mb-2">View Requests</a>
                                <a href="/inventorydonar" className="btn btn-outline-primary">Manage Inventory</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consumer Requests Management Card */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-success h-100 rounded-3">
                        <h5 className="card-header bg-success text-white text-center">Consumer Requests</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase fw-bold">Manage Consumer Requests</h3>
                            <p className="card-text text-muted fs-6">
                                Approve or reject consumer requests for blood with ease.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/approvebloodreq" className="btn btn-outline-success mb-2">New Blood Requests</a>
                                <a href="/inventoryconsumer" className="btn btn-outline-success">Manage Inventory</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Blood Inventory Management Card */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-info h-100 rounded-3">
                        <h5 className="card-header bg-info text-white text-center">Blood Inventory</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase fw-bold">Manage Blood Inventory</h3>
                            <p className="card-text text-muted fs-6">
                                Keep track of the available blood inventory and alerts for low supplies.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/BloodInventorylist" className="btn btn-outline-info mb-2">Inventory List</a>
                                <a
                                    href="/Bloodalert"
                                    className={`btn ${alerts.length > 0 ? 'btn-danger' : 'btn-outline-info'}`}
                                >
                                    Alerts {alerts.length > 0 && `(${alerts.length})`}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Largest Donors Management Card */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-warning h-100 rounded-3">
                        <h5 className="card-header bg-warning text-dark text-center">Largest Donors</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase fw-bold">Top Blood Donors</h3>
                            <p className="card-text text-muted fs-6">
                                View the donors who have contributed the most blood.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/largestdonars" className="btn btn-outline-warning mb-2">Check Top Donors</a>
                                <a href="/create" className="btn btn-outline-warning mb-2">Add Post</a>
                                <a href="/viwemypostadmin" className="btn btn-outline-warning">View Posts</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donation Camps Management Card */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-success h-100 rounded-3">
                        <h5 className="card-header bg-success text-white text-center">Donation Camps</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase fw-bold">Create Blood Donation Camps</h3>
                            <p className="card-text text-muted fs-6">
                                View and manage upcoming donation camps for blood donors.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/createcamp" className="btn btn-outline-success mb-2">Create Camp</a>
                                <a href="/admincampregi" className="btn btn-outline-success mb-2">View Registrations</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hospital Requests Management Card */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-warning h-100 rounded-3">
                        <h5 className="card-header bg-warning text-white text-center">Hospital</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase fw-bold">Hospital Request for Blood</h3>
                            <p className="card-text text-muted fs-6">
                                View and manage hospital emergency requests.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/hospitalreq" className="btn btn-outline-warning mb-2">New Request</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Donor reminder */}
                <div className="col mb-4">
                    <div className="card shadow-lg border-primary h-100 rounded-3">
                        <h5 className="card-header bg-primary text-white text-center">Donor Reminder</h5>
                        <div className="card-body d-flex flex-column">
                            <h3 className="card-title text-uppercase fw-bold">Donor details and reminder set</h3>
                            <p className="card-text text-muted fs-6">
                                View and manage reminder.
                            </p>
                            <div className="d-flex flex-column mt-auto">
                                <a href="/donordetails" className="btn btn-outline-primary mb-2">Donor Details</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;
