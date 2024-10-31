import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const BloodInventorylist = () => {
    const [inventory, setInventory] = useState([]); // State for blood inventory data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch blood inventory data from the backend
    useEffect(() => {
        const fetchBloodInventory = async () => {
            try {
                const response = await axios.post('http://localhost:8080/admin/bloodinventory', {}, { // Fix request format
                    headers: {
                        "token": sessionStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                });
                setInventory(response.data.inventory); // Set the inventory data
            } catch (error) {
                console.error("Error fetching blood inventory:", error);
                setError("Failed to fetch blood inventory."); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchBloodInventory(); // Call the fetch function
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Blood Inventory</h3>

            {loading ? (
                <div className="alert alert-info">Loading inventory...</div> // Loading state
            ) : error ? (
                <div className="alert alert-danger">{error}</div> // Error state
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Blood Group</th>
                                <th>Amount (units)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.BloodGroup}</td>
                                    <td>{item.Amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Back to Admin Page button */}
            <button className="btn btn-secondary mt-4" onClick={() => navigate('/admin')}>
                Back to Admin Page
            </button>
        </div>
    );
};

export default BloodInventorylist;
