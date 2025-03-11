import axios from 'axios';
import React, { useState } from 'react';
import Navbarlogin from './Navbarlogin';
import { useNavigate } from 'react-router-dom';

const HospitalSignin = () => {
    const [signin, setData] = useState({ username: '', password: '' });
    let navigate = useNavigate();

    const inputHandler = (event) => {
        setData({ ...signin, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(signin);
        axios.post('http://localhost:8080/hospitalSignIn', signin)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === 'success') {
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('userid', response.data.userID);
                    alert('Login Successful');
                    navigate('/hospitalemergency');
                } else {
                    alert(response.data.status);
                }
            })
            .catch((error) => {
                console.error('Login Error:', error);
                alert('An error occurred during login.');
            });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Navbarlogin />
            <div className="container d-flex flex-column align-items-center justify-content-center flex-grow-1">
            <h3 className="text-center">Welcome to Life Saver App</h3>
                <h2 className="text-center mb-4">Hospital Login</h2>
                <div className="card shadow-lg p-4 rounded" style={{ maxWidth: '600px', width: '100%' }}>
                    <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input type="text" className="form-control" name="username" placeholder="Enter username" value={signin.username} onChange={inputHandler} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Enter password" value={signin.password} onChange={inputHandler} />
                    </div>
                    <button className="btn btn-success w-100 mb-2" onClick={readValue}>Sign In</button>
                    <div className="text-center">
                        <a href="/hospitalsignup" className="btn btn-info w-100">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalSignin;
