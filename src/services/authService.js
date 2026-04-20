const USERS_KEY = 'studysprint_users'
const SESSION_KEY = 'studysprint_session'

function safeParse(raw, fallback) {
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function getUsers() {
  const raw = window.localStorage.getItem(USERS_KEY)
  return raw ? safeParse(raw, []) : []
}

function setUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toPublicUser(user) {
  if (!user) {
    return null
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

function makeId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID()
  }
  return `usr_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function signup(payload) {
  const users = getUsers()
  const existing = users.find((u) => u.email.toLowerCase() === payload.email.toLowerCase())
  if (existing) {
    throw new Error('Email already registered. Please login instead.')
  }

  const nextUser = {
    id: makeId(),
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
    createdAt: new Date().toISOString(),
  }

  const nextUsers = [...users, nextUser]
  setUsers(nextUsers)
  window.localStorage.setItem(SESSION_KEY, nextUser.id)
  return toPublicUser(nextUser)
}

export function login(payload) {
  const users = getUsers()
  const found = users.find(
    (u) => u.email.toLowerCase() === payload.email.toLowerCase() && u.password === payload.password,
  )

  if (!found) {
    throw new Error('Invalid email or password.')
  }

  window.localStorage.setItem(SESSION_KEY, found.id)
  return toPublicUser(found)
}

export function logout() {
  window.localStorage.removeItem(SESSION_KEY)
}

export function getSessionUser() {
  const sessionId = window.localStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    return null
  }

  const users = getUsers()
  const current = users.find((u) => u.id === sessionId)
  return toPublicUser(current)
}
