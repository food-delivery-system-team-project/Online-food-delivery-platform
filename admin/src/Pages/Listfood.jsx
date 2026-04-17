import React, { useState } from "react";

const foodData = [
  {
    id: 1,
    name: "Veg Burger",
    category: "Fastfood",
    type: "Veg",
    price: 120,
    rating: 4.5,
    image: "https://via.placeholder.com/50"
  },
  {
    id: 2,
    name: "Chicken Pizza",
    category: "Fastfood",
    type: "Nonveg",
    price: 320,
    rating: 4.2,
    image: "https://via.placeholder.com/50"
  },
  {
    id: 3,
    name: "Paneer Thali",
    category: "Meal",
    type: "Veg",
    price: 220,
    rating: 4.8,
    image: "https://via.placeholder.com/50"
  },
  {
    id: 4,
    name: "Mix Noodles",
    category: "Mix",
    type: "Mix",
    price: 180,
    rating: 4.0,
    image: "https://via.placeholder.com/50"
  }
];

export default function ListFood() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredFood = foodData.filter((item) => {
    return (
      (category === "All" ||
        item.category === category ||
        item.type === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Top */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Food Stock</h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search food..."
            className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Veg">Veg</option>
            <option value="Nonveg">Nonveg</option>
            <option value="Fastfood">Fastfood</option>
            <option value="Mix">Mix</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Price</th>
              <th>Rating</th>
            </tr>
          </thead>

          <tbody>
            {filteredFood.map((food) => (
              <tr key={food.id} className="border-b hover:bg-red-200">
                <td className="py-3">
                  <img
                    src={food.image}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>

                <td>{food.name}</td>
                <td>{food.category}</td>

                <td>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                    {food.type}
                  </span>
                </td>

                <td>₹{food.price}</td>

                <td>
                  <div className="flex items-center gap-1">
                    ⭐ {food.rating}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}