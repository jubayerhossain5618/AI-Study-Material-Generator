import { Link } from "react-router-dom";

function Summary() {
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
          <h2>Input Study Topic</h2>

          <textarea
            placeholder="Paste your chapter, notes or topic here..."
          ></textarea>

          <button>Generate Summary</button>
        </div>

        <div className="result-card">
          <h2>Generated Summary</h2>

          <p>
            Your AI-generated summary will appear here. This section will be
            connected with the backend API in the next development phase.
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

export default Summary;