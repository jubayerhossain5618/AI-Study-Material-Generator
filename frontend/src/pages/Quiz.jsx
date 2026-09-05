import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Quiz() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [quiz, setQuiz] = useState("");
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
  // GENERATE QUIZ
  // =========================

  const generateQuiz = async () => {
    if (!selectedDocument) {
      alert(
        "Please select an uploaded document first."
      );
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setQuiz("");

      const res = await fetch(
        `http://localhost:5000/api/ai/quiz/${selectedDocument}`,
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
            "Quiz generation failed."
        );
        return;
      }

      if (!data.content || !data.content.trim()) {
        alert(
          "AI returned an empty quiz response."
        );
        return;
      }

      const cleanedQuiz =
        cleanMarkdown(data.content);

      setQuiz(cleanedQuiz);

    } catch (error) {
      console.error(
        "Quiz generation error:",
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
  // COPY QUIZ
  // =========================

  const copyQuiz = async () => {
    if (!quiz) return;

    try {
      await navigator.clipboard.writeText(
        quiz
      );

      alert("Quiz copied!");

    } catch (error) {
      console.error(
        "Copy error:",
        error
      );
    }
  };


  // =========================
  // DOWNLOAD QUIZ
  // =========================

  const downloadQuiz = () => {
    if (!quiz) return;

    const blob = new Blob(
      [quiz],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "AI-Quiz.txt";

    a.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className="page-shell">

      <div className="page-header">

        <div>
          <h1>
            📝 Quiz Generator
          </h1>

          <p>
            Create a quiz from your uploaded
            study materials.
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
            onClick={generateQuiz}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "Generate Quiz"}
          </button>

        </div>


        <div className="result-card">

          <h2>
            Generated Quiz
          </h2>

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
            }}
          >
            {quiz ||
              "Select an uploaded document and click Generate Quiz."}
          </div>


          <div className="result-actions">

            <button
              onClick={copyQuiz}
              disabled={!quiz}
            >
              Copy
            </button>

            <button
              onClick={downloadQuiz}
              disabled={!quiz}
            >
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Quiz;