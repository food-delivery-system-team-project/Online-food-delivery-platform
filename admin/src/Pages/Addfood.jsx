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
import api from "../api/axios";

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
  storeName: "",
  prepTime: "",
};

export default function AddFood() {
  const [form, setForm] = useState(emptyForm);

  const [preview, setPreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  // -----------------------------
  // Handle input changes
  // -----------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess(false);
  };

  // -----------------------------
  // Handle image
  // -----------------------------
  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));

    setError("");
    setSuccess(false);
  };

  // -----------------------------
  // Remove image
  // -----------------------------
  const resetImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview("");
    setImageFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // -----------------------------
  // Reset form
  // -----------------------------
  const reset = () => {
    setForm(emptyForm);
    resetImage();

    setSuccess(false);
    setError("");
  };

  // -----------------------------
  // Submit food
  // -----------------------------
  const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setSuccess(false);

  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("storeName", "FoodHub");
    formData.append("prepTime", "30");

    // Important: send the actual file
    if (inputRef.current?.files?.[0]) {
      formData.append("image", inputRef.current.files[0]);
    }

    const response = await api.post("/admin/addFood", formData, {
      withCredentials: true,
    });

    console.log("Food added:", response.data);

    setSuccess(true);
    setForm(emptyForm);
    resetImage();
  } catch (error) {
    console.error(
      "Add food failed:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mx-auto max-w-5xl animate-fadeIn">
      {/* HEADER */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
          Menu management
        </p>

        <h1 className="page-heading mt-1">Add a menu item</h1>

        <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
          Add a new food item to your restaurant menu.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* =========================
            FORM
        ========================== */}
        <form onSubmit={handleSubmit} className="card space-y-5">
          {/* IMAGE */}
          <div>
            <label className="label">Food image</label>

            <label
              htmlFor="food-image"
              className="flex h-48 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-ink-100 transition hover:border-primary/50 hover:bg-primary-50/40 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              {preview ? (
                <div className="group relative h-full w-full">
                  <img
                    src={preview}
                    alt="Selected food"
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
                    Click to upload food image
                  </span>

                  <span className="text-xs text-ink-400">
                    PNG, JPG or WEBP · Max 5MB
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
            {/* FOOD NAME */}
            <div>
              <label className="label">Food name</label>

              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Paneer Tikka Pizza"
                className="input"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="label">Category</label>

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

            {/* PRICE */}
            <div>
              <label className="label">Price (₹)</label>

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

            {/* STORE NAME */}
            <div>
              <label className="label">Store name</label>

              <input
                name="storeName"
                type="text"
                required
                value={form.storeName}
                onChange={handleChange}
                placeholder="e.g. FoodHub Restaurant"
                className="input"
              />
            </div>

            {/* PREP TIME */}
            <div className="sm:col-span-2">
              <label className="label">Preparation time</label>

              <input
                name="prepTime"
                type="text"
                required
                value={form.prepTime}
                onChange={handleChange}
                placeholder="e.g. 20-30 mins"
                className="input"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <CheckCircle2 size={16} />
              Food item added successfully.
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
                <Loader2 size={17} className="animate-spin" />
              )}

              {loading ? "Adding food..." : "Add to menu"}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={loading}
              className="btn-secondary"
            >
              Reset form
            </button>
          </div>
        </form>

        {/* =========================
            LIVE PREVIEW
        ========================== */}
        <aside className="content-preview-card space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Live preview
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
            {/* IMAGE */}
            <div className="h-40 bg-ink-100 dark:bg-slate-800">
              {preview ? (
                <img
                  src={preview}
                  alt="Food preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-ink-500 dark:text-slate-400">
                  Upload an image to preview
                </div>
              )}
            </div>

            <div className="space-y-3 p-4">
              {/* NAME + CATEGORY */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink-900 dark:text-slate-100">
                    {form.name || "New menu item"}
                  </p>

                  <p className="text-sm text-ink-500 dark:text-slate-400">
                    {form.category}
                  </p>
                </div>

                <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Available
                </div>
              </div>

              {/* STORE */}
              <p className="text-sm text-ink-600 dark:text-slate-300">
                {form.storeName || "Restaurant name"}
              </p>

              {/* PREP TIME */}
              <p className="text-sm text-ink-500 dark:text-slate-400">
                Preparation: {form.prepTime || "20-30 mins"}
              </p>

              {/* PRICE */}
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
              <li>• Use a clear food image.</li>
              <li>• Enter the correct price.</li>
              <li>• Add an accurate preparation time.</li>
              <li>• Make sure the store name is correct.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}