import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donors = () => {
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const donorId = sessionStorage.getItem('userId');  // Get donor ID from session storage

  useEffect(() => {
    if (donorId) {
      fetchUnseenNotifications(donorId); // Fetch unseen notifications if donor ID exists
    }
  }, [donorId]);

  // Fetch Unseen Notifications
  const fetchUnseenNotifications = async (donorId) => {
    try {
      const response = await axios.get(`http://localhost:8080/donor/notifications/unseen?donorId=${donorId}`);
      setUnseenNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching unseen notifications:", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card mb-4 shadow-lg" style={{ borderRadius: '10px' }}>
              <h5 className="card-header text-center" style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '10px 10px 0 0' }}>
                Welcome to Donors Portal
              </h5>
              <div className="card-body text-center">
                <h3 className="card-title text-uppercase text-primary fw-bold">Search for Donors</h3>
                <p className="card-text text-muted fs-5 mb-4">
                  Easily find available donors based on blood type. Ensure timely assistance and support for your needs.
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <a href="/donarRequest" className="btn btn-primary btn-lg">
                    Send Donation Request
                  </a>
                  <a href="/donorscamp" className="btn btn-primary btn-lg">
                    All Camps
                  </a>
                  <a href="/donoreducation" className="btn btn-primary btn-lg">
                    Donor Education
                  </a>
                  <a href="/campnotification" className={`btn btn-lg ${unseenNotifications.length > 0 ? 'btn-danger' : 'btn-primary'}`}>
                    {unseenNotifications.length > 0 ? `New Camps Notification (${unseenNotifications.length})` : 'New Camps Notification'}
                  </a>
                  <a href="/" className="btn btn-light btn-lg">Back to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donors;
