import React from 'react'
import User_login from './components/Login/User_login'
import Admin_login from './components/Login/Admin_login'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<User_login />} /> */}
        <Route path="/" element={<Admin_login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App