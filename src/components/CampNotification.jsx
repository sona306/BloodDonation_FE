import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampNotification = () => {
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const donorId = sessionStorage.getItem('userId');  // Get donor ID from session storage

  useEffect(() => {
    if (!donorId) {
      setMessage("Donor ID is missing. Please log in.");
      setIsLoading(false);
    } else {
      fetchNotifications(donorId);  // Fetch both unseen and all notifications if donor ID exists
    }
  }, [donorId]);

  // Fetch Unseen and All Notifications
  const fetchNotifications = async (donorId) => {
    setIsLoading(true);  // Set loading state to true while fetching data

    try {
      const [unseenResponse, allResponse] = await Promise.all([
        axios.get(`http://localhost:8080/donor/notifications/unseen?donorId=${donorId}`),
        axios.get(`http://localhost:8080/donor/notifications/all?donorId=${donorId}`)
      ]);
      
      // Update state with response data
      setUnseenNotifications(unseenResponse.data.notifications || []);
      setAllNotifications(allResponse.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setMessage('Error fetching notifications');
    } finally {
      setIsLoading(false);  // Set loading state to false after data is fetched
    }
  };

  // Mark Notifications as Seen
  const markNotificationsAsSeen = async () => {
    try {
      const response = await axios.post('http://localhost:8080/donor/notifications/markAsSeen', { donorId });
      if (response.data.message) {
        alert(response.data.message);
        fetchNotifications(donorId); // Refresh notifications after marking as seen
      }
    } catch (error) {
      console.error("Error marking notifications as seen:", error);
      setMessage('Error marking notifications as seen');
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f4f7fc', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Your Notifications</h3>

      {isLoading ? (
        <div style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          <p>Loading notifications...</p>
        </div>
      ) : message ? (
        <div style={{ textAlign: 'center', color: '#d9534f', fontSize: '18px' }}>
          <p>{message}</p>
        </div>
      ) : (
        <>
          <h4 style={{ color: '#007bff', marginBottom: '15px' }}>Unseen Notifications</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            {unseenNotifications.length === 0 ? (
              <li style={{ textAlign: 'center', color: '#888' }}>No new notifications</li>
            ) : (
              unseenNotifications.map((notification, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: '#f8d7da',  // Red background for unseen notifications
                    color: '#721c24',  // Dark red text for contrast
                    padding: '15px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{notification.message}</p>
                    <small style={{ color: '#721c24' }}>{notification.isSeen ? 'Seen' : 'Unseen'}</small>
                  </div>
                  {!notification.isSeen && (
                    <button
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => markNotificationsAsSeen(notification.id)}
                    >
                      Mark as Seen
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={markNotificationsAsSeen}
              className="btn btn-primary"
              disabled={isLoading}
              style={{
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Mark All as Seen
            </button>
          </div>

          <hr style={{ marginTop: '30px', border: '1px solid #ddd' }} />

          <h4 style={{ color: '#007bff', marginBottom: '15px' }}>All Notifications</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            {allNotifications.length === 0 ? (
              <li style={{ textAlign: 'center', color: '#888' }}>No notifications found</li>
            ) : (
              allNotifications.map((notification, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: notification.isSeen ? '#f0f0f0' : '#f8d7da',  // Keep unseen as red
                    color: notification.isSeen ? '#333' : '#721c24',
                    padding: '15px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div>
                    <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>{notification.message}</p>
                    <small style={{ color: '#777' }}>{notification.isSeen ? 'Seen' : 'Unseen'}</small>
                  </div>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default CampNotification;
