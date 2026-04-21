import React, { useEffect, useState } from "react";
import API from "../api/fetchApi";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/profile");
        setForm({
          name: res.data.name,
          email: res.data.email
        });
        setPreview(res.data.image); // existing image
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Handle image change + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);

      if (image) {
        formData.append("image", image);
      }

      const res = await API.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profile updated ✅");
      console.log(res.data);

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Edit Profile</h1>

        {/* IMAGE PREVIEW */}
        <div className="flex flex-col items-center gap-3">
          {preview ? (
            <img
              src={preview}
              alt=""
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
              No Image
            </div>
          )}

          <input type="file" onChange={handleImageChange} />
        </div>

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 rounded-lg"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg"
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#ff6e4a] text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;