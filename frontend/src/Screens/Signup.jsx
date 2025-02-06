import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [geolocation, setgeolocation] = useState("")

    let navigate = useNavigate()

    const handlesubmit = () => {
        const payload = {
            name,
            email,
            password,
            geolocation
        }
        console.log(payload)
        fetch("https://foodfront.onrender.com/api/createuser", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((res) => {
                res.json()
                alert("Sucess")
            })
            .then((res) => console.log(res))
        navigate("/login")
    }



    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
                <div>
                    <Navbar />
                </div>

                <div className='container' >
                    <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handlesubmit}>
                    <h3 className='text-white  text-center'>SignUp</h3>
                        <div className="m-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text"  className="form-control" name='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <fieldset>
                                <input type="text" className="form-control" name='email' placeholder='Enter Address' value={geolocation} onChange={(e) => setgeolocation(e.target.value)} aria-describedby="emailHelp"  />
                            </fieldset>
                        </div>
                        
                        <div className="m-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} name='password' />
                        </div>
                        <button type="submit" className="m-3 btn btn-success">Submit</button>
                        <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
