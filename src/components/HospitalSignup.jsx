import axios from 'axios'
import React, { useState } from 'react'

const HospitalSignup = () => {
    const[signup,setData]=useState(
        {
        "username":'',
        "hospitalname":'',
        "registrationnumber":'',
        "typeoforganization":'',
        "avaliablebloodtype":'',
        "phonenumber":'',
        "email":'',
        "hospitaladdress":'',
        "location":'',
        "bloodstoragecapacity":'',
        "operatinghours":'',
        "emergencycontactnumber":'',
        "emergencybloodrequesthandling":'',
        "password":'',
        "confirm":''
        }
    )
    const inputHandler=(event)=>{
        setData({...signup,[event.target.name]:event.target.value})
    }
    const readValue=()=>{
        console.log(signup)
         axios.post("http://localhost:8080/hospitalSignUp",signup).then(
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
                                <form action="" className="label_label">Hospital Name</form>
                                <input type="text" className="form-control" placeholder='Enter hospital name' name='hospitalname' value={signup.hospitalname} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Registration Number</form>
                                <input type="text" className="form-control" placeholder='Goverment registration id' name='registrationnumber' value={signup.registrationnumber} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">Type Of Organization</label>
                                <select name="typeoforganization" id="" className="form-control" value={signup.typeoforganization} onChange={inputHandler}>
                                    <option value="select">------------Select--------------</option>
                                    <option value="Hospital">Hospital</option>
                                    <option value="Private Organization">Private Organization</option>
                                    <option value="Blood Banks">Blood Banks</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">Blood Type avaliable</label>
                                <select name="avaliablebloodtype" id="" className="form-control" value={signup.avaliablebloodtype} onChange={inputHandler}>
                                    <option value="select">------------Select--------------</option>
                                    <option value="Handling all blood types">Handling all blood types</option>
                                    <option value="Not handling all blood types">Not handling all blood types</option>
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
                                <form action="" className="label_label">Hospital Address</form>
                                <input type="text" className="form-control" placeholder='Enter hospital address' name='hospitaladdress' value={signup.hospitaladdress} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Location</form>
                                <input type="text" className="form-control" placeholder='Enter location' name='location' value={signup.location} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Blood Storage Capacity</form>
                                <input type="text" className="form-control" placeholder='Enter capacity of blood storage' name='bloodstoragecapacity' value={signup.bloodstoragecapacity} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6"><br></br>
                                <form action="" className="label_label">Operating Hours</form>
                                <input type="text" className="form-control" placeholder='x am to x pm' name='operatinghours' value={signup.operatinghours} onChange={inputHandler} />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label htmlFor="" className="form-label">Emergency Blood Request Handling</label>
                                <select name="emergencybloodrequesthandling" id="" className="form-control" value={signup.emergencybloodrequesthandling} onChange={inputHandler}>
                                    <option value="select">------------Select--------------</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
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

export default HospitalSignup