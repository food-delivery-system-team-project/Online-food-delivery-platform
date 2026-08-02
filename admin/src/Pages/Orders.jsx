import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { getOrders } from "../api";

const statusStyles = {
  Delivered: "bg-green-50 text-green-600",
  Preparing: "bg-amber-50 text-amber-600",
  "On the way": "bg-blue-50 text-blue-600",
  Cancelled: "bg-red-50 text-red-600",
};

const filters = ["All", "Preparing", "On the way", "Delivered", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">Saare orders yaha track karo.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
              filter === f
                ? "bg-primary text-white shadow-soft"
                : "border border-ink-100 bg-white text-ink-700 hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-left text-ink-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
              <th className="py-3 px-5 font-medium">Order ID</th>
              <th className="py-3 px-5 font-medium">Customer</th>
              <th className="py-3 px-5 font-medium">Date</th>
              <th className="py-3 px-5 font-medium">Amount</th>
              <th className="py-3 px-5 font-medium">Status</th>
              <th className="py-3 px-5 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-5 py-4">
                      <div className="h-6 rounded bg-ink-100/70 animate-pulse" />
                    </td>
                  </tr>
                ))
              : filtered.map((o) => (
                  <tr key={o.id} className="table-row-hover border-b border-ink-100/60 last:border-0">
                    <td className="py-3 px-5 font-medium text-ink-800 dark:text-slate-100">{o.id}</td>
                    <td className="py-3 px-5 text-ink-700 dark:text-slate-200">{o.customer}</td>
                    <td className="py-3 px-5 text-ink-600 dark:text-slate-300">{o.date}</td>
                    <td className="py-3 px-5 text-ink-700 dark:text-slate-200">₹{o.amount}</td>
                    <td className="py-3 px-5">
                      <span className={`badge ${statusStyles[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Link
                        to={`/orders/${o.id}`}
                        className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                      >
                        <Eye size={15} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center text-ink-600 dark:text-slate-300">No orders in this category.</div>
        )}
      </div>
    </div>
  );
}
