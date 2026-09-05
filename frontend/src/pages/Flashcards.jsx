import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Flashcards() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [flashcards, setFlashcards] = useState("");
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
      .replace(/^\s*[-*]\s+/gm, "• ")
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
  // GENERATE FLASHCARDS
  // =========================

  const generateFlashcards = async () => {
    if (!selectedDocument) {
      alert(
        "Please select an uploaded document first."
      );
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setFlashcards("");

      const res = await fetch(
        `http://localhost:5000/api/ai/flashcards/${selectedDocument}`,
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
            "Flashcard generation failed."
        );
        return;
      }

      if (!data.content || !data.content.trim()) {
        alert(
          "AI returned an empty flashcard response."
        );
        return;
      }

      const cleanedFlashcards =
        cleanMarkdown(data.content);

      setFlashcards(cleanedFlashcards);

    } catch (error) {
      console.error(
        "Flashcard generation error:",
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
  // COPY FLASHCARDS
  // =========================

  const copyFlashcards = async () => {
    if (!flashcards) return;

    try {
      await navigator.clipboard.writeText(
        flashcards
      );

      alert("Flashcards copied!");

    } catch (error) {
      console.error(
        "Copy error:",
        error
      );
    }
  };


  // =========================
  // DOWNLOAD FLASHCARDS
  // =========================

  const downloadFlashcards = () => {
    if (!flashcards) return;

    const blob = new Blob(
      [flashcards],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "AI-Flashcards.txt";

    a.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className="page-shell">

      <div className="page-header">

        <div>
          <h1>
            🗂️ Flashcards Generator
          </h1>

          <p>
            Create quick flashcards for fast
            revision and memorization.
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

          <h2>
            Select Study Material
          </h2>

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
            onClick={generateFlashcards}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Flashcards"}
          </button>

        </div>


        <div className="result-card">

          <h2>
            Flashcards Preview
          </h2>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {flashcards ||
              "Select an uploaded document and click Generate Flashcards."}
          </div>


          <div className="result-actions">

            <button
              onClick={copyFlashcards}
              disabled={!flashcards}
            >
              Copy
            </button>

            <button
              onClick={downloadFlashcards}
              disabled={!flashcards}
            >
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Flashcards;