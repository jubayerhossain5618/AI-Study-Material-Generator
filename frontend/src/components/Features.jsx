function Features() {
  return (
    <section className="features-section" id="features">
      <h2>Everything you need to ace your exams</h2>
      <p>Our AI tools save your time and make learning easier.</p>

      <div className="features-grid">
        <div className="feature-card">
          <span>📄</span>
          <h3>Summary Generator</h3>
          <p>Convert long chapters into short and easy summaries.</p>
        </div>

        <div className="feature-card">
          <span>✅</span>
          <h3>MCQ Generator</h3>
          <p>Create multiple choice questions from your study topic.</p>
        </div>

        <div className="feature-card">
          <span>🗂️</span>
          <h3>Flashcards</h3>
          <p>Make quick flashcards for better memorization.</p>
        </div>

        <div className="feature-card">
          <span>💬</span>
          <h3>AI Chatbot</h3>
          <p>Ask questions and get study help from AI.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;