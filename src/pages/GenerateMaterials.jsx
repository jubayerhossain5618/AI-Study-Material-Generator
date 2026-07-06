import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  UploadCloud,
  FileText,
  ListChecks,
  Layers,
  ClipboardList,
  Sparkles,
  Loader2,
  Download,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const outputTypes = [
  { key: "summary", label: "Summary", icon: FileText },
  { key: "mcq", label: "MCQs", icon: ListChecks },
  { key: "flashcards", label: "Flashcards", icon: Layers },
  { key: "full_quiz", label: "Full Quiz", icon: ClipboardList },
];

export default function GenerateMaterials() {
  const fileInputRef = useRef(null);
  const { refreshUser } = useAuth();

  const [file, setFile] = useState(null);
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [outputType, setOutputType] = useState("summary");
  const [generating, setGenerating] = useState(false);
  const [material, setMaterial] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [error, setError] = useState("");

  const handleFileSelect = async (selected) => {
    if (!selected) return;
    setFile(selected);
    setError("");
    setMaterial(null);
    setUploading(true);
    setUploadProgress(15);

    const formData = new FormData();
    formData.append("file", selected);

    try {
      const { data } = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          setUploadProgress(Math.round((evt.loaded * 100) / evt.total));
        },
      });
      setDocument(data.document);
      refreshUser();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleGenerate = async () => {
    if (!document) {
      setError("Please upload a document first.");
      return;
    }
    setError("");
    setGenerating(true);
    setMaterial(null);

    try {
      const { data } = await api.post("/materials/generate", {
        documentId: document._id,
        outputType,
      });
      setMaterial(data.material);
      setActiveTab(outputType === "full_quiz" ? "summary" : outputType);
      refreshUser();
    } catch (err) {
      setError(err.response?.data?.message || "Generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout title="AI Material Generator">
      <div className="mx-auto max-w-4xl space-y-8">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {/* Step 1: Upload */}
        <div className="rounded-2xl border border-ink/5 bg-white p-10 text-center shadow-card">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50">
            <UploadCloud className="h-9 w-9 text-brand-600" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold">Upload your study material</h2>
          <p className="mt-2 text-sm text-ink/50">Support for PDF, DOCX, and TXT (Max 50MB)</p>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileSelect(e.dataTransfer.files?.[0]);
            }}
            className="mt-6 cursor-pointer rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 py-8 transition hover:border-brand-400 hover:bg-brand-50"
          >
            <p className="text-sm font-medium text-ink/60">
              Drag and drop your file here or <span className="text-brand-600 underline">browse files</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
          </div>

          {file && (
            <div className="mt-6 text-left">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink/70">{file.name}</span>
                <span className="text-ink/50">{uploading ? `${uploadProgress}%` : "Ready"}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-brand-gradient transition-all"
                  style={{ width: `${uploading ? uploadProgress : 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Selection */}
        <div>
          <h3 className="px-1 text-sm font-semibold text-ink/60">Select Output Type</h3>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {outputTypes.map((t) => (
              <button
                key={t.key}
                onClick={() => setOutputType(t.key)}
                className={`rounded-2xl border p-6 text-center transition ${
                  outputType === t.key
                    ? "border-brand-400 bg-brand-50 shadow-soft"
                    : "border-ink/10 bg-white hover:border-brand-200"
                }`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${
                    outputType === t.key ? "bg-brand-gradient" : "bg-slate-100"
                  }`}
                >
                  <t.icon className={`h-5 w-5 ${outputType === t.key ? "text-white" : "text-ink/50"}`} />
                </div>
                <p className="mt-3 text-sm font-semibold text-ink/80">{t.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating || uploading || !document}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient py-4 font-semibold text-white shadow-glow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Generating with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" /> Generate Study Materials
            </>
          )}
        </button>

        {/* Step 3: Results */}
        {material && (
          <div className="rounded-2xl border border-ink/5 bg-white shadow-card">
            <div className="flex border-b border-ink/5">
              {material.summary && (
                <TabButton label="Generated Summary" active={activeTab === "summary"} onClick={() => setActiveTab("summary")} />
              )}
              {material.mcqs?.length > 0 && (
                <TabButton
                  label={`MCQs (${material.mcqs.length})`}
                  active={activeTab === "mcq"}
                  onClick={() => setActiveTab("mcq")}
                />
              )}
              {material.flashcards?.length > 0 && (
                <TabButton
                  label={`Flashcards (${material.flashcards.length})`}
                  active={activeTab === "flashcards"}
                  onClick={() => setActiveTab("flashcards")}
                />
              )}
            </div>

            <div className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="font-display text-xl font-semibold">{material.title}</h4>
                <button className="flex items-center gap-2 rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink/60 hover:bg-ink/5">
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>

              {activeTab === "summary" && material.summary && (
                <div className="prose prose-sm max-w-none prose-headings:font-display">
                  <ReactMarkdown>{material.summary}</ReactMarkdown>
                </div>
              )}

              {activeTab === "mcq" && (
                <div className="space-y-6">
                  {material.mcqs.map((q, i) => (
                    <div key={i} className="rounded-xl border border-ink/10 p-5">
                      <p className="font-medium text-ink/80">
                        {i + 1}. {q.question}
                      </p>
                      <div className="mt-3 space-y-2">
                        {q.options.map((opt, oi) => (
                          <div
                            key={oi}
                            className={`rounded-lg border px-4 py-2 text-sm ${
                              oi === q.correctIndex
                                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                : "border-ink/10 text-ink/70"
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                      {q.explanation && <p className="mt-3 text-xs text-ink/50">💡 {q.explanation}</p>}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "flashcards" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {material.flashcards.map((card, i) => (
                    <div key={i} className="rounded-xl border border-ink/10 bg-slate-50 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Front</p>
                      <p className="mt-1.5 font-medium text-ink/80">{card.front}</p>
                      <div className="my-3 h-px bg-ink/10" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Back</p>
                      <p className="mt-1.5 text-sm text-ink/70">{card.back}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-5 text-sm font-semibold transition ${
        active ? "border-b-2 border-brand-600 text-brand-700" : "text-ink/50 hover:text-ink/80"
      }`}
    >
      {label}
    </button>
  );
}
