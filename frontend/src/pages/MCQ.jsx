import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MCQ() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [mcqs, setMcqs] = useState("");
  const [loading, setLoading] = useState(false);


  // =========================
  // CLEAN AI MARKDOWN
  // =========================

  const cleanMarkdown = (text) => {
    if (!text) return "";

    return text
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .trim();
  };


  // =========================
  // LOAD DOCUMENTS
  // =========================

  useEffect(() => {
    const loadDocuments = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          "http://localhost:5000/api/documents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setDocuments(data);
        }
      } catch (error) {
        console.error(
          "Document loading error:",
          error
        );
      }
    };

    loadDocuments();
  }, []);


  // =========================
  // GENERATE MCQ
  // =========================

  const generateMCQ = async () => {
    if (!selectedDocument) {
      alert(
        "Please select an uploaded document first."
      );
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setMcqs("");

      const res = await fetch(
        `http://localhost:5000/api/ai/mcq/${selectedDocument}`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "MCQ generation failed."
        );
        return;
      }

      if (!data.content || !data.content.trim()) {
        alert(
          "AI returned an empty MCQ response."
        );
        return;
      }

      const cleanedMCQ =
        cleanMarkdown(data.content);

      setMcqs(cleanedMCQ);

    } catch (error) {
      console.error(
        "MCQ generation error:",
        error
      );

      alert(
        "AI connection failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // COPY MCQ
  // =========================

  const copyMCQ = async () => {
    if (!mcqs) return;

    try {
      await navigator.clipboard.writeText(
        mcqs
      );

      alert("MCQs copied!");

    } catch (error) {
      console.error("Copy error:", error);
    }
  };


  // =========================
  // DOWNLOAD MCQ
  // =========================

  const downloadMCQ = () => {
    if (!mcqs) return;

    const blob = new Blob(
      [mcqs],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "AI-MCQs.txt";

    a.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className="page-shell">

      <div className="page-header">

        <div>
          <h1>🧠 MCQ Generator</h1>

          <p>
            Create multiple choice questions
            from your study materials.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="back-btn"
        >
          Back to Dashboard
        </Link>

      </div>


      <div className="generator-layout">

        <div className="generator-card">

          <h2>Select Study Material</h2>

          <select
            value={selectedDocument}
            onChange={(e) =>
              setSelectedDocument(
                e.target.value
              )
            }
          >
            <option value="">
              -- Select uploaded document --
            </option>

            {documents.map((doc) => (
              <option
                key={doc._id}
                value={doc._id}
              >
                {doc.fileName}
              </option>
            ))}

          </select>


          <button
            onClick={generateMCQ}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate MCQs"}
          </button>

        </div>


        <div className="result-card">

          <h2>Generated MCQs</h2>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {mcqs ||
              "Select an uploaded document and click Generate MCQs."}
          </div>


          <div className="result-actions">

            <button
              onClick={copyMCQ}
              disabled={!mcqs}
            >
              Copy
            </button>

            <button
              onClick={downloadMCQ}
              disabled={!mcqs}
            >
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MCQ;