import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  LogOut,
  Plus,
  X,
  ClipboardList,
  UtensilsCrossed,
  MoonStar,
  SunMedium,
} from "lucide-react";

import api from "../api/axios";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  // GET LOGGED-IN USER
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("users/profile");

        console.log("Profile:", response.data);

        setProfile(response.data.user);
      } catch (error) {
        console.error(
          "Profile loading error:",
          error.response?.data || error.message
        );

        // If token is invalid/expired
        if (error.response?.status === 401) {
          navigate("/", { replace: true });
        }
      }
    };

    loadProfile();
  }, [navigate]);

  // ==============================
  // SEARCH FOODS + ORDERS
  // ==============================
  useEffect(() => {
    const search = async () => {
      const term = query.trim().toLowerCase();

      if (!term) {
        setResults([]);
        return;
      }

      try {
        const [foodsResponse, ordersResponse] = await Promise.all([
          api.get("foods"),
          api.get("orders"),
        ]);

        const foods = foodsResponse.data?.foods || [];
        const orders = ordersResponse.data?.orders || [];

        const foodResults = foods
          .filter((food) =>
            `${food.name || ""} ${food.category || ""}`
              .toLowerCase()
              .includes(term)
          )
          .slice(0, 3)
          .map((food) => ({
            type: "Food",
            label: food.name,
            to: "/manage-food",
            icon: UtensilsCrossed,
          }));

        const orderResults = orders
          .filter((order) =>
            `${order.id || order._id || ""} ${
              order.customer || order.user?.name || ""
            }`
              .toLowerCase()
              .includes(term)
          )
          .slice(0, 3)
          .map((order) => {
            const orderId = order.id || order._id;

            return {
              type: "Order",
              label: `${orderId} · ${
                order.customer || order.user?.name || "Customer"
              }`,
              to: `/orders/${orderId}`,
              icon: ClipboardList,
            };
          });

        setResults([...foodResults, ...orderResults]);
      } catch (error) {
        console.error(
          "Search error:",
          error.response?.data || error.message
        );

        setResults([]);
      }
    };

    const timer = setTimeout(search, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // ==============================
  // NOTIFICATIONS
  // ==============================
  const pending = useMemo(
    () => [
      "A new order is waiting in the kitchen.",
      "Weekly revenue is up 8.1%.",
      "Low stock: Chicken Biryani is unavailable.",
    ],
    []
  );

  // ==============================
  // SEARCH SELECT
  // ==============================
  const select = (to) => {
    setQuery("");
    setResults([]);
    navigate(to);
  };

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = async () => {
    try {
      await api.post("auth/logout");
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100/80 bg-slate-900/95 px-4 text-slate-100 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:px-7">
      
      {/* MOBILE MENU */}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="rounded-xl p-2 text-slate-100 transition hover:bg-white/10 lg:hidden"
      >
        <Menu size={21} />
      </button>

      {/* SEARCH */}
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setQuery("");
              setResults([]);
            }
          }}
          placeholder="Search orders or menu..."
          className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-2 pl-10 pr-9 text-sm text-slate-100 placeholder:text-slate-400 focus:border-primary/50 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-100"
          >
            <X size={14} />
          </button>
        )}

        {/* SEARCH RESULTS */}
        {query && (
          <div className="absolute top-[calc(100%+8px)] w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-1.5 shadow-xl">
            {results.length ? (
              results.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={`${item.type}-${item.label}`}
                    onClick={() => select(item.to)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-800"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-800 text-primary">
                      <Icon size={15} />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-slate-100">
                        {item.label}
                      </span>

                      <span className="text-xs text-slate-400">
                        {item.type}
                      </span>
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-4 text-center text-sm text-slate-400">
                No matching orders or menu items.
              </p>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-2 sm:gap-3">

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="hidden rounded-xl border border-slate-700 bg-slate-800/80 p-2.5 text-slate-200 transition hover:bg-slate-700 sm:inline-flex"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunMedium size={18} />
          ) : (
            <MoonStar size={18} />
          )}
        </button>

        {/* ADD FOOD */}
        <button
          onClick={() => navigate("/add-food")}
          title="Add menu item"
          className="hidden rounded-xl bg-primary/15 p-2.5 text-primary transition hover:bg-primary hover:text-white sm:inline-flex"
        >
          <Plus size={18} />
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() =>
              setNotificationsOpen((value) => !value)
            }
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-100 transition hover:bg-white/10"
          >
            <Bell size={19} />

            <span className="notification-pulse absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-80 rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-xl">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="font-bold text-slate-100">
                  Notifications
                </p>

                <span className="text-xs font-semibold text-primary">
                  3 new
                </span>
              </div>

              {pending.map((note, index) => (
                <div
                  key={note}
                  className="flex gap-3 rounded-xl p-2.5 hover:bg-slate-800"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 rounded-full ${
                      index === 0
                        ? "bg-primary"
                        : "bg-slate-500"
                    }`}
                  />

                  <p className="text-sm leading-5 text-slate-300">
                    {note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden h-8 w-px bg-slate-700 sm:block" />

        {/* REAL USER PROFILE */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-left"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white ring-2 ring-primary/20">
            {profile?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-slate-100">
              {profile?.name || "Admin"}
            </span>

            <span className="block text-xs capitalize text-slate-400">
              {profile?.role || "Administrator"}
            </span>
          </span>
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          title="Log out"
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}