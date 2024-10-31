import React from 'react';

const Consumer = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card mb-4 shadow">
              <h5 className="card-header text-center">Welcome to Consumer Portal</h5>
              <div className="card-body text-center">
                <h3 className="card-title text-uppercase text-primary fw-bold">Search for Donors</h3>
                <p className="card-text text-muted fs-5 mb-4">
                  Easily find available donors based on blood type. Ensure timely assistance and support for your needs.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="/searchdonar" className="btn btn-primary btn-lg">Search Donors</a>
                  <a href="/requestblood" className="btn btn-secondary btn-lg">Request Blood</a>
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

export default Consumer;
