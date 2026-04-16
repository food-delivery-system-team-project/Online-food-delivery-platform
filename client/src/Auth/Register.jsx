import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import API from "../api/fetchApi";

const Register = () => {

  // form data
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      role: "buyer"
    });


  // direct loaction fetch api

const getCurrentLocation = () => {

  const OpenCageKey = import.meta.env.VITE_OPENCAGE_KEY;
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OpenCageKey}`
        );

        const address = res.data.results[0].formatted;

        setFormData({
          ...formData,
          address: address
        });

      } catch (err) {
        console.log(err);
      }
    },
    (error) => {
      alert("Location permission denied");
    }
  );
};

// two way binding 
// post data to the server

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log(formData)

  try {
    const res = await API.post("/users/register", formData);

    console.log(res.data);
    alert("Registered successfully ✅");

  } catch (error) {
    console.log(error);
    alert("Error registering user ❌");
  }
};

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#2b2b2b]">Register</h2>
        <button className="px-2 py-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <FcGoogle className="text-2xl mr-2" />
            Continue with Google
        </button>

        <div className="flex gap-5 py-2 rounded-2xl w-full items-center justify-around bg-gray-100">
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="role"
      value="user"
      checked={formData.role === "user"}
      onChange={handleChange}
    />
    Buyer
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="role"
      value="admin"
      checked={formData.role === "admin"}
      onChange={handleChange}
    />
    Seller
  </label>
</div>


        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
        />

        <button
          type="submit"
          onClick={getCurrentLocation}
          className=" text-[#ff6e4a] flex items-center justify-center py-0.5 rounded-2xl text-lg"
        >
          <IoLocationOutline />
          Get Live Location
        </button>


        <button
          type="submit"
          className="bg-[#ff6e4a] text-white py-2 rounded-2xl text-xl"
        >
          Register
        </button>
        <p className="text-center text-sm">
  Already have an account?{" "}
  <Link to="/login" className="text-[#ff6e4a] font-semibold">
    Login
  </Link>
</p>

      </form>
    </div>
  );
};

export default Register;