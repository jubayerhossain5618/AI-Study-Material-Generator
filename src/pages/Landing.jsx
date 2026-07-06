import { Link } from "react-router-dom";
import { ArrowRight, FileText, ListChecks, Layers, MessagesSquare, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const features = [
  {
    icon: FileText,
    title: "Summary Generator",
    description: "Condense long chapters into concise, easy-to-read summaries highlighting key concepts.",
  },
  {
    icon: ListChecks,
    title: "MCQ Generator",
    description: "Instantly create multiple-choice questions from your content to test your knowledge.",
  },
  {
    icon: Layers,
    title: "Flashcards",
    description: "Convert key definitions and facts into interactive flashcards for better retention.",
  },
  {
    icon: MessagesSquare,
    title: "AI Chatbot",
    description: "Ask questions about your study material and get instant, accurate explanations.",
  },
];

export default function Landing() {
  return (
    <div className="overflow-x-hidden bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24">
        <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-brand-gradient opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-32 h-[500px] w-[500px] rounded-full bg-accent-400/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span className="text-xs font-semibold text-brand-700">New: MCQ Generator v2.0</span>
            </div>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink lg:text-6xl">
              Generate Smart Study Materials with <span className="text-brand-600">AI</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/60">
              Transform your textbooks, notes, and PDFs into comprehensive summaries, flashcards, and quizzes in
              seconds. Supercharge your learning with AI-driven insights.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 font-semibold text-white shadow-glow transition hover:scale-[1.02]"
              >
                Get Started Free
              </Link>
              <a
                href="#features"
                className="flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-ink/70 transition hover:text-brand-600"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["A", "K", "M"].map((letter) => (
                  <div
                    key={letter}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-200 text-xs font-semibold text-brand-800"
                  >
                    {letter}
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-ink text-xs font-semibold text-white">
                  +2k
                </div>
              </div>
              <p className="text-sm text-ink/60">Joined by 2,000+ students this week</p>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-[2.5rem] bg-brand-gradient opacity-20 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-white shadow-soft">
              <Sparkles className="h-24 w-24 text-brand-400" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink">
              Everything you need to ace your exams
            </h2>
            <p className="mt-4 text-lg text-ink/60">
              Our AI tools are designed to save you hours of manual note-taking and quiz creation.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-ink/5 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                  <f.icon className="h-6 w-6 text-brand-600" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
