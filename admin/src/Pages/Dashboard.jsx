import React, { useState ,useEffect} from "react";
import {
  Home,
  PlusCircle,
  Utensils,
  ShoppingCart,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Star,
  LogOut,
  Bell,
  Search,
  Menu,
  DollarSign,
  ClipboardList
} from "lucide-react";

import Orders from "./Orders";
import Addfood from "./Addfood";
import ListFood from "./ListFood";
import Customers from "./Customers";
import OrderDetails from "./OrderDetails";
import ManageFood from "./ManageFood";
import API from "../api";


export default function Dashboard() {

  const [page, setPage] = useState("dashboard");
  const [foodOpen, setFoodOpen] = useState(page === "add food" || page === "food list");
  
  const [ordersOpen, setOrdersOpen] = useState(page === "orders" || page === "order details");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="relative w-64 bg-gradient-to-b from-orange-500 to-red-600 text-white p-5 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">Food Admin</h1>

        <nav className="space-y-3">
          <SidebarItem
            icon={<Home size={18} />}
            label="Dashboard"
            active={page === "dashboard"}
            onClick={() => setPage("dashboard")}
          />

          <div>
            {/* Parent */}
            <div
              onClick={() => setFoodOpen(!foodOpen)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                page === "add food" || page === "food list"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Utensils size={18} />
                Food
              </div>

              <span>{foodOpen ? "▲" : "▼"}</span>
            </div>

            {/* Dropdown */}
            {foodOpen && (
              <div className="ml-6 mt-2 space-y-2">
                <div
                  onClick={() => setPage("add food")}
                  className={`p-2 rounded-lg cursor-pointer text-sm ${
                    page === "add food"
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  -- Add
                </div>

                <div
                  onClick={() => setPage("food list")}
                  className={`p-2 rounded-lg cursor-pointer text-sm ${
                    page === "food list"
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  -- List
                </div>

                <div
                  onClick={() => setPage("manage food")}
                  className={`p-2 rounded-lg cursor-pointer text-sm ${
                    page === "manage food"
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  -- Add/Delete
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Parent */}
            <div
              onClick={() => setOrdersOpen(!ordersOpen)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                page === "orders" || page === "order details"
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} />
                Orders
              </div>

              <span>{ordersOpen ? "▲" : "▼"}</span>
            </div>

            {/* Dropdown */}
            {ordersOpen && (
              <div className="ml-6 mt-2 space-y-2">
                
                {/* Status (Orders page) */}
                <div
                  onClick={() => setPage("orders")}
                  className={`p-2 rounded-lg cursor-pointer text-sm ${
                    page === "orders"
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  -- Status
                </div>

                {/* Details */}
                <div
                  onClick={() => setPage("order details")}
                  className={`p-2 rounded-lg cursor-pointer text-sm ${
                    page === "order details"
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  -- Details
                </div>
              </div>
            )}
          </div>

          <SidebarItem
            icon={<Users size={18} />}
            label="Customers"
            active={page === "customers"}
            onClick={() => setPage("customers")}
          />

          <SidebarItem icon={<BarChart3 size={18} />} label="Analytics" />
          <SidebarItem icon={<Star size={18} />} label="Reviews" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        <div className="absolute bottom-6 left-5 right-5">
          <button className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="md:hidden" />
            <h2 className="text-xl font-semibold capitalize">{page}</h2>
          </div>

          <div className="flex items-center gap-4">
            {page === "dashboard" && (
              <div className="relative hidden md:block">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Search here..."
                />
              </div>
            )}

            <Bell className="text-gray-600" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          {page === "dashboard" && <DashboardHome />}
          {page === "add food" && <Addfood />}
          {page === "food list" && <ListFood />}
          {page === "customers" && <Customers />}
          {page === "manage food" && <ManageFood />}
          {page === "orders" && <Orders />}
          {page === "order details" && <OrderDetails />}
        </main>
      </div>
    </div>
  );
}

/* Dashboard Home */
function DashboardHome() {
  const [data, setData] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  API.get("/api/adminDb/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
}, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={data.totalOrders}
          icon={<ShoppingBag />}
        />

        <StatCard
          title="Revenue"
          value={`₹${data.totalRevenue}`}
          icon={<DollarSign />}
        />

        <StatCard
          title="Customers"
          value={data.totalUsers}
          icon={<Users />}
        />

        <StatCard
          title="Pending"
          value={data.pendingOrders}
          icon={<ClipboardList />}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Items</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.recentOrders.map((order) => (
              <OrderRow
                key={order._id}
                id={order._id.slice(-5)}
                name={order.user.name}
                item={order.items.map((i) => i.name).join(", ")}
                price={`₹${order.totalAmount}`}
                status={order.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function OrderRow({ id, name, item, price, status }) {
  return (
    <tr className="border-b">
      <td className="py-3">{id}</td>
      <td>{name}</td>
      <td>{item}</td>
      <td>{price}</td>
      <td>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
          {status}
        </span>
      </td>
    </tr>
  );
}