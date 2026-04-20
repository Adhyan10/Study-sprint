import AppShell from "../components/layout/AppShell";
import { useStudy } from "../context/FirebaseStudyContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function InsightsPage() {
  useDocumentTitle("Insights");
  const { subjectProgress, behaviorSignals, overview } = useStudy();

  const maxHours = Math.max(1, ...subjectProgress.map((item) => item.spent));

  return (
    <AppShell
      title="Behavior Insights"
      subtitle="Understand your study patterns and use data-backed recommendations to improve."
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">
            Hours Spent Per Subject
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Quick visual comparison of where your study time is going.
          </p>

          <div className="mt-5 space-y-3">
            {subjectProgress.map((item) => (
              <div key={item.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <p className="font-semibold text-slate-700">{item.name}</p>
                  <p className="text-slate-600">{item.spent}h</p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-ocean to-cyan-400"
                    style={{
                      width: `${Math.round((item.spent / maxHours) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-lg font-bold text-ink">Focus Summary</h3>
            <p className="mt-2 text-sm text-slate-600">
              Average focus score: {overview.avgFocus}/10
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Average distractions: {overview.distractionAvg}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-lg font-bold text-ink">Mood Pattern</h3>
            <p className="mt-2 text-sm text-slate-600">
              Most common productive mood: {behaviorSignals.bestMood}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Attention risk: {behaviorSignals.attentionRisk}
            </p>
          </article>

          <article className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
            <h3 className="text-lg font-bold text-teal-900">Recommendation</h3>
            <p className="mt-2 text-sm text-teal-800">
              {behaviorSignals.recommendation}
            </p>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
