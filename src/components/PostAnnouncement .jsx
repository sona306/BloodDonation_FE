import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarlogin from './Navbarlogin';

const PostAnnouncement = () => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [adminId, setUserId] = useState({ "adminId": sessionStorage.getItem("adminId") });

    const fetchData = () => {
        axios.post("http://localhost:8080/admin/viewmypost", adminId, {
            headers: { "token": token, "Content-Type": "application/json" }
        })
        .then((response) => {
            console.log(response.data);
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <Navbarlogin />
            <div className="container">
                <h3 className="text-center text-danger mb-4">Donor Rewards</h3>
                <div className="row g-4">
                    {data.map((value, index) => {
                        return (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className="card shadow-sm border-primary">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFq3BpHD4KRz4XJciJUBCjZcteCgJFFzq6PH-iVis1KOZjUHH3ZkJ_Fg&s"
                                                className="img-fluid rounded-start"
                                                alt="Reward"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">{value.Message}</h5>
                                                <p className="card-text">
                                                    <small className="text-muted">Posted on {value.postedDate}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PostAnnouncement;
