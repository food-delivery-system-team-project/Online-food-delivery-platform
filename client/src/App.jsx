import { Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Home from "./Pages/Home";
import CustomCursor from "./Components/CustomCursor";
import ProtectedRoute from "./ProtectedRoute";
>>>>>>> 9584b1e9e4658acd783b060756ce910000f779bb

const App = () => {
  return (
    <>
<<<<<<< HEAD
      <Navbar/>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>Order</h1>} /> 
        <Route path="/contact" element={<h1>Saved</h1>} />
=======
      <CustomCursor/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>Order</h1>} /> 
        <Route path="/contact" element={<h1>Saved</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <h1>Dashboard</h1>
          </ProtectedRoute>
        } />
>>>>>>> 9584b1e9e4658acd783b060756ce910000f779bb
      </Routes>
    </>
  )
}

export default App