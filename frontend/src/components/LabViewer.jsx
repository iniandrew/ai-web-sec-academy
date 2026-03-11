import CodeBlock from './CodeBlock';

function LabViewer({ lab, labels }) {
  if (!lab) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-lg border border-slate-700 bg-slate-900 p-5">
      <h2 className="text-xl font-semibold">{lab.lab_title}</h2>
      <p className="text-slate-300">{lab.scenario}</p>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-200">{labels.vulnerableCode}</p>
        <CodeBlock code={lab.vulnerable_code} language="javascript" />
      </div>

      <div>
        <p className="font-medium">{labels.task}</p>
        <p className="text-slate-300">{lab.task}</p>
      </div>

      <details className="rounded border border-slate-700 p-3">
        <summary className="cursor-pointer font-medium">{labels.hints}</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {(lab.hints || []).map((hint, idx) => (
            <li key={idx}>{hint}</li>
          ))}
        </ul>
      </details>

      <details className="rounded border border-slate-700 p-3">
        <summary className="cursor-pointer font-medium">{labels.solution}</summary>
        <p className="mt-2 text-sm text-slate-300">{lab.solution}</p>
      </details>
    </section>
  );
}

export default LabViewer;
