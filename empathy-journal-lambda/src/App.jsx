import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [journal, setJournal] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeJournal = async () => {
    setLoading(true);
    setInsight("...thinking...");

    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journal }),
      });

      const data = await res.json();
      setInsight(data.insight || "No insight returned.");
    } catch (err) {
      console.error(err);
      setInsight("Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Empathy Journal</h1>

      <textarea
        className="w-full max-w-2xl h-48 p-4 border rounded shadow-md focus:outline-none focus:ring"
        placeholder="Write your thoughts here..."
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
      />

      <button
        onClick={analyzeJournal}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {insight && (
        <div className="mt-6 w-full max-w-2xl bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Insight</h2>
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
}

export default App;
