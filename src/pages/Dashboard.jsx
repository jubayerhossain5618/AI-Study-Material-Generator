import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, Layers, MessagesSquare, TrendingUp, ArrowRight, Eye } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const statusStyles = {
  processed: "bg-emerald-50 text-emerald-700",
  processing: "bg-amber-50 text-amber-700",
  failed: "bg-red-50 text-red-700",
  uploaded: "bg-slate-100 text-slate-600",
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/documents")
      .then(({ data }) => setDocuments(data.documents.slice(0, 5)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Uploads", value: user?.stats?.totalUploads ?? 0, icon: UploadCloud, delta: "12% from last week" },
    { label: "Generated Materials", value: user?.stats?.materialsGenerated ?? 0, icon: FileText, delta: "8% from last week" },
    { label: "Flashcards Mastered", value: user?.stats?.flashcardsMastered ?? 0, icon: Layers, delta: "25% from last week" },
    { label: "AI Chat Sessions", value: user?.stats?.chatSessions ?? 0, icon: MessagesSquare, delta: "Same as last week" },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-brand-gradient p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Welcome back, {user?.fullName?.split(" ")[0] || "there"}! 👋</h2>
            <p className="mt-2 max-w-md text-sm text-white/80">
              Ready to supercharge your study session? Upload a document and let AI handle the heavy lifting.
            </p>
          </div>
          <button
            onClick={() => navigate("/generate")}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-soft transition hover:bg-white/90"
          >
            <UploadCloud className="h-5 w-5" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
              <s.icon className="h-5 w-5 text-brand-600" />
            </div>
            <p className="mt-5 text-sm text-ink/50">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">{s.value}</p>
            <p className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" /> {s.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Uploads Table */}
        <div className="rounded-2xl border border-ink/5 bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink/5 px-6 py-5">
            <h3 className="font-display text-lg font-semibold">Recent Uploads</h3>
            <button onClick={() => navigate("/generate")} className="text-sm font-medium text-brand-600 hover:underline">
              View All
            </button>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-ink/40">Loading...</div>
          ) : documents.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-ink/50">No documents yet — upload your first one to get started.</p>
              <button
                onClick={() => navigate("/generate")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
              >
                Upload Document <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-ink/40">
                  <th className="px-6 py-3">Document Name</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc._id} className="border-t border-ink/5">
                    <td className="flex items-center gap-3 px-6 py-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
                        <FileText className="h-4 w-4 text-brand-600" />
                      </div>
                      <span className="font-medium text-ink/80">{doc.originalName}</span>
                    </td>
                    <td className="px-6 py-4 text-ink/50">{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[doc.status]}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => navigate("/generate")} className="text-ink/40 hover:text-brand-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* AI Chat Quick Access */}
        <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <MessagesSquare className="h-5 w-5 text-brand-600" />
            </div>
            <h3 className="font-display text-lg font-semibold">AI Study Buddy</h3>
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-ink/70">
            "Hi {user?.fullName?.split(" ")[0] || "there"}! Ready to turn your notes into a quiz, summary, or
            flashcards? Ask me anything about your uploaded material."
          </div>

          <div className="mt-4 space-y-2.5">
            {["Start a Quiz", "Summarize My Notes", "Explain a Concept"].map((label) => (
              <button
                key={label}
                onClick={() => navigate("/chatbot")}
                className="w-full rounded-xl border border-ink/10 px-4 py-2.5 text-left text-sm font-medium text-ink/70 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/chatbot")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3 text-sm font-semibold text-white"
          >
            Open Chat <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
