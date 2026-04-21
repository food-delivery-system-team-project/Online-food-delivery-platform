import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../Features/cartSlice";
import { useEffect } from "react";
import { setCart, addToCart } from "../Features/cartSlice";
import API from "../api/fetchApi";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart");

        // 🔥 Normalize backend data (VERY IMPORTANT)
        const formatted = res.data.cart.map((item) => ({
          _id: item.foodId._id,
          name: item.foodId.name,
          price: item.foodId.price,
          image: item.foodId.image,
          storeName: item.foodId.storeName,
          quantity: item.quantity
        }));
        console.log(res.data);

        dispatch(setCart(formatted));
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [dispatch]);

  // ✅ Increase quantity
  const handleIncrease = async (id) => {
    try {
      dispatch(increaseQty(id));
      await API.put(`/cart/${id}`, { action: "inc" });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Decrease quantity
  const handleDecrease = async (id) => {
    try {
      dispatch(decreaseQty(id));
      await API.put(`/cart/${id}`, { action: "dec" });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Remove item
  const handleRemove = async (id) => {
    try {
      dispatch(removeFromCart(id));
      await API.delete(`/cart/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 sm:p-4">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">

        {/* CART ITEMS */}
        <div className="flex flex-col gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                {/* LEFT */}
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <img
                      src={item.image}
                      onError={(e) => (e.target.src = "/Images/Logo.png")}
                      alt=""
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-200 text-xs px-2 rounded-full">
                      {item.quantity}
                    </span>
                  </div>

                  <div>
                    <h1 className="text-sm sm:text-base font-semibold">
                      {item.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.storeName}
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
                      onClick={() => handleDecrease(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span className="text-sm">{item.quantity}</span>

                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 text-xs mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Cart is empty</p>
          )}
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
        <button className="w-full mt-5 bg-[#ff6e4a] text-white py-3 rounded-xl font-semibold hover:opacity-90">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;