import { useState } from 'react';
import { askTutor } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';

function Tutor() {
  const [question, setQuestion] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState(null);
  const [error, setError] = useState('');
  const { t, apiLanguage } = useLanguage();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await askTutor({ question, topic, language: apiLanguage });
      setReply(response);
    } catch (err) {
      setError(err?.response?.data?.error || t.failedTutor);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">{t.tutorTitle}</h1>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
        <input
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder={t.tutorContextPlaceholder}
          className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <textarea
          required
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={t.tutorQuestionPlaceholder}
          className="h-32 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <button type="submit" disabled={loading} className="rounded bg-primary-600 px-4 py-2 text-sm font-semibold">
          {loading ? t.asking : t.askTutorButton}
        </button>
      </form>

      {error && <p className="text-red-400">{error}</p>}

      {reply && (
        <section className="space-y-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">{t.tutorAnswer}</h2>
          <p className="text-slate-300">{reply.answer}</p>
          <div>
            <p className="font-medium">{t.keyPoints}</p>
            <ul className="list-disc pl-5 text-sm text-slate-300">
              {(reply.key_points || []).map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-primary-500">
            {t.nextStep}: {reply.next_step}
          </p>
        </section>
      )}
    </div>
  );
}

export default Tutor;
