import React, { useState } from "react";
import { askModel } from "../services/api";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const data = await askModel(prompt);
      setResponse(data.response);
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem" }}>
      <h1>AeroSovereign</h1>
      <textarea
        rows={5}
        style={{ width: "100%", fontSize: "1rem", padding: "0.5rem" }}
        placeholder="Enter your prompt…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleAsk} disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Thinking…" : "Ask"}
      </button>
      {response && (
        <pre style={{ marginTop: "1.5rem", whiteSpace: "pre-wrap" }}>{response}</pre>
      )}
    </main>
  );
}
