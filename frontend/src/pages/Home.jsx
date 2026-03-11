import { Link } from 'react-router-dom';
import useProgress from '../hooks/useProgress';
import ProgressTracker from '../components/ProgressTracker';
import { useLanguage } from '../hooks/useLanguage';

function Home() {
  const { summary, loading } = useProgress();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h1 className="text-3xl font-bold">{t.learnTitle}</h1>
        <p className="mt-2 max-w-2xl text-slate-300">{t.learnDesc}</p>
        <div className="mt-5 flex gap-3">
          <Link className="rounded bg-primary-600 px-4 py-2 text-sm font-semibold" to="/topics">
            {t.startLearning}
          </Link>
          <Link className="rounded border border-slate-600 px-4 py-2 text-sm" to="/tutor">
            {t.askTutor}
          </Link>
        </div>
      </section>

      {loading ? (
        <p className="text-sm text-slate-400">{t.loadingProgress}</p>
      ) : (
        <ProgressTracker
          summary={summary}
          labels={{
            learningProgress: t.learningProgress,
            modulesCompleted: t.modulesCompleted,
            modulesCompletedTail: t.modulesCompletedTail
          }}
        />
      )}
    </div>
  );
}

export default Home;
