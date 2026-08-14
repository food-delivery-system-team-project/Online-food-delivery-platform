import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoHeart } from "react-icons/go";
import { BsBasket3 } from "react-icons/bs";
import { PiClipboardText } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import Navbar from "../Components/Navbar";
import {
  MdEdit,
  MdLocationOn,
  MdPhone,
  MdEmail,
} from "react-icons/md";
import {
  FiArrowRight,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

import API from "../api/fetchApi";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // REDUX DATA
  // =========================

  const likedItems = useSelector(
    (state) => state.Like?.likedItems || []
  );

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  // Replace these later with actual API data
  const orders = [];
  const ratings = [];

  // =========================
  // FETCH USER
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const res = await API.get("/users/profile");

        console.log("Profile:", res.data);

        setUser(res.data.user);

        // Keep localStorage synchronized
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      } catch (err) {
        console.log(
          "Profile error:",
          err.response?.data || err.message
        );

        // Fallback to localStorage
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf4f1] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-[#ff6e4a]/20 border-t-[#ff6e4a] rounded-full animate-spin" />

          <p className="text-gray-500 text-sm">
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // NO USER
  // =========================

  if (!user) {
    return (
      <div className="min-h-screen bg-[#faf4f1] flex items-center justify-center px-4">
        

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full">

          <div className="w-20 h-20 mx-auto rounded-full bg-[#fff0eb] flex items-center justify-center mb-5">
            <FiUser className="text-4xl text-[#ff6e4a]" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            You're not logged in
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 bg-[#ff6e4a] hover:bg-[#f45d38] text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // RATING
  // =========================

  const averageRating = ratings.length
    ? (
        ratings.reduce((a, b) => a + b, 0) /
        ratings.length
      ).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-[#faf4f1] px-4 py-6 sm:px-6 lg:px-10">
 <div className="sticky top-0 z-[100]">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto">

        {/* =================================
            PAGE HEADER
        ================================= */}

        <div className="mb-7">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Profile
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage your account and view your activity
          </p>

        </div>


        {/* =================================
            MAIN GRID
        ================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">


          {/* =================================
              LEFT PROFILE CARD
          ================================= */}

          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Orange top area */}

            <div className="h-28 bg-[#ff6e4a] relative">

              {/* Decorative circles */}

              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10" />

              <div className="absolute -left-10 top-12 w-24 h-24 rounded-full bg-white/10" />

            </div>


            {/* Profile information */}

            <div className="px-5 pb-6">

              {/* Profile image */}

              <div className="relative -mt-14 w-fit mx-auto">

                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-[#fff0eb] border-4 border-white shadow-md flex items-center justify-center text-[#ff6e4a] text-4xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                {/* Camera */}

                <button
                  onClick={() =>
                    navigate("/profileimageupload")
                  }
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-[#ff6e4a] transition"
                  title="Change profile picture"
                >
                  <IoCameraOutline className="text-xl" />
                </button>

              </div>


              {/* Name */}

              <div className="text-center mt-4">

                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {user.email}
                </p>

                {/* Role */}

                <span className="inline-flex mt-3 px-4 py-1 rounded-full bg-[#fff0eb] text-[#ff6e4a] text-xs font-bold capitalize">
                  {user.role || "user"}
                </span>

              </div>


              {/* =================================
                  CONTACT INFORMATION
              ================================= */}

              <div className="mt-6 flex flex-col gap-3">

                {/* Phone */}

                <div className="group flex items-center gap-3 bg-[#faf8f7] rounded-2xl p-3">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <MdPhone className="text-xl text-[#ff6e4a]" />
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user.phone
                        ? `+91 ${user.phone}`
                        : "Not added"}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate("/profileimageupload")
                    }
                    className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#ff6e4a]"
                  >
                    <MdEdit />
                  </button>

                </div>


                {/* Email */}

                <div className="flex items-center gap-3 bg-[#faf8f7] rounded-2xl p-3">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <MdEmail className="text-xl text-[#ff6e4a]" />
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user.email}
                    </p>

                  </div>

                </div>


                {/* Address */}

                <div className="group flex items-center gap-3 bg-[#faf8f7] rounded-2xl p-3">

                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <MdLocationOn className="text-xl text-[#ff6e4a]" />
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="text-xs text-gray-400">
                      Address
                    </p>

                    <p className="text-sm font-medium text-gray-700 line-clamp-2">
                      {user.address || "Address not added"}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate("/profileimageupload")
                    }
                    className="w-8 h-8 flex-shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-[#ff6e4a]"
                  >
                    <MdEdit />
                  </button>

                </div>

              </div>


              {/* Logout */}

              <button
                onClick={handleLogout}
                className="mt-6 w-full py-3 rounded-xl bg-[#fff0eb] text-[#ff6e4a] font-semibold flex items-center justify-center gap-2 hover:bg-[#ff6e4a] hover:text-white transition"
              >
                <FiLogOut />

                Logout
              </button>

            </div>

          </section>


          {/* =================================
              RIGHT SIDE
          ================================= */}

          <div className="flex flex-col gap-6">


            {/* =================================
                STAT CARDS
            ================================= */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">


              {/* Likes */}

              <button
                onClick={() => navigate("/likes")}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 text-left hover:-translate-y-1 hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">

                  <div className="w-10 h-10 rounded-xl bg-[#fff0eb] flex items-center justify-center">
                    <GoHeart className="text-xl text-[#ff6e4a]" />
                  </div>

                  <FiArrowRight className="text-gray-300 group-hover:text-[#ff6e4a] transition" />

                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-4">
                  {likedItems.length}
                </h3>

                <p className="text-sm text-gray-500">
                  Favorites
                </p>

              </button>


              {/* Cart */}

              <button
                onClick={() => navigate("/cart")}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 text-left hover:-translate-y-1 hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">

                  <div className="w-10 h-10 rounded-xl bg-[#fff0eb] flex items-center justify-center">
                    <BsBasket3 className="text-xl text-[#ff6e4a]" />
                  </div>

                  <FiArrowRight className="text-gray-300 group-hover:text-[#ff6e4a] transition" />

                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-4">
                  {cartItems.length}
                </h3>

                <p className="text-sm text-gray-500">
                  Cart Items
                </p>

              </button>


              {/* Orders */}

              <button
                onClick={() => navigate("/orders")}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 text-left hover:-translate-y-1 hover:shadow-md transition"
              >

                <div className="flex items-center justify-between">

                  <div className="w-10 h-10 rounded-xl bg-[#fff0eb] flex items-center justify-center">
                    <PiClipboardText className="text-xl text-[#ff6e4a]" />
                  </div>

                  <FiArrowRight className="text-gray-300 group-hover:text-[#ff6e4a] transition" />

                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-4">
                  {orders.length}
                </h3>

                <p className="text-sm text-gray-500">
                  Orders
                </p>

              </button>


              {/* Rating */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">

                <div className="flex items-center justify-between">

                  <div className="w-10 h-10 rounded-xl bg-[#fff0eb] flex items-center justify-center">
                    <FaStar className="text-xl text-[#ff6e4a]" />
                  </div>

                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-4">
                  {averageRating}
                </h3>

                <p className="text-sm text-gray-500">
                  Rating
                </p>

              </div>

            </div>


            {/* =================================
                ACCOUNT OVERVIEW
            ================================= */}

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    Account Overview
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Your account information
                  </p>

                </div>

                <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#fff0eb] items-center justify-center">
                  <FiUser className="text-[#ff6e4a]" />
                </div>

              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">


                <div className="bg-[#faf8f7] rounded-2xl p-4">

                  <p className="text-xs text-gray-400">
                    Account Name
                  </p>

                  <p className="font-semibold text-gray-700 mt-1">
                    {user.name}
                  </p>

                </div>


                <div className="bg-[#faf8f7] rounded-2xl p-4">

                  <p className="text-xs text-gray-400">
                    Account Type
                  </p>

                  <p className="font-semibold text-gray-700 mt-1 capitalize">
                    {user.role || "user"}
                  </p>

                </div>


                <div className="bg-[#faf8f7] rounded-2xl p-4">

                  <p className="text-xs text-gray-400">
                    Email Verification
                  </p>

                  <p className="font-semibold text-green-600 mt-1">
                    {user.isVarified
                      ? "Verified"
                      : "Not verified"}
                  </p>

                </div>


                <div className="bg-[#faf8f7] rounded-2xl p-4">

                  <p className="text-xs text-gray-400">
                    Member Since
                  </p>

                  <p className="font-semibold text-gray-700 mt-1">
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </p>

                </div>

              </div>

            </section>


            {/* =================================
                RECENT ACTIVITY
            ================================= */}

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    Recent Activity
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Your latest activity
                  </p>

                </div>

                <PiClipboardText className="text-2xl text-[#ff6e4a]" />

              </div>


              {orders.length === 0 ? (

                <div className="rounded-2xl bg-[#faf8f7] p-7 text-center">

                  <div className="w-14 h-14 mx-auto rounded-full bg-white flex items-center justify-center mb-3">

                    <PiClipboardText className="text-2xl text-gray-300" />

                  </div>

                  <h3 className="font-semibold text-gray-700">
                    No recent orders
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Your recent orders will appear here.
                  </p>

                  <button
                    onClick={() => navigate("/explore")}
                    className="mt-4 text-[#ff6e4a] text-sm font-semibold hover:underline"
                  >
                    Start exploring food →
                  </button>

                </div>

              ) : (

                <div className="flex flex-col gap-3">

                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between bg-[#faf8f7] rounded-2xl p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          Order #{order._id}
                        </p>

                        <p className="text-xs text-gray-400">
                          {order.status}
                        </p>
                      </div>

                      <span className="text-[#ff6e4a] font-bold">
                        ${order.total}
                      </span>
                    </div>
                  ))}

                </div>

              )}

            </section>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;