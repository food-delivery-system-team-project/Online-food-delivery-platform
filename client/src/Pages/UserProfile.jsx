import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoHeart } from "react-icons/go";
import { BsBasket3 } from "react-icons/bs";
import { PiClipboardText } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  const likedItems = useSelector((state) => state.Like.likedItems || []);
  const cartItems = useSelector((state) => state.cart?.items || []);

  const orders = [];
  const ratings = [];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>No user logged in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 lg:px-20 py-10">
        

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* LEFT SIDE (PROFILE INFO) */}
        <div className="lg:w-1/3 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center gap-4">

          <div className="h-28 w-28 rounded-full bg-[#ff6e4a] flex items-center justify-center text-white text-4xl font-bold">
            {user.name?.charAt(0)}
          </div>

          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>

          <span className="px-4 py-1 bg-[#ff6e4a]/20 text-[#ff6e4a] rounded-full text-sm">
            {user.role}
          </span>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="mt-4 w-full bg-[#ff6e4a] text-white py-3 rounded-xl font-bold"
          >
            Logout
          </button>
        </div>

        {/* RIGHT SIDE (STATS + ACTIVITY) */}
        <div className="lg:w-2/3 flex flex-col gap-6">

          {/* STATS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
              <GoHeart className="text-3xl text-[#ff6e4a]" />
              <h2 className="text-xl font-bold">{likedItems.length}</h2>
              <p className="text-gray-500 text-sm">Likes</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
              <BsBasket3 className="text-3xl text-[#ff6e4a]" />
              <h2 className="text-xl font-bold">{cartItems.length}</h2>
              <p className="text-gray-500 text-sm">Cart</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
              <PiClipboardText className="text-3xl text-[#ff6e4a]" />
              <h2 className="text-xl font-bold">{orders.length}</h2>
              <p className="text-gray-500 text-sm">Orders</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
              <FaStar className="text-3xl text-[#ff6e4a]" />
              <h2 className="text-xl font-bold">
                {ratings.length
                  ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
                  : 0}
              </h2>
              <p className="text-gray-500 text-sm">Ratings</p>
            </div>

          </div>

          {/* EXTRA SECTION (Optional like orders list) */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

            <p className="text-gray-500">
              No recent orders yet.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;