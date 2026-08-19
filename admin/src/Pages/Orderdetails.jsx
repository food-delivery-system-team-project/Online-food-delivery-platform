import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  CreditCard,
  Loader2,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { io } from "socket.io-client";
import api from "../api/axios";

const statusOptions = [
  "pending",
  "preparing",
  "on the way",
  "delivered",
  "cancelled",
];

const statusLabels = {
  pending: "Pending",
  preparing: "Preparing",
  "on the way": "On the way",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusStyles = {
  pending: "bg-slate-100 text-slate-700",
  preparing: "bg-amber-50 text-amber-700",
  "on the way": "bg-blue-50 text-blue-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-600",
};

export default function Orderdetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/admin/orders/${id}`);

        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);

        setError(
          error.response?.data?.message || "Failed to load order.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Socket.IO - listen for order status changes
  useEffect(() => {
    if (!id) return;

    // Change this to your backend URL if needed
    const socket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:8000",
      {
        withCredentials: true,
      },
    );

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      // Join this particular order room
      socket.emit("joinOrder", id);
    });

    // Backend should emit this event when order status changes
    socket.on("orderStatusUpdated", (updatedOrder) => {
      console.log("Order status updated:", updatedOrder);

      // Make sure this event belongs to the current order
      if (
        updatedOrder?._id === id ||
        updatedOrder?.orderId === id
      ) {
        setOrder((previous) => {
          if (!previous) return previous;

          return {
            ...previous,
            ...updatedOrder,
          };
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.emit("leaveOrder", id);
      socket.disconnect();
    };
  }, [id]);

  // Update order status
  const handleStatusChange = async (status) => {
    if (!order || saving) return;

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      // Optimistic UI update
      setOrder((previous) => ({
        ...previous,
        status,
      }));

      // Your backend update endpoint
      const response = await api.put(`/admin/orderUpdate/${id}`, {
        status,
      });

      console.log("Updated order:", response.data);

      // Use backend response as source of truth
      if (response.data) {
        setOrder((previous) => ({
          ...previous,
          ...response.data,
        }));
      }

      setSaved(true);
    } catch (error) {
      console.error("Failed to update order:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update order status.",
      );

      // Reload the original order if update failed
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (fetchError) {
        console.error(fetchError);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="card h-64 animate-pulse bg-ink-100/60 dark:bg-slate-800" />
    );
  }

  if (error && !order) {
    return (
      <div className="card py-16 text-center">
        <p className="text-red-500">{error}</p>

        <Link
          to="/orders"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft size={16} />
          Back to orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="card py-16 text-center text-ink-500">
        Order not found.
      </div>
    );
  }

  const customer =
    typeof order.user === "object" && order.user !== null
      ? order.user
      : null;

  const customerName =
    order.customerName ||
    customer?.name ||
    "Customer";

  const customerEmail =
    order.customerEmail ||
    customer?.email ||
    "No email available";

  const customerPhone =
    order.phone ||
    customer?.phone ||
    "No phone available";

  const location =
    order.location ||
    "No location available";

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date unavailable";

  const currentStatus =
    String(order.status || "pending").toLowerCase();

  return (
    <div className="mx-auto max-w-4xl animate-fadeIn space-y-6">
      {/* BACK */}
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-primary dark:text-slate-400"
      >
        <ArrowLeft size={16} />
        Back to orders
      </Link>

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            Order details
          </p>

          <h1 className="mt-1 text-2xl font-bold text-ink-900 dark:text-slate-100">
            #{order._id}
          </h1>

          <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
            Placed on {orderDate}
          </p>
        </div>

        <div
          className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
            statusStyles[currentStatus] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          {statusLabels[currentStatus] || order.status}
        </div>
      </div>

      {/* SUCCESS */}
      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <CheckCircle2 size={17} />
          Order status updated successfully.
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* ITEMS */}
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-ink-900 dark:text-slate-100">
                Items
              </h3>

              <span className="text-xs font-semibold text-ink-500 dark:text-slate-400">
                {order.items?.length || 0} item
                {order.items?.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="divide-y divide-ink-100 dark:divide-slate-800">
              {order.items?.map((item) => {
                const quantity = Number(item.quantity || 0);
                const price = Number(item.price || 0);

                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="font-medium text-ink-800 dark:text-slate-100">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-ink-500 dark:text-slate-400">
                        ₹{price} × {quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-ink-800 dark:text-slate-100">
                      ₹{price * quantity}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* TOTAL */}
            <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-4 dark:border-slate-800">
              <p className="font-semibold text-ink-900 dark:text-slate-100">
                Total
              </p>

              <p className="text-xl font-bold text-primary">
                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* UPDATE STATUS */}
          <div className="card">
            <h3 className="mb-4 font-semibold text-ink-900 dark:text-slate-100">
              Update Status
            </h3>

            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => {
                const isActive = currentStatus === status;

                return (
                  <button
                    key={status}
                    type="button"
                    disabled={saving}
                    onClick={() => handleStatusChange(status)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-primary text-white shadow-soft"
                        : "bg-ink-50 text-ink-600 hover:bg-primary-50 hover:text-primary dark:bg-slate-800 dark:text-slate-300"
                    } ${
                      saving
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    {saving && isActive && (
                      <Loader2
                        size={14}
                        className="mr-1 inline animate-spin"
                      />
                    )}

                    {statusLabels[status]}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-ink-500 dark:text-slate-400">
              Status changes are synchronized with the server in real time.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* CUSTOMER */}
          <div className="card">
            <h3 className="mb-4 font-semibold text-ink-900 dark:text-slate-100">
              Customer
            </h3>

            <p className="font-medium text-ink-800 dark:text-slate-100">
              {customerName}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-ink-500 dark:text-slate-400">
              <Mail size={15} />
              <span className="break-all">{customerEmail}</span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-ink-500 dark:text-slate-400">
              <Phone size={15} />
              {customerPhone}
            </div>

            <div className="mt-2 flex items-start gap-2 text-sm text-ink-500 dark:text-slate-400">
              <MapPin
                size={15}
                className="mt-0.5 shrink-0"
              />

              <span>{location}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="card">
            <h3 className="mb-4 font-semibold text-ink-900 dark:text-slate-100">
              Payment
            </h3>

            <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-slate-300">
              <CreditCard size={15} />

              {order.paymentMethod ||
                order.payment ||
                "Not specified"}
            </div>
          </div>

          {/* ORDER INFO */}
          <div className="card">
            <h3 className="mb-4 font-semibold text-ink-900 dark:text-slate-100">
              Order information
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-ink-500 dark:text-slate-400">
                  Order ID
                </span>

                <span className="max-w-[180px] truncate font-medium text-ink-800 dark:text-slate-200">
                  {order._id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-ink-500 dark:text-slate-400">
                  Status
                </span>

                <span className="font-medium capitalize text-ink-800 dark:text-slate-200">
                  {currentStatus}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-ink-500 dark:text-slate-400">
                  Items
                </span>

                <span className="font-medium text-ink-800 dark:text-slate-200">
                  {order.items?.length || 0}
                </span>
              </div>

              <div className="flex justify-between border-t border-ink-100 pt-3 dark:border-slate-800">
                <span className="font-semibold text-ink-700 dark:text-slate-300">
                  Total
                </span>

                <span className="font-bold text-primary">
                  ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}