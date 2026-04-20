import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  writeBatch,
  setDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const SUBJECTS_COLLECTION = 'subjects'
const SESSIONS_COLLECTION = 'sessions'
const USERS_COLLECTION = 'users'

export async function createUserProfile(userId, userData) {
  try {
    await setDoc(doc(db, USERS_COLLECTION, userId), {
      id: userId,
      name: userData.name,
      email: userData.email,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Failed to create user profile:', error)
    throw error
  }
}

export async function fetchUserSubjects(userId) {
  try {
    const q = query(
      collection(db, SUBJECTS_COLLECTION),
      where('userId', '==', userId),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
    throw error
  }
}

export async function fetchUserSessions(userId) {
  try {
    const q = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId),
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
    throw error
  }
}

export async function addSubject(userId, subjectData) {
  try {
    const docRef = await addDoc(collection(db, SUBJECTS_COLLECTION), {
      userId,
      ...subjectData,
      createdAt: serverTimestamp(),
    })
    return {
      id: docRef.id,
      userId,
      ...subjectData,
    }
  } catch (error) {
    console.error('Failed to add subject:', error)
    throw error
  }
}

export async function updateSubjectInDb(subjectId, updates) {
  try {
    const docRef = doc(db, SUBJECTS_COLLECTION, subjectId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Failed to update subject:', error)
    throw error
  }
}

export async function deleteSubjectFromDb(subjectId, userId) {
  try {
    const batch = writeBatch(db)
    const docRef = doc(db, SUBJECTS_COLLECTION, subjectId)
    batch.delete(docRef)

    const sessionsQuery = query(
      collection(db, SESSIONS_COLLECTION),
      where('userId', '==', userId),
      where('subjectId', '==', subjectId),
    )
    const sessionsSnapshot = await getDocs(sessionsQuery)
    sessionsSnapshot.docs.forEach((docSnap) => {
      batch.delete(docSnap.ref)
    })

    await batch.commit()
  } catch (error) {
    console.error('Failed to delete subject:', error)
    throw error
  }
}

export async function addSession(userId, sessionData) {
  try {
    const docRef = await addDoc(collection(db, SESSIONS_COLLECTION), {
      userId,
      ...sessionData,
      createdAt: serverTimestamp(),
    })
    return {
      id: docRef.id,
      userId,
      ...sessionData,
    }
  } catch (error) {
    console.error('Failed to add session:', error)
    throw error
  }
}

export async function updateSessionInDb(sessionId, updates) {
  try {
    const docRef = doc(db, SESSIONS_COLLECTION, sessionId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Failed to update session:', error)
    throw error
  }
}

export async function deleteSessionFromDb(sessionId) {
  try {
    const docRef = doc(db, SESSIONS_COLLECTION, sessionId)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Failed to delete session:', error)
    throw error
  }
}
