import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "./FirebaseAuthContext";
import {
  fetchUserSubjects,
  fetchUserSessions,
  addSubject,
  updateSubjectInDb,
  deleteSubjectFromDb,
  addSession,
  updateSessionInDb,
  deleteSessionFromDb,
} from "../services/firebaseStudyService";
import {
  getBehaviorSignals,
  getOverviewStats,
  getSubjectProgress,
} from "../utils/insights";

const StudyContext = createContext(null);

function makeId(prefix) {
  if (window.crypto && window.crypto.randomUUID) {
    return `${prefix}_${window.crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function StudyProvider({ children }) {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const subjectsRef = useRef(subjects);
  const sessionsRef = useRef(sessions);

  useEffect(() => {
    subjectsRef.current = subjects;
  }, [subjects]);

  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  const loadData = useCallback(async () => {
    if (!user?.id) {
      setSubjects([]);
      setSessions([]);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const [subjectsData, sessionsData] = await Promise.all([
        fetchUserSubjects(user.id),
        fetchUserSessions(user.id),
      ]);
      setSubjects(subjectsData);
      setSessions(sessionsData);
    } catch (err) {
      setError(err.message || "Could not load your study data.");
      console.error("Load data error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addSubjectAction = useCallback(
    async (payload) => {
      if (!user?.id) return;
      setError("");

      try {
        const newSubject = await addSubject(user.id, {
          name: payload.name.trim(),
          targetHours: Number(payload.targetHours),
          difficulty: payload.difficulty,
          notes: payload.notes.trim(),
        });
        setSubjects((prev) => [newSubject, ...prev]);
      } catch (err) {
        setError(err.message || "Failed to add subject.");
        console.error("Add subject error:", err);
      }
    },
    [user?.id],
  );

  const editSubject = useCallback(async (subjectId, payload) => {
    setError("");

    try {
      await updateSubjectInDb(subjectId, {
        name: payload.name.trim(),
        targetHours: Number(payload.targetHours),
        difficulty: payload.difficulty,
        notes: payload.notes.trim(),
      });
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === subjectId
            ? {
                ...subject,
                name: payload.name.trim(),
                targetHours: Number(payload.targetHours),
                difficulty: payload.difficulty,
                notes: payload.notes.trim(),
              }
            : subject,
        ),
      );
    } catch (err) {
      setError(err.message || "Failed to update subject.");
      console.error("Edit subject error:", err);
    }
  }, []);

  const deleteSubject = useCallback(
    async (subjectId) => {
      if (!user?.id) return;
      setError("");

      try {
        await deleteSubjectFromDb(subjectId, user.id);
        setSubjects((prev) =>
          prev.filter((subject) => subject.id !== subjectId),
        );
        setSessions((prev) =>
          prev.filter((session) => session.subjectId !== subjectId),
        );
      } catch (err) {
        setError(err.message || "Failed to delete subject.");
        console.error("Delete subject error:", err);
      }
    },
    [user?.id],
  );

  const addSessionAction = useCallback(
    async (payload) => {
      if (!user?.id) return;
      setError("");

      try {
        const newSession = await addSession(user.id, {
          subjectId: payload.subjectId,
          duration: Number(payload.duration),
          focus: Number(payload.focus),
          mood: payload.mood,
          distractions: Number(payload.distractions),
          date: payload.date,
          note: payload.note.trim(),
        });
        setSessions((prev) => [newSession, ...prev]);
      } catch (err) {
        setError(err.message || "Failed to add session.");
        console.error("Add session error:", err);
      }
    },
    [user?.id],
  );

  const editSession = useCallback(async (sessionId, payload) => {
    setError("");

    try {
      await updateSessionInDb(sessionId, {
        subjectId: payload.subjectId,
        duration: Number(payload.duration),
        focus: Number(payload.focus),
        mood: payload.mood,
        distractions: Number(payload.distractions),
        date: payload.date,
        note: payload.note.trim(),
      });
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                subjectId: payload.subjectId,
                duration: Number(payload.duration),
                focus: Number(payload.focus),
                mood: payload.mood,
                distractions: Number(payload.distractions),
                date: payload.date,
                note: payload.note.trim(),
              }
            : session,
        ),
      );
    } catch (err) {
      setError(err.message || "Failed to update session.");
      console.error("Edit session error:", err);
    }
  }, []);

  const deleteSession = useCallback(async (sessionId) => {
    setError("");

    try {
      await deleteSessionFromDb(sessionId);
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    } catch (err) {
      setError(err.message || "Failed to delete session.");
      console.error("Delete session error:", err);
    }
  }, []);

  const overview = useMemo(
    () => getOverviewStats(subjects, sessions),
    [subjects, sessions],
  );
  const subjectProgress = useMemo(
    () => getSubjectProgress(subjects, sessions),
    [subjects, sessions],
  );
  const behaviorSignals = useMemo(
    () => getBehaviorSignals(sessions),
    [sessions],
  );

  const value = useMemo(
    () => ({
      subjects,
      sessions,
      isLoading,
      error,
      overview,
      subjectProgress,
      behaviorSignals,
      addSubject: addSubjectAction,
      editSubject,
      deleteSubject,
      addSession: addSessionAction,
      editSession,
      deleteSession,
    }),
    [
      addSessionAction,
      addSubjectAction,
      behaviorSignals,
      deleteSession,
      deleteSubject,
      editSession,
      editSubject,
      error,
      isLoading,
      overview,
      sessions,
      subjectProgress,
      subjects,
    ],
  );

  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error("useStudy must be used within StudyProvider");
  }
  return context;
}
