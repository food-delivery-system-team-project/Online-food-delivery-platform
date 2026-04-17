import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import API from "../api/fetchApi"
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Auth/firebase";


const Login = () => {

  // googel login code
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log(user);

    // save token + user
    localStorage.setItem("token", user.accessToken);

    localStorage.setItem("user", JSON.stringify({
      name: user.displayName,
      email: user.email,
      role: "user" // default role
    }));

    // send to backend
    await API.post("/users/login", {
      name: user.displayName,
      email: user.email,
    });

    // redirect
    navigate("/");

  } catch (error) {
    console.log(error);
    alert("Google login failed");
  }
};


  const navigate = useNavigate();
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const res = await API.post("users/login",formData)
  
      console.log(res.data); // send to backend
  
      // token saving in localstorage
      localStorage.setItem("token", res.data.token);

      // user basic detail save 
      localStorage.setItem("user", JSON.stringify(res.data.user));
  
      // redirecting
  
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    catch(err){
       console.log(err);
    alert("Login failed");
    }
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
          onClick={handleGoogleLogin}
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