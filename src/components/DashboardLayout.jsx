import Sidebar from "./Sidebar.jsx";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardLayout({ title, children }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b border-ink/5 bg-white px-6">
          {title ? (
            <h1 className="font-display text-xl font-semibold">{title}</h1>
          ) : (
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                type="text"
                placeholder="Search materials, history..."
                className="w-full rounded-xl border border-ink/10 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 text-ink/60 transition hover:bg-ink/5">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent-500" />
            </button>
            <div className="flex items-center gap-3 border-l border-ink/10 pl-4">
              <div className="text-right">
                <p className="text-sm font-semibold leading-tight">{user?.fullName || "Student"}</p>
                <p className="text-xs text-ink/50">{user?.plan === "pro" ? "Pro Account" : "Student Account"}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-semibold text-white">
                {user?.fullName?.[0]?.toUpperCase() || "S"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
