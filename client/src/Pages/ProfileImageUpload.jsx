import React, { useState } from "react";
import API from "../api/fetchApi";

const ProfileImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // upload to backend
  const handleUpload = async () => {
    if (!image) return alert("Select image first");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await API.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Uploaded ✅");
      console.log(res.data);

    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center gap-4 justify-center">

      {/* IMAGE PREVIEW */}
      <label className="cursor-pointer relative">
        {preview ? (
          <img
            src={preview}
            alt=""
            className="h-28 w-28 rounded-full object-cover border-4 border-[#ff6e4a]"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            Upload
          </div>
        )}

        {/* HIDDEN INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
      </label>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        className="bg-[#ff6e4a] text-white px-5 py-2 rounded-lg"
      >
        Save Image
      </button>
    </div>
  );
};

export default ProfileImageUpload;