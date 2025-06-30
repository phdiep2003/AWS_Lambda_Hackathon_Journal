// Updated App.jsx with cleaner structure, better UI, and a Save Journal button

import { useState } from 'react';
import './index.css';
import './App.css';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import JournalList from './JournalList';

const Header = () => (
  <header className="w-full bg-white shadow-md p-4 flex justify-between items-center rounded-b-xl">
    <h1 className="text-3xl font-extrabold !text-indigo-700">Empathy Journal</h1>
  </header>
);

const Footer = () => (
  <footer className="w-full bg-slate-100 py-6 text-center text-gray-500 text-sm mt-12">
    <p>&copy; {new Date().getFullYear()} Empathy Journal. All rights reserved.</p>
  </footer>
);

function App() {
  const [journal, setJournal] = useState('');
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveJournal = async () => {
    try {
      await addDoc(collection(db, 'journals'), {
        content: journal,
        insight: insight || null,
        createdAt: Timestamp.now(),
      });
      alert('Journal saved successfully.');
      setJournal('');
      setInsight(null);
    } catch (err) {
      console.error(err);
      alert('Error saving journal.');
    }
  };

  const analyzeJournal = async () => {
    setLoading(true);
    setInsight(null);
    try {
      const res = await fetch(import.meta.env.VITE_LAMBDA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journal }),
      });

      const data = await res.json();
      if (data.error || (data.insight && data.insight.startsWith('Error from Gemini API:'))) {
        setInsight({ error: data.error || data.insight });
      } else {
        setInsight(data);
      }
    } catch (err) {
      console.error(err);
      setInsight({ error: 'Something went wrong while fetching insights.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-3xl shadow-xl flex flex-col space-y-6">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Today's Reflection</h2>
          <textarea
            className="w-full h-64 p-6 border border-indigo-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 bg-white placeholder-gray-400"
            placeholder="Write your thoughts here..."
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={saveJournal}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all"
            >
              Save Journal
            </button>
            <button
              onClick={analyzeJournal}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all"
            >
              {loading ? 'Analyzing...' : 'AI Insight'}
            </button>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-xl flex flex-col space-y-6">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">AI Insights</h2>
          {insight && !insight.error ? (
            <div className="space-y-4">
              <Section title="🧠 Detected Emotion">
                <p className="text-lg font-semibold text-emerald-700">{insight.emotion}</p>
              </Section>
              <Section title="🔑 Key Themes">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {insight.themes?.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </Section>
              <Section title="🪞 Reflection Prompts">
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  {insight.reflection_prompts?.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
              </Section>
              <Section title="📝 Summary">
                <p className="text-gray-700 leading-relaxed">{insight.summary}</p>
              </Section>
            </div>
          ) : insight?.error ? (
            <p className="text-red-700 bg-red-100 p-4 rounded-xl shadow">{insight.error}</p>
          ) : (
            <div className="text-gray-500 text-center py-12">
              <p className="text-lg mb-2">Write something and click "AI Insight" for analysis.</p>
              <p className="text-sm">Insights will appear here.</p>
            </div>
          )}
        </section>
      </main>

      <div className="w-full max-w-7xl mx-auto px-8">
        <JournalList />
      </div>

      <Footer />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-indigo-600 text-xl font-bold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default App;
