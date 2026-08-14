import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import API from "../api/fetchApi";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "user",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // GET CURRENT LOCATION
  // ==============================
  const getCurrentLocation = () => {
    const OpenCageKey = import.meta.env.VITE_OPENCAGE_KEY;

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
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

          if (res.data.results?.length > 0) {
            const address = res.data.results[0].formatted;

            setFormData((prev) => ({
              ...prev,
              address,
            }));
          }
        } catch (err) {
          console.log("Location error:", err);
          alert("Unable to get your address");
        }
      },
      (error) => {
        console.log(error);
        alert("Location permission denied");
      }
    );
  };

  // ==============================
  // FORM CHANGE
  // ==============================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==============================
  // SEND OTP
  // ==============================
  const handleGetOTP = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,

        // Always buyer/user
        role: "user",
      });

      console.log(res.data);

      alert("OTP sent successfully ✅");
      setOtpSent(true);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERROR:", error.message);

      alert(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // VERIFY OTP
  // ==============================
  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      console.log(res.data);

      alert("Registration successful ✅");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Invalid OTP ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // RESEND OTP
  // ==============================
  const handleResendOTP = async () => {
    try {
      setLoading(true);

      await API.post("/auth/resend-otp", {
        email: formData.email,
      });

      alert("OTP resent successfully 🔁");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to resend OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // ADMIN REDIRECT
  // ==============================
  const handleAdmin = () => {
    window.location.href = import.meta.env.VITE_ADMIN_URL;
  };

  return (
    <div className="min-h-screen w-full bg-[#faf1ee] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* ==============================
            CARD
        ============================== */}
        <div className="bg-white rounded-[2rem] shadow-xl p-6 sm:p-8">

          {/* LOGO / TITLE */}
          <div className="text-center mb-6">

            <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-[#ff6e4a] flex items-center justify-center text-white text-2xl font-bold shadow-md">
              F
            </div>

            <h1 className="text-3xl font-bold text-[#28282B]">
              Create Account
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Join us and start ordering delicious food
            </p>

          </div>

          {/* ==============================
              GOOGLE
          ============================== */}
          <button
            type="button"
            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-2" />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-5">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200" />

          </div>

          {/* ==============================
              BUYER BADGE
          ============================== */}
          <div className="mb-4 px-4 py-3 rounded-2xl bg-[#ffe8e1] flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-500">
                Account type
              </p>

              <p className="font-semibold text-[#28282B]">
                Buyer Account
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#ff6e4a] text-white text-xs font-semibold">
              Customer
            </span>

          </div>

          {/* ==============================
              FORM
          ============================== */}
          <form
            onSubmit={handleGetOTP}
            className="flex flex-col gap-3"
          >

            {/* NAME */}
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl focus:border-[#ff6e4a] transition"
              required
            />

            {/* EMAIL */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl focus:border-[#ff6e4a] transition"
              required
            />

            {/* PASSWORD */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl focus:border-[#ff6e4a] transition"
              required
            />

            {/* CONFIRM PASSWORD */}
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl focus:border-[#ff6e4a] transition"
              required
            />

            {/* PHONE */}
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl focus:border-[#ff6e4a] transition"
              required
            />

            {/* ADDRESS */}
            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl resize-none focus:border-[#ff6e4a] transition"
              required
            />

            {/* LOCATION */}
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center justify-center gap-2 text-[#ff6e4a] font-semibold py-2 hover:bg-[#fff1ed] rounded-xl transition"
            >
              <IoLocationOutline className="text-xl" />

              Use my current location
            </button>

            {/* ==============================
                OTP
            ============================== */}
            {!otpSent ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff6e4a] text-white py-3 rounded-2xl text-lg font-semibold hover:bg-[#f45d3a] transition disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            ) : (
              <div className="flex flex-col gap-3">

                <div className="text-center">

                  <p className="text-sm text-gray-500">
                    OTP sent to
                  </p>

                  <p className="font-semibold text-gray-800">
                    {formData.email}
                  </p>

                </div>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full bg-gray-50 border border-gray-100 outline-none p-3 rounded-2xl text-center tracking-[0.5em] text-lg font-semibold focus:border-[#ff6e4a]"
                />

                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full bg-green-500 text-white py-3 rounded-2xl text-lg font-semibold hover:bg-green-600 transition disabled:opacity-60"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-[#ff6e4a] font-semibold hover:underline"
                >
                  Resend OTP
                </button>

              </div>
            )}

          </form>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-5">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#ff6e4a] font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

        {/* ==============================
            ADMIN SECTION
        ============================== */}
        <div className="mt-4 bg-white/70 backdrop-blur rounded-2xl p-4 border border-white">

          <div className="flex items-center justify-between gap-3">

            <div>
              <p className="font-semibold text-[#28282B]">
                Are you a seller?
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Manage your restaurant from the admin panel.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdmin}
              className="shrink-0 px-4 py-2 rounded-xl bg-[#28282B] text-white text-sm font-semibold hover:bg-black transition"
            >
              Admin Panel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;