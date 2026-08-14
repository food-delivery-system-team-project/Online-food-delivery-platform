import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaArrowLeft, FaStore } from "react-icons/fa";
import { BsBasket3 } from "react-icons/bs";

import API from "../../api/fetchApi";
import { addToCart } from "../../Features/cartSlice";

const FoodDetailCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const foods = useSelector((state) => state.search.allFoods || []);

  const [localFood, setLocalFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // =====================================================
  // GET FOOD FROM REDUX OR BACKEND
  // =====================================================

  useEffect(() => {
    const reduxFood = foods.find((item) => item._id === id);

    if (reduxFood) {
      setLocalFood(reduxFood);
      setSelectedImage(reduxFood.image);
      setLoading(false);
      return;
    }

    const fetchFood = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/foods/${id}`);

        const foodData = res.data.food || res.data;

        setLocalFood(foodData);
        setSelectedImage(foodData.image);
      } catch (error) {
        console.error(
          "Failed to fetch food:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id, foods]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = async () => {
    if (!localFood) return;

    try {
      // Update Redux immediately
      dispatch(
        addToCart({
          ...localFood,
          quantity,
        })
      );

      // Update backend
      await API.post("/cart", {
        foodId: localFood._id,
        quantity,
      });
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = async () => {
    if (!localFood) return;

    try {
      await API.post("/cart", {
        foodId: localFood._id,
        quantity,
      });

      navigate("/cart");
    } catch (error) {
      console.error(
        "Buy now error:",
        error.response?.data || error.message
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf1ee] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-[#ff6e4a]/30 border-t-[#ff6e4a] rounded-full animate-spin" />

          <p className="text-gray-500 font-medium">
            Loading food...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // FOOD NOT FOUND
  // =====================================================

  if (!localFood) {
    return (
      <div className="min-h-screen bg-[#faf1ee] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#28282B]">
            Food not found
          </h1>

          <p className="text-gray-500 mt-2">
            This food item may have been removed or is no longer available.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-[#ff6e4a] text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // IMAGE LIST
  // =====================================================

  const images = [
    localFood.image,
    localFood.image2,
    localFood.image3,
    localFood.image4,
  ].filter(Boolean);

  // If backend only has one image
  if (images.length === 0 && localFood.image) {
    images.push(localFood.image);
  }

  const price = Number(localFood.price || 0);

  const oldPrice = price + 100;

  const rating = Number(localFood.rating || 0);

  const totalRatings = localFood.totalRatings || 0;

  return (
    <div className="min-h-screen w-full bg-[#faf1ee]">

      {/* =================================================
          PAGE CONTAINER
      ================================================= */}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2
            text-gray-600
            hover:text-[#ff6e4a]
            font-medium
            mb-5
            transition
          "
        >
          <FaArrowLeft />
          Back
        </button>

        {/* =================================================
            MAIN PRODUCT CARD
        ================================================= */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border border-gray-100
            overflow-hidden
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-0
            "
          >

            {/* =================================================
                LEFT IMAGE SECTION
            ================================================= */}

            <div
              className="
                w-full
                min-w-0
                p-4
                sm:p-6
                lg:p-8
              "
            >

              {/* MAIN IMAGE */}

              <div
                className="
                  relative
                  w-full
                  aspect-square
                  sm:aspect-[4/3]
                  lg:aspect-square
                  bg-[#faf1ee]
                  rounded-2xl
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                "
              >

                {/* LIKE BUTTON */}

                <button
                  onClick={() => setLiked((prev) => !prev)}
                  className="
                    absolute
                    top-4
                    right-4
                    z-10
                    h-11
                    w-11
                    rounded-full
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                    transition
                    hover:scale-105
                  "
                >
                  <FaHeart
                    className={
                      liked
                        ? "text-[#ff6e4a] text-xl"
                        : "text-gray-400 text-xl"
                    }
                  />
                </button>

                <img
                  src={selectedImage || localFood.image}
                  onError={(e) => {
                    e.currentTarget.src = "/Images/Logo.png";
                  }}
                  alt={localFood.name}
                  className="
                    w-full
                    h-full
                    object-contain
                    p-5
                    sm:p-8
                    lg:p-10
                    transition
                    duration-300
                    hover:scale-105
                  "
                />
              </div>

              {/* =================================================
                  THUMBNAILS
              ================================================= */}

              {images.length > 1 && (
                <div
                  className="
                    flex
                    gap-3
                    mt-4
                    overflow-x-auto
                    pb-2
                    scrollbar-hide
                  "
                >
                  {images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      onClick={() => setSelectedImage(image)}
                      className={`
                        flex-shrink-0
                        w-16
                        h-16
                        sm:w-20
                        sm:h-20
                        rounded-xl
                        overflow-hidden
                        bg-[#faf1ee]
                        border-2
                        transition
                        ${
                          selectedImage === image
                            ? "border-[#ff6e4a]"
                            : "border-transparent"
                        }
                      `}
                    >
                      <img
                        src={image}
                        onError={(e) => {
                          e.currentTarget.src = "/Images/Logo.png";
                        }}
                        alt={`${localFood.name} ${index + 1}`}
                        className="
                          w-full
                          h-full
                          object-contain
                          p-2
                        "
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                RIGHT DETAILS SECTION
            ================================================= */}

            <div
              className="
                w-full
                min-w-0
                p-5
                sm:p-6
                lg:p-10
                flex
                flex-col
              "
            >

              {/* STORE */}

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    h-10
                    w-10
                    rounded-full
                    bg-[#faf1ee]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    flex-shrink-0
                  "
                >
                  {localFood.storeImg ? (
                    <img
                      src={localFood.storeImg}
                      alt={localFood.storeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaStore className="text-[#ff6e4a]" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400">
                    Available from
                  </p>

                  <p className="font-semibold text-[#28282B] truncate">
                    {localFood.storeName || "Food Store"}
                  </p>
                </div>
              </div>

              {/* TITLE */}

              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-bold
                  text-[#28282B]
                  leading-tight
                "
              >
                {localFood.name}
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  text-gray-500
                  text-sm
                  sm:text-base
                  leading-6
                  mt-4
                  max-w-2xl
                "
              >
                {localFood.description ||
                  "Delicious food made with fresh ingredients. Enjoy premium taste and quality."}
              </p>

              {/* RATING */}

              <div className="flex flex-wrap items-center gap-3 mt-5">

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    bg-yellow-50
                    text-yellow-600
                    px-3
                    py-1.5
                    rounded-full
                    text-sm
                    font-semibold
                  "
                >
                  <FaStar />
                  {rating.toFixed(1)}
                </div>

                <span className="text-sm text-gray-400">
                  {totalRatings
                    ? `${totalRatings}+ reviews`
                    : "No reviews yet"}
                </span>
              </div>

              {/* PRICE */}

              <div className="flex items-center gap-3 mt-6">

                <span
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    text-[#ff6e4a]
                  "
                >
                  ₹{price.toFixed(2)}
                </span>

                <span className="text-gray-400 line-through text-sm sm:text-base">
                  ₹{oldPrice.toFixed(2)}
                </span>

                <span
                  className="
                    bg-green-50
                    text-green-600
                    px-2
                    py-1
                    rounded-lg
                    text-xs
                    font-semibold
                  "
                >
                  SAVE ₹100
                </span>
              </div>

              {/* PREP TIME */}

              <div
                className="
                  mt-6
                  p-4
                  bg-[#faf1ee]
                  rounded-2xl
                  flex
                  flex-wrap
                  gap-4
                "
              >
                <div>
                  <p className="text-xs text-gray-400">
                    Preparation
                  </p>

                  <p className="font-semibold text-[#28282B]">
                    ⏱ {localFood.prepTime || "20-30 mins"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Delivery
                  </p>

                  <p className="font-semibold text-[#28282B]">
                    🛵 Fast Delivery
                  </p>
                </div>
              </div>

              {/* QUANTITY */}

              <div className="mt-6">

                <p className="font-semibold mb-3">
                  Quantity
                </p>

                <div
                  className="
                    inline-flex
                    items-center
                    border
                    border-gray-200
                    rounded-xl
                    overflow-hidden
                  "
                >

                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="
                      w-11
                      h-11
                      flex
                      items-center
                      justify-center
                      text-xl
                      hover:bg-gray-100
                    "
                  >
                    −
                  </button>

                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((prev) => prev + 1)
                    }
                    className="
                      w-11
                      h-11
                      flex
                      items-center
                      justify-center
                      text-xl
                      hover:bg-gray-100
                    "
                  >
                    +
                  </button>

                </div>
              </div>

              {/* BUTTONS */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-3
                  mt-7
                "
              >

                <button
                  onClick={handleAddToCart}
                  className="
                    w-full
                    bg-[#ff6e4a]
                    text-white
                    py-3.5
                    px-5
                    rounded-xl
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-[#f15f3d]
                    active:scale-[0.98]
                    transition
                  "
                >
                  <BsBasket3 className="text-lg" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="
                    w-full
                    border-2
                    border-[#ff6e4a]
                    text-[#ff6e4a]
                    py-3.5
                    px-5
                    rounded-xl
                    font-semibold
                    hover:bg-[#ff6e4a]
                    hover:text-white
                    active:scale-[0.98]
                    transition
                  "
                >
                  Buy Now
                </button>

              </div>

            </div>
          </div>
        </div>

        {/* =================================================
            REVIEWS SECTION
        ================================================= */}

        <div
          className="
            mt-6
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-100
            p-5
            sm:p-6
            lg:p-8
          "
        >

          <div className="flex items-center justify-between gap-4 mb-6">

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#28282B]">
                Customer Reviews
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                What customers think about this food
              </p>
            </div>

            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <FaStar />
              {rating.toFixed(1)}
            </div>

          </div>

          {/* REVIEW */}

          <div
            className="
              border-t
              border-gray-100
              pt-5
              flex
              flex-col
              sm:flex-row
              gap-4
            "
          >

            <div
              className="
                h-11
                w-11
                rounded-full
                bg-[#faf1ee]
                flex
                items-center
                justify-center
                font-bold
                text-[#ff6e4a]
                flex-shrink-0
              "
            >
              J
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <p className="font-semibold">
                  John Doe
                </p>

                <div className="flex text-yellow-400 text-xs">
                  ★★★★★
                </div>

              </div>

              <p className="text-gray-500 text-sm mt-1">
                Very tasty and fresh. The food arrived quickly
                and was packed really well.
              </p>

            </div>

          </div>

          {/* SECOND REVIEW */}

          <div
            className="
              border-t
              border-gray-100
              mt-5
              pt-5
              flex
              flex-col
              sm:flex-row
              gap-4
            "
          >

            <div
              className="
                h-11
                w-11
                rounded-full
                bg-[#faf1ee]
                flex
                items-center
                justify-center
                font-bold
                text-[#ff6e4a]
                flex-shrink-0
              "
            >
              S
            </div>

            <div>

              <div className="flex flex-wrap items-center gap-2">

                <p className="font-semibold">
                  Sarah
                </p>

                <div className="flex text-yellow-400 text-xs">
                  ★★★★★
                </div>

              </div>

              <p className="text-gray-500 text-sm mt-1">
                Loved it! Great taste and good portion size.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FoodDetailCard;