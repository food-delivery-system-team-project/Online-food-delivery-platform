import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ClipboardList, Clock3, Search, Truck, XCircle, Sparkles } from "lucide-react";
import { getHistory } from "../api";

const sectionStyles = {
  Food: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300",
  Orders: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  Customers: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300",
  Profile: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  Settings: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
};

const categoryMeta = [
  { key: "All", label: "All activity", icon: ClipboardList },
  { key: "Food", label: "Food", icon: Sparkles },
  { key: "Orders", label: "Orders", icon: Truck },
  { key: "Customers", label: "Customers", icon: CheckCircle2 },
  { key: "Profile", label: "Profile", icon: Clock3 },
  { key: "Settings", label: "Settings", icon: XCircle },
];

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    getHistory().then((data) => {
      setHistory(data);
      setLoading(false);
    });
  }, []);

  const filteredHistory = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return history.filter((entry) => {
      const matchesCategory = activeCategory === "All" || entry.section === activeCategory;
      const matchesQuery =
        !needle ||
        [entry.title, entry.detail, entry.entity, entry.section, entry.date, entry.time]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesDate = !selectedDate || entry.timestamp?.slice(0, 10) === selectedDate;
      return matchesCategory && matchesQuery && matchesDate;
    });
  }, [activeCategory, history, query, selectedDate]);

  const groupedHistory = useMemo(() => {
    return categoryMeta.reduce((acc, category) => {
      if (category.key === "All") {
        acc[category.key] = filteredHistory;
      } else {
        acc[category.key] = filteredHistory.filter((entry) => entry.section === category.key);
      }
      return acc;
    }, {});
  }, [filteredHistory]);

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Admin activity</p>
          <h1 className="page-heading mt-1">History</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">Track food, order, customer, profile, and settings changes in one place.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="relative min-w-[220px]">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 dark:text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, entity, section..."
              className="input pl-10"
            />
          </label>
          <label className="relative min-w-[200px]">
            <CalendarDays size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 dark:text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="input pl-10"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categoryMeta.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-150 ${
              activeCategory === key
                ? "border-primary/40 bg-primary text-white shadow-soft"
                : "border-ink-100 bg-white text-ink-700 hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary/40 dark:hover:text-primary"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="card h-52 animate-pulse bg-ink-100/50 dark:bg-slate-800/70" />
            ))
          : categoryMeta.map(({ key, label, icon: Icon }) => {
              const items = groupedHistory[key] || [];
              return (
                <section key={key} className="card space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">{label}</p>
                      <h2 className="mt-1 text-lg font-bold text-ink-900 dark:text-slate-100">{items.length} records</h2>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={18} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {items.length ? (
                      items.map((entry) => (
                        <article key={entry.id} className="rounded-2xl border border-ink-100 bg-ink-50/70 p-3.5 dark:border-slate-700 dark:bg-slate-800/70">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-ink-900 dark:text-slate-100">{entry.title}</p>
                              <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">{entry.detail}</p>
                            </div>
                            <span className={`badge ${sectionStyles[entry.section]}`}>{entry.section}</span>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-500 dark:text-slate-400">
                            <span>{entry.entity}</span>
                            <span>{entry.date} • {entry.time}</span>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-dashed border-ink-200 bg-white/60 p-4 text-sm text-ink-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
                        No history found for this section.
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
      </div>
    </div>
  );
}
