import { Link } from "react-router-dom";

function Flashcards() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1>🗂️ Flashcards Generator</h1>
          <p>Create quick flashcards for fast revision and memorization.</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          Back to Dashboard
        </Link>
      </div>

      <div className="generator-layout">
        {/* INPUT */}
        <div className="generator-card">
          <h2>Input Topic</h2>

          <textarea placeholder="Enter your topic or notes..."></textarea>

          <button>Generate Flashcards</button>
        </div>

        {/* OUTPUT */}
        <div className="result-card">
          <h2>Flashcards Preview</h2>

          <p>
            Flashcards will appear here. Later we will connect backend API to
            generate real AI flashcards.
          </p>

          <div className="result-actions">
            <button>Copy</button>
            <button>Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcards;