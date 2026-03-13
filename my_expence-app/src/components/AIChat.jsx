import React, { useState } from "react";

const AIChat = ({ expenses }) => {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!message) return;

    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        expenses
      })
    });

    const data = await res.json();

    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">

      <h3 className="font-semibold mb-2">
        AI Expense Assistant
      </h3>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about your spending"
        className="border p-2 w-full rounded"
      />

      <button
        onClick={askAI}
        className="bg-slate-900 text-white px-4 py-2 rounded mt-2"
      >
        Ask AI
      </button>

      {loading && <p className="mt-2">Thinking...</p>}

      {reply && (
        <div className="mt-3 bg-gray-100 p-3 rounded">
          {reply}
        </div>
      )}

    </div>
  );
};

export default AIChat;