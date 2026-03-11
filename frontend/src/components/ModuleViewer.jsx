function ModuleViewer({ modules = [], progressMap = {}, onToggle, doneLabel }) {
  return (
    <div className="space-y-4">
      {modules.map((module, idx) => {
        const checked = Boolean(progressMap[module.title]);

        return (
          <article key={module.title || idx} className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{module.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{module.description}</p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => onToggle(module.title, event.target.checked)}
                  className="h-4 w-4"
                />
                {doneLabel}
              </label>
            </div>

            {Array.isArray(module.learning_objectives) && module.learning_objectives.length > 0 && (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {module.learning_objectives.map((objective, i) => (
                  <li key={i}>{objective}</li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default ModuleViewer;
