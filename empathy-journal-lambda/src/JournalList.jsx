import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

const formatDate = (timestamp) => {
  if (!timestamp) return 'No date';
  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function JournalList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "journals"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEntries(data);
      } catch (error) {
        console.error("Error fetching journals:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-3xl pt-10">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Previous Journals</h2>
        <p className="text-gray-600 text-center bg-blue-50 p-6 rounded-xl shadow-md">Loading journals...</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-8 mb-12">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Previous Journals</h2>
      {entries.length === 0 ? (
        <p className="text-gray-600 text-center bg-blue-50 p-6 rounded-xl shadow-md">No journals submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {entries.map(entry => (
            <div key={entry.id} className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
              <p className="text-sm text-gray-500 mb-3">{formatDate(entry.createdAt)}</p>
              <p className="text-slate-800 leading-relaxed mb-4 whitespace-pre-line">{entry.content}</p>

              {entry.insight ? (
                <div className="mt-4 border-t border-blue-200 pt-4">
                  <p className="text-sm font-semibold text-indigo-600 mb-2">AI Insight:</p>
                  <p className="text-sm text-gray-700 mb-1">Emotion: <span className="font-medium text-emerald-700">{entry.insight.emotion || 'N/A'}</span></p>
                  <p className="text-sm text-gray-700">Themes: {entry.insight.themes?.join(', ') || 'N/A'}</p>
                  {entry.insight.summary && (
                    <p className="text-sm text-gray-700 mt-2">Summary: {entry.insight.summary}</p>
                  )}
                  {entry.insight.reflection_prompts && Array.isArray(entry.insight.reflection_prompts) && (
                    <div className="mt-3">
                        <p className="text-sm font-semibold text-indigo-600 mb-2">Reflection Prompts:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {entry.insight.reflection_prompts.map((q, qIdx) => (
                                <li key={qIdx}>{q}</li>
                            ))}
                        </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mt-4 border-t border-blue-200 pt-4">No AI insight for this entry yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}