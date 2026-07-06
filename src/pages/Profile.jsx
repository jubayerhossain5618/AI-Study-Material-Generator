import { useState } from "react";
import { Camera } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [profileForm, setProfileForm] = useState({ fullName: user?.fullName || "", bio: user?.bio || "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSavingProfile(true);
    try {
      await api.put("/auth/profile", profileForm);
      await refreshUser();
      setMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSavingPassword(true);
    try {
      await api.put("/auth/change-password", passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setMessage("Password changed successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  const toggleSetting = async (field) => {
    try {
      await api.put("/auth/profile", { [field]: !user[field] });
      await refreshUser();
    } catch {
      setError("Failed to update setting");
    }
  };

  return (
    <DashboardLayout title="User Profile">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-ink/5 bg-white p-8 text-center shadow-card">
            <div className="relative mx-auto h-32 w-32">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-gradient font-display text-4xl font-bold text-white">
                {user?.fullName?.[0]?.toUpperCase() || "S"}
              </div>
              <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft">
                <Camera className="h-4.5 w-4.5 text-ink/60" />
              </button>
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold">{user?.fullName}</h2>
            <p className="mt-1 text-sm text-ink/50">{user?.email}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5">
              <span className="text-xs font-semibold text-brand-700">{user?.plan === "pro" ? "Pro Member" : "Free Member"}</span>
            </div>
            <p className="mt-3 text-xs text-ink/40">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
            <h3 className="font-display text-base font-semibold">Quick Stats</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="font-display text-2xl font-bold">{user?.stats?.totalUploads ?? 0}</p>
                <p className="mt-1 text-xs text-ink/50">Uploads</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="font-display text-2xl font-bold">{user?.stats?.materialsGenerated ?? 0}</p>
                <p className="mt-1 text-xs text-ink/50">Materials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          {(message || error) && (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                error ? "border border-red-200 bg-red-50 text-red-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {error || message}
            </div>
          )}

          <form onSubmit={handleProfileSave} className="rounded-2xl border border-ink/5 bg-white shadow-card">
            <div className="border-b border-ink/5 px-8 py-6">
              <h3 className="font-display text-lg font-semibold">Personal Information</h3>
            </div>
            <div className="space-y-6 p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/70">Full Name</label>
                  <input
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/70">Email Address</label>
                  <input
                    disabled
                    value={user?.email || ""}
                    className="w-full rounded-xl border border-ink/10 bg-slate-50 px-4 py-3 text-sm text-ink/50"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink/70">Bio</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="rounded-xl bg-brand-gradient px-8 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Update Profile"}
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={handlePasswordSave} className="rounded-2xl border border-ink/5 bg-white shadow-card">
            <div className="border-b border-ink/5 px-8 py-6">
              <h3 className="font-display text-lg font-semibold">Security & Password</h3>
            </div>
            <div className="space-y-6 p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/70">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink/70">New Password</label>
                  <input
                    type="password"
                    minLength={8}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="rounded-xl border border-ink/10 px-8 py-3 text-sm font-semibold text-ink/70 hover:bg-ink/5 disabled:opacity-60"
                >
                  {savingPassword ? "Updating..." : "Change Password"}
                </button>
              </div>
            </div>
          </form>

          <div className="rounded-2xl border border-ink/5 bg-white shadow-card">
            <div className="border-b border-ink/5 px-8 py-6">
              <h3 className="font-display text-lg font-semibold">Account Settings</h3>
            </div>
            <div className="space-y-5 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-ink/50">Receive weekly study reports and product updates.</p>
                </div>
                <Toggle enabled={user?.emailNotifications} onClick={() => toggleSetting("emailNotifications")} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Public Profile</p>
                  <p className="text-xs text-ink/50">Allow others to see your shared study materials.</p>
                </div>
                <Toggle enabled={user?.publicProfile} onClick={() => toggleSetting("publicProfile")} />
              </div>
              <div className="border-t border-ink/5 pt-5">
                <button className="text-sm font-medium text-red-600 hover:underline">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Toggle({ enabled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled ? "bg-brand-600" : "bg-ink/15"}`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
