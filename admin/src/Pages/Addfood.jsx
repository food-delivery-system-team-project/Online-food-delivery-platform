import { useRef, useState } from "react";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  ImagePlus,
  X,
  Sparkles,
  Box,
  BadgeCheck,
} from "lucide-react";

import {addFood} from "../api/foodApi";
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

const emptyForm = {
  name: "",
  category: categories[0],
  price: "",
  stock: "",
  description: "",
};

export default function AddFood() {
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRef = useRef(null);

  const resetImage = () => {
    setPreview("");
    setImageData("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const reset = () => {
    setForm(emptyForm);
    resetImage();
    setSuccess(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();

    reader.onload = () => {
      setImageData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      await addFood({
        ...form,
        image: imageData,
      });

      setSuccess(true);
      setForm(emptyForm);
      resetImage();
    } catch (error) {
      console.error("Add food failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl animate-fadeIn">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
          Menu management
        </p>

        <h1 className="page-heading mt-1">
          Add a menu item
        </h1>

        <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
          Create a fresh item for your customers to discover and preview it
          instantly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="card space-y-5">

          {/* IMAGE */}
          <div>
            <label className="label">
              Food image
            </label>

            <label
              htmlFor="food-image"
              className="flex h-48 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-ink-100 transition hover:border-primary/50 hover:bg-primary-50/40 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {preview ? (
                <div className="group relative h-full w-full">
                  <img
                    src={preview}
                    alt="Selected food preview"
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute inset-0 grid place-items-center bg-ink-900/45 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                    <ImagePlus size={18} className="mr-2" />
                    Replace image
                  </span>
                </div>
              ) : (
                <>
                  <UploadCloud
                    className="text-ink-500 dark:text-slate-400"
                    size={26}
                  />

                  <span className="text-sm text-ink-500 dark:text-slate-400">
                    Click to upload an appetising photo
                  </span>
                </>
              )}
            </label>

            <input
              ref={inputRef}
              id="food-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />

            {preview && (
              <button
                type="button"
                onClick={resetImage}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ink-500 hover:text-red-500 dark:text-slate-400"
              >
                <X size={14} />
                Remove image
              </button>
            )}
          </div>

          {/* FOOD DETAILS */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className="label">
                Food name
              </label>

              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Paneer Tikka Pizza"
                className="input"
              />
            </div>

            <div>
              <label className="label">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                Price (₹)
              </label>

              <input
                name="price"
                type="number"
                required
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="299"
                className="input"
              />
            </div>

            <div>
              <label className="label">
                Stock quantity
              </label>

              <input
                name="stock"
                type="number"
                required
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="50"
                className="input"
              />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="label">
              Description
            </label>

            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="A short description that makes the item appealing..."
              className="input resize-none"
            />
          </div>

          {/* SUCCESS */}
          {success && (
            <p className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <CheckCircle2 size={16} />
              Menu item added successfully.
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 pt-1">

            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6"
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Adding item..."
                : "Add to menu"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="btn-secondary"
            >
              Reset form
            </button>

          </div>

        </form>

        {/* LIVE PREVIEW */}
        <aside className="content-preview-card space-y-4">

          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Live preview
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">

            <div className="h-40 bg-ink-100 dark:bg-slate-800">

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink-500 dark:text-slate-400">
                  Upload an image to see your dish card
                </div>
              )}

            </div>

            <div className="space-y-3 p-4">

              <div className="flex items-center justify-between">

                <div>
                  <p className="font-semibold text-ink-900 dark:text-slate-100">
                    {form.name || "New menu item"}
                  </p>

                  <p className="text-sm text-ink-500 dark:text-slate-400">
                    {form.category || "Choose a category"}
                  </p>
                </div>

                <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {form.stock
                    ? `${form.stock} units`
                    : "Stock"}
                </div>

              </div>

              <p className="text-sm leading-6 text-ink-600 dark:text-slate-300">
                {form.description ||
                  "A short description helps customers understand what makes the dish special."}
              </p>

              <div className="flex items-center justify-between rounded-xl border border-ink-100 bg-ink-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800">

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <BadgeCheck size={15} />
                  Ready to publish
                </span>

                <span className="text-lg font-bold text-ink-900 dark:text-slate-100">
                  ₹{form.price || 0}
                </span>

              </div>

            </div>

          </div>

          {/* TIPS */}
          <div className="rounded-2xl border border-dashed border-primary/20 bg-primary-50/40 p-3 text-sm text-ink-600 dark:border-primary/20 dark:bg-slate-800/70 dark:text-slate-300">

            <div className="flex items-center gap-2 font-semibold text-ink-800 dark:text-slate-100">
              <Box size={15} />
              Quick tips
            </div>

            <ul className="mt-2 space-y-1.5 text-sm">
              <li>• Use a bright image for better customer attention.</li>
              <li>• Keep the description short and appetising.</li>
              <li>• Price and stock updates reflect instantly in the catalogue.</li>
            </ul>

          </div>

        </aside>

      </div>
    </div>
  );
}