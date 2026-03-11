import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LabViewer from '../components/LabViewer';
import { generatePractice } from '../services/api';

function Practice() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const difficulty = params.get('difficulty') || 'Beginner';

  const [loading, setLoading] = useState(false);
  const [lab, setLab] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!topic) {
      return;
    }

    setLoading(true);
    setError('');

    generatePractice({ topic, difficulty })
      .then(setLab)
      .catch((err) => {
        setError(err?.response?.data?.error || 'Failed to generate lab');
      })
      .finally(() => setLoading(false));
  }, [topic, difficulty]);

  if (!topic) {
    return <p className="text-slate-300">Select a topic from the Topics page first.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Practice Lab: {topic}</h1>
      {loading && <p className="text-slate-400">Generating practice lab...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && <LabViewer lab={lab} />}
    </div>
  );
}

export default Practice;
