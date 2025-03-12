import axios from 'axios';
import React, { useState } from 'react';

const ListEmails = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ✅ Fetch emails from the backend
    const fetchEmails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8080/getAllEmails', {
                headers: {
                    'token': sessionStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            setEmails(response.data.emails);
        } catch (error) {
            console.error('Error fetching emails:', error);
            setError('Failed to fetch emails. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0">
                <div className="card-body">
                    <h3 className="text-center text-primary mb-4">📧 Donor & Consumer Emails</h3>

                    {/* ✅ Fetch Button */}
                    <div className="text-center mb-3">
                        <button 
                            className="btn btn-primary"
                            onClick={fetchEmails}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Fetching...
                                </>
                            ) : (
                                'Get All Emails'
                            )}
                        </button>
                    </div>

                    {/* ✅ Error Message */}
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}

                    {/* ✅ Display Emails */}
                    {emails.length > 0 ? (
                        <ul className="list-group">
                            {emails.map((email, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                                    {email}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !loading && (
                            <p className="text-center text-muted">
                                No emails available.
                            </p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListEmails;
