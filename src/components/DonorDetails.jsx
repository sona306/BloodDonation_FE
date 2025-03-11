import { useEffect, useState } from 'react';

const DonorDetails = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/donation-requests');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setDonationRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationRequests();
  }, []);

  if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      {/* Heading */}
      <h2 className="text-center mb-4 fw-bold text-primary">Donation Requests</h2>

      {donationRequests.length === 0 ? (
        <p className="text-center text-secondary">No donation requests found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle shadow-sm">
            {/* Table Header */}
            <thead className="table-primary">
              <tr>
                <th className="text-center">Full Name</th>
                <th className="text-center">Date</th>
                <th className="text-center">Month</th>
                <th className="text-center">Year</th>
                <th className="text-center">Next donation date can be on</th> {/* New Column */}
                <th className="text-center">Status</th>
                <th className="text-center">Location</th>
                <th className="text-center">Blood Group</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {donationRequests.map((request) => (
                <tr key={request._id}>
                  <td className="text-center">{request.fullname}</td>
                  <td className="text-center">{request.date}</td>
                  <td className="text-center">{request.month}</td>
                  <td className="text-center">{request.year}</td>
                  <td className="text-center">{request.futureDate}</td> {/* Display Future Date */}
                  <td
                    className={`text-center fw-medium ${
                      request.status === 'Pending'
                        ? 'text-warning'
                        : request.status === 'Completed'
                        ? 'text-success'
                        : 'text-danger'
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="text-center">{request.location}</td>
                  <td className="text-center">{request.BloodGroup}</td>
                  <td className="text-center">{request.Amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonorDetails;
