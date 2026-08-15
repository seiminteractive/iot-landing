<template>
  <div class="page">
    <header class="page-head">
      <div>
        <h1 class="page-title">Clientes</h1>
        <p class="page-sub">Creá un código por cliente y asignale el formulario que va a completar.</p>
      </div>
    </header>

    <!-- Alta ------------------------------------------------------------- -->
    <UiCard class="new-client">
      <form @submit.prevent="create">
        <div class="new-grid">
          <UiInput v-model="form.name" label="Nombre del cliente" placeholder="Paternal Motor" required />
          <UiInput
            v-model="form.code"
            label="Código de acceso"
            placeholder="paternal-2026"
            autocapitalize="off"
            spellcheck="false"
            required
          />
          <UiSelect
            v-model="form.templateId"
            label="Formulario"
            placeholder="Elegí un formulario…"
            :options="templateOptions"
            required
          />
        </div>
        <p v-if="error" class="form-error">{{ error }}</p>
        <div class="new-actions">
          <UiButton type="submit" variant="primary" :loading="saving" :disabled="!templates.length">
            <template #icon><Plus :size="17" /></template>
            Crear acceso
          </UiButton>
          <span v-if="!templates.length" class="hint">Creá un formulario primero.</span>
        </div>
      </form>
    </UiCard>

    <!-- Listado ---------------------------------------------------------- -->
    <div v-if="loading" class="page-loading"><span class="c-spin" /></div>

    <UiEmpty
      v-else-if="clients.length === 0"
      title="Todavía no creaste ningún acceso"
      text="Cargá arriba el nombre del cliente, elegí un código fácil y asignale el formulario que va a completar."
    >
      <template #icon><KeyRound :size="24" /></template>
    </UiEmpty>

    <template v-else>
      <UiCard :pad="false" class="clients-table">
        <div class="crow chead">
          <span>Cliente</span><span>Código</span><span>Formulario</span><span></span>
        </div>
        <div v-for="c in clients" :key="c.id" class="crow">
          <span class="cell-name">
            <span class="avatar">{{ initial(c.name) }}</span>
            {{ c.name }}
          </span>
          <span><code class="code">{{ c.code }}</code></span>
          <span class="cell-tpl">{{ templateName(c.templateId) }}</span>
          <span class="cell-actions">
            <UiButton size="sm" variant="ghost" @click="copyCode(c)">
              <template #icon><component :is="copied === c.id ? Check : Copy" :size="15" /></template>
              {{ copied === c.id ? 'Copiado' : 'Código' }}
            </UiButton>
            <UiButton size="sm" variant="danger" @click="remove(c)">Borrar</UiButton>
          </span>
        </div>
      </UiCard>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { Plus, KeyRound, Copy, Check } from 'lucide-vue-next'
import { listTemplates, listClients, createClient, deleteClient } from '@/services/db'
import { UiInput, UiSelect, UiButton, UiCard, UiEmpty } from '@/components/console'

const templates = ref([])
const clients = ref([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const copied = ref(null)

const form = reactive({ name: '', code: '', templateId: '' })
const briefUrl = computed(() => `${window.location.origin}/brief`)
const templateOptions = computed(() => templates.value.map((t) => ({ value: t.id, label: t.name })))

onMounted(load)
async function load() {
  loading.value = true
  ;[templates.value, clients.value] = await Promise.all([listTemplates(), listClients()])
  loading.value = false
}

function templateName(id) {
  return templates.value.find((t) => t.id === id)?.name || '— (borrado)'
}

function initial(name) {
  return (name || '?').trim().charAt(0).toUpperCase()
}

async function create() {
  error.value = ''
  saving.value = true
  try {
    await createClient({ name: form.name.trim(), code: form.code.trim(), templateId: form.templateId })
    form.name = ''
    form.code = ''
    form.templateId = ''
    await load()
  } catch (e) {
    error.value = e.message || 'No se pudo crear el acceso.'
  } finally {
    saving.value = false
  }
}

async function copyCode(c) {
  try {
    await navigator.clipboard.writeText(c.code)
    copied.value = c.id
    setTimeout(() => { if (copied.value === c.id) copied.value = null }, 1600)
  } catch { /* noop */ }
}

async function remove(c) {
  if (!confirm(`¿Borrar el acceso de "${c.name}"? (no borra sus respuestas)`)) return
  await deleteClient(c.id)
  await load()
}
</script>

<style scoped>
.new-client { margin-bottom: 28px; }
.new-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.form-error { color: var(--danger); font-size: 0.86rem; margin: 16px 0 0; }
.new-actions { display: flex; align-items: center; gap: 14px; margin-top: 20px; }
.hint { color: var(--text-faint); font-size: 0.86rem; }

.clients-table { overflow: hidden; }
.crow {
  display: grid;
  grid-template-columns: 1.6fr 0.9fr 1.3fr 200px;
  gap: 14px;
  align-items: center;
  padding: 13px 18px;
  border-bottom: 1px solid var(--border);
  transition: background 0.14s ease;
}
.crow:not(.chead):hover { background: rgba(255, 255, 255, 0.022); }
.crow:last-child { border-bottom: 0; }
.chead {
  padding: 11px 18px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-faint);
  font-weight: 600;
}
.cell-name { display: flex; align-items: center; gap: 11px; font-weight: 590; }
.avatar {
  width: 30px; height: 30px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: var(--text-dim);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.82rem; font-weight: 640;
  flex-shrink: 0;
}
.cell-tpl { color: var(--text-dim); font-size: 0.9rem; }
.cell-actions { display: flex; gap: 4px; justify-content: flex-end; }
.code {
  font-family: 'SF Mono', ui-monospace, Menlo, monospace;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 3px 9px;
  font-size: 0.82rem;
}
.link-hint { margin-top: 16px; color: var(--text-dim); font-size: 0.88rem; }

@media (max-width: 760px) {
  .new-grid { grid-template-columns: 1fr; }
  .crow.chead { display: none; }
  .crow {
    grid-template-columns: max-content minmax(0, 1fr);
    gap: 10px;
    padding: 16px;
  }
  .cell-name { grid-column: 1 / -1; font-size: 1rem; }
  .cell-tpl { font-size: 0.85rem; }
  .cell-actions {
    grid-column: 1 / -1;
    justify-content: flex-start;
    gap: 6px;
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }
}
</style>
