import { useEffect, useRef, useState } from "react";

const emptyForm = {
  name: "",
  targetHours: 5,
  difficulty: "Medium",
  notes: "",
};

export default function SubjectForm({ editingSubject, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingSubject) {
      setForm({
        name: editingSubject.name,
        targetHours: editingSubject.targetHours,
        difficulty: editingSubject.difficulty,
        notes: editingSubject.notes,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingSubject]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editingSubject]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      notes: form.notes.trim(),
    });

    if (!editingSubject) {
      setForm(emptyForm);
      inputRef.current?.focus();
    }
  };

  return (
    <form
      className="rounded-2xl border border-teal-100 bg-white p-5 shadow-soft"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-bold text-ink">
        {editingSubject ? "Edit Subject" : "Add Subject"}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Subject Name
          </span>
          <input
            ref={inputRef}
            className="field"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Data Structures"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Weekly Target (hours)
          </span>
          <input
            className="field"
            name="targetHours"
            type="number"
            min="1"
            value={form.targetHours}
            onChange={onChange}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Difficulty
          </span>
          <select
            className="field"
            name="difficulty"
            value={form.difficulty}
            onChange={onChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Notes
          </span>
          <textarea
            className="field min-h-24"
            name="notes"
            value={form.notes}
            onChange={onChange}
            placeholder="Exam in 3 weeks, focus on recursion and trees..."
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-primary" type="submit">
          {editingSubject ? "Update Subject" : "Create Subject"}
        </button>

        {editingSubject ? (
          <button type="button" className="btn-outline" onClick={onCancel}>
            Cancel Edit
          </button>
        ) : null}
      </div>
    </form>
  );
}
