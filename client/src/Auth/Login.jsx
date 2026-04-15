import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = API.get("users/login")

    console.log(formData); // send to backend
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#2b2b2b]">
          Login
        </h2>

        {/* Google Login */}
        <button
          type="button"
          className="px-2 py-4 rounded-2xl bg-gray-100 flex items-center justify-center"
        >
          <FcGoogle className="text-2xl mr-2" />
          Continue with Google
        </button>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="outline-none bg-gray-100 p-2 rounded-2xl"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-[#ff6e47] text-white py-2 rounded-2xl text-xl"
        >
          Login
        </button>

        {/* Extra */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span className="text-[#ff6e47] cursor-pointer">
              <Link to="/register" className="text-[#ff6e47] font-semibold">
                Register
               </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;