
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://shanlee-ai-chatbot.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: userMessage })
        }
      );

      if (!response.ok) {
        throw new Error("Server request failed");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowWelcome(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setShowWelcome(true);
  };

  const handleDismissWelcome = (e) => {
    e.stopPropagation();
    setShowWelcome(false);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && showWelcome && (
        <div className="welcome-popup" onClick={handleOpenChat}>
          <span className="welcome-text">
            Hi there! 👋 How can I help you today?
          </span>
          <button
            className="welcome-close-btn"
            onClick={handleDismissWelcome}
            aria-label="Dismiss welcome popup"
          >
            ×
          </button>
        </div>
      )}

      {!isOpen && (
        <button
          className="chat-icon-btn"
          onClick={handleOpenChat}
          aria-label="Open chat"
        >
          <svg
            className="chat-svg-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C6.48 3 2 6.92 2 11.75C2 14.39 3.39 16.74 5.59 18.28C5.39 19.34 4.79 20.67 3.53 21.62C3.34 21.76 3.39 22.06 3.63 22.12C5.46 22.61 7.6 22.11 9.19 21.05C10.09 21.35 11.03 21.5 12 21.5C17.52 21.5 22 17.58 22 12.75C22 7.92 17.52 3 12 3Z"
              fill="white"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="status-dot"></span>
              <h3>Shanlee AI Assistant</h3>
            </div>
            <button
              className="chat-close-btn"
              onClick={handleCloseChat}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <p className="welcome-message">
                Hello! 👋 How can I help you with Shanlee AI Solutions?
              </p>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {loading && (
              <div className="message bot loading-msg">
                Thinking...
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about Shanlee AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
