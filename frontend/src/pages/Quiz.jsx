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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!topic) {
      return;
    }

    setLoading(true);
    setSelectedAnswers({});
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
          <div className="mt-3 space-y-2">
            {(question.options || []).map((option, i) => {
              const selected = selectedAnswers[idx];
              const hasAnswered = typeof selected === 'string';
              const isCorrectOption = option === question.correct_answer;
              const isSelectedOption = selected === option;

              let optionStyle = 'border-slate-700 bg-slate-950 text-slate-200';
              if (hasAnswered && isCorrectOption) {
                optionStyle = 'border-emerald-500 bg-emerald-900/40 text-emerald-200';
              } else if (hasAnswered && isSelectedOption && !isCorrectOption) {
                optionStyle = 'border-red-500 bg-red-900/40 text-red-200';
              }

              return (
                <label key={i} className={`flex cursor-pointer items-center gap-3 rounded border p-2 text-sm ${optionStyle}`}>
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    checked={isSelectedOption}
                    onChange={() =>
                      setSelectedAnswers((prev) => ({
                        ...prev,
                        [idx]: option
                      }))
                    }
                    className="h-4 w-4"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
          {typeof selectedAnswers[idx] === 'string' && (
            <p
              className={`mt-3 text-sm font-medium ${
                selectedAnswers[idx] === question.correct_answer ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {selectedAnswers[idx] === question.correct_answer ? t.correct : t.wrong}
            </p>
          )}
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
