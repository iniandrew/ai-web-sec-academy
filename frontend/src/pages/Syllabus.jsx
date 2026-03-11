import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ModuleViewer from '../components/ModuleViewer';
import { fetchTopicProgress, generateSyllabus, saveProgress } from '../services/api';

function Syllabus() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const difficulty = params.get('difficulty') || 'Beginner';

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

    Promise.all([generateSyllabus({ topic, difficulty }), fetchTopicProgress(topic)])
      .then(([syllabusData, progressData]) => {
        setSyllabus(syllabusData);
        setProgressRows(progressData);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || 'Failed to generate syllabus');
      })
      .finally(() => setLoading(false));
  }, [topic, difficulty]);

  async function handleToggle(moduleTitle, completed) {
    await saveProgress({ topic, moduleTitle, completed });
    const updated = await fetchTopicProgress(topic);
    setProgressRows(updated);
  }

  if (!topic) {
    return <p className="text-slate-300">Select a topic from the Topics page first.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Syllabus: {topic}</h1>
      <p className="text-sm text-slate-400">Difficulty: {difficulty}</p>
      {loading && <p className="text-slate-400">Generating syllabus...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {syllabus && <ModuleViewer modules={syllabus.modules || []} progressMap={progressMap} onToggle={handleToggle} />}
    </div>
  );
}

export default Syllabus;
