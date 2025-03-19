import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmergencyReqMail() {
    const [bloodType, setBloodType] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [allEmails, setAllEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [message, setMessage] = useState('');
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Fetch all locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getAllLocations', {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    setLocations(response.data.locations);
                } else {
                    setMessage('❌ Failed to load locations.');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
                setMessage('❌ Error loading locations.');
            }
        };

        fetchLocations();
    }, []);

    // ✅ Fetch emails based on location
    const fetchEmails = async () => {
        if (!location) {
            setMessage('⚠️ Please select a location.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/getAllEmails?location=${encodeURIComponent(location)}`, {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setAllEmails(response.data.emails);
                setSelectedEmails([]);
                setSelectAll(false);
                setMessage(`✅ Loaded ${response.data.emails.length} emails.`);
            } else {
                setMessage('❌ Failed to load emails.');
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
            setMessage('❌ Error loading emails.');
        }
        setIsLoading(false);
    };

    // ✅ Handle form submission (Send Emergency Request)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bloodType || !location || selectedEmails.length === 0) {
            setMessage("⚠️ Please provide blood type, location, and select at least one recipient.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/sendEmergencyRequest', {
                bloodType,
                location,
                recipients: selectedEmails
            });

            if (response.data.status === 'success') {
                setMessage(`✅ Emergency request sent to ${selectedEmails.length} recipients.`);
                setBloodType('');
                setLocation('');
                setSelectedEmails([]);
                setSelectAll(false);
            } else {
                setMessage(`❌ Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setMessage(`❌ Error sending email. Please try again.`);
        }
    };

    // ✅ Handle closing request and thanking donors
    const handleCloseRequest = async () => {
        if (selectedEmails.length === 0) {
            setMessage("⚠️ Please select at least one recipient.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/sendRequestClosedEmail', {
                recipients: selectedEmails
            });

            if (response.data.success) {
                setMessage(`✅ Request closed email sent to ${selectedEmails.length} recipients.`);
                setSelectedEmails([]);
                setSelectAll(false);
            } else {
                setMessage(`❌ Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error sending close request email:', error);
            setMessage(`❌ Error sending close request email.`);
        }
    };

    // ✅ Handle individual email selection
    const handleEmailSelect = (email) => {
        if (selectedEmails.includes(email)) {
            setSelectedEmails(selectedEmails.filter(e => e !== email));
        } else {
            setSelectedEmails([...selectedEmails, email]);
        }
    };

    // ✅ Handle "Select All" option
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(allEmails);
        }
        setSelectAll(!selectAll);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg" style={{ width: '500px', borderRadius: '12px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">🚨 Emergency Request</h3>

                    {/* ✅ Form */}
                    <form onSubmit={handleSubmit}>
                        {/* ✅ Blood Type */}
                        <div className="mb-3">
                            <label className="form-label">Blood Type</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., A+, O-"
                                value={bloodType}
                                onChange={(e) => setBloodType(e.target.value)}
                                required
                            />
                        </div>

                        {/* ✅ Location Dropdown */}
                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <select
                                className="form-select"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            >
                                <option value="">-- Select Location --</option>
                                {locations.map((loc, index) => (
                                    <option key={index} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ✅ Load Emails Button */}
                        <div className="mb-3 d-grid">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={fetchEmails}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Load Emails'}
                            </button>
                        </div>

                        {/* ✅ Email List */}
                        <div className="email-list border p-3 rounded mb-3" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                            <div className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    onChange={handleSelectAll}
                                    checked={selectAll}
                                />
                                <label className="form-check-label fw-bold">Select All</label>
                            </div>
                            {allEmails.length > 0 ? (
                                allEmails.map((email, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            onChange={() => handleEmailSelect(email)}
                                            checked={selectedEmails.includes(email)}
                                        />
                                        <label className="form-check-label">{email}</label>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No emails available for the selected location.</p>
                            )}
                        </div>

                        {/* ✅ Send Emergency Request */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger">
                                Send Emergency Request
                            </button>
                        </div>

                        {/* ✅ Close Request Button */}
                        <div className="d-grid mt-2">
                            <button type="button" className="btn btn-success" onClick={handleCloseRequest}>
                                Close Request & Thank Donors
                            </button>
                        </div>
                    </form>

                    {/* ✅ Message */}
                    {message && <div className={`alert mt-3 ${message.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                </div>
            </div>
        </div>
    );
}
