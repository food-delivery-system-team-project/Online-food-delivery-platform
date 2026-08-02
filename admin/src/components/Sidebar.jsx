import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  Utensils,
  ClipboardList,
  Users,
  History as HistoryIcon,
  UserCircle,
  Settings,
  ChefHat,
  X,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-food", label: "Add Food", icon: PlusCircle },
  { to: "/list-food", label: "List Food", icon: ListOrdered },
  { to: "/manage-food", label: "Manage Food", icon: Utensils },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/history", label: "History", icon: HistoryIcon },
];

const bottomLinks = [
  { to: "/profile", label: "Profile", icon: UserCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 border-r border-ink-100 bg-white/90 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-out dark:border-slate-800 dark:bg-slate-950/85
        lg:translate-x-0 lg:static lg:z-auto
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink-100 px-5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ChefHat size={19} />
            </div>
            <span className="font-display font-bold text-ink-900 dark:text-slate-100">FoodHub</span>
          </div>
          <button onClick={onClose} className="text-ink-500 hover:text-ink-800 dark:text-slate-400 dark:hover:text-slate-200 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-slate-400">
            Main
          </p>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-ink-100 px-3 py-5 dark:border-slate-800">
          {bottomLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link-active" : ""}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}
