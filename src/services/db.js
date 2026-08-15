// Capa de acceso a Firestore.
//
// Colecciones:
//   templates/{id}        -> { name, steps: [...], updatedAt }         (los form que arma el admin)
//   clients/{codeHash}    -> { name, code, templateId, status, ... }   (el acceso de cada cliente)
//   responses/{codeHash}  -> { templateId, answers, status, ... }      (lo que carga el cliente)
//
// El "codigo" del cliente no se usa como id en texto plano: se hashea (SHA-256)
// y ese hash es el id del documento. Es una capa liviana: el codigo lo elige el
// admin y puede ser simple.
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

const SALT = 'seim-brief-v1:'

// --- utilidades -----------------------------------------------------------

export async function hashCode(code) {
  const normalized = (code || '').trim().toLowerCase()
  const data = new TextEncoder().encode(SALT + normalized)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function newStep(type) {
  const base = { id: crypto.randomUUID(), type, question: '', help: '', required: false }
  if (type === 'choice') return { ...base, options: ['', ''], multiple: false, allowOther: false }
  return base
}

// --- templates ------------------------------------------------------------

export async function listTemplates() {
  const q = query(collection(db, 'templates'), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getTemplate(id) {
  const snap = await getDoc(doc(db, 'templates', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createTemplate(name) {
  const ref = await addDoc(collection(db, 'templates'), {
    name: name || 'Nuevo formulario',
    steps: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function saveTemplate(id, { name, steps }) {
  await updateDoc(doc(db, 'templates', id), {
    name,
    steps,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteTemplate(id) {
  await deleteDoc(doc(db, 'templates', id))
}

// --- clients (codigos de acceso) -----------------------------------------

export async function listClients() {
  const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createClient({ name, code, templateId }) {
  const id = await hashCode(code)
  const existing = await getDoc(doc(db, 'clients', id))
  if (existing.exists()) {
    throw new Error('Ya existe un cliente con ese codigo. Elegi otro.')
  }
  await setDoc(doc(db, 'clients', id), {
    name,
    code, // guardado en claro solo para que vos lo recuerdes en el panel
    templateId,
    status: 'activo',
    createdAt: serverTimestamp(),
  })
  return id
}

export async function deleteClient(hash) {
  await deleteDoc(doc(db, 'clients', hash))
}

// Valida el codigo que ingresa el cliente. Devuelve { hash, client } o null.
export async function validateCode(code) {
  const hash = await hashCode(code)
  const snap = await getDoc(doc(db, 'clients', hash))
  if (!snap.exists() || snap.data().status !== 'activo') return null
  return { hash, client: { id: snap.id, ...snap.data() } }
}

export async function getClientByHash(hash) {
  const snap = await getDoc(doc(db, 'clients', hash))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// --- responses ------------------------------------------------------------

export async function getResponse(hash) {
  const snap = await getDoc(doc(db, 'responses', hash))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// Autosave del cliente: crea o actualiza su respuesta.
export async function saveAnswers(hash, { templateId, clientName, answers, status }) {
  const ref = doc(db, 'responses', hash)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    await updateDoc(ref, {
      answers,
      ...(status ? { status } : {}),
      ...(status === 'enviado' ? { submittedAt: serverTimestamp() } : {}),
      updatedAt: serverTimestamp(),
    })
  } else {
    await setDoc(ref, {
      templateId,
      clientName: clientName || '',
      answers,
      status: status || 'borrador',
      startedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(status === 'enviado' ? { submittedAt: serverTimestamp() } : {}),
    })
  }
}

export async function listResponses() {
  const q = query(collection(db, 'responses'), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function updateResponseStatus(hash, status) {
  await updateDoc(doc(db, 'responses', hash), { status })
}
