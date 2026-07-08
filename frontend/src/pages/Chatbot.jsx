import { useState } from "react";
import { Link } from "react-router-dom";

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I am your AI Study Assistant. Ask me anything!" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input },
      { sender: "ai", text: "🤖 This is a demo response. Backend will be connected later." }
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>🤖 AI Study Chatbot</h2>
        <Link to="/dashboard" className="back-btn">
          Back
        </Link>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;