import axios from 'axios'
import React, { useState } from 'react'

const HospitalSignin = () => {
    const [signin,setData]=useState(
        {
            "username":"",
            "password":""
        }
    )
    const inputHandler=(event)=>{
        setData({...signin,[event.target.name]:event.target.value})
    }
    const readValue=()=>{
        console.log(signin)
        axios.post("http://localhost:8080/hospitalSignIn",signin).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status=="success") 
                    {
                    sessionStorage.setItem("token",response.data.token)
                    sessionStorage.setItem("userid",response.data.userID)
                    alert("Login Successfull")
                    } 
                else 
                {
                    alert(response.data.status)
                }
            }
        ).catch()  

    }
  
  return (
    <div>

<div className="container">
              <div className="row">
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <div className="row">
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label htmlFor="" className="form-label">User Name</label>
                              <input type="text" className="form-control" name='username' value={signin.username} onChange={inputHandler} />
                          </div>
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label htmlFor="" className="form-label">Password</label>
                              <input type="password" className="form-control" name='password' value={signin.password} onChange={inputHandler} />
                          </div>
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12"><br></br>
                              <button className="btn btn-success" onClick={readValue}>SignIn</button>
                          </div>
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12"><br></br>
                              <a href="/signup">
                                  <button className="btn btn-info" onClick={readValue}>SignUp</button><br></br><br></br>
                              </a></div>
                      </div>
                  </div>
              </div>
          </div>

    </div>
  )
}

export default HospitalSignin