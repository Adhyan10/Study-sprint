import { useCallback, useMemo, useRef, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import AppShell from "../components/layout/AppShell";
import SessionForm from "../components/study/SessionForm";
import SessionTable from "../components/study/SessionTable";
import { useStudy } from "../context/FirebaseStudyContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function SessionsPage() {
  useDocumentTitle("Sessions");
  const { subjects, sessions, addSession, editSession, deleteSession } =
    useStudy();
  const [editingSession, setEditingSession] = useState(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);

  const handleFocusSearch = useCallback(() => {
    searchRef.current?.focus();
  }, []);

  const handleSave = useCallback(
    (payload) => {
      if (editingSession) {
        editSession(editingSession.id, payload);
        setEditingSession(null);
        return;
      }
      addSession(payload);
    },
    [addSession, editSession, editingSession],
  );

  const filteredSessions = useMemo(() => {
    const bySubject =
      selectedSubjectId === "all"
        ? sessions
        : sessions.filter((session) => session.subjectId === selectedSubjectId);

    if (!searchText.trim()) {
      return bySubject;
    }

    const lowered = searchText.toLowerCase();
    return bySubject.filter((item) =>
      item.note.toLowerCase().includes(lowered),
    );
  }, [searchText, selectedSubjectId, sessions]);

  return (
    <AppShell
      title="Session Tracker"
      subtitle="Capture each study session and improve your focus habits over time."
    >
      {!subjects.length ? (
        <EmptyState
          title="Add subjects first"
          description="Create at least one subject before logging sessions so each record is meaningful."
        />
      ) : (
        <div className="space-y-5">
          <SessionForm
            subjects={subjects}
            editingSession={editingSession}
            onSave={handleSave}
            onCancel={() => setEditingSession(null)}
          />

          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">Session Records</h2>
              <button className="btn-outline" onClick={handleFocusSearch}>
                Focus Search
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  Filter by Subject
                </span>
                <select
                  className="field"
                  value={selectedSubjectId}
                  onChange={(event) => setSelectedSubjectId(event.target.value)}
                >
                  <option value="all">All subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  Search Notes
                </span>
                <input
                  ref={searchRef}
                  className="field"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search by note text"
                />
              </label>
            </div>
          </section>

          {!filteredSessions.length ? (
            <EmptyState
              title="No sessions found"
              description="Add a session or tweak the filter settings to find your data."
            />
          ) : (
            <SessionTable
              sessions={filteredSessions}
              subjects={subjects}
              onEdit={setEditingSession}
              onDelete={deleteSession}
            />
          )}
        </div>
      )}
    </AppShell>
  );
}
