import axios from 'axios'
import React, { useState } from 'react'

const DonarSignup = () => {
    const[signup,setData]=useState(
        {
            "username":'',
            "fullname":'',
            "dateofbirth":'',
            "gender":'',
            "bloodtype":'',
            "phonenumber":'',
            "email":'',
            "homeaddress":'',
            "location":'',
            "medicalhistory":'',
            "lastdonationdate":'',
            "hospitalname":'',
            "emergencycontactnumber":'',
            "password":'',
            "confirm":''
        }
    )
    const inputHandler=(event)=>{
        setData({...signup,[event.target.name]:event.target.value})
    }
    const readValue=()=>{
        console.log(signup)
         axios.post("http://localhost:8080/donarSignUp",signup).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status=="success") {
                    alert("New signin created")
                } else {
                    alert("error!")
                }
            }
        ).catch()
    }
  return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">User Name</form>
                                <input type="text" className="form-control" placeholder='Enter the username' name='username' value={signup.username} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Full Name</form>
                                <input type="text" className="form-control" placeholder='Enter your full name' name='fullname' value={signup.fullname} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Date of birth</form>
                                <input type="date" className="form-control" placeholder='select date' name='dateofbirth' value={signup.dateofbirth} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">Gender</label>
                                <select name="gender" id="" className="form-control" value={signup.gender} onChange={inputHandler}>
                                    <option value="select">------------Select--------------</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">Blood Type</label>
                                <select name="bloodtype" id="" className="form-control" value={signup.bloodtype} onChange={inputHandler}>
                                    <option value="select">------------Select--------------</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Phone number</form>
                                <input type="text" className="form-control" placeholder='91+ xxxx xx xxxx' name='phonenumber' value={signup.phonenumber} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Email address</form>
                                <input type="text" className="form-control" placeholder='abc@gmail.com' name='email' value={signup.email} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Home Address</form>
                                <input type="text" className="form-control" placeholder='Enter home address' name='homeaddress' value={signup.homeaddress} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Location</form>
                                <input type="text" className="form-control" placeholder='Enter location' name='location' value={signup.location} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Medical history</form>
                                <input type="text" className="form-control" placeholder='Enter deatils of your medical history' name='medicalhistory' value={signup.medicalhistory} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Last donation date</form>
                                <input type="date" className="form-control" placeholder='if applicable' name='lastdonationdate' value={signup.lastdonationdate} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Hospital Name</form>
                                <input type="text" className="form-control" placeholder='Enter hospital name of recent donation' name='hospitalname' value={signup.hospitalname} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Emergency contact number</form>
                                <input type="text" className="form-control" placeholder='Enter emergency contact number' name='emergencycontactnumber' value={signup.emergencycontactnumber} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Password</form>
                                <input type="password" className="form-control" name='password' value={signup.password} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Confirm Password</form>
                                <input type="password" className="form-control" name='confirm' value={signup.confirm} onChange={inputHandler} />
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

export default DonarSignup
