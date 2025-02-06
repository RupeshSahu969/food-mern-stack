import Home from "./Screens/Home";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./Screens/Login";
// import "../node_modules/bootstrap/dist/css/bootstrap-dark-5.min.css"

import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./Screens/Signup";
import Navbar from "./Components/Navbar";
import { CartProvider } from "./Components/ContextReducer";
import Cart from "./Screens/Cart";
import MyOrder from "./Screens/MyOrder";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
