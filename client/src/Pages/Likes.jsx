import React from "react";
import { GoHeart } from "react-icons/go";
import { Link } from "react-router-dom";
import FavCard from "../Components/Card/FavCard";

const Likes = () => {
  // Later you can replace this with Redux/API favorites
  const favorites = [];

  return (
    <div className="min-h-screen bg-[#faf4f1] px-4 py-6 sm:px-6 lg:px-10">

      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADER
        ========================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

          <div className="flex items-center gap-3">

            {/* Heart Icon */}
            <div className="w-12 h-12 rounded-full bg-[#ff6e4a] text-white flex items-center justify-center shadow-sm">
              <GoHeart className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#252525]">
                My Favorites
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Your favorite foods in one place
              </p>
            </div>

          </div>

          {/* Count */}
          <div className="self-start sm:self-auto bg-white border border-gray-100 shadow-sm px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-[#ff6e4a]">
              {favorites.length} Favorites
            </span>
          </div>

        </div>


        {/* =========================
            FAVORITES CONTENT
        ========================== */}

        {favorites.length === 0 ? (

          /* =========================
             EMPTY FAVORITES
          ========================== */

          <div className="min-h-[60vh] flex items-center justify-center">

            <div className="bg-white w-full max-w-md rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 text-center">

              {/* Icon */}
              <div className="w-24 h-24 mx-auto rounded-full bg-[#fff0eb] flex items-center justify-center mb-6">

                <GoHeart className="text-5xl text-[#ff6e4a]" />

              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                No favorites yet
              </h2>

              <p className="text-gray-500 text-sm leading-6 mt-3">
                You haven't added any food to your favorites.
                Start exploring and save the dishes you love.
              </p>

              <Link to="/explore">

                <button className="mt-7 bg-[#ff6e4a] hover:bg-[#f45d38] text-white px-7 py-3 rounded-xl font-semibold transition shadow-sm">

                  Explore Foods

                </button>

              </Link>

            </div>

          </div>

        ) : (

          /* =========================
             FAVORITES GRID
          ========================== */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {favorites.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden"
              >

                <FavCard food={item} />

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Likes;