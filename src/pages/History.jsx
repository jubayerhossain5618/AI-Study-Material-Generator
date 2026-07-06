import { useEffect, useState } from "react";
import { FileText, ListChecks, Layers, ClipboardList } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import api from "../api/axios.js";

const typeMeta = {
  summary: { icon: FileText, label: "Summary" },
  mcq: { icon: ListChecks, label: "MCQs" },
  flashcards: { icon: Layers, label: "Flashcards" },
  full_quiz: { icon: ClipboardList, label: "Full Quiz" },
};

export default function History() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/materials")
      .then(({ data }) => setMaterials(data.materials))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="History">
      <div className="mx-auto max-w-4xl">
        {loading ? (
          <p className="text-sm text-ink/40">Loading...</p>
        ) : materials.length === 0 ? (
          <div className="rounded-2xl border border-ink/5 bg-white p-16 text-center shadow-card">
            <p className="text-sm text-ink/50">You haven&apos;t generated any materials yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {materials.map((m) => {
              const meta = typeMeta[m.outputType] || typeMeta.summary;
              return (
                <div key={m._id} className="flex items-center gap-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <meta.icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink/80">{m.title}</p>
                    <p className="mt-0.5 text-xs text-ink/40">
                      {meta.label} · {m.document?.originalName} · {new Date(m.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
