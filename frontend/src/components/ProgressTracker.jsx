function ProgressTracker({ summary = [], labels }) {
  const totals = summary.reduce(
    (acc, row) => {
      acc.modules += Number(row.moduleCount || 0);
      acc.completed += Number(row.completedCount || 0);
      return acc;
    },
    { modules: 0, completed: 0 }
  );

  const percent = totals.modules > 0 ? Math.round((totals.completed / totals.modules) * 100) : 0;

  return (
    <section className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">{labels.learningProgress}</h2>
      <p className="mt-1 text-sm text-slate-300">
        {totals.completed} {labels.modulesCompleted} {totals.modules} {labels.modulesCompletedTail} ({percent}%)
      </p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded bg-slate-700">
        <div className="h-full bg-primary-500" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}

export default ProgressTracker;
