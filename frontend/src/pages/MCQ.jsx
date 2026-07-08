import { Link } from "react-router-dom";

function MCQ() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1>🧠 MCQ Generator</h1>
          <p>Create multiple choice questions from your study materials.</p>
        </div>

        <Link to="/dashboard" className="back-btn">
          Back to Dashboard
        </Link>
      </div>

      <div className="generator-layout">
        {/* INPUT SIDE */}
        <div className="generator-card">
          <h2>Input Topic</h2>

          <textarea placeholder="Enter your chapter / topic here..."></textarea>

          <button>Generate MCQs</button>
        </div>

        {/* OUTPUT SIDE */}
        <div className="result-card">
          <h2>Generated MCQs</h2>

          <p>
            MCQs will appear here after AI processing. Later we will connect
            backend API for real generation.
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

export default MCQ;