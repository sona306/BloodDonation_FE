import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminCampRegi = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/camp-registrations');
        
        // Sort by camp location in ascending order
        const sortedRegistrations = response.data.data.sort((a, b) => {
          return a.campId?.location.localeCompare(b.campId?.location);
        });

        setRegistrations(sortedRegistrations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("Failed to fetch registrations");
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div className="container mt-5">
      {/* Back Button at Right Top */}
      <div className="d-flex justify-content-end mb-3">
        <button 
          onClick={() => navigate('/admin')}
          className="btn btn-secondary"
        >
          ⬅️ Back to Admin Page
        </button>
      </div>

      <h2 className="text-center mb-4 fw-bold">🏥 Camp Registrations</h2>
      
      {loading && <p className="text-center">Loading registrations...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && registrations.length === 0 && (
        <p className="text-center">No registrations available.</p>
      )}

      {!loading && !error && registrations.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-danger text-center">
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Location</th>
                <th>Date</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg, index) => (
                <tr key={reg._id} className="text-center align-middle">
                  <td>{index + 1}</td>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.bloodGroup}</td>
                  <td>{reg.campId?.location || '-'}</td>
                  <td>{new Date(reg.campId?.date).toLocaleDateString()}</td>
                  <td>{new Date(reg.registeredAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCampRegi;
