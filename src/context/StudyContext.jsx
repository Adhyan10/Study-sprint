import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import {
  createSession,
  createSubject,
  getUserStudyData,
  saveUserStudyData,
  updateSession,
  updateSubject,
} from "../services/studyService";
import {
  getBehaviorSignals,
  getOverviewStats,
  getSubjectProgress,
} from "../utils/insights";

const StudyContext = createContext(null);

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

  const persist = useCallback(
    (nextSubjects, nextSessions) => {
      if (!user?.id) {
        return;
      }
      saveUserStudyData(user.id, {
        subjects: nextSubjects,
        sessions: nextSessions,
      });
    },
    [user?.id],
  );

  const loadData = useCallback(() => {
    if (!user?.id) {
      setSubjects([]);
      setSessions([]);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = getUserStudyData(user.id);
      setSubjects(data.subjects);
      setSessions(data.sessions);
    } catch {
      setError("Could not load your study data.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addSubject = useCallback(
    (payload) => {
      setError("");
      setSubjects((prev) => {
        const next = [createSubject(payload), ...prev];
        persist(next, sessionsRef.current);
        return next;
      });
    },
    [persist],
  );

  const editSubject = useCallback(
    (subjectId, payload) => {
      setError("");
      setSubjects((prev) => {
        const next = prev.map((subject) =>
          subject.id === subjectId ? updateSubject(subject, payload) : subject,
        );
        persist(next, sessionsRef.current);
        return next;
      });
    },
    [persist],
  );

  const deleteSubject = useCallback(
    (subjectId) => {
      setError("");
      setSubjects((prev) => {
        const nextSubjects = prev.filter((subject) => subject.id !== subjectId);
        const nextSessions = sessionsRef.current.filter(
          (session) => session.subjectId !== subjectId,
        );
        setSessions(nextSessions);
        persist(nextSubjects, nextSessions);
        return nextSubjects;
      });
    },
    [persist],
  );

  const addSession = useCallback(
    (payload) => {
      setError("");
      setSessions((prev) => {
        const next = [createSession(payload), ...prev];
        persist(subjectsRef.current, next);
        return next;
      });
    },
    [persist],
  );

  const editSession = useCallback(
    (sessionId, payload) => {
      setError("");
      setSessions((prev) => {
        const next = prev.map((session) =>
          session.id === sessionId ? updateSession(session, payload) : session,
        );
        persist(subjectsRef.current, next);
        return next;
      });
    },
    [persist],
  );

  const deleteSession = useCallback(
    (sessionId) => {
      setError("");
      setSessions((prev) => {
        const next = prev.filter((session) => session.id !== sessionId);
        persist(subjectsRef.current, next);
        return next;
      });
    },
    [persist],
  );

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
      addSubject,
      editSubject,
      deleteSubject,
      addSession,
      editSession,
      deleteSession,
    }),
    [
      addSession,
      addSubject,
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
