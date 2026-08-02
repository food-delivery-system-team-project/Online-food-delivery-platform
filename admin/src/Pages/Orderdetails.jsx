import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { getOrderById, updateOrderStatus } from "../api";

const statusOptions = ["Preparing", "On the way", "Delivered", "Cancelled"];

export default function Orderdetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getOrderById(id).then((data) => {
      setOrder(data);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (status) => {
    setOrder((prev) => ({ ...prev, status }));
    setSaving(true);
    setSaved(false);
    await updateOrderStatus(id, status);
    setSaving(false);
    setSaved(true);
  };

  if (loading) {
    return <div className="card h-64 animate-pulse bg-ink-100/60" />;
  }

  if (!order) {
    return <div className="card text-center py-16 text-ink-500">Order not found.</div>;
  }

  return (
    <div className="animate-fadeIn space-y-6 max-w-4xl">
      <Link to="/orders" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-primary">
        <ArrowLeft size={16} /> Back to orders
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{order.id}</h1>
          <p className="text-ink-500 text-sm mt-1">Placed on {order.date}</p>
        </div>
        {saved && (
          <p className="flex items-center gap-1.5 text-sm text-green-600">
            <CheckCircle2 size={16} /> Status updated
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Items</h3>
            <div className="divide-y divide-ink-100">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-ink-800">{item.name}</p>
                    <p className="text-xs text-ink-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-medium text-ink-700">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-ink-100">
              <p className="font-semibold text-ink-900">Total</p>
              <p className="font-bold text-primary text-lg">₹{order.amount}</p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                    order.status === s
                      ? "bg-primary text-white shadow-soft"
                      : "bg-ink-50 text-ink-600 hover:bg-primary-50 hover:text-primary"
                  }`}
                >
                  {saving && order.status === s ? <Loader2 size={14} className="animate-spin inline mr-1" /> : null}
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Customer</h3>
            <p className="font-medium text-ink-800">{order.customer}</p>
            <div className="flex items-center gap-2 text-sm text-ink-500 mt-3">
              <Phone size={15} /> {order.phone}
            </div>
            <div className="flex items-start gap-2 text-sm text-ink-500 mt-2">
              <MapPin size={15} className="mt-0.5 shrink-0" /> {order.address}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Payment</h3>
            <div className="flex items-center gap-2 text-sm text-ink-600">
              <CreditCard size={15} /> {order.payment}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
