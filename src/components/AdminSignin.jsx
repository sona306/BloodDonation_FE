import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarlogin from './Navbarlogin';

const AdminSignin = () => {
    const [signin, setData] = useState({
        username: "",
        password: ""
    });

    const inputHandler = (event) => {
        setData({ ...signin, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(signin);
        axios.post("http://localhost:8080/adminSignIn", signin).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("userid", response.data.userID);
                    alert("Login Successful");
                    navigate('/admin');
                } else {
                    alert(response.data.status);
                }
            }
        ).catch((error) => {
            console.error("Login Error:", error);
            alert("An error occurred during login.");
        });
    };

    let navigate = useNavigate();

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbarlogin />
            <div className="container my-auto">
                <h3 className="text-center">Welcome to Life Saver App</h3>
                <h2 className="text-center mb-4">Admin Login</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">User Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name='username' 
                                        placeholder='Enter username for login' 
                                        value={signin.username} 
                                        onChange={inputHandler} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        name='password' 
                                        placeholder='Enter your password' 
                                        value={signin.password} 
                                        onChange={inputHandler} 
                                    />
                                </div>
                                <button className="btn btn-success w-100" onClick={readValue}>Sign In</button>
                                <div className="text-center mt-3">
                                    <a href="/adminsignup" className="btn btn-info w-100">Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignin;
