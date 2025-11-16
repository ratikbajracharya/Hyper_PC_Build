// src/pages/BuildMyPC.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useBuild } from "../components/BuildContext"; // useBuild hook from your BuildContext
import { GoogleGenerativeAI } from "@google/generative-ai"; // ensure package installed

const BuildMyPC = () => {
  // Build context
  const { selectedParts: ctxSelectedParts, selectPart, saveBuild } = useBuild();

  // Local UI state (we'll mirror context selection locally so UI feels snappy)
  const [parts, setParts] = useState(null);
  const [localSelected, setLocalSelected] = useState(ctxSelectedParts || {});
  const [compatibility, setCompatibility] = useState([]);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [highlightSuggestions, setHighlightSuggestions] = useState({});
  const [saveMessage, setSaveMessage] = useState("");

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi — I'm your build assistant. Ask me about compatibility, bottlenecks, or alternatives." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // Load parts file
  useEffect(() => {
    fetch("/pcParts.json")
      .then((r) => r.json())
      .then((data) => setParts(data))
      .catch((err) => {
        console.error("Error loading pcParts.json:", err);
        setParts(null);
      });
  }, []);

  // Keep local selection in sync with context selection if context changes elsewhere
  useEffect(() => {
    setLocalSelected(ctxSelectedParts || {});
  }, [ctxSelectedParts]);

  // When user clicks a part tile we update local selection and context
  const handleSelect = (category, item) => {
    // update local UI
    setLocalSelected((prev) => {
      const next = { ...prev, [category]: item };
      return next;
    });
    // update global context
    selectPart(category, item);
  };

  // Compatibility logic & suggestions (lightweight rules + suggestion generation)
  useEffect(() => {
    // if no cpu or motherboard selected, no evaluation
    if (!localSelected.cpu || !localSelected.motherboard) {
      setCompatibility([]);
      setHighlightSuggestions({});
      return;
    }

    const issues = [];
    const suggestions = {};

    // CPU / Motherboard brand check (Intel vs AMD)
    if (
      (localSelected.cpu.includes("Intel") && !localSelected.motherboard.includes("Intel")) ||
      (localSelected.cpu.includes("AMD") && !localSelected.motherboard.includes("AMD"))
    ) {
      const brand = localSelected.cpu.includes("Intel") ? "Intel" : "AMD";
      issues.push({
        issue: "CPU and motherboard socket/brand mismatch (Intel vs AMD).",
        detail: `Selected CPU appears to be ${brand}-family but motherboard is not ${brand}.`,
      });
      suggestions.motherboard = parts?.motherboard?.filter((m) => m.includes(brand)) || [];
    }

    // RAM check (DDR5 vs mobo chipset)
    if (
      localSelected.ram &&
      localSelected.motherboard &&
      localSelected.ram.includes("DDR5") &&
      !/Z790|X670|B650|Z890|X890/i.test(localSelected.motherboard)
    ) {
      issues.push({
        issue: "RAM likely incompatible: DDR5 selected but motherboard may not support DDR5.",
        detail: `Selected RAM is DDR5 but motherboard doesn't contain known DDR5-ready chipset markers.`,
      });
      suggestions.motherboard = [
        ...(suggestions.motherboard || []),
        ...(parts?.motherboard?.filter((m) => /Z790|X670|B650|Z890|X890/i.test(m)) || []),
      ];
    }

    // Rough PSU check (very approximate)
    if (localSelected.psu && localSelected.gpu && localSelected.cpu) {
      const gpuHigh = /5090|5080|5070|RTX 40|RX 8/ig.test(localSelected.gpu);
      const cpuHigh = /i9|9950X|Ryzen 9|9900X/i.test(localSelected.cpu);
      if (gpuHigh && cpuHigh && /850W/i.test(localSelected.psu)) {
        issues.push({
          issue: "PSU may be underpowered for this CPU+GPU combination.",
          detail: `Both CPU and GPU are high-end; consider a 1000W+ unit.`,
        });
        suggestions.psu = parts?.psu?.filter((p) => {
          // try to parse a number > 900 from string
          const n = (p.match(/\d+/) || [])[0];
          return n ? parseInt(n) >= 1000 : false;
        }) || [];
      }
    }

    if (issues.length === 0) {
      setCompatibility([{ issue: "All selected parts look compatible ✅", detail: "" }]);
      setHighlightSuggestions({});
    } else {
      setCompatibility(issues);
      setHighlightSuggestions(suggestions);
    }
  }, [localSelected, parts]);

  // Save build action (uses build context saveBuild)
  const handleSaveBuild = () => {
    if (!saveBuild) {
      setSaveMessage("Save function not available. Make sure BuildProvider is mounted.");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }
    const id = saveBuild(); // your BuildContext.saveBuild uses current context selectedParts
    if (id) {
      setSaveMessage("Build saved ✅");
    } else {
      setSaveMessage("Please select at least CPU and Motherboard before saving.");
    }
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // --- Gemini chat integration ---
  // Defensive initialization (so dev doesn't crash if env missing)
  let genModel = null;
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      genModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" }); // adjust model name if needed
    }
  } catch (e) {
    // don't fail; genModel remains null
    console.warn("Gemini client init failed:", e);
  }

  const sendChat = async () => {
    const question = chatInput.trim();
    if (!question) return;

    const userMsg = { sender: "user", text: question };
    setMessages((m) => [...m, userMsg]);
    setChatInput("");
    setChatLoading(true);

    // Build prompt that includes selected parts so Gemini can reason about compatibility
    const buildSnapshot = JSON.stringify(localSelected, null, 2);
    const prompt = [
      "You are an expert PC builder and compatibility checker.",
      "The user has the following current selection:",
      buildSnapshot,
      "Answer the user's question precisely, point out any compatibility issues, explain why, and suggest concrete alternative parts (choose from the available part lists when possible).",
      `User question: ${question}`,
      "Respond clearly; if you provide a list of suggestions, label them and explain reasons. Keep it concise."
    ].join("\n\n");

    try {
      if (!genModel) throw new Error("Gemini model not initialized (check VITE_GEMINI_API_KEY and package).");

      const result = await genModel.generateContent(prompt);

      // Extract text defensively (Gemini SDK responses vary)
      let botText = "";
      if (result && typeof result.response?.text === "function") {
        botText = await result.response.text();
      } else if (typeof result === "string") {
        botText = result;
      } else if (typeof result?.response === "string") {
        botText = result.response;
      } else if (result && result.output?.[0]?.content) {
        const c = result.output[0].content;
        botText = typeof c === "string" ? c : JSON.stringify(c);
      } else if (Array.isArray(result?.candidates) && result.candidates[0]?.content) {
        botText = result.candidates[0].content;
      } else {
        botText = JSON.stringify(result);
      }

      setMessages((m) => [...m, { sender: "bot", text: botText }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [...m, { sender: "bot", text: "Sorry — couldn't reach the assistant. Check API key & network." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // UI helpers for tile classes (bolder suggestion highlight)
  const tileClass = (isSelected, isSuggested) => {
    // Selected: red solid, Suggested: lime border + soft glow, default: white
    if (isSelected) return "bg-red-600 text-white border-red-700";
    if (isSuggested) return "bg-gradient-to-br from-green-50 to-green-100 border-green-500 shadow-[0_6px_20px_rgba(34,197,94,0.12)]";
    return "bg-white hover:border-red-500";
  };

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🖥️ Build My PC</h1>

      {saveMessage && (
        <div className="mx-auto max-w-3xl text-center mb-4 text-green-700 font-semibold">
          {saveMessage}
        </div>
      )}

      {!parts ? (
        <p className="text-center">Loading available parts...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / center: selection */}
          <div className="lg:col-span-2 space-y-8">
            {Object.keys(parts).map((category) => (
              <section key={category}>
                <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {parts[category].map((item, i) => {
                    const isSelected = localSelected[category] === item;
                    const isSuggested = (highlightSuggestions[category] || []).includes(item);
                    return (
                      <div
                        key={i}
                        onClick={() => handleSelect(category, item)}
                        className={`cursor-pointer p-4 rounded-lg border shadow-sm transition ${tileClass(isSelected, isSuggested)}`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="font-medium">{item}</p>
                          </div>
                          {isSelected && <CheckCircle className="ml-3 text-white" size={18} />}
                        </div>
                        {isSuggested && !isSelected && (
                          <div className="mt-2 text-xs text-green-700 font-semibold">Suggested</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Right column: sticky summary */}
          <aside className="lg:sticky lg:top-6 p-6 bg-white rounded-xl shadow border h-fit">
            <h3 className="text-2xl font-bold mb-3">⚡ Your Build</h3>

            <div className="space-y-2 mb-4">
              {Object.keys(parts).map((category) => (
                <div key={category} className="flex justify-between text-sm">
                  <span className="capitalize text-gray-700">{category}:</span>
                  <span className="font-medium text-gray-900">
                    {localSelected[category] || <span className="text-gray-400">Not Selected</span>}
                  </span>
                </div>
              ))}
            </div>

            {/* Compatibility area */}
            <div className="bg-gray-50 border p-4 rounded text-sm">
              <h4 className="font-semibold mb-2">🧩 Compatibility</h4>

              <button
                onClick={() => setShowCompatibility((s) => !s)}
                className="mb-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                {showCompatibility ? "Hide Details" : "Check Compatibility"}
              </button>

              {showCompatibility && (
                <div className="space-y-2">
                  {compatibility.map((c, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-medium">{c.issue}</div>
                      {c.detail && <div className="text-gray-600 mt-1">{c.detail}</div>}
                      {c.suggestions && c.suggestions.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs font-semibold text-gray-700">Suggested alternatives:</div>
                          <ul className="list-disc pl-5 text-gray-600 mt-1">
                            {c.suggestions.map((s, idx) => (
                              <li key={idx} className="text-sm">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Save button below compatibility as requested */}
              <div className="mt-4">
                <button
                  onClick={handleSaveBuild}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
                >
                  💾 Save Build
                </button>
                <div className="mt-2 text-yellow-700 text-sm">Contact store for quotation.</div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Chat floating button & window */}
      <div>
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50"
            aria-label="Open build assistant chat"
          >
            💬
          </button>
        ) : (
          <div className="fixed bottom-6 right-6 w-96 max-w-xs z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
              <div className="bg-red-600 text-white px-3 py-2 flex items-center justify-between">
                <div className="font-semibold">Build Assistant</div>
                <div className="flex items-center gap-2">
                  {chatLoading && <div className="text-xs opacity-90">Thinking…</div>}
                  <button onClick={() => setChatOpen(false)} className="text-white">✖</button>
                </div>
              </div>

              <div className="p-3 max-h-60 overflow-y-auto space-y-3 bg-gray-50">
                {messages.map((m, i) => (
                  <div key={i} className={`${m.sender === "user" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block rounded-lg px-3 py-2 ${m.sender === "user" ? "bg-red-100 text-red-900" : "bg-white text-gray-800 shadow-sm"}`}>
                      <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t bg-white">
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }}
                    className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
                    placeholder="Ask about compatibility, alternatives or performance..."
                  />
                  <button
                    onClick={sendChat}
                    disabled={chatLoading}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                  >
                    Send
                  </button>
                </div>
                {!genModel && (
                  <div className="mt-2 text-xs text-yellow-700">
                    Gemini not initialized. Add VITE_GEMINI_API_KEY in .env and install @google/generative-ai to enable the AI assistant.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildMyPC;
