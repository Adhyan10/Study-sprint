import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from './firebase'
import { createUserProfile } from './firebaseStudyService'

export async function firebaseSignup(payload) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    )

    await updateProfile(userCredential.user, {
      displayName: payload.name,
    })

    // Create user profile document in Firestore
    await createUserProfile(userCredential.user.uid, {
      name: payload.name,
      email: payload.email,
    })

    return {
      id: userCredential.user.uid,
      name: userCredential.user.displayName || payload.name,
      email: userCredential.user.email,
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already registered. Please login instead.')
    }
    if (error.code === 'auth/weak-password') {
      throw new Error('Password must be at least 6 characters.')
    }
    throw new Error(error.message || 'Failed to create account.')
  }
}

export async function firebaseLogin(payload) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password,
    )

    return {
      id: userCredential.user.uid,
      name: userCredential.user.displayName || 'User',
      email: userCredential.user.email,
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password.')
    }
    throw new Error(error.message || 'Failed to login.')
  }
}

export async function firebaseLogout() {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(error.message || 'Failed to logout.')
  }
}

export function getFirebaseAuth() {
  return auth
}
