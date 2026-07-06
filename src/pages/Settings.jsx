import { Link } from "react-router-dom";
import { Bell, Shield, Sparkles, ArrowRight } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Settings() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Settings">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Sparkles className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">Plan & Credits</h3>
              <p className="text-xs text-ink/50">
                {user?.plan === "pro" ? "Pro Plan — unlimited generation" : `${user?.credits ?? 0} AI credits remaining`}
              </p>
            </div>
          </div>
          {user?.plan !== "pro" && (
            <button className="mt-4 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">
              Upgrade to Pro
            </button>
          )}
        </div>

        <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Bell className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">Notification & Privacy Preferences</h3>
              <p className="text-xs text-ink/50">Manage email notifications and profile visibility.</p>
            </div>
          </div>
          <Link
            to="/profile"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
          >
            Manage in Profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <Shield className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">Security</h3>
              <p className="text-xs text-ink/50">Change your password or enable two-factor authentication.</p>
            </div>
          </div>
          <Link
            to="/profile"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
          >
            Manage in Profile <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
