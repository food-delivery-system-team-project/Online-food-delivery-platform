import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";

import {
  getfood,
  deleteFood,
  updateFood
} from "../api/foodApi";

import ConfirmDialog from "../components/ConfirmDialog";

const categories = [
  "Pizza",
  "Burger",
  "Rice",
  "South Indian",
  "Beverage",
  "Snacks",
  "Dessert",
  "Asian",
];

export default function Managefood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  // GET FOOD
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


  // UPDATE FOOD
  const saveEdit = async (event) => {
    event.preventDefault();

    setSaving(true);

    try {
      const saved = await updateFood(editing._id, {
        name: editing.name,
        price: editing.price,
        category: editing.category,
        storeName: editing.storeName,
        prepTime: editing.prepTime,
      });

      console.log("Food updated:", saved);

      setFoods((items) =>
        items.map((item) =>
          item._id === saved._id ? saved : item,
        ),
      );

      setEditing(null);

      setNotice(`${saved.name} has been updated.`);
    } catch (error) {
      console.error(
        "Update food failed:",
        error.response?.data || error.message,
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE FOOD
  const confirmDelete = async () => {
    if (!deleting) return;

    setSaving(true);

    try {
      await deleteFood(deleting._id);

      setFoods((items) =>
        items.filter((food) => food._id !== deleting._id),
      );

      setNotice(`${deleting.name} was removed from the menu.`);

      setDeleting(null);
    } catch (error) {
      console.error(
        "Delete food failed:",
        error.response?.data || error.message,
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
            Menu management
          </p>

          <h1 className="page-heading mt-1">
            Manage food
          </h1>

          <p className="mt-1 text-sm text-ink-500">
            Edit prices, preparation time and category details.
          </p>
        </div>

        <div className="rounded-xl bg-primary-50 px-4 py-3 text-sm font-bold text-primary">
          <span className="text-xl">
            {foods.length}
          </span>{" "}
          menu items
        </div>
      </div>

      {/* NOTICE */}
      {notice && (
        <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={17} />
            {notice}
          </span>

          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[800px] text-sm">

          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/60 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
              <th className="px-5 py-3">Item</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Prep Time</th>
              <th className="px-5 py-3">Store</th>
              <th className="px-5 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={6} className="px-5 py-5">
                    <div className="h-7 animate-pulse rounded bg-ink-100" />
                  </td>
                </tr>
              ))
            ) : foods.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-ink-500"
                >
                  No food items found.
                </td>
              </tr>
            ) : (
              foods.map((food) => (
                <tr
                  key={food._id}
                  className="table-row-hover border-b border-ink-100/60 last:border-0"
                >

                  {/* FOOD */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">

                      {food.image ? (
                        <img
                          src={food.image}
                          alt={food.name}
                          className="h-11 w-11 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink-100">
                          🍽️
                        </div>
                      )}

                      <div>
                        <p className="font-bold text-ink-800">
                          {food.name}
                        </p>

                        <p className="mt-0.5 text-xs text-ink-500">
                          {food.prepTime
                            ? `${food.prepTime} min preparation`
                            : "No prep time"}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-5 py-3.5 text-ink-600">
                    {food.category}
                  </td>

                  {/* PRICE */}
                  <td className="px-5 py-3.5 font-bold text-ink-800">
                    ₹{food.price}
                  </td>

                  {/* PREP TIME */}
                  <td className="px-5 py-3.5 text-ink-600">
                    {food.prepTime
                      ? `${food.prepTime} min`
                      : "-"}
                  </td>

                  {/* STORE */}
                  <td className="px-5 py-3.5 text-ink-600">
                    {food.storeName || "-"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          setEditing({ ...food })
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary-50 px-3 py-2 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleting(food)}
                        aria-label={`Delete ${food.name}`}
                        className="grid h-8 w-8 place-items-center rounded-xl text-ink-500 transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() =>
            !saving && setEditing(null)
          }
        >
          <form
            onSubmit={saveEdit}
            role="dialog"
            aria-modal="true"
            className="editor-dialog"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              onClick={() =>
                !saving && setEditing(null)
              }
              className="absolute right-4 top-4 rounded-xl p-2 text-ink-500 hover:bg-ink-100"
            >
              <X size={18} />
            </button>

            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-primary">
              Menu editor
            </p>

            <h2 className="mt-2 font-display text-2xl font-extrabold">
              Edit {editing.name}
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* NAME */}
              <label className="sm:col-span-2">
                <span className="label">
                  Food name
                </span>

                <input
                  value={editing.name || ""}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      name: event.target.value,
                    })
                  }
                  required
                  className="input"
                />
              </label>

              {/* CATEGORY */}
              <label>
                <span className="label">
                  Category
                </span>

                <span className="relative block">
                  <select
                    value={editing.category || ""}
                    onChange={(event) =>
                      setEditing({
                        ...editing,
                        category: event.target.value,
                      })
                    }
                    className="select-enhanced input pr-9"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
                  />
                </span>
              </label>

              {/* PRICE */}
              <label>
                <span className="label">
                  Price (₹)
                </span>

                <input
                  type="number"
                  min="0"
                  value={editing.price || ""}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      price: Number(
                        event.target.value,
                      ),
                    })
                  }
                  required
                  className="input"
                />
              </label>

              {/* STORE */}
              <label>
                <span className="label">
                  Store name
                </span>

                <input
                  value={editing.storeName || ""}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      storeName: event.target.value,
                    })
                  }
                  className="input"
                />
              </label>

              {/* PREP TIME */}
              <label>
                <span className="label">
                  Preparation time (minutes)
                </span>

                <input
                  type="number"
                  min="0"
                  value={editing.prepTime || ""}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      prepTime: Number(
                        event.target.value,
                      ),
                    })
                  }
                  className="input"
                />
              </label>

            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  !saving && setEditing(null)
                }
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="btn-primary"
              >
                <Save
                  size={16}
                  className={
                    saving
                      ? "animate-pulse"
                      : ""
                  }
                />

                {saving
                  ? "Saving..."
                  : "Save changes"}
              </button>

            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.name || "item"}?`}
        message={`This will permanently remove ${
          deleting?.name || "this item"
        } from your menu.`}
        loading={saving && Boolean(deleting)}
        onClose={() =>
          !saving && setDeleting(null)
        }
        onConfirm={confirmDelete}
      />

    </div>
  );
}