import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [alerts, setAlerts] = useState([]);

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

    const cardData = [
        {
            title: 'Donor Requests',
            description: 'Approve or reject donor requests quickly and track each status.',
            links: [
                { path: '/approvedonationreq', label: 'Pending Requests' },
                { path: '/viewdonationreq', label: 'View Requests' },
                { path: '/inventorydonar', label: 'Manage Inventory' }
            ],
            color: 'primary'
        },
        {
            title: 'Consumer Requests',
            description: 'Approve or reject consumer requests for blood with ease.',
            links: [
                { path: '/approvebloodreq', label: 'New Blood Requests' },
                { path: '/inventoryconsumer', label: 'Manage Inventory' }
            ],
            color: 'danger'
        },
        {
            title: 'Blood Inventory',
            description: 'Keep track of the available blood inventory and alerts for low supplies.',
            links: [
                { path: '/BloodInventorylist', label: 'Inventory List' },
                { path: '/Bloodalert', label: `Alerts ${alerts.length > 0 ? `(${alerts.length})` : ''}`, alert: alerts.length > 0 }
            ],
            color: 'primary'
        },
        {
            title: 'Largest Donors',
            description: 'View the donors who have contributed the most blood.',
            links: [
                { path: '/largestdonars', label: 'Check Top Donors' },
                { path: '/create', label: 'Add Post' },
                { path: '/viwemypostadmin', label: 'View Posts' }
            ],
            color: 'primary'
        },
        {
            title: 'Donation Camps',
            description: 'View and manage upcoming donation camps for blood donors.',
            links: [
                { path: '/createcamp', label: 'Create Camp' },
                { path: '/admincampregi', label: 'View Registrations' }
            ],
            color: 'danger'
        },
        {
            title: 'Hospital Requests',
            description: 'View and manage hospital emergency requests.',
            links: [
                { path: '/hospitalreq', label: 'New Request' }
            ],
            color: 'primary'
        },
        {
            title: 'Donor Reminder',
            description: 'View and manage reminders.',
            links: [
                { path: '/donordetails', label: 'Donor Details' },
                { path: '/emailsend', label: 'Email Reminder' },
                { path: '/emergencyreqmail', label: 'Email Emergency' }
            ],
            color: 'primary'
        }
    ];

    return (
        <div className="container my-5">
            {/* Heading and Description */}
            <div className="mb-4 text-center">
                <h1 className="fw-bold">Admin Dashboard</h1>
                <p className="text-muted">
                    Manage blood donation requests, inventory, and donor activities effectively.
                </p>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {cardData.map((card, index) => (
                    <div className="col" key={index} style={{ minHeight: '300px' }}>
                        <div className={`card shadow-lg border-${card.color} h-100 rounded-3`} style={{ minHeight: '100%' }}>
                            <h5 className={`card-header bg-${card.color} text-white text-center`}>{card.title}</h5>
                            <div className="card-body d-flex flex-column">
                                <h3 className="card-title text-uppercase fw-bold">{card.title}</h3>
                                <p className="card-text text-muted fs-6">{card.description}</p>
                                <div className="d-flex flex-column mt-auto">
                                    {card.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.path}
                                            className={`btn ${link.alert ? 'btn-danger' : `btn-outline-${card.color}`} mb-2`}
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
