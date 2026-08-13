import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Chatbot() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I am your AI Study Tutor. Select a study material and ask me a question!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load uploaded documents
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
        console.error("Document loading error:", error);
      }
    };

    loadDocuments();
  }, []);

  // Send question to AI Tutor
  const sendMessage = async () => {
    const question = input.trim();

    if (!selectedDocument) {
      alert("Please select a study material first.");
      return;
    }

    if (!question) {
      alert("Please enter a question.");
      return;
    }

    const token = localStorage.getItem("token");

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/chat/${selectedDocument}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question: question,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "AI Tutor request failed."
        );
      }

      if (!data.answer || !data.answer.trim()) {
        throw new Error("AI returned an empty answer.");
      }

      setMessages((previous) => [
        ...previous,
        {
          sender: "ai",
          text: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          sender: "ai",
          text: `⚠️ ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div>
          <h2>🤖 AI Study Tutor</h2>

          <select
            value={selectedDocument}
            onChange={(e) =>
              setSelectedDocument(e.target.value)
            }
          >
            <option value="">
              -- Select uploaded document --
            </option>

            {documents.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.fileName}
              </option>
            ))}
          </select>
        </div>

        <Link to="/dashboard" className="back-btn">
          Back
        </Link>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message ai">
            🤖 Thinking...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question from your study material..."
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;