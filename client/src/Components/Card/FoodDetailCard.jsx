import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FoodDetailCard = () => {
  const { id } = useParams();
  const foods = useSelector((state) => state.search.allFoods);
  const food = foods.find((item) => item._id === id);

  if (!food) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] px-4 lg:px-20 py-10">

      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT - IMAGE SECTION */}
        <div className="w-full lg:w-1/2">

          {/* MAIN IMAGE */}
          <div className="w-full h-[400px] bg-white rounded-xl overflow-hidden flex items-center justify-center shadow">
            <img
              src={food.image}
              onError={(e) => (e.target.src = "/Images/Logo.png")}
              className="h-full object-contain"
              alt=""
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {[food.image, food.image, food.image, food.image].map((img, i) => (
              <div
                key={i}
                className="h-20 w-20 bg-white rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={img}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">

          {/* TITLE */}
          <h1 className="text-3xl lg:text-4xl font-bold text-[#28282B]">
            {food.name}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-500 text-sm">
            Delicious food made with fresh ingredients. Enjoy premium taste and quality.
          </p>

          {/* RATING */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500 font-bold">⭐ {food.rating}</span>
            <span className="text-gray-400">
              ({food.totalRatings}+ reviews)
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-[#ff6e4a]">
              ₹{food.price}
            </span>
            <span className="text-gray-400 line-through">
              ₹{food.price + 100}
            </span>
          </div>

          {/* STORE */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
              <img src={food.storeImg} alt="" />
            </div>
            <span className="font-semibold">{food.storeName}</span>
          </div>

          {/* PREP TIME */}
          <p className="text-gray-500 text-sm">
            ⏱ {food.prepTime}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3 mt-6">
            <button className="bg-[#ff6e4a] text-white py-3 rounded-lg font-semibold hover:opacity-90">
              Add to Cart
            </button>

            <button className="border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION (REVIEWS MOCK UI) */}
      <div className="mt-16 bg-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">
              ⭐⭐⭐⭐ - Very tasty and fresh!
            </p>
          </div>

          <div>
            <p className="font-semibold">Sarah</p>
            <p className="text-sm text-gray-500">
              ⭐⭐⭐⭐⭐ - Loved it, will order again.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FoodDetailCard;