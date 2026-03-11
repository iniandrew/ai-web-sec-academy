function TopicCard({ topic, onSelect, selected, subtitle }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(topic)}
      className={`w-full rounded-lg border p-4 text-left transition ${
        selected
          ? 'border-primary-500 bg-slate-800'
          : 'border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800'
      }`}
    >
      <p className="font-medium">{topic}</p>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </button>
  );
}

export default TopicCard;
