import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Summary() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDocuments = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/documents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setDocuments(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadDocuments();
  }, []);

  const generateSummary = async () => {
    if (!selectedDocument) {
      alert("Please select an uploaded document first");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setSummary("");

      const res = await fetch(
        `http://localhost:5000/api/ai/summary/${selectedDocument}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Summary generation failed");
        return;
      }

      setSummary(data.content || "No summary received.");
    } catch (error) {
      alert("AI connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copySummary = () => {
    if (!summary) return;

    navigator.clipboard.writeText(summary);
    alert("Summary copied!");
  };

  const downloadSummary = () => {
    if (!summary) return;

    const blob = new Blob([summary], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI-Summary.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1>📄 Summary Generator</h1>
          <p>Generate short and easy summaries from your study materials.</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          Back to Dashboard
        </Link>
      </div>

      <div className="generator-layout">
        <div className="generator-card">
          <h2>Select Study Material</h2>

          <select
            value={selectedDocument}
            onChange={(e) => setSelectedDocument(e.target.value)}
          >
            <option value="">-- Select uploaded document --</option>

            {documents.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.fileName}
              </option>
            ))}
          </select>

          <button onClick={generateSummary} disabled={loading}>
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </div>

        <div className="result-card">
          <h2>Generated Summary</h2>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {summary ||
              "Select an uploaded document and click Generate Summary."}
          </p>

          <div className="result-actions">
            <button onClick={copySummary} disabled={!summary}>
              Copy
            </button>

            <button onClick={downloadSummary} disabled={!summary}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;