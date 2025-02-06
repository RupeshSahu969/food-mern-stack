import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch("https://foodfront.onrender.com/api/loginuser", {
      method: "POST",
      headers: {
          'Content-Type': "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,

      })
    })
   
     const json = await response.json()
    console.log(json)
    if (json.success) {
      alert("Enter Valid Credenitals")
    }
    if (!json.success) {
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem("authToken"))
        console.log(localStorage.getItem("userEmail"))
        navigate("/")
   }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    <div>
      <Navbar/>
    </div>
    <div className='container'>
      
      <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handlesubmit}>
      <h3 className='text-white  text-center'>Login</h3>
        <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' placeholder='Enter Email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          
        </div>
        <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" placeholder='Enter Password' value={credentials.password} onChange={onChange} name='password' />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
      </form>

    </div>
  </div>
  )
}

export default Login