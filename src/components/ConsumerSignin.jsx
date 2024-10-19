import axios from 'axios'
import React, { useState } from 'react'
import Navbarlogin from './Navbarlogin'
import { useNavigate } from 'react-router-dom'

const ConsumerSignin = () => {
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
        axios.post("http://localhost:8080/consumerSignIn",signin).then(
            (response)=>{
                console.log(response.data)
                if (response.data.status=="success") 
                    {
                    sessionStorage.setItem("token",response.data.token)
                    sessionStorage.setItem("userid",response.data.userID)
                    alert("Login Successfull")
                    navigate("/consumer")
                    } 
                else 
                {
                    alert(response.data.status)
                }
            }
        ).catch()  

    }
    let navigate = useNavigate()
  return (

<div>
<Navbarlogin/>
<h3><center>Welcome to Life Saver app..</center></h3>
            <h2><center>Consumer Login</center></h2>
<div className="container">
              <div className="row">
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                      <div className="row">
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label htmlFor="" className="form-label">User Name</label>
                              <input type="text" className="form-control" name='username' placeholder="Enter your username"value={signin.username} onChange={inputHandler} />
                          </div>
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12">
                              <label htmlFor="" className="form-label">Password</label>
                              <input type="password" className="form-control" name='password'placeholder='Enter your password' value={signin.password} onChange={inputHandler} />
                          </div>
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12"><br></br>
                              <button className="btn btn-success" onClick={readValue}>SignIn</button>
                          </div>
                          <div className="col col-12 col-sm-12 md-12 col-lg-12 col-xl-12 col-xxl-12"><br></br>
                              <a href="/consumersignup">
                                  <button className="btn btn-info" onClick={readValue}>SignUp</button><br></br><br></br>
                              </a></div>
                      </div>
                  </div>
              </div>
          </div>

</div>
  )
}

export default ConsumerSignin