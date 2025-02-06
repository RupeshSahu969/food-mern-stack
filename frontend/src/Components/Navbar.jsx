import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "react-bootstrap/Badge";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../Screens/Cart';
import { AiOutlineShoppingCart } from 'react-icons/ai';
const Navbar = () => {

  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")

  }
  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>

                                <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                <AiOutlineShoppingCart className='text-success'/>
                                    <Badge pill bg="danger" badgeContent={items.length}>{items.length} {"  "}
                                        
                                    </Badge>
                                    
                                </div>

                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                                <button onClick={handleLogout} className="btn bg-white text-danger" >Logout</button></div>}
                    </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
