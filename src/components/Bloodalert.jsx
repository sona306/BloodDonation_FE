import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Bloodalert = () => {
    const [inventory, setInventory] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [error, setError] = useState('');

    // Function to check blood inventory
    const checkInventory = async () => {
        setError('');
        setInventory([]);
        setAlerts([]);

        try {
            const response = await axios.post('http://localhost:8080/admin/checkbloodinventory', {}, {
                headers: {
                    "token": sessionStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            });

            // Log the response for debugging
            console.log('API Response:', response.data);

            setInventory(response.data.inventory);
            setAlerts(response.data.alerts);
        } catch (err) {
            console.error("Error checking blood inventory:", err);
            setError("Failed to check blood inventory. Please try again.");
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    // Use useEffect to automatically check inventory on component mount
    useEffect(() => {
        checkInventory();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div className="container">
            <h3>Blood Inventory Alerts</h3>

            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {alerts.length > 0 && (
                <div className="alert alert-warning mt-3">
                    <h5>Alerts:</h5>
                    <ul>
                        {alerts.map((alert, index) => (
                            <li key={index}>{alert}</li>
                        ))}
                    </ul>
                </div>
            )}
            {inventory.length > 0 ? (
                <div className="mt-3">
                    <h5>Blood Inventory:</h5>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Blood Group</th>
                                <th>Amount</th>
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
            ) : (
                <div className="mt-3">No blood inventory available.</div>
            )}
        </div>
    );
};


export default Bloodalert