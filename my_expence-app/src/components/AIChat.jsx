import React, { useState } from "react";

const AIChat = ({ expenses }) => {

  const [message, setMessage] = useState('');
  const [reply, setReply] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      role: "user",
      content: message
    }

    setReply((prev) => [...prev, userMsg]);
    setMessage("");

    setLoading(true);
    await aiResponse(message);
    setLoading(false);
  };

  const aiResponse = async (userMessage) => {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              {
                role: "user",
                content: `Expenses: ${JSON.stringify(expenses || [])}.User Question: ${userMessage}. Give short answer in two lines`
              }
            ]
          })
        }
      )
      const data = await response.json();
      const aiText = data.choices[0].message?.content || "no expenses";
      setReply((prev) => [
        ...prev, { role: "ai", content: aiText }
      ]);

    } catch (error) {
      setReply((prev) => [
        ...prev,
        { role: "ai", content: "Error happened" }
      ]);
    }
  };


  return (
    <div className="flex flex-col h-[400px] bg-white max-w-2xl mx-auto rounded-2xl border shadow-lg">
      <div className="flex item-center gap-3 p-4 border-b">
        <div>
          <p className=" font-semibold">AL Expense Assistant</p>
          <p className="text-sm text-gray-500">Smart Financial Insights</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {reply.length === 0 && (
          <p className="text-gray-500 text-center text-sm">Start talking to AI here</p>
        )}

        {reply.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}><div className={`px-4 py-2 rounded-xl max-w-[70%] ${msg.role === "user" ? "bg-slate-900 text-white" : "bg-white border"}`}>{msg.content}</div></div>
        ))}

        {loading && (

          <p className="text-sm text-gray-500">Thinking...</p>)}
      </div>

      <div className="flex border-t p-4 gap-2">
        <input className="flex-1 rounded-full border px-3 py-2" placeholder="Ask about your expenses..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="bg-slate-900 text-white rounded-full px-3 py-2" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
};

export default AIChat;
