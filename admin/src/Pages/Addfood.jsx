import React from "react";

const Addfood = () => {
  return (
    
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6">Food Details</h2>

      <form className="grid md:grid-cols-2 gap-6">

        {/* Dish Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Dish Name</label>
          <input
            type="text"
            placeholder="Paneer Butter Masala"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Food Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Food Name</label>
          <input
            type="text"
            placeholder="Indian Special"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Veg / Non Veg */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Food Type</label>
          <select className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none">
            <option value="">Select Type</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            placeholder="₹199"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows="3"
            placeholder="Write about dish..."
            className="w-full h-22 border p-2 resize-none rounded-lg focus:ring-2 focus:outline-none focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Main Food Included */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium">Some Food Ingredient</label>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Chili
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Souse
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Oil
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Onion
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" />
              Saled
            </label>
          </div>
        </div>

        {/* Upload PNG */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm font-medium">Dish Image (PNG)</label>
          <input
            type="file"
            accept="image/png"
            className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-6 rounded-lg hover:opacity-90"
          >
            Add Food
          </button>
        </div>

      </form>
    </div>
  );
};

export default Addfood;