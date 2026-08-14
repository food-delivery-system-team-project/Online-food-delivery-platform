import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaLocationDot,
  FaCreditCard,
  FaMoneyBillWave,
  FaTag,
  FaChevronLeft,
} from "react-icons/fa6";
import { BsShieldCheck } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import API from "../api/fetchApi";

const Checkout = () => {
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // =========================
  // PRICE CALCULATIONS
  // =========================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const deliveryFee = subtotal >= 299 || subtotal === 0 ? 0 : 40;

  const discount = promoApplied ? Math.min(subtotal * 0.1, 100) : 0;

  const total = subtotal + deliveryFee - discount;

  // =========================
  // ADDRESS HANDLER
  // =========================

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PROMO
  // =========================

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "WELCOME10") {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
      alert("Invalid promo code");
    }
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.pincode
    ) {
      alert("Please complete your delivery address");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        items: cartItems.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),

        address,

        paymentMethod,

        subtotal,
        deliveryFee,
        discount,
        total,
      };

      console.log("Order:", orderData);

      /*
        Change this endpoint if your backend
        uses another order route.
      */

      await API.post("/orders", orderData);

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.error(
        "Order failed:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while placing your order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf1ee] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 text-center max-w-md w-full">

          <div className="h-20 w-20 mx-auto rounded-full bg-[#ff6e4a]/10 flex items-center justify-center">
            <IoBagHandleOutline className="text-4xl text-[#ff6e4a]" />
          </div>

          <h1 className="text-2xl font-bold text-[#28282B] mt-5">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-2">
            Add some delicious food before checking out.
          </p>

          <button
            onClick={() => navigate("/explore")}
            className="mt-6 w-full bg-[#ff6e4a] text-white py-3 rounded-xl font-semibold hover:bg-[#f45d3a] transition"
          >
            Explore Foods
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf1ee]">

      {/* =========================
          HEADER
      ========================= */}

      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ff6e4a] transition"
          >
            <FaChevronLeft />
            <span className="font-medium">
              Back to Cart
            </span>
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl font-bold text-[#28282B]">
            Checkout
          </h1>

        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">

          {/* =================================
              LEFT SIDE
          ================================= */}

          <div className="space-y-6">

            {/* DELIVERY ADDRESS */}

            <section className="bg-white rounded-3xl shadow-sm p-5 sm:p-7">

              <div className="flex items-center gap-3 mb-6">

                <div className="h-10 w-10 rounded-full bg-[#ff6e4a]/10 flex items-center justify-center">
                  <FaLocationDot className="text-[#ff6e4a]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#28282B]">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-gray-500">
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* NAME */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    placeholder="Enter your name"
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff6e4a] focus:ring-2 focus:ring-[#ff6e4a]/10"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    placeholder="Enter phone number"
                    type="tel"
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff6e4a] focus:ring-2 focus:ring-[#ff6e4a]/10"
                  />
                </div>

                {/* ADDRESS */}

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={address.address}
                    onChange={handleAddressChange}
                    placeholder="House no., street, landmark..."
                    rows="3"
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none resize-none focus:border-[#ff6e4a] focus:ring-2 focus:ring-[#ff6e4a]/10"
                  />
                </div>

                {/* CITY */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    placeholder="City"
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff6e4a]"
                  />
                </div>

                {/* PINCODE */}

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Pincode
                  </label>

                  <input
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    placeholder="Pincode"
                    inputMode="numeric"
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff6e4a]"
                  />
                </div>

              </div>

            </section>

            {/* PAYMENT */}

            <section className="bg-white rounded-3xl shadow-sm p-5 sm:p-7">

              <div className="flex items-center gap-3 mb-6">

                <div className="h-10 w-10 rounded-full bg-[#ff6e4a]/10 flex items-center justify-center">
                  <FaCreditCard className="text-[#ff6e4a]" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#28282B]">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500">
                    Choose how you want to pay
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                {/* COD */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition ${
                    paymentMethod === "cod"
                      ? "border-[#ff6e4a] bg-[#ff6e4a]/5"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <FaMoneyBillWave className="text-green-600" />
                    </div>

                    <div className="text-left">
                      <p className="font-semibold">
                        Cash on Delivery
                      </p>

                      <p className="text-xs text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>

                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod"
                        ? "border-[#ff6e4a]"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="h-2.5 w-2.5 bg-[#ff6e4a] rounded-full" />
                    )}
                  </div>

                </button>

                {/* ONLINE */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("online")}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition ${
                    paymentMethod === "online"
                      ? "border-[#ff6e4a] bg-[#ff6e4a]/5"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <FaCreditCard className="text-blue-500" />
                    </div>

                    <div className="text-left">
                      <p className="font-semibold">
                        Online Payment
                      </p>

                      <p className="text-xs text-gray-500">
                        UPI, Card or Net Banking
                      </p>
                    </div>

                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "online"
                        ? "border-[#ff6e4a]"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "online" && (
                      <div className="h-2.5 w-2.5 bg-[#ff6e4a] rounded-full" />
                    )}
                  </div>

                </button>

              </div>

            </section>

            {/* PROMO */}

            <section className="bg-white rounded-3xl shadow-sm p-5 sm:p-7">

              <div className="flex items-center gap-3 mb-4">

                <div className="h-10 w-10 rounded-full bg-[#ff6e4a]/10 flex items-center justify-center">
                  <FaTag className="text-[#ff6e4a]" />
                </div>

                <div>
                  <h2 className="font-bold">
                    Apply Promo Code
                  </h2>

                  <p className="text-sm text-gray-500">
                    Save more on your order
                  </p>
                </div>

              </div>

              <div className="flex gap-2">

                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff6e4a] uppercase"
                />

                <button
                  type="button"
                  onClick={handlePromo}
                  className="px-5 py-3 bg-[#28282B] text-white rounded-xl font-semibold hover:bg-black transition"
                >
                  Apply
                </button>

              </div>

              {promoApplied && (
                <p className="text-green-600 text-sm mt-3">
                  ✓ WELCOME10 applied — 10% discount added
                </p>
              )}

            </section>

          </div>

          {/* =================================
              RIGHT SIDE
          ================================= */}

          <aside className="lg:sticky lg:top-6 h-fit">

            <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-7">

              <h2 className="text-xl font-bold text-[#28282B] mb-5">
                Order Summary
              </h2>

              {/* CART ITEMS */}

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3"
                  >

                    <div className="relative shrink-0">

                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/Images/Logo.png";
                        }}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-[#28282B] text-white text-xs flex items-center justify-center">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-semibold text-sm truncate">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold text-sm">
                      ₹{(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>
                ))}

              </div>

              <div className="border-t border-gray-100 my-5" />

              {/* PRICES */}

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Delivery Fee
                  </span>

                  <span
                    className={
                      deliveryFee === 0
                        ? "text-green-600 font-medium"
                        : "font-medium"
                    }
                  >
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Promo Discount
                    </span>

                    <span>
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}

              </div>

              <div className="border-t border-dashed border-gray-200 my-5" />

              {/* TOTAL */}

              <div className="flex justify-between items-end">

                <div>
                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="text-2xl font-bold text-[#28282B]">
                    ₹{total.toFixed(2)}
                  </p>
                </div>

                <span className="text-xs text-green-600 font-medium">
                  Inclusive of taxes
                </span>

              </div>

              {/* CHECKOUT */}

              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full mt-6 bg-[#ff6e4a] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#f45d3a] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {placingOrder
                  ? "Placing Order..."
                  : `Place Order • ₹${total.toFixed(2)}`}
              </button>

              {/* SECURITY */}

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <BsShieldCheck className="text-green-500 text-lg" />
                Secure & safe checkout
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default Checkout;