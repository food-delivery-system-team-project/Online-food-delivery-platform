import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "buyer"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
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
      value="buyer"
      checked={formData.role === "buyer"}
      onChange={handleChange}
    />
    Buyer
  </label>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="role"
      value="seller"
      checked={formData.role === "seller"}
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
          className="bg-[#ff6e47] text-white py-2 rounded-2xl text-xl"
        >
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;