import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LabViewer from '../components/LabViewer';
import { generatePractice } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';

function Practice() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const difficulty = params.get('difficulty') || 'Beginner';
  const { t, apiLanguage } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [lab, setLab] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!topic) {
      return;
    }

    setLoading(true);
    setError('');

    generatePractice({ topic, difficulty, language: apiLanguage })
      .then(setLab)
      .catch((err) => {
        setError(err?.response?.data?.error || t.failedPractice);
      })
      .finally(() => setLoading(false));
  }, [topic, difficulty, apiLanguage, t.failedPractice]);

  if (!topic) {
    return <p className="text-slate-300">{t.selectTopicFirst}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {t.practiceFor}: {topic}
      </h1>
      {loading && <p className="text-slate-400">{t.generatingPractice}</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        <LabViewer
          lab={lab}
          labels={{
            vulnerableCode: t.vulnerableCode,
            task: t.task,
            hints: t.hints,
            solution: t.solution
          }}
        />
      )}
    </div>
  );
}

export default Practice;
