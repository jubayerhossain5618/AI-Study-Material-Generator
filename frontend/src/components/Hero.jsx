import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          🚀 NEW MCQ GENERATOR V2.0
        </span>

        <h1>
          Generate Smart
          <br />
          Study Materials
          <br />
          with AI
        </h1>

        <p>
          Upload your study materials and instantly generate
          summaries, flashcards, MCQs and AI-powered study notes.
        </p>


        <div className="hero-buttons">

          <Link to="/register" className="primary-btn">
            Get Started
          </Link>


          <button className="secondary-btn">
            Learn More
          </button>

        </div>

      </div>


      <div className="hero-right">

        <div className="hero-card">

          <h2>
            🧠 AI Powered Learning
          </h2>

          <p>
            Create notes, summaries, quizzes and flashcards in seconds.
          </p>

        </div>

      </div>


    </section>
  );
}


export default Hero;