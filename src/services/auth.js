// Manejo de autenticacion.
// - El ADMIN (vos) entra con email + password.
// - El CLIENTE no se loguea: usamos auth anonima para poder leer/escribir
//   Firestore bajo reglas, pero el acceso real lo controla el codigo del brief.
import { ref } from 'vue'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
} from 'firebase/auth'
import { auth } from './firebase'

export const currentUser = ref(auth.currentUser)

let resolveReady
const ready = new Promise((res) => (resolveReady = res))
let resolved = false

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
  if (!resolved) {
    resolved = true
    resolveReady()
  }
})

// Espera a que Firebase resuelva el estado inicial de auth (evita falsos negativos
// en el guard del router al recargar la pagina).
export function waitForAuth() {
  return ready
}

// Admin = usuario logueado con email/password (no anonimo).
export function isAdmin() {
  const u = currentUser.value
  if (!u) return false
  return u.providerData.some((p) => p.providerId === 'password')
}

export async function loginAdmin(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function logoutAdmin() {
  await signOut(auth)
}

// Garantiza una sesion (anonima) para el cliente que carga el brief.
export async function ensureClientSession() {
  await waitForAuth()
  if (!currentUser.value) {
    await signInAnonymously(auth)
  }
  return currentUser.value
}
