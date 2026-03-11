import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { fetchTopics } from '../services/api';

function Topics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics().then(setTopics).catch(console.error);
  }, []);

  function goTo(page) {
    if (!selectedTopic) {
      return;
    }

    navigate(`/${page}?topic=${encodeURIComponent(selectedTopic)}&difficulty=${encodeURIComponent(difficulty)}`);
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Choose a Topic</h1>
      <div className="w-full max-w-xs">
        <label className="mb-1 block text-sm text-slate-300" htmlFor="difficulty">
          Difficulty
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard
            key={topic}
            topic={topic}
            selected={selectedTopic === topic}
            onSelect={setSelectedTopic}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => goTo('syllabus')}
          disabled={!selectedTopic}
          className="rounded bg-primary-600 px-4 py-2 text-sm font-semibold disabled:opacity-40"
        >
          Generate Syllabus
        </button>
        <button
          type="button"
          onClick={() => goTo('practice')}
          disabled={!selectedTopic}
          className="rounded border border-slate-600 px-4 py-2 text-sm disabled:opacity-40"
        >
          Generate Lab
        </button>
        <button
          type="button"
          onClick={() => goTo('quiz')}
          disabled={!selectedTopic}
          className="rounded border border-slate-600 px-4 py-2 text-sm disabled:opacity-40"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
}

export default Topics;
