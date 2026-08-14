import { PiSlidersHorizontalBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  setQuery,
  toggleSearch,
  setFoods,
} from "../Features/searchSlice";
import { useEffect, useState } from "react";
import API from "../api/fetchApi";
import FoodCard from "../Components/Card/FoodCard";
import Navbar from "../Components/Navbar";
import MiniNav from "../Components/NavComp/MiniNav";

const categories = [
  "All",
  "Pizza",
  "Burger",
  "Biryani",
  "Chinese",
  "South Indian",
  "North Indian",
  "Desserts",
  "Drinks",
  "Snacks",
];

const slides = [
  {
    title: "Delicious Food",
    subtitle: "Delivered to your doorstep",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Fresh & Tasty",
    subtitle: "Your favourite meals are waiting",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Craving Something?",
    subtitle: "Order your favourite food now",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=80",
  },
];

const FoodList = () => {
  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  const foods = useSelector((state) => state.search.allFoods);
  const results = useSelector((state) => state.search.results);
  const searchToggle = useSelector((state) => state.search.value);

  // ==============================
  // FETCH FOODS
  // ==============================
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);

        const res = await API.get("/foods", {
          params: {
            page: 1,
            limit: 100,
          },
        });

        dispatch(setFoods(res.data.foods || []));
      } catch (error) {
        console.error(
          "Failed to fetch foods:",
          error.response?.data || error.message
        );

        dispatch(setFoods([]));
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [dispatch]);

  // ==============================
  // AUTO SLIDER
  // ==============================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ==============================
  // CATEGORY FILTER
  // ==============================
  const filteredFoods =
    activeCategory === "All"
      ? foods
      : foods.filter(
          (food) =>
            food.category?.toLowerCase() ===
            activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen w-full bg-[#faf1ee]">

      {/* =====================================
          NAVBAR
      ====================================== */}
      <div className="sticky top-0 z-[100]">
        <MiniNav/>
        <Navbar />
      </div>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}
      <main className="w-full">

        {/* =====================================
            SEARCH + FILTER
        ====================================== */}
        <section className="w-full px-4 sm:px-6 lg:px-10 pt-5">

          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">

            {/* SEARCH */}
            <div className="relative flex-1">

              <div className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-white rounded-2xl shadow-sm flex items-center border border-gray-100">

                <CiSearch className="text-2xl text-gray-500 shrink-0" />

                <input
                  type="search"
                  placeholder="Search for food..."
                  onFocus={() => dispatch(toggleSearch())}
                  onChange={(e) =>
                    dispatch(setQuery(e.target.value))
                  }
                  className="ml-3 w-full outline-none bg-transparent text-sm sm:text-base"
                />

              </div>

              {/* SEARCH RESULTS */}
              {searchToggle && (
                <div className="absolute top-14 sm:top-16 left-0 w-full bg-white rounded-2xl shadow-xl p-2 max-h-64 overflow-y-auto z-50 border">

                  {results.length > 0 ? (
                    results.map((item) => (
                      <div
                        key={item._id}
                        className="p-3 rounded-xl hover:bg-gray-100 cursor-pointer"
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-400">
                      No results found
                    </p>
                  )}

                </div>
              )}

            </div>

            {/* FILTER */}
            <button
              type="button"
              onClick={() =>
                setOpenFilter((prev) => !prev)
              }
              className="h-12 sm:h-14 px-5 sm:px-7 bg-[#ff6e4a] text-white rounded-2xl flex items-center justify-center gap-2 font-medium shadow-sm hover:bg-[#f45d3a] transition"
            >
              <PiSlidersHorizontalBold className="text-xl" />
              <span>Filter</span>
            </button>

          </div>

          {/* =====================================
              FILTER PANEL
          ====================================== */}
          {openFilter && (
            <div className="max-w-7xl mx-auto mt-4 p-5 bg-white rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6">

              {/* PRICE */}
              <div>
                <h3 className="font-semibold mb-3">
                  Price
                </h3>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({
                          priceRange: "low",
                        })
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    Low
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({
                          priceRange: "medium",
                        })
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    Medium
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({
                          priceRange: "high",
                        })
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    High
                  </button>

                </div>
              </div>

              {/* RATING */}
              <div>
                <h3 className="font-semibold mb-3">
                  Rating
                </h3>

                <div className="flex flex-wrap gap-2">

                  {[3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        dispatch(
                          setFilters({
                            rating,
                          })
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                    >
                      {rating}+ ⭐
                    </button>
                  ))}

                </div>
              </div>

              {/* SORT */}
              <div>
                <h3 className="font-semibold mb-3">
                  Sort
                </h3>

                <div className="flex flex-wrap gap-2">

                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({
                          sort: "priceLow",
                        })
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    Price ↑
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({
                          sort: "priceHigh",
                        })
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    Price ↓
                  </button>

                  <button
                    onClick={() =>
                      dispatch(
                        setFilters({
                          sort: "rating",
                        })
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    Rating
                  </button>

                </div>
              </div>

            </div>
          )}

        </section>

        {/* =====================================
            CATEGORY SECTION
        ====================================== */}
        <section className="w-full px-4 sm:px-6 lg:px-10 mt-6">

          <div className="max-w-7xl mx-auto">

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Categories
              </h2>

            </div>

            {/* Horizontal scroll on mobile */}
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-[#ff6e4a] text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>

          </div>

        </section>

        {/* =====================================
            HERO SLIDER
        ====================================== */}
        <section className="w-full px-4 sm:px-6 lg:px-10 mt-4 sm:mt-6">

          <div className="max-w-7xl mx-auto">

            <div className="relative h-52 sm:h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-lg">

              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    currentSlide === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >

                  {/* IMAGE */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* TEXT */}
                  <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-16">

                    <div className="text-white max-w-lg">

                      <p className="text-sm sm:text-base mb-2">
                        Hungry?
                      </p>

                      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
                        {slide.title}
                      </h1>

                      <p className="mt-2 text-sm sm:text-lg">
                        {slide.subtitle}
                      </p>

                      <button className="mt-5 px-5 py-2.5 bg-[#ff6e4a] rounded-full font-medium hover:bg-[#f45d3a] transition">
                        Order Now
                      </button>

                    </div>

                  </div>

                </div>
              ))}

              {/* DOTS */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setCurrentSlide(index)
                    }
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-7 bg-white"
                        : "w-2 bg-white/60"
                    }`}
                  />
                ))}

              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            FOOD LIST
        ====================================== */}
        <section className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-12">

          <div className="max-w-7xl mx-auto">

            {/* TITLE */}
            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Popular Foods
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Discover something delicious
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {filteredFoods.length} items
              </span>

            </div>

            {/* FOOD GRID */}
            {loading ? (
              <div className="w-full flex justify-center py-20">
                <p className="text-gray-500">
                  Loading foods...
                </p>
              </div>
            ) : filteredFoods.length === 0 ? (
              <div className="w-full flex justify-center py-20">
                <p className="text-gray-500">
                  No foods found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">

                {filteredFoods.map((item) => (
                  <FoodCard
                    key={item._id}
                    food={item}
                  />
                ))}

              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
};

export default FoodList;