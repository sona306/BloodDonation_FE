import React, { useState } from 'react';
import axios from 'axios';

const SendReminder = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        lastDonationDate: ''
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendReminder = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/sendReminder', formData);
            alert(response.data.message); // ✅ Success message
            setFormData({ fullname: '', email: '', lastDonationDate: '' }); // ✅ Reset form after success
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center text-danger mb-4">Send Donation Reminder</h3>
                <form onSubmit={sendReminder}>
                    {/* ➡️ Full Name */}
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullname"
                            value={formData.fullname}
                            onChange={inputHandler}
                            placeholder="Enter donor's full name"
                            required
                        />
                    </div>

                    {/* ➡️ Email */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={inputHandler}
                            placeholder="Enter donor's email"
                            required
                        />
                    </div>

                    {/* ➡️ Last Donation Date */}
                    <div className="mb-3">
                        <label className="form-label">Last Donation Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="lastDonationDate"
                            value={formData.lastDonationDate}
                            onChange={inputHandler}
                            required
                        />
                    </div>

                    {/* ➡️ Submit Button */}
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-danger px-4 py-2">
                            Send Reminder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendReminder;
