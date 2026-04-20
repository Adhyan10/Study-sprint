import { Link } from "react-router-dom";
import InsightsCard from "../components/dashboard/InsightsCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import EmptyState from "../components/common/EmptyState";
import AppShell from "../components/layout/AppShell";
import { useStudy } from "../context/FirebaseStudyContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function DashboardPage() {
  useDocumentTitle("Dashboard");
  const { overview, subjectProgress, behaviorSignals } = useStudy();

  return (
    <AppShell
      title="Smart Study Dashboard"
      subtitle="Plan smarter, track focus, and discover what routine works best for you."
    >
      <div className="space-y-5">
        <StatsGrid overview={overview} />
        <InsightsCard
          behaviorSignals={behaviorSignals}
          distractionAvg={overview.distractionAvg}
        />

        <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ink">Subject Progress</h2>
            <Link className="btn-outline" to="/subjects">
              Manage Subjects
            </Link>
          </div>

          {!subjectProgress.length ? (
            <div className="mt-4">
              <EmptyState
                title="No subjects yet"
                description="Add your first subject and define weekly target hours to start tracking progress."
              />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {subjectProgress.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {item.spent}h / {item.targetHours}h
                    </p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-ocean"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Link
            to="/sessions"
            className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-left transition hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-bold text-orange-800">
              Log New Session
            </h3>
            <p className="mt-1 text-sm text-orange-700">
              Track your daily focus, mood and distractions in 30 seconds.
            </p>
          </Link>

          <Link
            to="/insights"
            className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-left transition hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-bold text-cyan-800">
              View Deep Insights
            </h3>
            <p className="mt-1 text-sm text-cyan-700">
              Discover patterns across mood, attention and subject performance.
            </p>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
