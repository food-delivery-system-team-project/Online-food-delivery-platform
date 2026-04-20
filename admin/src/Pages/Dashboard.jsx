import React, { useState, useEffect, useRef } from "react";
import {
  Home, Utensils, ShoppingCart, Users, Settings, LogOut, Bell, Search, Menu, 
  ShoppingBag, DollarSign, ClipboardList, ChevronUp, ChevronDown, AlertTriangle,
  User, HelpCircle, Edit
} from "lucide-react";

import Orders from "./Orders";
import Addfood from "./Addfood";
import ListFood from "./ListFood";
import Customers from "./Customers";
import OrderDetails from "./OrderDetails";
import ManageFood from "./ManageFood";
import SettingsPage from "./Settings";
import ProfilePage from "./Profile"; // Import the new Profile component
import API from "../api";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [foodOpen, setFoodOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const confirmLogout = () => {
    console.log("Logging out...");
    setShowLogoutModal(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden font-sans">
      
      {/* --- CENTERED LOGOUT MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Logout</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium">Are you sure you want to exit the admin panel?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all">Cancel</button>
              <button onClick={confirmLogout} className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all">Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-gradient-to-b from-orange-500 to-red-600 text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-8">
          <h1 className="text-2xl font-black tracking-tight">Admin page</h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<Home size={18} />} label="Dashboard" active={page === "dashboard"} onClick={() => setPage("dashboard")} />
          
          <div className="px-4">
            <div onClick={() => setFoodOpen(!foodOpen)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${["add food", "food list", "manage food"].includes(page) ? "bg-white/20" : "hover:bg-white/10"}`}>
              <div className="flex items-center gap-3"><Utensils size={18} /><span className="text-sm font-bold">Food</span></div>
              <span className="text-[10px]">{foodOpen ? "▲" : "▼"}</span>
            </div>
            {foodOpen && (
              <div className="mt-2 space-y-1">
                <DropdownItem label="-- Add" active={page === "add food"} onClick={() => setPage("add food")} />
                <DropdownItem label="-- List" active={page === "food list"} onClick={() => setPage("food list")} />
                <DropdownItem label="-- Add/Delete" active={page === "manage food"} onClick={() => setPage("manage food")} />
              </div>
            )}
          </div>

          <div className="px-4">
            <div onClick={() => setOrdersOpen(!ordersOpen)} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${["orders", "order details"].includes(page) ? "bg-white/20" : "hover:bg-white/10"}`}>
              <div className="flex items-center gap-3"><ShoppingCart size={18} /><span className="text-sm font-bold">Orders</span></div>
              <span className="text-[10px]">{ordersOpen ? "▲" : "▼"}</span>
            </div>
            {ordersOpen && (
              <div className="mt-2 space-y-1">
                <DropdownItem label="-- Status" active={page === "orders"} onClick={() => setPage("orders")} />
                <DropdownItem label="-- Details" active={page === "order details"} onClick={() => setPage("order details")} />
              </div>
            )}
          </div>

          <SidebarItem icon={<Users size={18} />} label="Customers" active={page === "customers"} onClick={() => setPage("customers")} />
          <SidebarItem icon={<User size={18} />} label="My Profile" active={page === "admin profile"} onClick={() => setPage("admin profile")}/>
          <SidebarItem icon={<Settings size={18} />} label="Settings" active={page === "settings"} onClick={() => setPage("settings")} />
        </nav>

        <div className="p-6">
          <button onClick={() => setShowLogoutModal(true)} className="flex items-center gap-2 text-sm font-bold opacity-90 hover:opacity-100 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden" onClick={() => profileOpen && setProfileOpen(false)}>
        
        <header className="bg-white p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-3">
            <Menu className="md:hidden" />
            <h2 className="text-xl font-black text-gray-800 tracking-tight capitalize">{page}</h2>
          </div>

          <div className="flex items-center gap-4">
            {page === "dashboard" && (
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input className="pl-10 pr-4 py-2 border border-gray-100 bg-gray-50 rounded-xl focus:bg-white w-64" placeholder="Search here..." />
              </div>
            )}
            <Bell className="text-gray-400 cursor-pointer" size={20} />
            
            {/* PROFILE DROPDOWN CONTAINER */}
            <div className="relative">
              <div 
                onClick={(e) => { e.stopPropagation(); setProfileOpen(!profileOpen); }}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md cursor-pointer hover:scale-105 transition-transform" 
              />
              
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 z-[60]">
                  <button onClick={() => setPage("admin profile")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                    <User size={16} className="text-orange-500" /> Profile
                  </button>
                  <button onClick={() => setPage("settings")} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                    <Edit size={16} className="text-blue-500" /> Edit
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                    <HelpCircle size={16} className="text-green-500" /> Help
                  </button>
                  <div className="h-px bg-gray-100 my-1 mx-2" />
                  <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {page === "dashboard" && <DashboardHome />}
            {page === "add food" && <Addfood />}
            {page === "food list" && <ListFood />}
            {page === "customers" && <Customers />}
            {page === "manage food" && <ManageFood />}
            {page === "orders" && <Orders />}
            {page === "order details" && <OrderDetails />}
            {page === "settings" && <SettingsPage />}
            {page === "admin profile" && <ProfilePage setPage={setPage} />}
          </div>
          <div className="h-10"></div>
        </main>
      </div>
    </div>
  );
}

// SidebarItem & DropdownItem (Same as your provided code)
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div className="relative py-0.5">
      <div onClick={onClick} className={`flex items-center gap-3 p-3 mx-4 cursor-pointer transition-all duration-200 ${active ? "bg-gray-50 text-orange-600 rounded-l-2xl mr-0 shadow-[-10px_0_0_0_#f8fafc] z-10" : "text-white/90 hover:bg-white/10 rounded-xl"}`}>
        {icon}<span className="text-sm font-bold">{label}</span>
      </div>
      {active && <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-50 z-20" />}
    </div>
  );
}

function DropdownItem({ label, active, onClick }) {
  return (
    <div onClick={onClick} className={`ml-10 p-2 mr-4 rounded-lg cursor-pointer text-sm font-bold transition-all ${active ? "bg-gray-50 text-orange-600 rounded-l-xl relative" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
      {label}{active && <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-50 translate-x-4" />}
    </div>
  );
}

// DashboardHome (Same as your provided code)
function DashboardHome() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("/api/adminDb/dashboard", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => setData(res.data)).catch((err) => console.log(err));
  }, []);

  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={data.totalOrders} icon={<ShoppingBag />} />
        <StatCard title="Revenue" value={`₹${data.totalRevenue}`} icon={<DollarSign />} />
        <StatCard title="Customers" value={data.totalUsers} icon={<Users />} />
        <StatCard title="Pending" value={data.pendingOrders} icon={<ClipboardList />} />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between">
      <div><p className="text-gray-400 text-[10px] font-black uppercase mb-1">{title}</p><h2 className="text-2xl font-black text-gray-800">{value}</h2></div>
      <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">{icon}</div>
    </div>
  );
}