import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      try {
        const [documentsResponse, materialsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/documents", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch("http://localhost:5000/api/ai/materials", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const documentsData = await documentsResponse.json();
        const materialsData = await materialsResponse.json();

        if (documentsResponse.ok) {
          setDocuments(documentsData);
        }

        if (materialsResponse.ok) {
          setMaterials(materialsData);
        }
      } catch (error) {
        console.error("Dashboard loading error:", error);
      }
    };

    loadDashboard();
  }, []);

  const summaries = materials.filter(
    (item) => item.materialType === "summary"
  ).length;

  const mcqs = materials.filter(
    (item) => item.materialType === "mcq"
  ).length;

  const flashcards = materials.filter(
    (item) => item.materialType === "flashcard"
  ).length;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <h2>⚡ StudyGen</h2>

        <nav>
          <Link to="/dashboard">
            🏠 Dashboard
          </Link>

          <Link to="/upload">
            📤 Upload
          </Link>

          <Link to="/summary">
            📄 Summary
          </Link>

          <Link to="/mcq">
            ✅ MCQ
          </Link>

          <Link to="/flashcards">
            🧠 Flashcards
          </Link>

          <Link to="/chatbot">
            🤖 AI Tutor
          </Link>

          <Link to="/profile">
            👤 Profile
          </Link>

          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>
        </nav>

      </aside>


      {/* MAIN DASHBOARD */}
      <main className="dashboard-main">

        <div className="topbar">
          <div>
            <h1>Welcome Back 👋</h1>
            <p>
              Generate and manage your AI study materials.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search notes, files, topics..."
          />
        </div>


        {/* STATISTICS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h2>📁 {documents.length}</h2>
            <p>Total Files</p>
          </div>

          <div className="stat-card">
            <h2>📄 {summaries}</h2>
            <p>Summaries</p>
          </div>

          <div className="stat-card">
            <h2>🧠 {mcqs}</h2>
            <p>MCQ Sets</p>
          </div>

          <div className="stat-card">
            <h2>🗂️ {flashcards}</h2>
            <p>Flashcard Sets</p>
          </div>

        </div>


        {/* QUICK ACTIONS */}
        <div>
          <h2>⚡ Quick Actions</h2>

          <div className="action-grid">

            <Link to="/upload">
              📤 Upload File
            </Link>

            <Link to="/summary">
              📄 Generate Summary
            </Link>

            <Link to="/mcq">
              🧠 Create MCQ
            </Link>

            <Link to="/flashcards">
              🗂️ Flashcards
            </Link>

            <Link to="/chatbot">
              🤖 AI Tutor
            </Link>

          </div>
        </div>


        {/* UPLOAD */}
        <div className="upload-panel">

          <div>
            <h2>Upload Study Material</h2>

            <p>
              Upload PDF, DOCX or TXT files to generate AI study materials.
            </p>
          </div>

          <Link
            to="/upload"
            className="upload-btn"
          >
            Upload Now
          </Link>

        </div>


        {/* AI FEATURES */}
        <div className="tool-grid">

          <Link
            to="/summary"
            className="tool-card"
          >
            <h2>📄 Summary</h2>
            <p>
              Generate AI summaries from your uploaded study material.
            </p>
          </Link>

          <Link
            to="/mcq"
            className="tool-card"
          >
            <h2>🧠 MCQ Generator</h2>
            <p>
              Generate practice questions automatically.
            </p>
          </Link>

          <Link
            to="/flashcards"
            className="tool-card"
          >
            <h2>🗂️ Flashcards</h2>
            <p>
              Create quick revision flashcards.
            </p>
          </Link>

          <Link
            to="/chatbot"
            className="tool-card"
          >
            <h2>🤖 AI Tutor</h2>
            <p>
              Ask questions from your uploaded study material.
            </p>
          </Link>

        </div>


        {/* RECENT FILES */}
        <div className="recent-files">

          <h2>📁 Recent Files</h2>

          {documents.length === 0 ? (

            <p>No documents uploaded yet.</p>

          ) : (

            documents
              .slice(-5)
              .reverse()
              .map((doc) => (

                <div
                  className="file-row"
                  key={doc._id}
                >
                  <span>
                    📄 {doc.fileName}
                  </span>

                  <Link to="/summary">
                    Use with AI
                  </Link>
                </div>

              ))

          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;