import { memo } from "react";

function StatsGrid({ overview }) {
  const cards = [
    {
      label: "Subjects",
      value: overview.totalSubjects,
      tone: "bg-cyan-50 text-cyan-800",
    },
    {
      label: "Study Sessions",
      value: overview.totalSessions,
      tone: "bg-emerald-50 text-emerald-800",
    },
    {
      label: "Hours Logged",
      value: overview.totalHours,
      tone: "bg-amber-50 text-amber-800",
    },
    {
      label: "Avg Focus",
      value: `${overview.avgFocus}/10`,
      tone: "bg-rose-50 text-rose-800",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <article key={item.label} className={`rounded-2xl p-4 ${item.tone}`}>
          <p className="text-sm font-semibold">{item.label}</p>
          <p className="mt-2 text-3xl font-bold">{item.value}</p>
        </article>
      ))}
    </section>
  );
}

export default memo(StatsGrid);
