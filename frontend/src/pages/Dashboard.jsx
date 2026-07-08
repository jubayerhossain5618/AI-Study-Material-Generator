import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>⚡ StudyGen</h2>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/upload">📤 Upload</Link>
          <Link to="/summary">📄 Summary</Link>
          <Link to="/mcq">✅ MCQ</Link>
          <Link to="/flashcards">🧠 Flashcards</Link>
          <Link to="/profile">👤 Profile</Link>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="topbar">
          <div>
            <h1>Welcome Back 👋</h1>
            <p>Generate and manage your AI study materials.</p>
          </div>

          <input type="text" placeholder="Search notes, files, topics..." />
        </div>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>🔥 24</h3>
            <p>Total Files</p>
            <small>+3 this week</small>
          </div>

          <div className="stat-card">
            <h3>📄 18</h3>
            <p>Summaries</p>
            <small>AI generated</small>
          </div>

          <div className="stat-card">
            <h3>🧠 120</h3>
            <p>MCQs Generated</p>
            <small>Practice mode</small>
          </div>

          <div className="stat-card">
            <h3>🗂 45</h3>
            <p>Flashcards</p>
            <small>Revision ready</small>
          </div>
        </section>

        <section className="quick-actions">
          <h2>⚡ Quick Actions</h2>

          <div className="action-grid">
            <Link to="/upload">📤 Upload File</Link>
            <Link to="/summary">📄 Generate Summary</Link>
            <Link to="/mcq">🧠 Create MCQ</Link>
            <Link to="/flashcards">🗂 Flashcards</Link>
          </div>
        </section>

        <section className="upload-panel">
          <div>
            <h2>Upload Study Material</h2>
            <p>Upload PDF, DOCX or TXT files to generate AI notes.</p>
          </div>

          <Link to="/upload" className="upload-btn">
            Upload Now
          </Link>
        </section>

        <section className="recent-files">
          <h2>📁 Recent Files</h2>

          <div className="file-row">
            <span>📘 Physics Chapter 01.pdf</span>
            <button>View</button>
          </div>

          <div className="file-row">
            <span>📗 Chemistry Notes.docx</span>
            <button>View</button>
          </div>

          <div className="file-row">
            <span>📙 Math Formula Sheet.pdf</span>
            <button>View</button>
          </div>
        </section>

        <section className="ai-tip">
          <h3>🤖 AI Tip of the Day</h3>
          <p>Study in short sessions (25 mins) for better memory retention.</p>
        </section>

        <section className="progress-section">
          <h2>📊 Weekly Progress</h2>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>

          <p>70% of weekly study goal completed</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;