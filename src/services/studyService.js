function getStorageKey(userId) {
  return `studysprint_data_${userId}`
}

function makeId(prefix) {
  if (window.crypto && window.crypto.randomUUID) {
    return `${prefix}_${window.crypto.randomUUID()}`
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function getUserStudyData(userId) {
  const raw = window.localStorage.getItem(getStorageKey(userId))
  if (!raw) {
    return { subjects: [], sessions: [] }
  }

  try {
    const parsed = JSON.parse(raw)
    return {
      subjects: parsed.subjects || [],
      sessions: parsed.sessions || [],
    }
  } catch {
    return { subjects: [], sessions: [] }
  }
}

export function saveUserStudyData(userId, data) {
  window.localStorage.setItem(getStorageKey(userId), JSON.stringify(data))
}

export function createSubject(subjectData) {
  return {
    id: makeId('subj'),
    name: subjectData.name,
    targetHours: Number(subjectData.targetHours),
    difficulty: subjectData.difficulty,
    notes: subjectData.notes,
    createdAt: new Date().toISOString(),
  }
}

export function updateSubject(existing, updates) {
  return {
    ...existing,
    ...updates,
    targetHours: Number(updates.targetHours),
    updatedAt: new Date().toISOString(),
  }
}

export function createSession(sessionData) {
  return {
    id: makeId('sess'),
    subjectId: sessionData.subjectId,
    duration: Number(sessionData.duration),
    focus: Number(sessionData.focus),
    mood: sessionData.mood,
    distractions: Number(sessionData.distractions),
    date: sessionData.date,
    note: sessionData.note,
    createdAt: new Date().toISOString(),
  }
}

export function updateSession(existing, updates) {
  return {
    ...existing,
    ...updates,
    duration: Number(updates.duration),
    focus: Number(updates.focus),
    distractions: Number(updates.distractions),
    updatedAt: new Date().toISOString(),
  }
}
