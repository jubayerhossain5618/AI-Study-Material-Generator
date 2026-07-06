import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileStack, MessagesSquare, History, UserCircle2, Settings, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/generate", label: "Generate Materials", icon: FileStack },
  { to: "/chatbot", label: "AI Chatbot", icon: MessagesSquare },
  { to: "/history", label: "History", icon: History },
];

const accountItems = [
  { to: "/profile", label: "Profile", icon: UserCircle2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive ? "bg-brand-50 text-brand-700" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
    }`;

  return (
    <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-ink/5 bg-white lg:flex">
      <div className="flex h-20 items-center gap-2.5 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="font-display text-base font-semibold">StudyGenAI</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}

        <p className="px-4 pb-2 pt-6 text-xs font-semibold uppercase tracking-wide text-ink/30">Account</p>
        {accountItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4">
        {user?.plan === "free" && (
          <div className="mb-4 rounded-2xl border border-brand-100 bg-brand-50 p-4">
            <p className="text-sm font-semibold text-brand-800">Pro Plan</p>
            <p className="mt-1.5 text-xs leading-relaxed text-brand-700/80">
              Get unlimited AI generation and priority support.
            </p>
            <button className="mt-3 w-full rounded-lg bg-brand-gradient py-2 text-xs font-semibold text-white">
              Upgrade Now
            </button>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink/60 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
