import axios from "axios";

// The admin panel runs without a backend by keeping its demo workspace in
// localStorage. Replacing these functions with axios calls later will not
// require changes to the UI.
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const api = axios.create({ baseURL: BASE_URL, headers: { "Content-Type": "application/json" } });

const STORAGE_KEY = "foodhub_admin_workspace_v2";
const wait = (value, ms = 180) => new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms));

const seed = {
  metrics: { totalOrders: 1284, totalRevenue: 486320, weeklyRevenue: [12, 19, 14, 22, 28, 24, 32] },
  foods: [
    { id: "F001", name: "Paneer Tikka Pizza", category: "Pizza", price: 449, stock: 24, status: "Available", description: "Smoky paneer, peppers and mozzarella.", image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=500&q=80" },
    { id: "F002", name: "Veg Burger Combo", category: "Burger", price: 249, stock: 40, status: "Available", description: "Crisp veggie patty with fries and a drink.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: "F003", name: "Chicken Biryani", category: "Rice", price: 329, stock: 0, status: "Out of stock", description: "Aromatic basmati rice and tender chicken.", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500&q=80" },
    { id: "F004", name: "Masala Dosa", category: "South Indian", price: 99, stock: 60, status: "Available", description: "Crisp dosa served with masala filling.", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&q=80" },
    { id: "F005", name: "Chocolate Shake", category: "Beverage", price: 129, stock: 35, status: "Available", description: "Rich chocolate shake finished with cocoa.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80" },
    { id: "F006", name: "Veg Momos", category: "Snacks", price: 149, stock: 18, status: "Available", description: "Steamed dumplings with chilli dip.", image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=500&q=80" },
    { id: "F007", name: "Tiramisu Cup", category: "Dessert", price: 189, stock: 16, status: "Available", description: "Coffee-soaked ladyfingers and mascarpone cream.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80" },
    { id: "F008", name: "Spicy Ramen Bowl", category: "Asian", price: 279, stock: 12, status: "Available", description: "Umami broth, noodles, greens and chilli oil.", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80" },
  ],
  orders: [
    { id: "ORD1042", customer: "Aarav Sharma", phone: "9876543210", address: "204, Palm Residency, Indore", items: [{ name: "Paneer Tikka Pizza", qty: 1, price: 449 }], amount: 449, payment: "UPI", status: "Delivered", date: "27 Jul, 12:40 PM" },
    { id: "ORD1041", customer: "Isha Verma", phone: "9812345678", address: "12 Green Park, Indore", items: [{ name: "Veg Burger Combo", qty: 1, price: 249 }], amount: 249, payment: "Cash on Delivery", status: "Preparing", date: "27 Jul, 12:10 PM" },
    { id: "ORD1040", customer: "Rohan Mehta", phone: "9900112233", address: "45 Vijay Nagar, Indore", items: [{ name: "Chicken Biryani", qty: 1, price: 329 }], amount: 329, payment: "Card", status: "On the way", date: "26 Jul, 08:20 PM" },
    { id: "ORD1039", customer: "Sneha Patil", phone: "9765432109", address: "88 Sapna Sangeeta, Indore", items: [{ name: "Masala Dosa", qty: 2, price: 99 }], amount: 198, payment: "UPI", status: "Cancelled", date: "26 Jul, 07:05 PM" },
    { id: "ORD1038", customer: "Kabir Singh", phone: "9988776655", address: "3 MG Road, Indore", items: [{ name: "Chocolate Shake", qty: 1, price: 129 }], amount: 129, payment: "UPI", status: "Delivered", date: "26 Jul, 06:15 PM" },
    { id: "ORD1037", customer: "Neha Kapoor", phone: "9876102345", address: "9 Race Course Road, Indore", items: [{ name: "Veg Momos", qty: 2, price: 149 }], amount: 298, payment: "Card", status: "Preparing", date: "26 Jul, 05:45 PM" },
  ],
  customers: [
    { id: "C001", name: "Aarav Sharma", email: "aarav.sharma@mail.com", phone: "9876543210", orders: 18, joined: "10 Feb 2025", status: "Active" },
    { id: "C002", name: "Isha Verma", email: "isha.verma@mail.com", phone: "9812345678", orders: 7, joined: "22 May 2025", status: "Active" },
    { id: "C003", name: "Rohan Mehta", email: "rohan.mehta@mail.com", phone: "9900112233", orders: 32, joined: "03 Nov 2024", status: "Active" },
    { id: "C004", name: "Sneha Patil", email: "sneha.patil@mail.com", phone: "9765432109", orders: 3, joined: "15 Jan 2026", status: "Blocked" },
    { id: "C005", name: "Kabir Singh", email: "kabir.singh@mail.com", phone: "9988776655", orders: 11, joined: "08 Sep 2025", status: "Active" },
    { id: "C006", name: "Neha Kapoor", email: "neha.kapoor@mail.com", phone: "9876102345", orders: 6, joined: "18 Mar 2026", status: "Active" },
  ],
  profile: { name: "Ananya Mehta", email: "admin@foodhub.com", phone: "9090909090", role: "Super Admin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya" },
  settings: { orderNotif: true, customerNotif: true, marketingEmails: false },
  history: [
    { id: "H001", section: "Food", title: "Added Chicken Biryani", detail: "New menu item was added to the catalogue.", entity: "Chicken Biryani", date: "27 Jul 2026", time: "12:40 PM", timestamp: "2026-07-27T12:40:00.000Z" },
    { id: "H002", section: "Orders", title: "Updated order status", detail: "Order status changed to On the way.", entity: "ORD1040", date: "27 Jul 2026", time: "12:10 PM", timestamp: "2026-07-27T12:10:00.000Z" },
    { id: "H003", section: "Customers", title: "Blocked customer", detail: "A customer account was blocked for review.", entity: "Sneha Patil", date: "27 Jul 2026", time: "11:35 AM", timestamp: "2026-07-27T11:35:00.000Z" },
    { id: "H004", section: "Profile", title: "Edited admin profile", detail: "Admin profile information was updated.", entity: "Ananya Mehta", date: "26 Jul 2026", time: "09:20 AM", timestamp: "2026-07-26T09:20:00.000Z" },
  ],
};

function createHistoryEntry(section, title, detail, entity, timestamp = new Date().toISOString()) {
  const safeDate = new Date(timestamp);
  return {
    id: `H${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    section,
    title,
    detail,
    entity,
    date: safeDate.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: safeDate.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
    timestamp,
  };
}

function readStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved?.foods) {
      return structuredClone(seed);
    }
    const store = saved;
    store.history = Array.isArray(store.history) && store.history.length ? store.history : structuredClone(seed.history);
    return store;
  } catch {
    return structuredClone(seed);
  }
}

function writeStore(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("foodhub:updated"));
  return next;
}

export async function adminLogin({ email, password }) {
  if (!email || !password) throw new Error("Enter an email and password to continue.");
  const profile = readStore().profile;
  localStorage.setItem("admin_token", "foodhub_local_admin_session");
  localStorage.setItem("admin_name", profile.name);
  return wait({ token: "foodhub_local_admin_session", admin: profile }, 320);
}

export function logout() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_name");
}

export const isAuthenticated = () => Boolean(localStorage.getItem("admin_token"));

export async function getDashboardStats() {
  const store = readStore();
  const activeOrders = store.orders.filter((order) => !["Delivered", "Cancelled"].includes(order.status)).length;
  return wait({
    totalOrders: store.metrics.totalOrders,
    totalRevenue: store.metrics.totalRevenue,
    totalCustomers: store.customers.length + 926,
    totalFoods: store.foods.length,
    activeOrders,
    revenueTrend: store.metrics.weeklyRevenue,
    recentOrders: store.orders.slice(0, 5),
  });
}

export async function getFoods() { return wait(readStore().foods); }
export async function addFood(payload) {
  const store = readStore();
  const item = { ...payload, id: `F${String(Date.now()).slice(-5)}`, price: Number(payload.price), stock: Number(payload.stock), status: Number(payload.stock) > 0 ? "Available" : "Out of stock", image: payload.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" };
  store.foods.unshift(item);
  store.history.unshift(createHistoryEntry("Food", `Added ${item.name}`, "A new food item was added to the catalogue.", item.name));
  writeStore(store);
  return wait(item);
}
export async function updateFood(id, payload) {
  const store = readStore();
  const index = store.foods.findIndex((food) => food.id === id);
  if (index < 0) throw new Error("Food item not found.");
  const next = { ...store.foods[index], ...payload, price: Number(payload.price), stock: Number(payload.stock) };
  next.status = Number(next.stock) > 0 && next.status !== "Out of stock" ? "Available" : next.status;
  store.foods[index] = next;
  store.history.unshift(createHistoryEntry("Food", `Edited ${next.name}`, "A menu item was updated in manage food.", next.name));
  writeStore(store);
  return wait(next);
}
export async function deleteFood(id) {
  const store = readStore();
  const item = store.foods.find((food) => food.id === id);
  store.foods = store.foods.filter((food) => food.id !== id);
  if (item) {
    store.history.unshift(createHistoryEntry("Food", `Deleted ${item.name}`, "A food item was removed from the catalogue.", item.name));
  }
  writeStore(store);
  return wait({ id, deleted: true });
}

export async function getOrders() { return wait(readStore().orders); }
export async function getOrderById(id) { return wait(readStore().orders.find((order) => order.id === id) || null); }
export async function updateOrderStatus(id, status) {
  const store = readStore();
  const index = store.orders.findIndex((order) => order.id === id);
  if (index < 0) throw new Error("Order not found.");
  store.orders[index] = { ...store.orders[index], status };
  store.history.unshift(createHistoryEntry("Orders", `Updated ${id}`, `Order status changed to ${status}.`, id));
  writeStore(store);
  return wait(store.orders[index]);
}

export async function getCustomers() { return wait(readStore().customers); }
export async function toggleCustomerStatus(id) {
  const store = readStore();
  const customer = store.customers.find((item) => item.id === id);
  if (!customer) throw new Error("Customer not found.");
  customer.status = customer.status === "Active" ? "Blocked" : "Active";
  store.history.unshift(createHistoryEntry("Customers", `${customer.status === "Blocked" ? "Blocked" : "Unblocked"} ${customer.name}`, `The customer status was updated to ${customer.status}.`, customer.name));
  writeStore(store);
  return wait(customer);
}
export async function updateCustomer(id, payload) {
  const store = readStore();
  const index = store.customers.findIndex((customer) => customer.id === id);
  if (index < 0) throw new Error("Customer not found.");
  store.customers[index] = { ...store.customers[index], ...payload };
  store.history.unshift(createHistoryEntry("Customers", `Edited ${store.customers[index].name}`, "Customer details were updated.", store.customers[index].name));
  writeStore(store);
  return wait(store.customers[index]);
}
export async function deleteCustomer(id) {
  const store = readStore();
  const customer = store.customers.find((item) => item.id === id);
  if (!customer) throw new Error("Customer not found.");
  store.customers = store.customers.filter((item) => item.id !== id);
  store.history.unshift(createHistoryEntry("Customers", `Deleted ${customer.name}`, "A customer account was removed from the workspace.", customer.name));
  writeStore(store);
  return wait({ id, deleted: true });
}

export async function getAdminProfile() { return wait(readStore().profile); }
export async function updateAdminProfile(payload) {
  const store = readStore();
  store.profile = { ...store.profile, ...payload };
  store.history.unshift(createHistoryEntry("Profile", "Edited profile", "Admin profile details were updated.", store.profile.name));
  writeStore(store);
  return wait(store.profile);
}
export async function getSettings() { return wait(readStore().settings); }
export async function updateSettings(payload) {
  const store = readStore();
  store.settings = { ...store.settings, ...payload };
  store.history.unshift(createHistoryEntry("Settings", "Edited settings", "Admin preferences and notification settings were updated.", "Settings"));
  writeStore(store);
  return wait(store.settings);
}

export async function getHistory() { return wait(readStore().history); }
export function resetDemoData() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("foodhub:updated"));
}

export default api;
