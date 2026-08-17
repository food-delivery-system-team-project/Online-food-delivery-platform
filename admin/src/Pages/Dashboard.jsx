import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BellRing,
  IndianRupee,
  LayoutDashboard,
  PackageCheck,
  Plus,
  ShoppingBag,
  Users,
  Clock3,
} from "lucide-react";

import api from "../api/axios";

const statusStyles = {
  delivered: "bg-emerald-50 text-emerald-700",
  preparing: "bg-amber-50 text-amber-700",
  "on the way": "bg-sky-50 text-sky-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-600",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("adminDb/dashboard");

        console.log("Dashboard API:", response.data);

        setStats(response.data);
      } catch (error) {
        console.error(
          "Dashboard error:",
          error.response?.data || error.message,
        );

        setError(
          error.response?.data?.message ||
            "Unable to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const orderStats = useMemo(() => {
    const orders = stats?.recentOrders || [];

    let delivered = 0;
    let preparing = 0;
    let pending = 0;
    let cancelled = 0;

    orders.forEach((order) => {
      const status = String(order.status || "").toLowerCase();

      if (status === "delivered") {
        delivered++;
      } else if (status === "preparing") {
        preparing++;
      } else if (status === "pending") {
        pending++;
      } else if (status === "cancelled") {
        cancelled++;
      }
    });

    return {
      delivered,
      preparing,
      pending,
      cancelled,
    };
  }, [stats]);

  const cards = stats
    ? [
        {
          label: "Total revenue",
          value: `₹${Number(stats.totalRevenue || 0).toLocaleString("en-IN")}`,
          icon: IndianRupee,
          iconClass: "bg-primary/10 text-primary",
        },
        {
          label: "Total orders",
          value: Number(stats.totalOrders || 0).toLocaleString("en-IN"),
          icon: ShoppingBag,
          iconClass: "bg-violet-50 text-violet-600",
        },
        {
          label: "Total users",
          value: Number(stats.totalUsers || 0).toLocaleString("en-IN"),
          icon: Users,
          iconClass: "bg-sky-50 text-sky-600",
        },
        {
          label: "Pending orders",
          value: Number(stats.pendingOrders || 0).toLocaleString("en-IN"),
          icon: PackageCheck,
          iconClass: "bg-amber-50 text-amber-600",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="space-y-5">
        <section className="dashboard-hero animate-pulse rounded-3xl p-7">
          <div className="h-8 w-64 rounded bg-white/20" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-white/20" />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="card h-36 animate-pulse bg-ink-100/60 dark:bg-slate-800"
            />
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-12">
          <div className="card h-96 animate-pulse 2xl:col-span-8" />
          <div className="card h-96 animate-pulse 2xl:col-span-4" />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 className="font-bold text-red-700">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-shell animate-fadeIn space-y-5">

      {/* HERO */}
      <section className="dashboard-hero overflow-hidden rounded-3xl p-5 text-white sm:p-7">
        <div className="dashboard-hero-orb" />

        <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
              Live restaurant operations
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Control centre
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
              Monitor your restaurant users, orders, revenue and pending
              orders from one admin workspace.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Link
              to="/add-food"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-ink-900 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Plus size={17} />
              Add food
            </Link>

            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <PackageCheck size={17} />
              Manage orders
            </Link>
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {cards.map(
          ({ label, value, icon: Icon, iconClass }) => (
            <article
              key={label}
              className="metric-card card group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-ink-500 dark:text-slate-400">
                    {label}
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-900 dark:text-slate-100">
                    {value}
                  </h2>
                </div>

                <span
                  className={`grid h-11 w-11 place-items-center rounded-2xl ${iconClass} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={20} />
                </span>
              </div>

              <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={14} />
                Live data
              </p>
            </article>
          ),
        )}
      </section>

      {/* ORDER SUMMARY */}
      <section className="grid grid-cols-1 gap-5 2xl:grid-cols-12">

        {/* REVENUE */}
        <article className="card 2xl:col-span-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">
                Revenue
              </p>

              <h2 className="mt-1 text-lg font-bold text-ink-900 dark:text-slate-100">
                Total revenue
              </h2>

              <p className="text-xs text-ink-500 dark:text-slate-400">
                Revenue calculated from all orders.
              </p>
            </div>

            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary">
              <IndianRupee size={18} />
            </span>
          </div>

          <div className="mt-8">
            <p className="text-4xl font-extrabold tracking-tight text-ink-900 dark:text-slate-100">
              ₹
              {Number(stats?.totalRevenue || 0).toLocaleString(
                "en-IN",
              )}
            </p>

            <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
              Total revenue generated from orders.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
              <p className="text-xs text-emerald-600">
                Delivered
              </p>

              <p className="mt-1 text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {orderStats.delivered}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 dark:bg-amber-500/10">
              <p className="text-xs text-amber-600">
                Preparing
              </p>

              <p className="mt-1 text-2xl font-bold text-amber-700 dark:text-amber-300">
                {orderStats.preparing}
              </p>
            </div>

            <div className="rounded-2xl bg-sky-50 p-4 dark:bg-sky-500/10">
              <p className="text-xs text-sky-600">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold text-sky-700 dark:text-sky-300">
                {orderStats.pending}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-4 dark:bg-red-500/10">
              <p className="text-xs text-red-600">
                Cancelled
              </p>

              <p className="mt-1 text-2xl font-bold text-red-700 dark:text-red-300">
                {orderStats.cancelled}
              </p>
            </div>

          </div>
        </article>

        {/* ORDER HEALTH */}
        <article className="card 2xl:col-span-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">
                Orders
              </p>

              <h2 className="mt-1 text-lg font-bold text-ink-900 dark:text-slate-100">
                Order health
              </h2>
            </div>

            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary">
              <LayoutDashboard size={18} />
            </span>
          </div>

          <div className="mt-6 space-y-4">

            <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
              <span className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Delivered
              </span>

              <strong>{orderStats.delivered}</strong>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4 dark:bg-amber-500/10">
              <span className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Preparing
              </span>

              <strong>{orderStats.preparing}</strong>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-sky-50 p-4 dark:bg-sky-500/10">
              <span className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Pending
              </span>

              <strong>{orderStats.pending}</strong>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
              <span className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Cancelled
              </span>

              <strong>{orderStats.cancelled}</strong>
            </div>

          </div>

          <Link
            to="/orders"
            className="mt-5 flex items-center justify-between rounded-xl bg-ink-50 px-4 py-3 text-sm font-bold text-ink-700 transition hover:bg-primary-50 hover:text-primary dark:bg-slate-800 dark:text-slate-200"
          >
            <span>Open order board</span>
            <ArrowUpRight size={16} />
          </Link>
        </article>
      </section>

      {/* RECENT ORDERS */}
      <section className="grid grid-cols-1 gap-5 2xl:grid-cols-12">

        <article className="card overflow-x-auto 2xl:col-span-8">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold dark:text-slate-100">
                Recent orders
              </h2>

              <p className="text-xs text-ink-500 dark:text-slate-400">
                Latest 5 orders from your restaurant.
              </p>
            </div>

            <Link
              to="/orders"
              className="text-sm font-bold text-primary hover:underline"
            >
              See all orders
            </Link>
          </div>

          {stats?.recentOrders?.length ? (
            <table className="w-full min-w-[650px] text-sm">

              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-semibold uppercase tracking-wide text-ink-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-3">Order</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>

              <tbody>
                {stats.recentOrders.map((order) => {
                  const status = String(
                    order.status || "pending",
                  ).toLowerCase();

                  return (
                    <tr
                      key={order._id}
                      className="table-row-hover border-b border-ink-100/70 last:border-0 dark:border-slate-800"
                    >
                      <td className="py-3.5 font-bold text-ink-800 dark:text-slate-100">
                        #{order._id?.slice(-6)}
                      </td>

                      <td className="py-3.5 text-ink-600 dark:text-slate-300">
                        {order.user?.name || "Unknown user"}
                      </td>

                      <td className="py-3.5 font-semibold text-ink-800 dark:text-slate-100">
                        ₹
                        {Number(
                          order.totalAmount || 0,
                        ).toLocaleString("en-IN")}
                      </td>

                      <td className="py-3.5 text-ink-500 dark:text-slate-400">
                        {order.user?.email || "-"}
                      </td>

                      <td className="py-3.5 text-right">
                        <span
                          className={`badge ${
                            statusStyles[status] ||
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          ) : (
            <div className="py-12 text-center">
              <ShoppingBag
                size={35}
                className="mx-auto text-ink-300"
              />

              <p className="mt-3 font-semibold text-ink-700 dark:text-slate-300">
                No recent orders
              </p>

              <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
                Orders will appear here when customers place them.
              </p>
            </div>
          )}
        </article>

        {/* OPERATIONS */}
        <aside className="card 2xl:col-span-4">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">
                Dashboard
              </p>

              <h2 className="mt-1 text-lg font-bold text-ink-900 dark:text-slate-100">
                Operations
              </h2>
            </div>

            <BellRing
              size={19}
              className="text-primary"
            />
          </div>

          <div className="mt-5 space-y-4">

            <div className="flex gap-3 rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20">
                <Clock3 size={16} />
              </span>

              <div>
                <p className="font-semibold text-ink-800 dark:text-slate-100">
                  {stats?.pendingOrders || 0} pending orders
                </p>

                <p className="text-xs text-ink-500 dark:text-slate-400">
                  Orders waiting for processing.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl bg-sky-50 p-3 dark:bg-sky-500/10">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-500/20">
                <Users size={16} />
              </span>

              <div>
                <p className="font-semibold text-ink-800 dark:text-slate-100">
                  {stats?.totalUsers || 0} users
                </p>

                <p className="text-xs text-ink-500 dark:text-slate-400">
                  Total registered users.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20">
                <PackageCheck size={16} />
              </span>

              <div>
                <p className="font-semibold text-ink-800 dark:text-slate-100">
                  {stats?.totalOrders || 0} total orders
                </p>

                <p className="text-xs text-ink-500 dark:text-slate-400">
                  Orders recorded in the system.
                </p>
              </div>
            </div>

          </div>

          <Link
            to="/orders"
            className="mt-5 inline-flex items-center text-sm font-bold text-primary hover:underline"
          >
            View orders
            <ArrowUpRight
              size={15}
              className="ml-1"
            />
          </Link>

        </aside>
      </section>
    </div>
  );
}