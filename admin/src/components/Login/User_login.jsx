import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UtensilsCrossed, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { userLogin } from "../../api";

export default function User_login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await userLogin(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-ink-50 px-6 py-12">
      <div className="w-full max-w-sm card animate-fadeIn">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <UtensilsCrossed size={24} />
          </div>
          <h2 className="text-2xl font-bold">User Login</h2>
          <p className="text-ink-500 text-sm mt-1">Login to order your favourite food.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500 hover:text-primary transition-colors"
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2">
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-ink-500 mt-8">
          Are you an admin?{" "}
          <Link to="/" className="text-primary font-medium hover:underline">
            Go to admin login
          </Link>
        </p>
      </div>
    </div>
  );
}
