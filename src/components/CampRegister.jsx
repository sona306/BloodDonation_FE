import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampRegister = () => {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // ✅ Fetch available camps from the backend
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:8080/camps');
        setCamps(response.data);
      } catch (err) {
        setMessage('Failed to load camps');
      }
    };
    fetchCamps();
  }, []);

  // ✅ Handle changes in the input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCamp) {
      setMessage('Please select a camp');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/registercamp', {
        campId: selectedCamp,
        ...formData
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Failed to register for the camp');
    }
  };

  // ✅ Handle back to home button
  const handleBackHome = () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <div className="container mt-5 position-relative">
      {/* ✅ Go Back Home Button */}
      <button 
        onClick={handleBackHome} 
        className="btn btn-outline-primary position-absolute top-0 end-0 m-3"
      >
        ⬅️ Home
      </button>

      {/* ✅ Motivational Message at the Top */}
      <div className="text-center mb-4">
        <p className="text-muted fs-5">
          🩸 <strong>Your donation can save lives!</strong> Register today and make a difference. 
        </p>
      </div>

      {/* ✅ Attractive Card with Wider Design */}
      <div className="card shadow-lg border rounded-4" style={{ maxWidth: '700px', margin: 'auto' }}>
        <div className="card-body p-5">
          {/* ✅ Title */}
          <h4 className="card-title text-center mb-4 fw-bold text-primary">
            Register for a Blood Donation Camp
          </h4>

          {/* ✅ Success/Error Message */}
          {message && (
            <div
              className={`alert ${
                message.includes('Success') ? 'alert-success' : 'alert-danger'
              } p-2`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* ✅ Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* ✅ Step 1: Select a Camp */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Select a Camp:</label>
              <select
                value={selectedCamp}
                onChange={(e) => setSelectedCamp(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Choose a Camp</option>
                {camps.map((camp) => (
                  <option key={camp._id} value={camp._id}>
                    {camp.title} - {camp.location} ({new Date(camp.date).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Display selected camp details */}
            {selectedCamp && (
              <div className="bg-light border rounded p-3 mb-3">
                {camps
                  .filter((camp) => camp._id === selectedCamp)
                  .map((camp) => (
                    <div key={camp._id} style={{ fontSize: '0.95rem' }}>
                      <div><strong>📌 Title:</strong> {camp.title}</div>
                      <div><strong>📍 Location:</strong> {camp.location}</div>
                      <div><strong>📅 Date:</strong> {new Date(camp.date).toLocaleDateString()}</div>
                      <div><strong>📞 Contact:</strong> {camp.contact}</div>
                      <div><strong>📝 Description:</strong> {camp.description}</div>
                    </div>
                  ))}
              </div>
            )}

            {/* ✅ Step 2: Personal Information */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Blood Group:</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Choose Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* ✅ Step 3: Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              style={{
                backgroundColor: '#ff4d4d',
                borderColor: '#ff4d4d',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              ❤️ Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampRegister;
