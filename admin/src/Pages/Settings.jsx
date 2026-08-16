import { useState } from "react";
import {
  Loader2,
  CheckCircle2,
  ShieldCheck,
  BellRing,
  MoonStar,
  SunMedium,
} from "lucide-react";
import { updateSettings } from "../api";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [prefs, setPrefs] = useState({
    orderNotif: true,
    customerNotif: true,
    marketingEmails: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const togglePref = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await updateSettings({ prefs, passwords });
    setSaving(false);
    setSaved(true);
    setPasswords({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="max-w-2xl animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-ink-500 text-sm mt-1">
          Notification aur account settings manage karo.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-ink-900 dark:text-slate-100">
                Appearance
              </h3>
              <p className="text-sm text-ink-500 dark:text-slate-400">
                Switch between light and dark mode whenever you prefer.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="btn-secondary"
            >
              {theme === "dark" ? (
                <SunMedium size={16} />
              ) : (
                <MoonStar size={16} />
              )}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        <div className="card space-y-4">
          <h3 className="font-semibold text-ink-900 dark:text-slate-100">
            Notifications
          </h3>
          {[
            {
              key: "orderNotif",
              label: "New order notifications",
              desc: "Har naye order par alert milega.",
            },
            {
              key: "customerNotif",
              label: "Customer sign-up alerts",
              desc: "Naye customer register hone par.",
            },
            {
              key: "marketingEmails",
              label: "Marketing emails",
              desc: "Promotions aur updates ke email.",
            },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-ink-800 dark:text-slate-200">
                  {label}
                </p>
                <p className="text-xs text-ink-500 dark:text-slate-400">
                  {desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => togglePref(key)}
                className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent p-1 transition-all duration-200 ${
                  prefs[key]
                    ? "bg-primary shadow-[0_0_0_4px_rgba(255,110,74,0.14)]"
                    : "bg-ink-200 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    prefs[key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="card space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={16} />
            <h3 className="font-semibold text-ink-900 dark:text-slate-100">
              Change Password
            </h3>
          </div>
          <div>
            <label className="label">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="input"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">New Password</label>
              <input
                type="password"
                value={passwords.next}
                onChange={(e) =>
                  setPasswords({ ...passwords, next: e.target.value })
                }
                className="input"
              />
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="input"
              />
            </div>
          </div>
        </div>

        {saved && (
          <p className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-sm text-green-600">
            <CheckCircle2 size={16} /> Settings saved successfully.
          </p>
        )}

        <button type="submit" disabled={saving} className="btn-primary px-6">
          {saving && <Loader2 size={17} className="animate-spin" />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
