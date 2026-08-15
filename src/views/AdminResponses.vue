<template>
  <div class="page">
    <header class="page-head">
      <div>
        <h1 class="page-title">Respuestas</h1>
        <p class="page-sub">Los briefs que cargaron tus clientes.</p>
      </div>
      <div class="head-actions">
        <UiSelect v-model="filter" :options="filterOptions" class="filter" />
        <UiButton size="md" variant="secondary" @click="load">
          <template #icon><RotateCw :size="16" /></template>
        </UiButton>
      </div>
    </header>

    <div v-if="loading" class="page-loading"><span class="c-spin" /></div>

    <UiEmpty
      v-else-if="filtered.length === 0"
      :title="filter ? 'Sin respuestas en este estado' : 'Todavía no hay respuestas'"
      :text="filter ? 'Probá con otro filtro.' : 'Cuando un cliente complete su brief, lo vas a ver acá.'"
    >
      <template #icon><Inbox :size="24" /></template>
    </UiEmpty>

    <div v-else class="list">
      <UiCard v-for="r in filtered" :key="r.id" :pad="false" class="resp">
        <button class="resp-head" @click="toggle(r.id)">
          <span class="resp-chev" :class="{ open: open === r.id }"><ChevronRight :size="18" /></span>
          <span class="resp-avatar">{{ initial(r.clientName) }}</span>
          <span class="resp-id">
            <strong>{{ r.clientName || 'Sin nombre' }}</strong>
            <span class="resp-meta">{{ fmtDate(r.updatedAt) }} · {{ tplName(r.templateId) }}</span>
          </span>
          <UiBadge :status="r.status">{{ statusLabel(r.status) }}</UiBadge>
        </button>

        <div v-if="open === r.id" class="resp-body">
          <div v-if="tplSteps(r).length === 0" class="raw-wrap">
            <p class="c-muted small">El formulario de este brief ya no existe; se muestran los datos crudos.</p>
            <pre class="raw">{{ JSON.stringify(r.answers, null, 2) }}</pre>
          </div>
          <dl v-else class="qa">
            <div v-for="step in tplSteps(r)" :key="step.id" class="qa-item">
              <dt>{{ step.question || '(sin título)' }}</dt>
              <dd :class="{ empty: !formatAnswer(step, r.answers[step.id]) }">
                {{ formatAnswer(step, r.answers[step.id]) || 'Sin responder' }}
              </dd>
            </div>
          </dl>

          <div class="resp-actions">
            <div class="status-ctrl">
              <span class="status-label">Estado</span>
              <UiSelect
                :model-value="r.status"
                :options="statusOptions"
                class="status-select"
                @update:model-value="changeStatus(r, $event)"
              />
            </div>
            <UiButton size="sm" variant="secondary" @click="copySummary(r)">
              <template #icon><component :is="copied === r.id ? Check : Copy" :size="15" /></template>
              {{ copied === r.id ? 'Copiado' : 'Copiar resumen' }}
            </UiButton>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Inbox, ChevronRight, RotateCw, Copy, Check } from 'lucide-vue-next'
import { listResponses, listTemplates, updateResponseStatus } from '@/services/db'
import { UiSelect, UiButton, UiCard, UiBadge, UiEmpty } from '@/components/console'

const OTHER = '__other__'
const responses = ref([])
const templates = ref({})
const loading = ref(true)
const open = ref(null)
const filter = ref('')
const copied = ref(null)

const filterOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'borrador', label: 'Borrador' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'en_revision', label: 'En revisión' },
  { value: 'cotizado', label: 'Cotizado' },
]
const statusOptions = filterOptions.slice(1)

onMounted(load)
async function load() {
  loading.value = true
  const [resp, tpls] = await Promise.all([listResponses(), listTemplates()])
  responses.value = resp
  templates.value = Object.fromEntries(tpls.map((t) => [t.id, t]))
  loading.value = false
}

const filtered = computed(() =>
  filter.value ? responses.value.filter((r) => r.status === filter.value) : responses.value
)

function toggle(id) { open.value = open.value === id ? null : id }
function initial(name) { return (name || '?').trim().charAt(0).toUpperCase() }

const STATUS = { borrador: 'Borrador', enviado: 'Enviado', en_revision: 'En revisión', cotizado: 'Cotizado' }
const statusLabel = (s) => STATUS[s] || s
const tplName = (id) => templates.value[id]?.name || '— (formulario borrado)'
const tplSteps = (r) => templates.value[r.templateId]?.steps || []

function fmtDate(ts) {
  if (!ts?.toDate) return ''
  return ts.toDate().toLocaleString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function formatAnswer(step, val) {
  if (val == null) return ''
  if (step.type === 'choice') {
    const parts = (val.values || []).filter((v) => v !== OTHER)
    if ((val.values || []).includes(OTHER) && val.other) parts.push(val.other)
    return parts.join(', ')
  }
  if (step.type === 'list') return (val || []).filter((x) => x && x.trim()).join(' · ')
  return typeof val === 'string' ? val.trim() : ''
}

async function changeStatus(r, status) {
  await updateResponseStatus(r.id, status)
  r.status = status
}

async function copySummary(r) {
  const lines = [`Brief — ${r.clientName || 'Sin nombre'} (${statusLabel(r.status)})`, '']
  for (const step of tplSteps(r)) {
    lines.push(`• ${step.question}`)
    lines.push(`  ${formatAnswer(step, r.answers[step.id]) || '— sin responder'}`)
    lines.push('')
  }
  try {
    await navigator.clipboard.writeText(lines.join('\n'))
    copied.value = r.id
    setTimeout(() => { if (copied.value === r.id) copied.value = null }, 1800)
  } catch { /* noop */ }
}
</script>

<style scoped>
.head-actions { display: flex; gap: 10px; align-items: center; }
.filter :deep(.ui-select) { width: auto; min-width: 180px; }

.list { display: flex; flex-direction: column; gap: 12px; }
.resp { overflow: hidden; }
.resp-head {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
  color: inherit;
  font-family: inherit;
}
.resp-head:hover { background: rgba(255, 255, 255, 0.02); }
.resp-chev { color: var(--text-faint); display: flex; transition: transform 0.2s ease; }
.resp-chev.open { transform: rotate(90deg); }
.resp-avatar {
  width: 34px; height: 34px;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-weight: 640; font-size: 0.9rem;
  flex-shrink: 0;
}
.resp-id { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.resp-id strong { font-weight: 590; font-size: 0.98rem; }
.resp-meta { font-size: 0.8rem; color: var(--text-faint); }

.resp-body { padding: 6px 22px 22px; border-top: 1px solid var(--border); }
.qa { display: flex; flex-direction: column; gap: 18px; margin: 20px 0 0; }
.qa-item dt { font-weight: 590; font-size: 0.92rem; margin-bottom: 5px; }
.qa-item dd { margin: 0; color: var(--text-dim); line-height: 1.55; white-space: pre-wrap; }
.qa-item dd.empty { color: var(--text-faint); font-style: italic; }

.resp-actions {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}
.status-ctrl { display: flex; flex-direction: column; gap: 6px; }
.status-label { font-size: 0.78rem; color: var(--text-faint); font-weight: 590; }
.status-select :deep(.ui-select) { height: 38px; min-width: 170px; }

.small { font-size: 0.82rem; margin: 16px 0 8px; }
.raw { background: var(--surface-2); border-radius: 10px; padding: 14px; font-size: 0.8rem; overflow-x: auto; margin: 0; }
</style>
