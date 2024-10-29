import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbarlogin from './Navbarlogin';

const PostAnnouncement = () => {

    const [data, setData] = useState([])

    const [token,setToken] = useState(sessionStorage.getItem("token"))
    const [adminId,setuserId] = useState({"adminId":sessionStorage.getItem("adminId")})

    const fetchData = ()=>{
        axios.post("http://localhost:8080/admin/viewmypost",adminId,{
            headers:{"token":token,"Content-Type":"application/json"}
        }).then(
            (response)=>{
                console.log(response.data)
                setData(response.data)
            }
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
    }
    useEffect( ()=>{fetchData()},[] )

    return (
        <div>
            <Navbarlogin/>
            <div className="container">
                <div className="row">
                <h3><center>Donar Rewards</center></h3>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">

                            {data.map(
                                (value,index)=>{
                                    return <div className="col col-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
                                    <div class="card mb-3">
                                        <div class="row g-0">
                                        <div class="col-md-4">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFq3BpHD4KRz4XJciJUBCjZcteCgJFFzq6PH-iVis1KOZjUHH3ZkJ_Fg&s" class="img-fluid rounded-start" alt="..."/>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">{value.Message}</h5>
                                                    <p class="card-text"><small class="text-body-secondary">posted on {value.postedDate}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            )

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostAnnouncement;