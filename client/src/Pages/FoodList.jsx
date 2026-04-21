import { PiSlidersHorizontalBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, setQuery, toggleSearch } from "../Features/searchSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import API from "../api/fetchApi";
import { setFoods } from "../Features/searchSlice";

const FoodList = () => {
  const foods = useSelector((state) => state.search.allFoods);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const results = useSelector((state) => state.search.results);
  const searchToggle = useSelector((state) => state.search.value);

  useEffect(() => {
  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      dispatch(setFoods(res.data.foods));
    } catch (err) {
      console.log(err);
    }
  };

  fetchFoods();
}, []);

  return (
    <div className='h-screen w-full overflow-y-scroll overflow-x-hidden relative'>

      {/* TOP BAR */}
      <div className='h-20 w-full flex items-center justify-between p-5 bg-gray-50 relative'>

        {/* SEARCH BAR */}
        <div
          onClick={() => dispatch(toggleSearch())}
          className='px-5 w-1/2 py-2 bg-gray-200 rounded-3xl flex items-center relative'
        >
          <CiSearch className="text-2xl" />

          <input
            onChange={(e) => dispatch(setQuery(e.target.value))}
            className="ml-2 w-full outline-0 bg-transparent"
            type="search"
            placeholder='Search Food here'
          />

          {/* 🔍 SUGGESTIONS */}
          {searchToggle && (
            <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg p-2 max-h-60 overflow-y-auto z-50">
              {results.length > 0 ? (
                results.map((item) => (
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                      {item.name}
                    </div>
                ))
              ) : (
                <p className="p-2 text-gray-400">No results</p>
              )}
            </div>
          )}
        </div>

        {/* FILTER BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="bg-[#ff6e4a] px-3 gap-2 py-1 flex items-center text-white rounded-2xl"
        >
          <PiSlidersHorizontalBold />
          Filter
        </button>
      </div>

      {/* FILTER PANEL */}
      {open && (
        <div className="p-5 bg-white shadow-lg flex flex-col gap-4">

          {/* PRICE */}
          <div>
            <h1 className="font-bold">Price</h1>
            <div className="flex gap-3 mt-2">
              <button onClick={() => dispatch(setFilters({ priceRange: "low" }))}>Low</button>
              <button onClick={() => dispatch(setFilters({ priceRange: "medium" }))}>Medium</button>
              <button onClick={() => dispatch(setFilters({ priceRange: "high" }))}>High</button>
            </div>
          </div>

          {/* RATING */}
          <div>
            <h1 className="font-bold">Rating</h1>
            <div className="flex gap-3 mt-2">
              <button onClick={() => dispatch(setFilters({ rating: 3 }))}>3+</button>
              <button onClick={() => dispatch(setFilters({ rating: 4 }))}>4+</button>
              <button onClick={() => dispatch(setFilters({ rating: 5 }))}>5</button>
            </div>
          </div>

          {/* SORT */}
          <div>
            <h1 className="font-bold">Sort</h1>
            <div className="flex gap-3 mt-2">
              <button onClick={() => dispatch(setFilters({ sort: "priceLow" }))}>Price ↑</button>
              <button onClick={() => dispatch(setFilters({ sort: "priceHigh" }))}>Price ↓</button>
              <button onClick={() => dispatch(setFilters({ sort: "rating" }))}>Rating</button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default FoodList;