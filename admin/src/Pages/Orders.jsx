import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, RefreshCw } from "lucide-react";
import axios from "../api/axios";

const statusStyles = {
  pending: "bg-amber-50 text-amber-600",
  preparing: "bg-amber-50 text-amber-600",
  "on the way": "bg-blue-50 text-blue-600",
  delivered: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-600",
};

const filters = [
  { label: "All", value: "All" },
  { label: "Pending", value: "pending" },
  { label: "Preparing", value: "preparing" },
  { label: "On the way", value: "on the way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // GET ALL ORDERS
  // ==============================
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get("/admin/all/orders");

      console.log("Orders API response:", response.data);

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else if (Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Get orders error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==============================
  // FILTER ORDERS
  // ==============================
  const filtered = useMemo(() => {
    if (filter === "All") {
      return orders;
    }

    return orders.filter(
      (order) =>
        order.status?.toLowerCase() === filter.toLowerCase(),
    );
  }, [orders, filter]);

  // ==============================
  // FORMAT DATE
  // ==============================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==============================
  // FORMAT AMOUNT
  // ==============================
  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // ==============================
  // FORMAT STATUS
  // ==============================
  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ");
  };

  return (
    <div className="animate-fadeIn space-y-6">
      {/* ==============================
          HEADER
      ============================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            Order management
          </p>

          <h1 className="page-heading mt-1">
            Orders
          </h1>

          <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
            Saare orders yaha track karo.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />

          Refresh
        </button>
      </div>

      {/* ==============================
          FILTERS
      ============================== */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 ${
              filter === item.value
                ? "bg-primary text-white shadow-soft"
                : "border border-ink-100 bg-white text-ink-700 hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ==============================
          ERROR
      ============================== */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          <span>{error}</span>

          <button
            onClick={fetchOrders}
            className="font-bold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* ==============================
          ORDER TABLE
      ============================== */}
      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[950px] text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-left text-ink-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
              <th className="px-5 py-3 font-medium">
                Order ID
              </th>

              <th className="px-5 py-3 font-medium">
                Customer
              </th>

              <th className="px-5 py-3 font-medium">
                Items
              </th>

              <th className="px-5 py-3 font-medium">
                Location
              </th>

              <th className="px-5 py-3 font-medium">
                Date
              </th>

              <th className="px-5 py-3 font-medium">
                Amount
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={8} className="px-5 py-4">
                    <div className="h-8 animate-pulse rounded-lg bg-ink-100/70 dark:bg-slate-800" />
                  </td>
                </tr>
              ))}

            {/* ORDERS */}
            {!loading &&
              filtered.map((order) => {
                const status =
                  order.status?.toLowerCase() || "pending";

                return (
                  <tr
                    key={order._id}
                    className="table-row-hover border-b border-ink-100/60 last:border-0 dark:border-slate-800"
                  >
                    {/* ORDER ID */}
                    <td className="px-5 py-4">
                      <p className="font-bold text-ink-800 dark:text-slate-100">
                        #{order._id?.slice(-6)}
                      </p>

                      <p className="mt-0.5 text-[11px] text-ink-400">
                        {order._id}
                      </p>
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-ink-800 dark:text-slate-100">
                          {order.user?.name || "Customer"}
                        </p>

                        <p className="mt-0.5 text-xs text-ink-500 dark:text-slate-400">
                          {order.user?.email || "No email"}
                        </p>
                      </div>
                    </td>

                    {/* ITEMS */}
                    <td className="px-5 py-4">
                      <div className="max-w-[220px] space-y-1">
                        {order.items?.length ? (
                          order.items.map((item, index) => (
                            <div
                              key={item._id || index}
                              className="flex items-center gap-2"
                            >
                              <span className="font-medium text-ink-700 dark:text-slate-200">
                                {item.name}
                              </span>

                              <span className="text-xs text-ink-500 dark:text-slate-400">
                                × {item.quantity}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-ink-500">
                            No items
                          </span>
                        )}
                      </div>
                    </td>

                    {/* LOCATION */}
                    <td className="px-5 py-4 text-ink-600 dark:text-slate-300">
                      {order.location || "N/A"}
                    </td>

                    {/* DATE */}
                    <td className="px-5 py-4 text-ink-600 dark:text-slate-300">
                      {formatDate(order.createdAt)}
                    </td>

                    {/* AMOUNT */}
                    <td className="px-5 py-4 font-bold text-ink-800 dark:text-slate-100">
                      ₹{formatAmount(order.totalAmount)}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`badge ${
                          statusStyles[status] ||
                          "bg-slate-50 text-slate-600"
                        }`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/orders/${order._id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        <Eye size={15} />
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* EMPTY */}
        {!loading && filtered.length === 0 && !error && (
          <div className="py-16 text-center">
            <p className="font-semibold text-ink-700 dark:text-slate-200">
              No orders found
            </p>

            <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
              No orders in the selected category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}