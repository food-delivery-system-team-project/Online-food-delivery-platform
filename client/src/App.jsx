import { Router } from "react-router-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CustomCursor from "./Components/CustomCursor";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <>
      <CustomCursor/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/help" element={<Contact/>} />
        <Route path="/Orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} /> 
        <Route path="/Likes" element={<ProtectedRoute><Likes/></ProtectedRoute>} />
        <Route path="/Cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
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