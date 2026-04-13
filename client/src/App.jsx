import { Router } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CustomCursor from "./Components/CustomCursor";
import ProtectedRoute from "./ProtectedRoute";
import Contact from "./Pages/Contact";
import Orders from "./Pages/Orders";
import Likes from "./Pages/Likes";
import Cart from "./Pages/Cart";
import FoodList from "./Pages/FoodList";
import Login from "./Auth/Login"
import Register from "./Auth/Register";



const App = () => {
  return (
    <>
      <CustomCursor/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/help" element={<Contact/>} />
        <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} /> 
        <Route path="/likes" element={<Likes/>} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path="/explore" element={<FoodList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <h1>Dashboard</h1>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App