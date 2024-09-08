import axios from 'axios'
import React, { useState } from 'react'
import Navbarlogin from './Navbarlogin'
import { useNavigate } from 'react-router-dom'

const AdminSignup = () => {
    const[signup,setData]=useState(
        {
        "username":'',
        "fullname":'',
        "hospitalname":'',
        "phone":'',
        "email":'',
        "employeeid":'',
        "password":'',
        "confirm":''
        }
    )
    const inputHandler=(event)=>{
        setData({...signup,[event.target.name]:event.target.value})
    }
    const readValue=()=>{
        console.log(signup)
         axios.post("http://localhost:8080/adminSignUp",signup).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status=="success") {
                    alert("New signin created")
                    navigate("/adminsignin")
                } else {
                    alert("error!")
                }
            }
        ).catch()
    }
    let navigate = useNavigate()
  return (
    <div>
<Navbarlogin/>
        <div className="container">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">User Name</form>
                        <input type="text" className="form-control" placeholder='Enter the username' name='username' value={signup.username} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Full Name</form>
                        <input type="text" className="form-control" placeholder='Enter your full name' name='fullname' value={signup.fullname} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Phone Number</form>
                        <input type="text" className="form-control" placeholder='+91 xxxx xxx xxx' name='phone' value={signup.phone} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Employee ID</form>
                        <input type="text" className="form-control" placeholder='Enter your employeeID' name='employeeid' value={signup.employeeid} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Email</form>
                        <input type="text" className="form-control" placeholder='abc@gmail.com' name='email' value={signup.email} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Hospital Name</form>
                        <input type="text" className="form-control" name='hospitalname'placeholder='Enter hospital name / organization name' value={signup.hospitalname} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Password</form>
                        <input type="password" className="form-control" name='password' placeholder='Enter strong password' value={signup.password} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                        <form action="" className="label_label">Confirm Password</form>
                        <input type="password" className="form-control" name='confirm' placeholder='Re enter your password' value={signup.confirm} onChange={inputHandler}/>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                    <button className="btn btn-success" onClick={readValue} >SignUp</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default AdminSignup