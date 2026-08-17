import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChefHat,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Loader2,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Login } from "../../api/authApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const useDemo = () => {
    setForm({ email: "admin@foodhub.com", password: "foodhub-demo" });
    setError("");
  };
  
  const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    const data = await Login(form);

    console.log("Login successful:", data);

    navigate("/dashboard");
  } catch (err) {
    setError(
      err?.response?.data?.message ||
        err.message ||
        "Login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }

};
  return (
    <main className="min-h-screen bg-ink-50 lg:grid lg:grid-cols-[1.15fr_.85fr]">
      <section className="auth-scene hidden min-h-screen px-10 py-10 text-white lg:flex lg:flex-col xl:px-16">
        <span className="auth-orb auth-orb-one" />
        <span className="auth-orb auth-orb-two" />
        <span className="auth-grid" />
        <div className="relative z-10 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 shadow-lg backdrop-blur">
            <ChefHat size={23} />
          </span>
          <div>
            <p className="font-display text-xl font-extrabold tracking-tight">
              FoodHub
            </p>
            <p className="text-xs font-medium uppercase tracking-[.18em] text-white/65">
              Admin workspace
            </p>
          </div>
        </div>
        <div className="relative z-10 my-auto max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
            <Sparkles size={14} className="text-primary-200" /> Restaurant
            intelligence, simplified
          </div>
          <h1 className="font-display text-5xl font-extrabold leading-[1.08] tracking-tight xl:text-6xl">
            The smarter way to run every service.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/75">
            Keep orders moving, menus fresh and customer experiences memorable
            with one powerful control centre.
          </p>
          <div className="mt-9 grid max-w-lg grid-cols-3 gap-3">
            <div className="auth-stat rounded-2xl p-4">
              <TrendingUp size={19} className="mb-3 text-primary-100" />
              <b className="block text-lg">+18.2%</b>
              <small className="mt-1 block text-xs text-white/65">
                Sales growth
              </small>
            </div>
            <div className="auth-stat rounded-2xl p-4">
              <CheckCircle2 size={19} className="mb-3 text-emerald-200" />
              <b className="block text-lg">99.9%</b>
              <small className="mt-1 block text-xs text-white/65">
                System uptime
              </small>
            </div>
            <div className="auth-stat rounded-2xl p-4">
              <ShieldCheck size={19} className="mb-3 text-sky-200" />
              <b className="block text-lg">Secure</b>
              <small className="mt-1 block text-xs text-white/65">
                Admin access
              </small>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/55">
          FoodHub Admin Panel · 2026
        </p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md animate-rise-in">
          <div className="mb-9 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <ChefHat size={21} />
              </span>
              <span className="font-display font-extrabold text-ink-900">
                FoodHub
              </span>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary">
              Admin
            </span>
          </div>
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">
              Welcome back
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink-900">
              Sign in to your workspace
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-500">
              Use your admin credentials to open the restaurant control centre.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-ink-100 bg-white p-5 shadow-xl shadow-ink-900/[.04] sm:p-7"
          >
            <div>
              <label className="label">Email address</label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@foodhub.com"
                  className="input py-3 pl-10"
                />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
                />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input py-3 pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((value) => !value)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-ink-500 transition hover:text-primary"
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-500">
                <input
                  type="checkbox"
                  className="rounded border-ink-300 text-primary focus:ring-primary/30"
                />{" "}
                Remember me
              </label>
              <button
                type="button"
                className="text-sm font-bold text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            {error && (
              <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-sm"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Open dashboard <ArrowRight size={17} />
                </>
              )}
              {loading && "Signing you in..."}
            </button>
          </form>
          <button
            type="button"
            onClick={useDemo}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-4 py-3 text-sm font-bold text-primary transition hover:bg-primary-50"
          >
            <Sparkles size={16} /> Fill demo credentials
          </button>
          <p className="mt-6 text-center text-xs leading-5 text-ink-500">
            <ShieldCheck size={14} className="mr-1 inline text-emerald-600" />{" "}
            Secure admin-only access · Demo accepts any valid email and
            password.
          </p>
        </div>
      </section>
    </main>
  );
}
