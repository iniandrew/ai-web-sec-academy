import { Link } from 'react-router-dom';
import useProgress from '../hooks/useProgress';
import ProgressTracker from '../components/ProgressTracker';

function Home() {
  const { summary, loading } = useProgress();

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold">Learn Web Security with AI</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Build practical knowledge across OWASP-style topics with AI-generated syllabus, labs, quizzes, and tutor support.
        </p>
        <div className="mt-5 flex gap-3">
          <Link className="rounded bg-primary-600 px-4 py-2 text-sm font-semibold" to="/topics">
            Start Learning
          </Link>
          <Link className="rounded border border-slate-600 px-4 py-2 text-sm" to="/tutor">
            Ask AI Tutor
          </Link>
        </div>
      </section>

      {loading ? <p className="text-sm text-slate-400">Loading progress...</p> : <ProgressTracker summary={summary} />}
    </div>
  );
}

export default Home;
