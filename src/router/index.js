import { createRouter, createWebHistory } from 'vue-router'
import { waitForAuth, isAdmin } from '@/services/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/Landing.vue'),
  },
  // Zona cliente ------------------------------------------------------------
  {
    path: '/brief',
    name: 'brief-gate',
    component: () => import('@/views/BriefGate.vue'),
  },
  {
    // sessionId = hash del codigo. Se llega aca despues de validar en el gate.
    path: '/brief/:sessionId',
    name: 'brief-wizard',
    component: () => import('@/views/BriefWizard.vue'),
  },
  // Zona admin --------------------------------------------------------------
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/AdminLogin.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-responses',
        component: () => import('@/views/AdminResponses.vue'),
      },
      {
        path: 'forms',
        name: 'admin-forms',
        component: () => import('@/views/AdminForms.vue'),
      },
      {
        path: 'forms/:templateId',
        name: 'admin-form-edit',
        component: () => import('@/views/AdminFormBuilder.vue'),
      },
      {
        path: 'clients',
        name: 'admin-clients',
        component: () => import('@/views/AdminClients.vue'),
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

// Guard: las rutas de admin requieren un usuario logueado con email/password.
router.beforeEach(async (to) => {
  if (!to.meta.requiresAdmin) return true
  await waitForAuth()
  if (!isAdmin()) {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
