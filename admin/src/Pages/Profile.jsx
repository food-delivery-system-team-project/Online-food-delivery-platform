import { useEffect, useState } from "react";
import { Loader2, Save, UserCircle } from "lucide-react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get logged-in user
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("users/profile");

        const userData = response.data?.user;

        if (!userData) {
          throw new Error("User data not found");
        }

        setUser(userData);

        setForm({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      } catch (error) {
        console.error("Profile error:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await api.put("users/profile", form);

      const updatedUser = response.data?.user;

      if (updatedUser) {
        setUser(updatedUser);

        setForm({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          phone: updatedUser.phone || "",
        });
      }

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={28} />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
          Account
        </p>

        <h1 className="page-heading mt-1">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
          View and update your account information.
        </p>
      </div>

      {/* Profile card */}
      <div className="card">
        <div className="flex items-center gap-4 border-b border-ink-100 pb-6 dark:border-slate-800">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <UserCircle size={38} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink-900 dark:text-white">
              {user?.name || "User"}
            </h2>

            <p className="text-sm text-ink-500 dark:text-slate-400">
              {user?.email}
            </p>

            {user?.role && (
              <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {user.role}
              </span>
            )}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label className="label">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="label">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Role */}
            <div>
              <label className="label">
                Role
              </label>

              <input
                type="text"
                value={user?.role || ""}
                disabled
                className="input cursor-not-allowed opacity-60"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          {/* Save */}
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}