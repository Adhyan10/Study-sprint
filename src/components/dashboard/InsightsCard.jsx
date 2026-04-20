export default function InsightsCard({ behaviorSignals, distractionAvg }) {
  return (
    <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-ink">Behavior Insights</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-teal-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Best Mood
          </p>
          <p className="mt-1 text-lg font-bold text-teal-800">
            {behaviorSignals.bestMood}
          </p>
        </div>

        <div className="rounded-xl bg-orange-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Attention Risk
          </p>
          <p className="mt-1 text-lg font-bold text-orange-700">
            {behaviorSignals.attentionRisk}
          </p>
        </div>

        <div className="rounded-xl bg-sky-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Avg Distractions
          </p>
          <p className="mt-1 text-lg font-bold text-sky-700">
            {distractionAvg}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-teal-100 bg-teal-50/50 p-3 text-sm text-slate-700">
        {behaviorSignals.recommendation}
      </p>
    </section>
  );
}
