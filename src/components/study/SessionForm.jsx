import { useEffect, useState } from "react";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

const makeInitial = (subjectId = "") => ({
  subjectId,
  duration: 1,
  focus: 7,
  mood: "Good",
  distractions: 1,
  date: todayIso(),
  note: "",
});

export default function SessionForm({
  subjects,
  editingSession,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(makeInitial(subjects[0]?.id || ""));

  useEffect(() => {
    if (editingSession) {
      setForm({
        subjectId: editingSession.subjectId,
        duration: editingSession.duration,
        focus: editingSession.focus,
        mood: editingSession.mood,
        distractions: editingSession.distractions,
        date: editingSession.date,
        note: editingSession.note,
      });
      return;
    }

    setForm((prev) => ({
      ...makeInitial(subjects[0]?.id || ""),
      subjectId: prev.subjectId || subjects[0]?.id || "",
    }));
  }, [editingSession, subjects]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.subjectId) {
      return;
    }

    onSave({
      ...form,
      note: form.note.trim(),
    });

    if (!editingSession) {
      setForm(makeInitial(subjects[0]?.id || ""));
    }
  };

  return (
    <form
      className="rounded-2xl border border-teal-100 bg-white p-5 shadow-soft"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-bold text-ink">
        {editingSession ? "Edit Session" : "Log Study Session"}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Subject
          </span>
          <select
            className="field"
            name="subjectId"
            value={form.subjectId}
            onChange={onChange}
          >
            <option value="">Select subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Duration (hours)
          </span>
          <input
            className="field"
            type="number"
            min="0.5"
            step="0.5"
            name="duration"
            value={form.duration}
            onChange={onChange}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Focus score (1-10)
          </span>
          <input
            className="field"
            type="number"
            min="1"
            max="10"
            name="focus"
            value={form.focus}
            onChange={onChange}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Mood
          </span>
          <select
            className="field"
            name="mood"
            value={form.mood}
            onChange={onChange}
          >
            <option>Great</option>
            <option>Good</option>
            <option>Okay</option>
            <option>Tired</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Distractions
          </span>
          <input
            className="field"
            type="number"
            min="0"
            name="distractions"
            value={form.distractions}
            onChange={onChange}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Date
          </span>
          <input
            className="field"
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Note
          </span>
          <textarea
            className="field min-h-24"
            name="note"
            value={form.note}
            onChange={onChange}
            placeholder="What worked in this session?"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-primary" type="submit">
          {editingSession ? "Update Session" : "Add Session"}
        </button>

        {editingSession ? (
          <button className="btn-outline" type="button" onClick={onCancel}>
            Cancel Edit
          </button>
        ) : null}
      </div>
    </form>
  );
}
