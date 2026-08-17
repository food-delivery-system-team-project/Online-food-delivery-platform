import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Pencil, Trash2, Sparkles } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";

import { getfood, deleteFood } from "../api/foodApi";

export default function Listfood() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getfood();
        setFoods(data.foods);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching foods:", error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filtered = useMemo(
    () =>
      foods.filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [foods, query],
  );

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFood(deleting._id);
      setFoods((prev) => prev.filter((food) => food._id !== deleting._id));
      setDeleting(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            Your catalogue
          </p>
          <h1 className="page-heading mt-1">Menu items</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
            {foods.total} items currently on your menu.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food or category..."
            className="input pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card h-64 animate-pulse bg-ink-100/60" />
            ))
          : filtered.map((food) => (
              <div
                key={food._id}
                className="card group overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden bg-ink-100">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-800 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100">
                    {food.category}
                  </span>
                  <span
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${food.status === "Available" ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"}`}
                  >
                    {food.status}
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold leading-tight text-ink-900 dark:text-slate-100">
                        {food.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600 dark:text-slate-300">
                        {food.description ||
                          "A polished dish ready for the next order."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-primary-50/70 px-3 py-2.5 dark:bg-slate-800">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
                        Price
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ₹{food.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
                        Stock
                      </p>
                      <p className="text-sm font-semibold text-ink-800 dark:text-slate-200">
                        {food.stock} units
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      <Sparkles size={12} /> One-line preview
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => navigate("/manage-food")}
                        className="btn-ghost !p-2"
                        title="Edit in menu manager"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleting(food)}
                        className="btn-ghost !p-2 hover:!bg-red-50 hover:!text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="card text-center py-16 text-ink-600 dark:text-slate-300">
          No food items match your search.
        </div>
      )}
      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.name || "item"}?`}
        message={`This will permanently remove ${deleting?.name || "this item"} from your menu. You cannot undo this action.`}
        loading={isDeleting}
        onClose={() => !isDeleting && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
