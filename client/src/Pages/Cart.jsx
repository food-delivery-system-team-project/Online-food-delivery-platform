import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  setCart,
} from "../Features/cartSlice";
import API from "../api/fetchApi";

import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiX,
  FiShoppingBag,
  FiArrowRight,
  FiTag,
} from "react-icons/fi";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // ============================
  // FETCH CART
  // ============================
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await API.get("/cart");

        const formatted = res.data.cart.map((item) => ({
          _id: item.foodId._id,
          name: item.foodId.name,
          price: Number(item.foodId.price),
          image: item.foodId.image,
          storeName: item.foodId.storeName,
          quantity: item.quantity,
        }));

        dispatch(setCart(formatted));
      } catch (err) {
        console.log(
          "Cart error:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch]);

  // ============================
  // INCREASE
  // ============================
  const handleIncrease = async (id) => {
    try {
      dispatch(increaseQty(id));

      await API.put(`/cart/${id}`, {
        action: "inc",
      });
    } catch (err) {
      console.log(err);

      // Optional: refresh cart if API fails
    }
  };

  // ============================
  // DECREASE
  // ============================
  const handleDecrease = async (id) => {
    try {
      const item = cartItems.find(
        (item) => item._id === id
      );

      if (item?.quantity <= 1) {
        await handleRemove(id);
        return;
      }

      dispatch(decreaseQty(id));

      await API.put(`/cart/${id}`, {
        action: "dec",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // REMOVE
  // ============================
  const handleRemove = async (id) => {
    try {
      dispatch(removeFromCart(id));

      await API.delete(`/cart/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // CLEAR CART
  // ============================
  const handleClearCart = async () => {
    try {
      // If your backend has a clear-cart API,
      // use it here.

      for (const item of cartItems) {
        await API.delete(`/cart/${item._id}`);
      }

      dispatch(setCart([]));
    } catch (err) {
      console.log(err);
    }
  };

  // ============================
  // CALCULATIONS
  // ============================
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = 0;

  const total = Math.max(
    0,
    subtotal + shipping - discount
  );

  // ============================
  // PROMO CODE
  // ============================
  const handlePromo = () => {
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoMessage("Please enter a promo code");
      setDiscount(0);
      return;
    }

    // Demo promo code
    if (code === "FOOD10") {
      const discountAmount = subtotal * 0.1;

      setDiscount(discountAmount);
      setPromoMessage("10% discount applied 🎉");
    } else {
      setDiscount(0);
      setPromoMessage("Invalid promo code");
    }
  };

  // ============================
  // CHECKOUT
  // ============================
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    console.log({
      items: cartItems,
      subtotal,
      discount,
      shipping,
      total,
    });

    // Navigate to checkout page here
    // navigate("/checkout");
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf4f1] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#ff6e4a]/30 border-t-[#ff6e4a] rounded-full animate-spin" />

          <p className="text-gray-500">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf4f1] px-4 py-6 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* ============================
            HEADER
        ============================ */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#ff6e4a] text-white flex items-center justify-center">
              <FiShoppingBag className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#252525]">
                Your Cart
              </h1>

              <p className="text-sm text-gray-500">
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "product"
                  : "products"}{" "}
                in your cart
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="self-start sm:self-auto flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition"
            >
              <FiX />
              Clear cart
            </button>
          )}
        </div>

        {/* ============================
            EMPTY CART
        ============================ */}
        {cartItems.length === 0 ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">

              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[#fff0eb] flex items-center justify-center">
                <FiShoppingBag className="text-3xl text-[#ff6e4a]" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mt-2">
                Looks like you haven't added anything
                to your cart yet.
              </p>

              <button
                onClick={() => window.history.back()}
                className="mt-6 bg-[#ff6e4a] hover:bg-[#f45d38] text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* ============================
             MAIN GRID
          ============================ */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

            {/* ============================
                LEFT - PRODUCTS
            ============================ */}
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-6">

              {/* Section header */}
              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Cart Items
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Review your selected food
                  </p>
                </div>

                <span className="hidden sm:flex bg-[#fff0eb] text-[#ff6e4a] px-3 py-1 rounded-full text-sm font-semibold">
                  {cartItems.length} items
                </span>
              </div>

              {/* ============================
                  PRODUCT LIST
              ============================ */}
              <div className="flex flex-col gap-3">

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="group border border-gray-100 rounded-2xl p-3 sm:p-4 hover:border-[#ff6e4a]/30 hover:shadow-sm transition"
                  >

                    <div className="flex items-center gap-3 sm:gap-4">

                      {/* IMAGE */}
                      <div className="relative flex-shrink-0">

                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#f5f1ef] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/Images/Logo.png";
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Quantity badge */}
                        <span className="absolute -top-2 -right-2 min-w-6 h-6 px-1 rounded-full bg-[#ff6e4a] text-white text-xs font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>

                      {/* PRODUCT INFO */}
                      <div className="flex-1 min-w-0">

                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                          {item.name}
                        </h3>

                        {item.storeName && (
                          <p className="text-xs sm:text-sm text-gray-400 mt-1 truncate">
                            {item.storeName}
                          </p>
                        )}

                        <p className="text-xs text-gray-400 mt-1">
                          ${Number(item.price).toFixed(2)} each
                        </p>

                        {/* QUANTITY CONTROLS */}
                        <div className="flex items-center gap-2 mt-3">

                          <button
                            onClick={() =>
                              handleDecrease(item._id)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#fff0eb] hover:text-[#ff6e4a] transition"
                          >
                            <FiMinus className="text-xs" />
                          </button>

                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleIncrease(item._id)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#fff0eb] hover:text-[#ff6e4a] transition"
                          >
                            <FiPlus className="text-xs" />
                          </button>

                        </div>
                      </div>

                      {/* PRICE + REMOVE */}
                      <div className="flex flex-col items-end justify-between self-stretch">

                        <p className="font-bold text-gray-800 text-sm sm:text-base whitespace-nowrap">
                          $
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </p>

                        <button
                          onClick={() =>
                            handleRemove(item._id)
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                          title="Remove"
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                    </div>
                  </div>
                ))}

              </div>
            </section>

            {/* ============================
                RIGHT - SUMMARY
            ============================ */}
            <aside className="lg:sticky lg:top-6">

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

                {/* PROMO */}
                <div className="p-5 sm:p-6 bg-[#f7f5fa]">

                  <div className="flex items-center gap-2 mb-4">
                    <FiTag className="text-[#ff6e4a]" />

                    <h2 className="font-bold text-gray-800">
                      Promo Code
                    </h2>
                  </div>

                  <div className="flex bg-white border border-gray-200 rounded-full p-1">

                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handlePromo();
                        }
                      }}
                      placeholder="Enter promo code"
                      className="flex-1 min-w-0 px-4 py-2 text-sm outline-none bg-transparent"
                    />

                    <button
                      onClick={handlePromo}
                      className="bg-[#ff6e4a] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#f45d38] transition"
                    >
                      Apply
                    </button>
                  </div>

                  {promoMessage && (
                    <p
                      className={`text-xs mt-2 ${
                        discount > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* SUMMARY */}
                <div className="p-5 sm:p-6">

                  <h2 className="text-xl font-bold text-gray-800 mb-5">
                    Order Summary
                  </h2>

                  <div className="flex flex-col gap-3 text-sm">

                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span className="text-gray-800 font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>
                          -${discount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-500">
                      <span>Shipping</span>

                      <span className="text-green-600 font-medium">
                        Free
                      </span>
                    </div>

                  </div>

                  {/* DIVIDER */}
                  <div className="border-t border-gray-100 my-5" />

                  {/* TOTAL */}
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-sm text-gray-400">
                        Total
                      </p>

                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        ${total.toFixed(2)}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#fff0eb] flex items-center justify-center">
                      <FiShoppingBag className="text-[#ff6e4a]" />
                    </div>

                  </div>

                  {/* CHECKOUT */}
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-[#ff6e4a] hover:bg-[#f45d38] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    Continue to Checkout
                    <FiArrowRight />
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-3">
                    Secure checkout • Free shipping
                  </p>

                </div>
              </div>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;