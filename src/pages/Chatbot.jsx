import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Plus, MessagesSquare, Sparkles, Loader2 } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const suggestedPrompts = ["Generate 5 MCQs", "Explain this concept", "Create flashcards", "Summarize this chapter"];

export default function Chatbot() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const scrollRef = useRef(null);

  const loadSessions = async () => {
    const { data } = await api.get("/chat/sessions");
    setSessions(data.sessions);
    return data.sessions;
  };

  const openSession = async (id) => {
    const { data } = await api.get(`/chat/sessions/${id}`);
    setActiveSession(data.session);
  };

  const handleNewChat = async () => {
    const { data } = await api.post("/chat/sessions", {});
    setSessions((prev) => [data.session, ...prev]);
    setActiveSession(data.session);
  };

  useEffect(() => {
    (async () => {
      try {
        const existing = await loadSessions();
        if (existing.length > 0) {
          await openSession(existing[0]._id);
        } else {
          await handleNewChat();
        }
      } finally {
        setLoadingSessions(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeSession?.messages?.length]);

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    if (!content || !activeSession || sending) return;

    setInput("");
    setSending(true);

    // Optimistic update
    setActiveSession((prev) => ({
      ...prev,
      messages: [...prev.messages, { role: "user", content }],
    }));

    try {
      const { data } = await api.post(`/chat/sessions/${activeSession._id}/messages`, { content });
      setActiveSession(data.session);
      setSessions((prev) =>
        prev.map((s) => (s._id === data.session._id ? { ...s, title: data.session.title } : s))
      );
    } catch (err) {
      setActiveSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "assistant", content: `⚠️ ${err.response?.data?.message || "Something went wrong. Please try again."}` },
        ],
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      {/* Conversation history */}
      <div className="hidden w-72 shrink-0 flex-col border-r border-ink/5 md:flex">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3 text-sm font-semibold text-white shadow-soft"
          >
            <Plus className="h-4 w-4" /> New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink/30">Conversations</p>
          {loadingSessions ? (
            <p className="px-3 text-sm text-ink/40">Loading...</p>
          ) : (
            sessions.map((s) => (
              <button
                key={s._id}
                onClick={() => openSession(s._id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  activeSession?._id === s._id ? "bg-brand-50 text-brand-700" : "text-ink/60 hover:bg-ink/5"
                }`}
              >
                <MessagesSquare className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{s.title}</span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-[72px] items-center gap-3 border-b border-ink/5 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-soft">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold">StudyGen AI Assistant</h2>
            <p className="flex items-center gap-1.5 text-xs text-ink/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online & Analyzing
            </p>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-2xl space-y-6">
            {!activeSession?.messages?.length && (
              <div className="rounded-2xl border border-ink/10 bg-slate-50 p-5 text-sm text-ink/70">
                Hi {user?.fullName?.split(" ")[0] || "there"}! Ask me anything about your study material — I can
                explain concepts, quiz you, or summarize your notes.
              </div>
            )}

            {activeSession?.messages?.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user" ? "bg-ink text-white" : "bg-brand-gradient text-white"
                  }`}
                >
                  {m.role === "user" ? user?.fullName?.[0]?.toUpperCase() || "U" : <Sparkles className="h-4 w-4" />}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-ink text-white" : "border border-ink/10 bg-white text-ink/80 shadow-card"
                  }`}
                >
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:font-display prose-invert:text-white">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-white px-5 py-3.5 text-sm text-ink/50 shadow-card">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-ink/5 px-6 py-5">
          <div className="mx-auto max-w-2xl">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="rounded-full border border-ink/10 px-4 py-1.5 text-xs font-medium text-ink/60 transition hover:border-brand-300 hover:text-brand-700"
                >
                  {p}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-white p-2 shadow-card"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white transition disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2.5 text-center text-xs text-ink/40">StudyGen AI can make mistakes. Verify important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
