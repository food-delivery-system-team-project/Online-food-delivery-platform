import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import API from "../api/fetchApi";

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "user"
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // 📍 Location fetch
  const getCurrentLocation = () => {
    const OpenCageKey = import.meta.env.VITE_OPENCAGE_KEY;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OpenCageKey}`
          );

          const address = res.data.results[0].formatted;

          setFormData(prev => ({
            ...prev,
            address: address
          }));

        } catch (err) {
          console.log(err);
        }
      },
      () => alert("Location permission denied")
    );
  };

  // 🔁 form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 STEP 1 → SEND OTP
  const handleGetOTP = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/auth/register", formData);

      console.log(res.data);
      alert("OTP sent ✅");
      setOtpSent(true);

    } catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  console.log("ERROR:", error.message);

  alert(error.response?.data?.message || "Failed to send OTP");
}
  };

  // 🔥 STEP 2 → VERIFY OTP
  const handleVerifyOTP = async () => {
    try {
      const res = await API.post("/auth/verify-otp", {
        email: formData.email,
        otp: otp
      });

      console.log(res.data);
      alert("Registered successfully ✅");

    } catch (error) {
      console.log(error);
      alert("Invalid OTP ❌");
    }
  };

  // 🔁 RESEND OTP
  const handleResendOTP = async () => {
    try {
      await API.post("/auth/resend-otp", { email: formData.email });
      alert("OTP resent 🔁");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded-3xl shadow-lg w-96 flex flex-col gap-4">

        <h2 className="text-2xl font-bold text-center text-[#2b2b2b]">
          Register
        </h2>

        {/* Google */}
        <button className="px-2 py-4 rounded-2xl bg-gray-100 flex items-center justify-center">
          <FcGoogle className="text-2xl mr-2" />
          Continue with Google
        </button>

        {/* Role */}
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

        {/* Inputs */}
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="bg-gray-100 p-2 rounded-2xl" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="bg-gray-100 p-2 rounded-2xl" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="bg-gray-100 p-2 rounded-2xl" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="bg-gray-100 p-2 rounded-2xl" />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="bg-gray-100 p-2 rounded-2xl" />

        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="bg-gray-100 p-2 rounded-2xl" />

        <button
          type="button"
          onClick={getCurrentLocation}
          className="text-[#ff6e4a] flex items-center justify-center"
        >
          <IoLocationOutline /> Get Live Location
        </button>

        {/* 🔥 OTP FLOW */}
        {!otpSent ? (
          <button
            onClick={handleGetOTP}
            className="bg-[#ff6e4a] text-white py-2 rounded-2xl text-xl"
          >
            Get OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-gray-100 p-2 rounded-2xl"
            />

            <button
              type="button"
              onClick={handleVerifyOTP}
              className="bg-green-500 text-white py-2 rounded-2xl text-xl"
            >
              Verify OTP
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              className="text-sm text-[#ff6e4a]"
            >
              Resend OTP
            </button>
          </>
        )}

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