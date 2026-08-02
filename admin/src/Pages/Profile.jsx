import { useEffect, useState } from "react";
import { BellRing, Camera, CheckCircle2, Clock3, Loader2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { getAdminProfile, updateAdminProfile } from "../api";
import { useTheme } from "../context/ThemeContext";

const defaultProfile = {
  name: "Ananya Mehta",
  email: "admin@foodhub.com",
  phone: "9090909090",
  role: "Super Admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
  bio: "Runs daily operations, monitors growth, and keeps the kitchen team aligned.",
  location: "Indore, India",
  timezone: "Asia/Kolkata",
  joined: "12 Jan 2025",
  lastLogin: "Today • 09:45 AM",
  preferences: {
    liveUpdates: true,
    orderAlerts: true,
    weeklyReports: false,
  },
};

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAdminProfile().then((data) => {
      setProfile({
        ...defaultProfile,
        ...data,
        preferences: { ...defaultProfile.preferences, ...(data.preferences || {}) },
      });
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => setProfile({ ...profile, [event.target.name]: event.target.value });

  const handleToggle = (key) =>
    setProfile((current) => ({
      ...current,
      preferences: { ...current.preferences, [key]: !current.preferences[key] },
    }));

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((current) => ({ ...current, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateAdminProfile({ ...profile, preferences: profile.preferences });
    setSaving(false);
    setSaved(true);
  };

  if (loading) {
    return <div className="card h-64 max-w-5xl animate-pulse bg-ink-100/60 dark:bg-slate-800" />;
  }

  return (
    <div className="max-w-5xl animate-fadeIn space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">Admin workspace</p>
          <h1 className="page-heading mt-1">Profile & controls</h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">Manage your identity, preferences, and daily admin access in one place.</p>
        </div>
        <button type="button" onClick={toggleTheme} className="btn-secondary w-fit">
          {theme === "dark" ? <Sparkles size={16} /> : <Sparkles size={16} />}
          {theme === "dark" ? "Switch to light" : "Switch to dark"}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="flex flex-col gap-5 rounded-2xl border border-ink-100/80 bg-ink-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={profile.avatar} alt="avatar" className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/20" />
                <label className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-soft transition hover:bg-primary-600">
                  <Camera size={14} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <div>
                <p className="font-semibold text-ink-900 dark:text-slate-100">{profile.name}</p>
                <p className="text-sm text-ink-500 dark:text-slate-400">{profile.role}</p>
                <p className="mt-1 text-xs text-primary">{profile.location}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white px-3 py-2 text-sm shadow-sm dark:bg-slate-900">
              <p className="font-semibold text-ink-900 dark:text-slate-100">Last login</p>
              <p className="text-ink-500 dark:text-slate-400">{profile.lastLogin}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Full Name</label>
              <input name="name" value={profile.name} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input name="phone" value={profile.phone} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Role</label>
              <input name="role" value={profile.role} disabled className="input cursor-not-allowed opacity-60" />
            </div>
            <div>
              <label className="label">Location</label>
              <input name="location" value={profile.location} onChange={handleChange} className="input" />
            </div>
            <div>
              <label className="label">Timezone</label>
              <input name="timezone" value={profile.timezone} onChange={handleChange} className="input" />
            </div>
          </div>

          <div>
            <label className="label">Short bio</label>
            <textarea name="bio" rows="3" value={profile.bio} onChange={handleChange} className="input resize-none" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Joined", value: profile.joined, icon: Clock3 },
              { label: "Location", value: profile.location, icon: MapPin },
              { label: "Security", value: "Protected", icon: ShieldCheck },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-ink-100 bg-ink-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-800/70">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-slate-200">
                  <Icon size={15} className="text-primary" /> {label}
                </div>
                <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-ink-900 dark:text-slate-100">Preferences</p>
                <p className="text-sm text-ink-500 dark:text-slate-400">Choose how your admin series should stay updated.</p>
              </div>
            </div>
            {[
              { key: "liveUpdates", label: "Live order updates", desc: "Real-time status updates for current operations" },
              { key: "orderAlerts", label: "Order alerts", desc: "Instant alerts for important order activity" },
              { key: "weeklyReports", label: "Weekly reports", desc: "Weekly summaries in your inbox" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between rounded-2xl border border-ink-100 px-3 py-3 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-ink-800 dark:text-slate-200">{label}</p>
                  <p className="text-xs text-ink-500 dark:text-slate-400">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle(key)}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-all duration-200 ${profile.preferences[key] ? "bg-primary shadow-[0_0_0_4px_rgba(255,110,74,0.14)]" : "bg-ink-200 dark:bg-slate-700"}`}
                >
                  <span className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${profile.preferences[key] ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </div>

          {saved && (
            <p className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <CheckCircle2 size={16} /> Profile updated successfully.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={saving} className="btn-primary px-6">
              {saving && <Loader2 size={17} className="animate-spin" />}
              {saving ? "Saving..." : "Save profile"}
            </button>
            <button type="button" onClick={() => setSaved(false)} className="btn-secondary">
              Clear notice
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <ShieldCheck size={16} /> Security overview
            </div>
            <ul className="mt-4 space-y-3 text-sm text-ink-600 dark:text-slate-300">
              <li className="rounded-xl bg-ink-50 px-3 py-2 dark:bg-slate-800">Two-step verification is enabled.</li>
              <li className="rounded-xl bg-ink-50 px-3 py-2 dark:bg-slate-800">Login alerts are active for high-risk sign-ins.</li>
              <li className="rounded-xl bg-ink-50 px-3 py-2 dark:bg-slate-800">Session timeout is set to 30 minutes.</li>
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <BellRing size={16} /> Daily focus
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-ink-100 p-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-ink-900 dark:text-slate-100">3 urgent orders</p>
                <p className="text-xs text-ink-500 dark:text-slate-400">Need kitchen follow-up in 20 minutes.</p>
              </div>
              <div className="rounded-2xl border border-ink-100 p-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-ink-900 dark:text-slate-100">1 stock review</p>
                <p className="text-xs text-ink-500 dark:text-slate-400">Chicken Biryani is below threshold.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
