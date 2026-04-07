import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin_login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // 👈 important

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    // login success → dashboard open
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-orange-100 p-8 rounded-2xl shadow-lg shadow-red-300 w-[350px] border-2 border-red-500">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Admin login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-orange-500 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-orange-500 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span className="text-red-500 cursor-pointer hover:underline">
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Admin_login;