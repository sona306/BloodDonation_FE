import React from 'react';

const Navbarlogin = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{
                background: 'linear-gradient(90deg, #007BFF, #00FF7F)' // Gradient from blue to light green
            }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" style={{
                        color: '#FFFFFF',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '1.5rem'
                    }}>
                        LifeSaver: A Comprehensive Blood Donation and Blood Bank Finder Platform
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/" style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    <i className="bi bi-house"></i> Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/donarsignin" style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    <i className="bi bi-person-heart"></i> Donors
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/consumersignin" style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    <i className="bi bi-person"></i> Consumers
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/hospitalsignin" style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    <i className="bi bi-shield-lock"></i> Hospitals
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/adminsignin" style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    <i className="bi bi-shield-lock"></i> Admin
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbarlogin;
