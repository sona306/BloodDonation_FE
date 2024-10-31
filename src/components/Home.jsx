import React from 'react';
import Navbarlogin from './Navbarlogin';

const Home = () => {
    return (
        <div style={{ backgroundColor: '#e6ffe6' }} className="py-5"> {/* Light green background */}
            <Navbarlogin /><br />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="text-center">
                            <h1 className="display-4 fw-bold text-danger">Welcome to Our Blood Donation Drive! 🩸❤️</h1>
                            <p className="lead text-muted">Together, we can save lives through the gift of blood.</p>
                        </div>

                        <div className="alert alert-danger text-center" role="alert">
                            <h4 className="alert-heading">Become a Lifesaver: Donate Blood!</h4>
                            <p>Your blood donation is a vital resource for patients in need. Each donation can save up to three lives, providing hope and healing to those facing medical challenges. Join us in making a difference and contribute to our community's health!</p>
                            <p className="mb-0">Make blood donation a part of your routine and inspire others to do the same! 🌟</p>
                        </div>

                        <div className="card text-center mb-4">
                            <div className="card-header bg-warning text-dark">
                                Featured Donor Recognition
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">🌟 Donor of the Month: Celebrating Our Heroes! 🌟</h5>
                                <p className="card-text">
                                    Every six months, we honor outstanding donors whose generosity has had a remarkable impact. Our Donor of the Month not only receives special recognition but also a reward: access to their total donated blood amount free of charge in emergencies. Your dedication is what makes this initiative successful—thank you for your life-saving contributions! 🩸💪
                                </p>
                                <a href="/viwemypost" className="btn btn-danger">Recognize Our Donors</a>
                            </div>
                            <div className="card-footer text-muted">
                                Last recognized donor: 2 days ago
                            </div>
                        </div>

                        {/* Additional Section */}
                        <div className="text-center mb-4">
                            <h3 className="text-primary">Join Our Blood Donation Community!</h3>
                            <p>Your participation can make a world of difference. Sign up to donate blood and become a part of our lifesaving mission!</p>
                            <a href="/donarsignup" className="btn btn-success">Sign Up to Donate</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
