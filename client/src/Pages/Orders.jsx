import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaClock,
  FaBoxOpen,
  FaTruck,
  FaLocationDot,
  FaArrowRight,
  FaRepeat,
} from "react-icons/fa6";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../api/fetchApi";
import Navbar from "../Components/Navbar";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // FETCH ORDERS
  // ================================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await API.get("/orders");

        console.log("Orders:", res.data);

        setOrders(res.data.orders || []);
      } catch (error) {
        console.log(
          "Failed to fetch orders:",
          error.response?.data || error.message
        );

        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ================================
  // STATUS HELPER
  // ================================
  const getStatusStep = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return 1;

      case "confirmed":
        return 2;

      case "preparing":
        return 3;

      case "out for delivery":
      case "out_for_delivery":
        return 4;

      case "delivered":
        return 5;

      default:
        return 1;
    }
  };

  // ================================
  // STATUS TEXT
  // ================================
  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Order placed";

      case "confirmed":
        return "Order confirmed";

      case "preparing":
        return "Being prepared";

      case "out for delivery":
      case "out_for_delivery":
        return "Out for delivery";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Order cancelled";

      default:
        return "Order placed";
    }
  };

  // ================================
  // STATUS COLOR
  // ================================
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-600";

      case "cancelled":
        return "bg-red-100 text-red-600";

      case "out for delivery":
      case "out_for_delivery":
        return "bg-blue-100 text-blue-600";

      case "preparing":
        return "bg-orange-100 text-orange-600";

      default:
        return "bg-[#ff6e4a]/10 text-[#ff6e4a]";
    }
  };

  // ================================
  // FORMAT DATE
  // ================================
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ================================
  // CANCEL ORDER
  // ================================
  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {
      await API.put(`/orders/${orderId}/cancel`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "cancelled" }
            : order
        )
      );
    } catch (error) {
      console.log(
        "Cancel order error:",
        error.response?.data || error.message
      );
    }
  };

  // ================================
  // REORDER
  // ================================
  const handleReorder = async (order) => {
    try {
      /*
        If your backend has a reorder endpoint,
        you can replace this with:

        await API.post(`/orders/${order._id}/reorder`);
      */

      console.log("Reorder:", order);

      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf1ee] px-4 sm:px-8 lg:px-16 py-8">
         <div className="sticky top-0 z-[100]">
        <Navbar />
      </div>
        <div className="max-w-7xl mx-auto">

          {/* HEADER SKELETON */}
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>

            <div className="h-4 w-72 bg-gray-200 rounded mt-3"></div>
          </div>

          {/* ORDER SKELETON */}
          <div className="mt-8 grid gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm animate-pulse"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded mt-2"></div>
                  </div>

                  <div className="h-7 w-24 bg-gray-200 rounded-full"></div>
                </div>

                <div className="mt-6 flex gap-4">
                  <div className="h-20 w-20 bg-gray-200 rounded-2xl"></div>

                  <div className="flex-1">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-3 w-28 bg-gray-200 rounded mt-3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  // ================================
  // EMPTY ORDERS
  // ================================
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf1ee] flex items-center justify-center px-5">

        <div className="text-center max-w-md">

          <div className="mx-auto h-28 w-28 rounded-full bg-white shadow-sm flex items-center justify-center">
            <FaBoxOpen className="text-5xl text-[#ff6e4a]" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#28282b] mt-6">
            No orders yet
          </h1>

          <p className="text-gray-500 mt-3">
            Looks like you haven't ordered anything yet.
            Discover something delicious and place your first order.
          </p>

          <button
            onClick={() => navigate("/explore")}
            className="mt-7 px-7 py-3 bg-[#ff6e4a] text-white rounded-2xl font-semibold hover:opacity-90 transition"
          >
            Explore Food
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf1ee] px-4 sm:px-8 lg:px-16 py-8 pb-24">
 <div className="sticky top-0 z-[100]">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto">

        {/* ========================================
            HEADER
        ======================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

          <div>
            <p className="text-[#ff6e4a] font-semibold text-sm">
              YOUR ORDERS
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#28282b] mt-1">
              My Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Track your orders and view your previous purchases.
            </p>
          </div>

          <button
            onClick={() => navigate("/explore")}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-white rounded-2xl shadow-sm font-semibold text-[#28282b] hover:shadow-md transition"
          >
            Order something
            <FaArrowRight className="text-sm" />
          </button>

        </div>

        {/* ========================================
            ORDERS
        ======================================== */}
        <div className="mt-8 grid gap-6">

          {orders.map((order) => {
            const currentStep = getStatusStep(order.status);

            const isCancelled =
              order.status?.toLowerCase() === "cancelled";

            const isDelivered =
              order.status?.toLowerCase() === "delivered";

            const canCancel =
              ["pending", "confirmed"].includes(
                order.status?.toLowerCase()
              );

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >

                {/* ====================================
                    ORDER HEADER
                ==================================== */}
                <div className="p-5 sm:p-6 border-b border-gray-100">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                      <div className="flex items-center gap-3">

                        <h2 className="font-bold text-lg">
                          Order #{order._id?.slice(-6)}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">

                      <p className="text-xs text-gray-500">
                        Total amount
                      </p>

                      <p className="text-xl font-bold text-[#28282b]">
                        ₹{Number(order.totalAmount || 0).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* ====================================
                    ORDER TRACKING
                ==================================== */}
                {!isCancelled && (
                  <div className="px-5 sm:px-8 py-7 bg-gray-50/60">

                    <div className="hidden sm:flex items-center justify-between relative">

                      {/* LINE */}
                      <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200"></div>

                      <div
                        className="absolute top-5 left-10 h-1 bg-[#ff6e4a] transition-all"
                        style={{
                          width: `calc(${Math.max(
                            0,
                            currentStep - 1
                          )} * 25% - 20px)`,
                        }}
                      ></div>

                      {/* STEP 1 */}
                      <OrderStep
                        active={currentStep >= 1}
                        icon={<FaCheck />}
                        title="Placed"
                      />

                      {/* STEP 2 */}
                      <OrderStep
                        active={currentStep >= 2}
                        icon={<FaCheck />}
                        title="Confirmed"
                      />

                      {/* STEP 3 */}
                      <OrderStep
                        active={currentStep >= 3}
                        icon={<IoRestaurantOutline />}
                        title="Preparing"
                      />

                      {/* STEP 4 */}
                      <OrderStep
                        active={currentStep >= 4}
                        icon={<FaTruck />}
                        title="On the way"
                      />

                      {/* STEP 5 */}
                      <OrderStep
                        active={currentStep >= 5}
                        icon={<FaCheck />}
                        title="Delivered"
                      />

                    </div>

                    {/* MOBILE STATUS */}
                    <div className="sm:hidden flex items-center gap-4">

                      <div className="h-12 w-12 rounded-full bg-[#ff6e4a] text-white flex items-center justify-center shrink-0">
                        {currentStep === 1 && <FaClock />}
                        {currentStep === 2 && <FaCheck />}
                        {currentStep === 3 && (
                          <IoRestaurantOutline />
                        )}
                        {currentStep === 4 && <FaTruck />}
                        {currentStep === 5 && <FaCheck />}
                      </div>

                      <div>
                        <p className="font-bold">
                          {getStatusText(order.status)}
                        </p>

                        <p className="text-sm text-gray-500">
                          We're keeping you updated.
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                {/* ====================================
                    CANCELLED
                ==================================== */}
                {isCancelled && (
                  <div className="px-5 sm:px-6 py-5 bg-red-50 flex items-center gap-4">

                    <div className="h-11 w-11 rounded-full bg-red-100 flex items-center justify-center">
                      <MdCancel className="text-2xl text-red-500" />
                    </div>

                    <div>
                      <p className="font-semibold text-red-600">
                        Order cancelled
                      </p>

                      <p className="text-sm text-red-500">
                        This order will not be delivered.
                      </p>
                    </div>

                  </div>
                )}

                {/* ====================================
                    ORDER ITEMS
                ==================================== */}
                <div className="p-5 sm:p-6">

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="font-bold text-lg">
                      Items
                    </h3>

                    <span className="text-sm text-gray-500">
                      {order.items?.length || 0} items
                    </span>

                  </div>

                  <div className="space-y-4">

                    {order.items?.map((item, index) => {

                      const food = item.foodId || item.food || item;

                      return (
                        <div
                          key={item._id || index}
                          className="flex items-center gap-4"
                        >

                          <img
                            src={food?.image || "/Images/Logo.png"}
                            alt={food?.name || "Food"}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/Images/Logo.png";
                            }}
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover bg-gray-100"
                          />

                          <div className="flex-1 min-w-0">

                            <h4 className="font-semibold truncate">
                              {food?.name || "Food item"}
                            </h4>

                            <p className="text-sm text-gray-500 mt-1">
                              Qty: {item.quantity || 1}
                            </p>

                          </div>

                          <p className="font-semibold">
                            ₹
                            {(
                              Number(food?.price || item.price || 0) *
                              Number(item.quantity || 1)
                            ).toFixed(2)}
                          </p>

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* ====================================
                    DELIVERY ADDRESS
                ==================================== */}
                {order.address && (
                  <div className="px-5 sm:px-6 pb-5">

                    <div className="bg-[#faf1ee] rounded-2xl p-4 flex gap-3">

                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0">
                        <FaLocationDot className="text-[#ff6e4a]" />
                      </div>

                      <div>
                        <p className="font-semibold">
                          Delivery address
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {order.address}
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                {/* ====================================
                    FOOTER ACTIONS
                ==================================== */}
                <div className="px-5 sm:px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">

                  {canCancel && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-5 py-3 rounded-xl border border-red-200 text-red-500 font-semibold hover:bg-red-50 transition"
                    >
                      Cancel order
                    </button>
                  )}

                  {isDelivered && (
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-5 py-3 rounded-xl border border-gray-200 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                      <FaRepeat />
                      Reorder
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate(`/orders/${order._id}`)
                    }
                    className="px-6 py-3 rounded-xl bg-[#ff6e4a] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    View details
                    <FaArrowRight className="text-sm" />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

// ================================================
// ORDER STEP COMPONENT
// ================================================
const OrderStep = ({ active, icon, title }) => {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2">

      <div
        className={`h-10 w-10 rounded-full flex items-center justify-center transition ${
          active
            ? "bg-[#ff6e4a] text-white"
            : "bg-white border-2 border-gray-200 text-gray-400"
        }`}
      >
        {icon}
      </div>

      <span
        className={`text-xs font-semibold ${
          active ? "text-[#28282b]" : "text-gray-400"
        }`}
      >
        {title}
      </span>

    </div>
  );
};

export default Orders;