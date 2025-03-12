import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmergencyReqMail() {
    const [bloodType, setBloodType] = useState('');
    const [allEmails, setAllEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [message, setMessage] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    // ✅ Fetch all emails from the backend
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getAllEmails', {
                    headers: {
                        'token': sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success) {
                    setAllEmails(response.data.emails);
                } else {
                    setMessage('❌ Failed to load emails.');
                }
            } catch (error) {
                console.error('Error fetching emails:', error);
                setMessage('❌ Error loading emails.');
            }
        };

        fetchEmails();
    }, []);

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bloodType || selectedEmails.length === 0) {
            setMessage("⚠️ Please provide both blood type and select at least one recipient.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/sendEmergencyRequest', {
                bloodType,
                recipients: selectedEmails
            });

            if (response.data.status === 'success') {
                setMessage(`✅ Emergency request sent to ${selectedEmails.length} recipients.`);
                setBloodType('');
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
            setSelectedEmails([]); // Deselect all
        } else {
            setSelectedEmails(allEmails); // Select all
        }
        setSelectAll(!selectAll);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg" style={{ width: '500px', borderRadius: '12px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">🚨 Emergency Request</h3>

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

                        {/* ✅ Email List */}
                        <div className="mb-3">
                            <label className="form-label">Select Recipients</label>
                            <div className="email-list" style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
                                {/* ✅ Select All Option */}
                                <div className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="selectAll"
                                        onChange={handleSelectAll}
                                        checked={selectAll}
                                    />
                                    <label className="form-check-label fw-bold" htmlFor="selectAll">
                                        Select All
                                    </label>
                                </div>

                                {/* ✅ List of Emails */}
                                {allEmails.length > 0 ? (
                                    allEmails.map((email, index) => (
                                        <div key={index} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`email-${index}`}
                                                value={email}
                                                onChange={() => handleEmailSelect(email)}
                                                checked={selectedEmails.includes(email)}
                                            />
                                            <label className="form-check-label" htmlFor={`email-${index}`}>
                                                {email}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No emails available.</p>
                                )}
                            </div>
                        </div>

                        {/* ✅ Submit Button */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger">
                                Send Emergency Request
                            </button>
                        </div>
                    </form>

                    {/* ✅ Message */}
                    {message && (
                        <div className={`alert mt-3 ${message.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
