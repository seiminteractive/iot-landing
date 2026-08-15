<template>
  <div class="console">
    <div class="admin-shell">
      <aside class="admin-nav" :class="{ collapsed }">
        <button class="collapse-btn" :title="collapsed ? 'Expandir menú' : 'Plegar menú'" @click="toggle">
          <PanelLeftOpen v-if="collapsed" :size="18" />
          <PanelLeftClose v-else :size="18" />
        </button>

        <div class="nav-top">
          <img src="@/assets/MARCA-14.png" alt="Seim" class="brand-logo" />
        </div>

        <nav class="admin-links">
          <RouterLink
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="admin-link"
            :class="{ active: item.match() }"
            :title="collapsed ? item.label : ''"
          >
            <component :is="item.icon" :size="19" class="link-icon" />
            <span class="link-label">{{ item.label }}</span>
          </RouterLink>
        </nav>

        <div class="admin-foot">
          <button class="admin-link logout" :title="collapsed ? 'Salir' : ''" @click="logout">
            <LogOut :size="19" class="link-icon" />
            <span class="link-label">Salir</span>
          </button>
        </div>
      </aside>

      <div class="admin-main">
        <header class="admin-topbar">
          <img src="@/assets/MARCA-14.png" alt="Seim Interactive" class="topbar-logo" />
        </header>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Inbox, LayoutList, KeyRound, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { logoutAdmin } from '@/services/auth'

const route = useRoute()
const router = useRouter()

const collapsed = ref(localStorage.getItem('seim-admin-collapsed') === '1')
function toggle() {
  collapsed.value = !collapsed.value
  localStorage.setItem('seim-admin-collapsed', collapsed.value ? '1' : '0')
}

const items = [
  { label: 'Respuestas', to: { name: 'admin-responses' }, icon: Inbox, match: () => route.name === 'admin-responses' },
  { label: 'Formularios', to: { name: 'admin-forms' }, icon: LayoutList, match: () => route.path.startsWith('/admin/forms') },
  { label: 'Clientes', to: { name: 'admin-clients' }, icon: KeyRound, match: () => route.path.startsWith('/admin/clients') },
]

async function logout() {
  await logoutAdmin()
  router.replace({ name: 'admin-login' })
}
</script>

<style scoped>
.admin-shell { display: flex; min-height: 100vh; }

.admin-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 244px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.012);
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.admin-nav.collapsed { width: 72px; }

/* Botón de plegar: fijo arriba a la derecha, sobre la línea del menú.
   No entra en el flujo, así que nunca empuja ni pisa el logo. */
.collapse-btn {
  position: absolute;
  top: 14px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: 0;
  background: transparent;
  color: var(--text-faint);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease, background 0.15s ease;
  z-index: 2;
}
.collapse-btn:hover { color: var(--text); background: rgba(255, 255, 255, 0.08); }
/* Colapsado: el logo se oculta, así que el toggle queda centrado y solo. */
.admin-nav.collapsed .collapse-btn { right: 0; left: 0; margin: 0 auto; }

/* Marca */
.nav-top {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 30px;
  padding: 0 6px;
  margin-bottom: 22px;
  overflow: hidden;
  white-space: nowrap;
}
.brand-logo {
  height: 22px;
  width: auto;
  flex-shrink: 0;
  opacity: 0.95;
  transition: opacity 0.18s ease;
}
/* Colapsado: escondemos la marca (el wordmark no entra en el riel angosto).
   El nav-top conserva su alto/margen para que los items NO se muevan. */
.admin-nav.collapsed .brand-logo { opacity: 0; }

/* Links */
.admin-links { display: flex; flex-direction: column; gap: 3px; flex: 1; }
.admin-link {
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--text-dim);
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 11px;
  font-size: 0.92rem;
  font-weight: 530;
  border: 0;
  background: transparent;
  cursor: pointer;
  width: 100%;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  transition: color 0.15s ease, background 0.15s ease;
}
.admin-link:hover { color: var(--text); background: rgba(255, 255, 255, 0.05); }
.admin-link.active { color: var(--text); background: rgba(175, 227, 232, 0.14); }
.admin-link.active .link-icon { color: var(--accent); }
.link-icon { flex-shrink: 0; }
.link-label { transition: opacity 0.16s ease; }
.admin-nav.collapsed .link-label { opacity: 0; }

.admin-foot { padding-top: 12px; border-top: 1px solid var(--border); }
.logout:hover { color: var(--danger); background: rgba(255, 107, 107, 0.08); }

.admin-main { flex: 1; min-width: 0; }

/* Solo mobile: la marca sale del riel lateral y pasa a una barra superior. */
.admin-topbar { display: none; }

@media (max-width: 720px) {
  .admin-shell { display: block; }
  .admin-nav, .admin-nav.collapsed {
    position: fixed;
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid var(--border);
    border-right: 0;
    padding: 7px 10px calc(7px + env(safe-area-inset-bottom));
    gap: 2px;
    background: rgba(13, 13, 15, 0.94);
    backdrop-filter: blur(18px);
  }
  .collapse-btn { display: none; }
  .nav-top { display: none; }
  .admin-links { flex: 1; flex-direction: row; gap: 2px; }
  .admin-link {
    min-width: 0;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    padding: 7px 3px;
    border-radius: 10px;
    font-size: 0.67rem;
    line-height: 1.1;
    text-align: center;
  }
  .admin-link .link-label,
  .admin-nav.collapsed .link-label { display: block; opacity: 1; }
  .admin-foot { display: flex; border-top: 0; padding: 0; }
  .admin-foot .admin-link { width: 58px; flex: 0 0 58px; }

  .admin-topbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
    background: rgba(13, 13, 15, 0.94);
    backdrop-filter: blur(18px);
  }
  .topbar-logo { height: 19px; width: auto; opacity: 0.95; }

  .admin-main {
    padding-top: 52px;
    padding-bottom: calc(72px + env(safe-area-inset-bottom));
  }
}
</style>
