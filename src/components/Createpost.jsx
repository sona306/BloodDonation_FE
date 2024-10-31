import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Createpost = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [input, setInput] = useState({
        Message: "",
        adminId: sessionStorage.getItem("adminId")
    });

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const readvalue = () => {
        console.log(input);
        axios.post("http://localhost:8080/admin/create", input, {
            headers: {
                "token": sessionStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.data.status === "Success") {
                alert("Posted successfully");
                // Optionally, navigate to another page after successful post
                navigate('/admin'); // Navigate to admin page
            } else {
                alert("Something went wrong!");
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Compose Your Thoughts</h3>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <label htmlFor="message" className="form-label">Post Message</label>
                            <textarea
                                name="Message"
                                id="message"
                                className="form-control"
                                value={input.Message}
                                onChange={inputHandler}
                                rows="5"
                            ></textarea>
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-warning" onClick={readvalue}>Post</button>
                                {/* Back to Admin Page button */}
                                <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
                                    Back to Admin Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Createpost;
