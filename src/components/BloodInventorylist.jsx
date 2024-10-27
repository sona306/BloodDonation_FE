import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BloodInventorylist = () => {
    const [inventory, setInventory] = useState([]); // State for blood inventory data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(''); // State for error message

    // Fetch blood inventory data from the backend
    useEffect(() => {
        const fetchBloodInventory = async () => {
            try {
                const response = await axios.post('http://localhost:8080/admin/bloodinventory', {
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
        <div className="container">
            <h3>Blood Inventory</h3>

            {loading ? (
                <div>Loading inventory...</div> // Loading state
            ) : error ? (
                <div className="alert alert-danger">{error}</div> // Error state
            ) : (
                <table className="table">
                    <thead>
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
            )}
        </div>
    );
};

export default BloodInventorylist