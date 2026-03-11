import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ModuleViewer from '../components/ModuleViewer';
import { fetchTopicProgress, generateSyllabus, saveProgress } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';

function Syllabus() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const difficulty = params.get('difficulty') || 'Beginner';
  const { t, apiLanguage } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState(null);
  const [progressRows, setProgressRows] = useState([]);
  const [error, setError] = useState('');

  const progressMap = useMemo(() => {
    return progressRows.reduce((acc, row) => {
      acc[row.moduleTitle] = Boolean(row.completed);
      return acc;
    }, {});
  }, [progressRows]);

  useEffect(() => {
    if (!topic) {
      return;
    }

    setLoading(true);
    setError('');

    Promise.all([generateSyllabus({ topic, difficulty, language: apiLanguage }), fetchTopicProgress(topic)])
      .then(([syllabusData, progressData]) => {
        setSyllabus(syllabusData);
        setProgressRows(progressData);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || t.failedSyllabus);
      })
      .finally(() => setLoading(false));
  }, [topic, difficulty, apiLanguage, t.failedSyllabus]);

  async function handleToggle(moduleTitle, completed) {
    await saveProgress({ topic, moduleTitle, completed });
    const updated = await fetchTopicProgress(topic);
    setProgressRows(updated);
  }

  if (!topic) {
    return <p className="text-slate-300">{t.selectTopicFirst}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {t.syllabusFor}: {topic}
      </h1>
      <p className="text-sm text-slate-400">
        {t.difficulty}: {difficulty}
      </p>
      {loading && <p className="text-slate-400">{t.generatingSyllabus}</p>}
      {error && <p className="text-red-400">{error}</p>}
      {syllabus && (
        <ModuleViewer
          modules={syllabus.modules || []}
          progressMap={progressMap}
          onToggle={handleToggle}
          doneLabel={t.done}
        />
      )}
    </div>
  );
}

export default Syllabus;
