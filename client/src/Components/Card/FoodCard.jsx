import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaStore } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../../Features/likeSlice";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const likedItems = useSelector(
    (state) => state.Like?.likedItems || []
  );

  const isLiked = likedItems.includes(food._id);

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(toggleLike(food._id));
  };

  const handleCardClick = () => {
    navigate(`/foodDetails/${food._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="
        w-full
        max-w-[340px]
        min-w-0
        cursor-pointer
        group
      "
    >
      {/* CARD */}
      <div
        className="
          relative
          w-full
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-sm
          border border-gray-100
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        {/* ================= IMAGE ================= */}
        <div
          className="
            relative
            w-full
            aspect-[4/3]
            overflow-hidden
            bg-gray-100
          "
        >
          <img
            src={food?.image || "/Images/Logo.png"}
            alt={food?.name || "Food"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/Images/Logo.png";
            }}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* ================= PREP TIME ================= */}
          {food?.prepTime && (
            <div className="absolute left-3 bottom-3">
              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white/95
                  backdrop-blur-sm
                  px-3
                  py-1.5
                  shadow-sm
                "
              >
                <FaRegClock className="text-[#ff6e4a] text-sm" />

                <span className="text-xs sm:text-sm font-semibold text-[#28282B] whitespace-nowrap">
                  {food.prepTime}
                </span>
              </div>
            </div>
          )}

          {/* ================= LIKE ================= */}
          <button
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            className="
              absolute
              right-3
              top-3
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
              bg-white/95
              backdrop-blur-sm
              shadow-sm
              transition-all
              duration-200
              hover:scale-110
              active:scale-95
            "
          >
            {isLiked ? (
              <GoHeartFill className="text-xl text-[#ff6e4a]" />
            ) : (
              <GoHeart className="text-xl text-[#ff6e4a]" />
            )}
          </button>
        </div>

        {/* ================= DETAILS ================= */}
        <div className="p-4">
          {/* FOOD NAME */}
          <h2
            className="
              text-base
              sm:text-lg
              font-bold
              text-[#28282B]
              truncate
            "
            title={food?.name}
          >
            {food?.name || "Food Item"}
          </h2>

          {/* STORE + RATING */}
          <div className="mt-2 flex items-center justify-between gap-2">
            {/* STORE */}
            <div className="flex min-w-0 items-center gap-1.5">
              <FaStore className="shrink-0 text-[#ff6e4a] text-sm" />

              <span
                className="
                  truncate
                  text-xs
                  sm:text-sm
                  font-medium
                  text-gray-600
                "
                title={food?.storeName}
              >
                {food?.storeName || "Restaurant"}
              </span>
            </div>

            {/* RATING */}
            <div
              className="
                flex
                shrink-0
                items-center
                gap-1
                rounded-full
                bg-amber-50
                px-2
                py-1
              "
            >
              <FaStar className="text-amber-400 text-xs" />

              <span className="text-xs font-semibold text-[#28282B]">
                {food?.rating ?? "0"}
              </span>

              {food?.totalRatings > 0 && (
                <span className="text-[10px] text-gray-400">
                  ({food.totalRatings})
                </span>
              )}
            </div>
          </div>

          {/* ================= BOTTOM ================= */}
          <div className="mt-4 flex items-center justify-between gap-3">
            {/* DELIVERY */}
            <div className="min-w-0">
              <p className="truncate text-[11px] sm:text-xs font-medium text-[#ff6e4a]">
                Free delivery
              </p>

              <p className="text-[10px] sm:text-xs text-gray-400">
                On orders over ₹299
              </p>
            </div>

            {/* PRICE */}
            <div
              className="
                shrink-0
                rounded-full
                bg-[#28282B]
                px-4
                py-2
                text-white
                font-bold
                text-sm
                sm:text-base
              "
            >
              ₹{food?.price ?? 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;