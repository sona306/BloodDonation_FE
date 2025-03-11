import React from 'react';
import Navbarlogin from './Navbarlogin';

const Home = () => {
  return (
    <div 
      style={{ 
        backgroundImage: 'url("/assets/blood-donation-bg.jpg")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        minHeight: '100vh',
        backgroundColor: '#f9f9f9' // Light background color
      }}
    >
      {/* ✅ Fixed Navbar at Top */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <Navbarlogin />
      </div>

      {/* ✅ Added Padding to Prevent Overlap */}
      <div style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">

              {/* ✅ Welcome Section */}
              <div className="text-center mb-4">
                <h1 className="display-4 fw-bold text-danger">
                  🩸 Welcome to Our Blood Donation Drive! ❤️
                </h1>
                <p className="lead text-dark" style={{ fontSize: '1.2rem' }}>
                  Together, we can save lives through the gift of blood.
                </p>
              </div>

              {/* ✅ Alert Section */}
              <div className="alert alert-danger text-center shadow-sm rounded-3 mb-4">
                <h4 className="alert-heading fw-bold">🌍 Become a Lifesaver: Donate Blood!</h4>
                <p className="mb-2" style={{ fontSize: '1rem' }}>
                  Your blood donation is a vital resource for patients in need. Each donation can save up to three lives. 
                  Join us in making a difference and contribute to our community's health!
                </p>
                <p className="mb-0">
                  Make blood donation a part of your routine and inspire others to do the same! 🌟
                </p>
              </div>

              {/* ✅ Donor Recognition Section */}
              <div className="card shadow-sm border-0 mb-4 rounded-3" style={{ backgroundColor: '#fffae6' }}>
                <div className="card-header bg-warning text-dark fw-bold">
                  🌟 Featured Donor Recognition 🌟
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold text-danger">
                    Donor of the Month: Celebrating Our Heroes!
                  </h5>
                  <p className="card-text" style={{ fontSize: '1rem' }}>
                    Every six months, we honor outstanding donors whose generosity has had a remarkable impact. 
                    Our Donor of the Month not only receives special recognition but also a reward: access to their total donated blood 
                    amount free of charge in emergencies.
                  </p>
                  {/* ✅ Centered Button */}
                  <div className="d-flex justify-content-center">
                    <a href="/viwemypost" className="btn btn-danger btn-lg shadow-sm">
                      ❤️ Recognize Our Donors
                    </a>
                  </div>
                </div>
                <div className="card-footer text-muted text-center">
                  Last recognized donor: <strong>2 days ago</strong>
                </div>
              </div>

              {/* ✅ Join Blood Donation Community Section */}
              <div className="text-center mb-4">
                <h3 className="text-primary fw-bold">
                  🌍 Join Our Blood Donation Community!
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#555' }}>
                  Your participation can make a world of difference. Sign up to donate blood and become a part of our lifesaving mission!
                </p>
                <a href="/donarsignup" className="btn btn-success btn-lg shadow-sm" style={{ fontWeight: 'bold' }}>
                  ✍️ Sign Up to Donate
                </a>
              </div>

              {/* ✅ Register for a Camp Section */}
              <div 
                className="text-center p-4 rounded-3 shadow-sm" 
                style={{
                  backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                  color: 'white'
                }}
              >
                <h3 className="fw-bold">📅 Register for a Blood Donation Camp</h3>
                <p style={{ fontSize: '1rem' }}>
                  Participate in our upcoming camps and help save lives. Register today!
                </p>
                <a href="/campregister" className="btn btn-light text-danger btn-lg shadow-sm fw-bold">
                  🏥 Register for a Camp
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
