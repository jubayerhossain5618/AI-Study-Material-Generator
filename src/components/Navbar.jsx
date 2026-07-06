import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-ink/5 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            StudyGen<span className="text-brand-600">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-ink/70 transition hover:text-brand-600">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink/70 transition hover:text-brand-600">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/5 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-ink/70" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <Link to="/dashboard" className="rounded-xl bg-brand-gradient px-5 py-2.5 text-center text-sm font-semibold text-white">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="rounded-xl border border-ink/10 px-5 py-2.5 text-center text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="rounded-xl bg-brand-gradient px-5 py-2.5 text-center text-sm font-semibold text-white">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
