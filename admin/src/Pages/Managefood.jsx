import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const foodData = [
  {
    id: 1,
    name: "Veg Burger",
    category: "Veg",
    price: 120,
    rating: 4.2,
  },
  {
    id: 2,
    name: "Chicken Pizza",
    category: "Non-Veg",
    price: 320,
    rating: 4.5,
  },
];

export default function Managefood() {
  const [foods, setFoods] = useState(foodData);

  const handleDelete = (id) => {
    setFoods(foods.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Food</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500 text-left">
            <th className="pb-3">Food</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food.id} className="border-b">
              <td className="py-3">{food.name}</td>
              <td>{food.category}</td>
              <td>₹{food.price}</td>
              <td>{food.rating} ⭐</td>

              <td className="flex gap-3">
                <button className="text-blue-500 hover:underline flex items-center gap-1">
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(food.id)}
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}