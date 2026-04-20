import { useMemo, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import AppShell from "../components/layout/AppShell";
import SubjectForm from "../components/study/SubjectForm";
import SubjectList from "../components/study/SubjectList";
import { useStudy } from "../context/FirebaseStudyContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function SubjectsPage() {
  useDocumentTitle("Subjects");
  const { subjects, addSubject, editSubject, deleteSubject } = useStudy();
  const [editingSubject, setEditingSubject] = useState(null);
  const [search, setSearch] = useState("");

  const filteredSubjects = useMemo(() => {
    if (!search.trim()) {
      return subjects;
    }
    const normalized = search.toLowerCase();
    return subjects.filter((item) =>
      item.name.toLowerCase().includes(normalized),
    );
  }, [search, subjects]);

  const handleSave = (payload) => {
    if (editingSubject) {
      editSubject(editingSubject.id, payload);
      setEditingSubject(null);
      return;
    }
    addSubject(payload);
  };

  return (
    <AppShell
      title="Subject Planner"
      subtitle="Define your weekly goals and prioritize difficult topics."
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <SubjectForm
            editingSubject={editingSubject}
            onSave={handleSave}
            onCancel={() => setEditingSubject(null)}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Search Subject
              </span>
              <input
                className="field"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by subject name"
              />
            </label>
          </div>
        </div>

        {!filteredSubjects.length ? (
          <EmptyState
            title="No matching subjects"
            description="Add a new subject or adjust your search text to find one."
          />
        ) : (
          <SubjectList
            subjects={filteredSubjects}
            onEdit={setEditingSubject}
            onDelete={deleteSubject}
          />
        )}
      </div>
    </AppShell>
  );
}
