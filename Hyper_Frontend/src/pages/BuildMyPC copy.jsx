import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"; 
import { GoogleGenerativeAI } from "@google/generative-ai"; // <-- Gemini SDK

const BuildMyPC = () => {
  const [parts, setParts] = useState(null);
  const [selectedParts, setSelectedParts] = useState({});
  const [chatOpen, setChatOpen] = useState(false); 

  // NEW: chat states
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can we help you build your PC today?" },
  ]);
  const [input, setInput] = useState("");

  // Load pcParts.json
  useEffect(() => {
    fetch("/pcParts.json")
      .then((res) => res.json())
      .then((data) => setParts(data))
      .catch((err) => console.error("Error loading parts:", err));
  }, []);

  // Handle part selection
  const handleSelect = (category, item) => {
    setSelectedParts((prev) => ({
      ...prev,
      [category]: item,
    }));
  };

  // --- Gemini Setup ---
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// System prompt
const systemPrompt = `
You are a PC recommender bot.
The user will tell you their budget, purpose, and requirements.
You must reply ONLY with a JSON array of 5 recommended PCs.
Do not add any explanation or text outside the JSON array.
Each item must include:
  - Brand and model name
  - Approximate price (USD)
  - Key specs (CPU, RAM, GPU, Storage)

Example output:
[
  {"name": "Dell G15 Gaming Laptop", "price": "$799", "specs": "Ryzen 7, 16GB RAM, RTX 3050, 512GB SSD"},
  {"name": "HP Omen 16", "price": "$950", "specs": "Intel i7, 16GB RAM, RTX 3060, 1TB SSD"}
]
`;

// Handle sending chat
const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);

  try {
    //  Get raw response from Gemini
    const result = await model.generateContent(systemPrompt + "\n\nUser request: " + input);
    const botReplyRaw = result.response.text(); // raw JSON string

    //  Parse JSON and convert to plain text
    let botReplyText = botReplyRaw;
    const match = botReplyRaw.match(/[.*]/s); // s flag = multiline
    if (match) {
      jsonText = match[0]; // only the JSON part
    }
    try {
      const jsonList = JSON.parse(botReplyRaw);
      botReplyText = jsonList
        .map((item, idx) => `${idx + 1}. ${item.name} - ${item.price} - ${item.specs}`)
        .join("\n");
    } catch (e) {
      console.warn("Failed to parse JSON, showing raw text.");
      botReplyText = botReplyRaw;
    }

    //  Update chat messages
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: botReplyText },
    ]);
  } catch (err) {
    console.error("Gemini API error:", err);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: " Error fetching response." },
    ]);
  }

  setInput("");
};

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-12 relative">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        🖥️ Build My PC
      </h1>

      {/* Your existing PC parts selection code unchanged... */}
      {!parts ? (
        <p className="text-center text-lg text-gray-600">Loading available parts...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Part Selection */}
          <div className="lg:col-span-2 space-y-10">
            {Object.keys(parts).map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4 capitalize text-gray-800">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {parts[category].map((item, index) => {
                    const isSelected = selectedParts[category] === item;
                    return (
                      <div
                        key={index}
                        onClick={() => handleSelect(category, item)}
                        className={`cursor-pointer p-5 rounded-xl border shadow-sm transition relative ${
                          isSelected
                            ? "bg-red-600 text-white border-red-700"
                            : "bg-white hover:shadow-lg hover:border-red-500"
                        }`}
                      >
                        <p className="font-medium">{item}</p>
                        {isSelected && (
                          <CheckCircle
                            className="absolute top-3 right-3 text-green-400"
                            size={22}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Build Summary */}
          <div className="lg:sticky lg:top-10 h-fit bg-white shadow-lg rounded-xl p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">⚡ Your Build</h2>
            <div className="space-y-3">
              {Object.keys(parts).map((category) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="capitalize font-medium">{category}:</span>
                  <span className="text-gray-700">
                    {selectedParts[category] || "Not Selected"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gray-50 border text-sm">
              <h3 className="font-semibold mb-2">🧩 Compatibility Check</h3>
              <p className="text-gray-600">
                We’ll analyze your build here for bottlenecks and compatibility once you select parts.
              </p>
            </div>

            <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition">
              Add Build to Cart 🛒
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Icon */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50"
        >
          💬
        </button>
      )}

      {/* Chatbox */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-w-xs bg-white shadow-lg rounded-lg border flex flex-col overflow-hidden z-50">
          <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold">Chat with us</h3>
            <button onClick={() => setChatOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="p-4 flex-1 overflow-y-auto h-64 text-gray-700 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-red-100 self-end ml-auto"
                    : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildMyPC;
