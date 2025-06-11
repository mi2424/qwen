import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Kamu adalah asisten yang membantu." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: newMessages,
      });
      const reply = res.data.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">🧠 Qwen Chat</h1>
        <div className="h-[400px] overflow-y-auto border p-3 rounded mb-4">
          {messages.filter(m => m.role !== "system").map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block p-2 rounded-xl max-w-[75%] ${
                  msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-left text-gray-500">Assistant is typing...</div>}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ketik pesan..."
            className="flex-1 border p-2 rounded-xl"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}