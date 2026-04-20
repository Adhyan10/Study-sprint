import { memo } from "react";

function SubjectList({ subjects, onEdit, onDelete }) {
  return (
    <section className="space-y-3">
      {subjects.map((subject) => (
        <article
          key={subject.id}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {subject.name}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {subject.notes || "No notes added yet."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn-outline" onClick={() => onEdit(subject)}>
                Edit
              </button>
              <button
                className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                onClick={() => onDelete(subject.id)}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-lg bg-teal-50 px-2 py-1 text-teal-700">
              Target: {subject.targetHours}h/week
            </span>
            <span className="rounded-lg bg-sky-50 px-2 py-1 text-sky-700">
              Difficulty: {subject.difficulty}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default memo(SubjectList);
