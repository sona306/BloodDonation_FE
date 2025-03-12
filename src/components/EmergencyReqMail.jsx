import React, { useState } from 'react';

export default function EmergencyReqMail() {
    const [bloodType, setBloodType] = useState('');
    const [recipients, setRecipients] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bloodType || !recipients.trim()) {
            setMessage("⚠️ Please provide both blood type and recipient emails.");
            return;
        }

        const recipientList = recipients.split(',').map(email => email.trim());

        try {
            const response = await fetch('http://localhost:8080/sendEmergencyRequest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bloodType, recipients: recipientList })
            });

            const data = await response.json();

            if (data.status === 'success') {
                setMessage(`✅ Emergency request sent to ${recipientList.length} recipients.`);
            } else {
                setMessage(`❌ Error: ${data.message}`);
            }
        } catch (error) {
            setMessage(`❌ Error sending email. Please try again.`);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg" style={{ width: '400px', borderRadius: '12px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">🚨 Emergency Request</h3>

                    <form onSubmit={handleSubmit}>
                        {/* Blood Type */}
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

                        {/* Recipients */}
                        <div className="mb-3">
                            <label className="form-label">Recipient Emails</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Enter emails separated by commas"
                                value={recipients}
                                onChange={(e) => setRecipients(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-danger">
                                Send Emergency Request
                            </button>
                        </div>
                    </form>

                    {/* Message */}
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
