import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bloodalert from './Bloodalert'; // Import the Bloodalert component

const Admin = () => {
    const [alerts, setAlerts] = useState([]);

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
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="col-12">

                            <div className="card">
                                <h5 className="card-header">Welcome to admin page..</h5>
                                <div className="card-body">
                                    <h3 className="card-title text-uppercase text-primary fw-bold">Donor Requests Management</h3>
                                    <p className="card-text text-muted fs-5">
                                        Easily manage all donor requests and approvals in this section. Ensure efficient processing and track the status of each request.
                                    </p>
                                    <a href="/approvedonationreq" className="btn btn-primary">Pending Donor Request</a><br /><br />
                                    <a href="/viewdonationreq" className="btn btn-primary">View Status</a><br /><br />
                                    <a href="/inventorydonar" className="btn btn-primary">Manage Inventory</a>
                                </div>
                            </div><br />

                            <div className="card">
                                <h5 className="card-header">Welcome</h5>
                                <div className="card-body">
                                    <h3 className="card-title text-uppercase text-success fw-bold">Consumer Requests Management</h3>
                                    <p className="card-text text-muted fs-5">
                                        Easily manage all consumer requests and approvals in this section.
                                    </p>
                                    <a href="/approvebloodreq" className="btn btn-primary">New Blood Request</a><br /><br />
                                    <a href="/inventoryconsumer" className="btn btn-primary">Manage Inventory</a><br /><br />
                                </div>
                            </div><br />

                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title text-uppercase text-danger fw-bold">Blood Inventory</h3>
                                    <p className="card-text text-muted fs-5">
                                        Easily manage Blood Inventory list.
                                    </p>
                                    <a href="/BloodInventorylist" className="btn btn-primary">Inventory list</a><br /><br />
                                    
                                    {/* Alert Button with conditional red marking */}
                                    <a 
                                        href="/Bloodalert" 
                                        className={`btn ${alerts.length > 0 ? 'btn-danger' : 'btn-primary'}`}
                                    >
                                        Alert {alerts.length > 0 && `(${alerts.length})`}
                                    </a><br /><br />
                                </div>
                            </div><br></br>

                            <div className="card">
                                <h5 className="card-header">Welcome</h5>
                                <div className="card-body">
                                    <h3 className="card-title text-uppercase text-warning fw-bold">Largest Donars</h3>
                                    <p className="card-text text-muted fs-5">
                                        See who have donated maximum amount of blood 
                                    </p>
                                    <a href="/largestdonars" className="btn btn-primary">Check now</a><br /><br />
                                </div>
                            </div><br />

                        </div>
                    </div>
                </div>
            </div>

            {/* Optionally render the Bloodalert component here */}
            {/* <Bloodalert /> */}
        </div>
    );
}

export default Admin;
