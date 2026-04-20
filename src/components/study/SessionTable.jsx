import { memo } from "react";

function SessionTable({ sessions, subjects, onEdit, onDelete }) {
  const subjectMap = subjects.reduce((acc, item) => {
    acc[item.id] = item.name;
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Subject</th>
            <th className="px-4 py-3 font-semibold">Hours</th>
            <th className="px-4 py-3 font-semibold">Focus</th>
            <th className="px-4 py-3 font-semibold">Mood</th>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium text-slate-800">
                {subjectMap[session.subjectId] || "Unknown"}
              </td>
              <td className="px-4 py-3 text-slate-700">{session.duration}</td>
              <td className="px-4 py-3 text-slate-700">{session.focus}/10</td>
              <td className="px-4 py-3 text-slate-700">{session.mood}</td>
              <td className="px-4 py-3 text-slate-700">{session.date}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    className="btn-outline px-3 py-1.5"
                    onClick={() => onEdit(session)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 font-semibold text-rose-700"
                    onClick={() => onDelete(session.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(SessionTable);
