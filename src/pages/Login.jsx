import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
            <Sparkles className="h-5 w-5 text-white" />
          </Link>
          <h1 className="mt-6 font-display text-3xl font-bold text-ink">Welcome Back</h1>
          <p className="mt-2 text-sm text-ink/60">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink/70">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-ink/10 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-sm font-medium text-ink/70">Password</label>
              <a href="#" className="text-xs font-medium text-brand-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-ink/10 bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" className="h-4 w-4 rounded border-ink/20 text-brand-600 focus:ring-brand-400" />
            Remember me for 30 days
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-gradient py-4 font-semibold text-white shadow-soft transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-ink/10" />
          <span className="text-xs text-ink/40">Or continue with</span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-ink/10 bg-white py-3.5 text-sm font-semibold text-ink/70 transition hover:bg-ink/5">
          <GoogleIcon />
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-ink/60">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.71v2.26h2.92a8.78 8.78 0 002.68-6.61z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.94v2.33A9 9 0 009 18z" fill="#34A853"/>
      <path d="M3.97 10.72a5.4 5.4 0 010-3.44V4.95H.94a9 9 0 000 8.1l3.03-2.33z" fill="#FBBC05"/>
      <path d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59A8.6 8.6 0 009 0 9 9 0 00.94 4.95l3.03 2.33C4.68 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
