import { Router } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CustomCursor from "./Components/CustomCursor";

const App = () => {
  return (
    <>
      <CustomCursor/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>Order</h1>} /> 
        <Route path="/contact" element={<h1>Saved</h1>} />
      </Routes>
    </>
  )
}

export default App