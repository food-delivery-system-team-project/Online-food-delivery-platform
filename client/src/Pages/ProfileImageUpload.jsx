import React, { useEffect, useState } from "react";
import { FaCamera, FaArrowLeft, FaCheck, FaTrash } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import API from "../api/fetchApi";

const ProfileImageUpload = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==============================
  // HANDLE IMAGE SELECT
  // ==============================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");

    // File type validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    // File size validation - 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==============================
  // CLEAN PREVIEW URL
  // ==============================
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ==============================
  // REMOVE IMAGE
  // ==============================
  const handleRemove = () => {
    setImage(null);
    setPreview("");
    setMessage("");
    setError("");
  };

  // ==============================
  // UPLOAD IMAGE
  // ==============================
  const handleUpload = async () => {
    if (!image) {
      setError("Please select a profile image first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setError("");

      const formData = new FormData();
      formData.append("image", image);

      const res = await API.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile image uploaded:", res.data);

      setMessage("Profile picture updated successfully!");

      // Update localStorage user if backend returns updated user
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Go back after short delay
      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to upload image. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==============================
  // FORMAT FILE SIZE
  // ==============================
  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen w-full bg-[#faf1ee] px-4 py-6 sm:px-6 lg:px-10">

      {/* ==============================
          BACK BUTTON
      ============================== */}
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#ff6e4a] transition"
        >
          <span className="h-9 w-9 rounded-full bg-white shadow-sm flex items-center justify-center">
            <FaArrowLeft />
          </span>

          <span className="font-medium">
            Back to profile
          </span>
        </button>
      </div>

      {/* ==============================
          MAIN CARD
      ============================== */}
      <div className="max-w-5xl mx-auto mt-6">

        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ==============================
                LEFT - VISUAL SECTION
            ============================== */}
            <div className="relative bg-[#28282B] min-h-[380px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">

              {/* Decorative circles */}
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[#ff6e4a]/20" />

              <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-[#ff6e4a]/10" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center px-6">

                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm backdrop-blur">
                    <FaCamera className="text-[#ff6e4a]" />
                    Profile Picture
                  </span>
                </div>

                {/* PROFILE IMAGE */}
                <div className="relative">

                  <div className="h-48 w-48 sm:h-56 sm:w-56 rounded-full p-1.5 bg-[#ff6e4a] shadow-2xl">

                    <div className="h-full w-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">

                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">

                          <FaCamera className="text-4xl mb-3" />

                          <span className="text-sm">
                            No photo
                          </span>

                        </div>
                      )}

                    </div>

                  </div>

                  {/* CAMERA BUTTON */}
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-2 right-2 h-14 w-14 rounded-full bg-[#ff6e4a] border-4 border-[#28282B] text-white flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-lg"
                  >
                    <FaCamera className="text-xl" />

                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                </div>

                <h1 className="text-white text-2xl sm:text-3xl font-bold mt-7">
                  Make it yours
                </h1>

                <p className="text-gray-400 max-w-sm mt-2 text-sm sm:text-base">
                  Add a profile picture so your account feels more personal.
                </p>

              </div>
            </div>

            {/* ==============================
                RIGHT - UPLOAD SECTION
            ============================== */}
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

              <div className="max-w-md mx-auto w-full">

                <div className="mb-8">

                  <p className="text-[#ff6e4a] font-semibold text-sm mb-2">
                    PROFILE SETTINGS
                  </p>

                  <h1 className="text-3xl sm:text-4xl font-bold text-[#28282B]">
                    Update your photo
                  </h1>

                  <p className="text-gray-500 mt-3 leading-relaxed">
                    Choose a clear photo that represents you. Your profile
                    picture will be visible across your account.
                  </p>

                </div>

                {/* ==============================
                    UPLOAD BOX
                ============================== */}
                <label
                  htmlFor="profile-image"
                  className="group block border-2 border-dashed border-gray-200 hover:border-[#ff6e4a] rounded-2xl p-6 cursor-pointer transition bg-[#fafafa] hover:bg-[#fff8f5]"
                >

                  <div className="flex items-center gap-4">

                    <div className="h-14 w-14 rounded-2xl bg-[#ff6e4a]/10 text-[#ff6e4a] flex items-center justify-center shrink-0 group-hover:scale-105 transition">

                      <IoCloudUploadOutline className="text-3xl" />

                    </div>

                    <div>

                      <h3 className="font-semibold text-[#28282B]">
                        Choose an image
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        JPG, PNG or WEBP • Max 5MB
                      </p>

                    </div>

                  </div>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

                {/* ==============================
                    SELECTED FILE
                ============================== */}
                {image && (
                  <div className="mt-4 p-4 rounded-2xl bg-gray-50 flex items-center justify-between gap-3">

                    <div className="flex items-center gap-3 min-w-0">

                      <img
                        src={preview}
                        alt="Selected"
                        className="h-12 w-12 rounded-xl object-cover shrink-0"
                      />

                      <div className="min-w-0">

                        <p className="font-medium text-sm truncate">
                          {image.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(image.size)}
                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleRemove}
                      className="h-9 w-9 rounded-full bg-white text-gray-500 hover:text-red-500 hover:bg-red-50 shadow-sm flex items-center justify-center transition shrink-0"
                    >
                      <FaTrash className="text-sm" />
                    </button>

                  </div>
                )}

                {/* ==============================
                    SUCCESS MESSAGE
                ============================== */}
                {message && (
                  <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-green-50 text-green-700">

                    <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <FaCheck />
                    </span>

                    <p className="text-sm font-medium">
                      {message}
                    </p>

                  </div>
                )}

                {/* ==============================
                    ERROR MESSAGE
                ============================== */}
                {error && (
                  <div className="mt-4 p-4 rounded-2xl bg-red-50 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* ==============================
                    SAVE BUTTON
                ============================== */}
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={!image || uploading}
                  className={`w-full mt-6 py-3.5 rounded-2xl font-semibold text-white transition flex items-center justify-center gap-2 ${
                    !image || uploading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#ff6e4a] hover:bg-[#f45d3a] shadow-lg shadow-[#ff6e4a]/20"
                  }`}
                >

                  {uploading ? (
                    <>
                      <span className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Save Profile Picture
                    </>
                  )}

                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  Your image will be securely uploaded to your profile.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileImageUpload;