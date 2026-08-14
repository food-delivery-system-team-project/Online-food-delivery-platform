import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Auth/firebase";
import API from "../api/fetchApi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);

      const token = await user.getIdToken();

      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          role: "user",
        })
      );

      await API.post("/auth/login", {
        name: user.displayName,
        email: user.email,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      console.log(res.data);

      // Save token
      localStorage.setItem(
        "token",
        res.data.token.accessToken
      );

      // Save basic user information
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.user.name,
          email: res.data.user.email,
          address: res.data.user.address,
          phone: res.data.user.phone,
          role: res.data.user.role,
        })
      );

      // =========================
      // ADMIN REDIRECT
      // =========================
      if (res.data.user.role === "admin") {
        window.location.href =
          import.meta.env.VITE_ADMIN_URL;
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADMIN LOGIN
  // =========================
  const handleAdminLogin = () => {
    window.location.href =
      import.meta.env.VITE_ADMIN_URL;
  };

  return (
    <div className="min-h-screen w-full bg-[#faf1ee] flex items-center justify-center px-4 py-8">

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          bg-white
          rounded-[2rem]
          shadow-xl
          p-5
          sm:p-7
          flex
          flex-col
          gap-4
        "
      >

        {/* =========================
            HEADER
        ========================= */}
        <div className="text-center mb-1">

          <h1 className="text-3xl font-bold text-[#28282B]">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Login to continue your delicious journey
          </p>

        </div>

        {/* =========================
            GOOGLE LOGIN
        ========================= */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="
            w-full
            px-4
            py-3
            rounded-2xl
            bg-gray-50
            border
            border-gray-100
            flex
            items-center
            justify-center
            gap-2
            font-medium
            text-gray-700
            hover:bg-gray-100
            transition
            disabled:opacity-60
          "
        >
          <FcGoogle className="text-2xl" />

          Continue with Google
        </button>

        {/* =========================
            DIVIDER
        ========================= */}
        <div className="flex items-center gap-3">

          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-200" />

        </div>

        {/* =========================
            EMAIL
        ========================= */}
        <div className="flex flex-col gap-1">

          <label className="text-sm font-semibold text-[#28282B] ml-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              bg-gray-50
              border
              border-gray-100
              outline-none
              p-3
              rounded-2xl
              focus:border-[#ff6e4a]
              focus:ring-2
              focus:ring-[#ff6e4a]/10
              transition
            "
            required
          />

        </div>

        {/* =========================
            PASSWORD
        ========================= */}
        <div className="flex flex-col gap-1">

          <label className="text-sm font-semibold text-[#28282B] ml-1">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              bg-gray-50
              border
              border-gray-100
              outline-none
              p-3
              rounded-2xl
              focus:border-[#ff6e4a]
              focus:ring-2
              focus:ring-[#ff6e4a]/10
              transition
            "
            required
          />

        </div>

        {/* =========================
            FORGOT PASSWORD
        ========================= */}
        <div className="flex justify-end">

          <button
            type="button"
            className="
              text-sm
              text-[#ff6e4a]
              font-semibold
              hover:underline
            "
          >
            Forgot Password?
          </button>

        </div>

        {/* =========================
            LOGIN BUTTON
        ========================= */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-[#ff6e4a]
            hover:bg-[#f45d3a]
            text-white
            py-3
            rounded-2xl
            text-lg
            font-semibold
            shadow-md
            shadow-[#ff6e4a]/20
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* =========================
            ADMIN OPTION
        ========================= */}
        <div className="mt-2 border-t border-gray-100 pt-4">

          <p className="text-center text-xs text-gray-400 mb-2">
            Restaurant owner?
          </p>

          <button
            type="button"
            onClick={handleAdminLogin}
            className="
              w-full
              py-2.5
              rounded-2xl
              border
              border-[#28282B]
              text-[#28282B]
              font-semibold
              hover:bg-[#28282B]
              hover:text-white
              transition
            "
          >
            Admin / Seller Login
          </button>

        </div>

        {/* =========================
            REGISTER
        ========================= */}
        <p className="text-center text-sm text-gray-500">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              text-[#ff6e4a]
              font-semibold
              hover:underline
            "
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
};

export default Login;