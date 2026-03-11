import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateQuiz } from '../services/api';
import { useLanguage } from '../hooks/useLanguage';

function Quiz() {
  const [params] = useSearchParams();
  const topic = params.get('topic') || '';
  const difficulty = params.get('difficulty') || 'Beginner';
  const { t, apiLanguage } = useLanguage();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!topic) {
      return;
    }

    setLoading(true);
    generateQuiz({ topic, difficulty, language: apiLanguage })
      .then(setQuiz)
      .catch((err) => {
        setError(err?.response?.data?.error || t.failedQuiz);
      })
      .finally(() => setLoading(false));
  }, [topic, difficulty, apiLanguage, t.failedQuiz]);

  if (!topic) {
    return <p className="text-slate-300">{t.selectTopicFirst}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {t.quizFor}: {topic}
      </h1>
      {loading && <p className="text-slate-400">{t.generatingQuiz}</p>}
      {error && <p className="text-red-400">{error}</p>}

      {quiz?.questions?.map((question, idx) => (
        <article key={idx} className="rounded-lg border border-slate-700 bg-slate-900 p-4">
          <p className="font-medium">
            {idx + 1}. {question.question}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {(question.options || []).map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
          <details className="mt-3 rounded border border-slate-700 p-2 text-sm">
            <summary className="cursor-pointer font-medium">{t.showAnswer}</summary>
            <p className="mt-2 text-slate-300">
              {t.answer}: {question.correct_answer}
            </p>
            <p className="text-slate-400">{question.explanation}</p>
          </details>
        </article>
      ))}
    </div>
  );
}

export default Quiz;
