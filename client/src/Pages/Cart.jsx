import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tempting Tuna Cat Treats",
      brand: "Temptations",
      price: 5.99,
      quantity: 1,
      image: "https://via.placeholder.com/60"
    },
    {
      id: 2,
      name: "Indoor Adult Jelly Wet Cat Food Pouches",
      brand: "Royal Canin",
      price: 27.8,
      quantity: 1,
      image: "https://via.placeholder.com/60"
    },
    {
      id: 3,
      name: "Adult Chicken And Salmon Medley Wet Cat Food Trays",
      brand: "Advanced",
      price: 66.92,
      quantity: 1,
      image: "https://via.placeholder.com/60"
    }
  ]);

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1
            }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 sm:p-4">
      
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        {/* CART ITEMS */}
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >

              {/* LEFT */}
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                  />
                  <span className="absolute -top-2 -right-2 bg-gray-200 text-xs px-2 rounded-full">
                    {item.quantity}
                  </span>
                </div>

                <div>
                  <h1 className="text-sm sm:text-base font-semibold leading-tight">
                    {item.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.brand}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto">
                
                <p className="font-semibold text-sm sm:text-base">
                  ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, "dec")}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "inc")}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="mt-6 border-t pt-4 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Shipping Fee</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-5 bg-[#ff6e4a] text-white py-3 rounded-xl font-semibold text-sm sm:text-base hover:opacity-90 transition">
          Confirm Order
        </button>

      </div>
    </div>
  );
};

export default Cart;