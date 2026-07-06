import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: Form */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
              <Sparkles className="h-5 w-5 text-white" />
            </Link>
            <h1 className="mt-6 font-display text-3xl font-bold text-ink">Create Account</h1>
            <p className="mt-2 text-sm text-ink/60">Join 20,000+ students learning smarter</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink/70">Full Name</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                <input
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-ink/10 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>

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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-ink/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Confirm</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-ink/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-ink/20 text-brand-600 focus:ring-brand-400"
              />
              I agree to the Terms of Service and Privacy Policy
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-gradient py-4 font-semibold text-white shadow-soft transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-ink/60">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-ink-gradient lg:flex">
        <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative z-10 max-w-md px-10 text-center">
          <Sparkles className="mx-auto h-16 w-16 text-brand-300" strokeWidth={1} />
          <h2 className="mt-8 font-display text-3xl font-bold text-white">Start Your AI Journey Today</h2>
          <p className="mt-4 text-white/60">
            Create an account and get access to powerful study tools that adapt to your learning style.
          </p>
        </div>
      </div>
    </div>
  );
}
