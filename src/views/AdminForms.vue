<template>
  <div class="page">
    <header class="page-head">
      <div>
        <h1 class="page-title">Formularios</h1>
        <p class="page-sub">Armá las preguntas que verá cada cliente.</p>
      </div>
      <UiButton variant="primary" :loading="creating" @click="create">
        <template #icon><Plus :size="16" /></template>
        Nuevo formulario
      </UiButton>
    </header>

    <div v-if="loading" class="page-loading"><span class="c-spin" /></div>

    <UiEmpty
      v-else-if="templates.length === 0"
      title="Todavía no tenés formularios"
      text="Creá tu primer formulario con las preguntas que le vas a hacer a cada cliente."
    >
      <template #icon><LayoutList :size="24" /></template>
      <template #action>
        <UiButton variant="primary" :loading="creating" @click="create">
          <template #icon><Plus :size="16" /></template>
          Nuevo formulario
        </UiButton>
      </template>
    </UiEmpty>

    <UiCard v-else :pad="false" class="forms-list">
      <div v-for="t in templates" :key="t.id" class="form-row" @click="edit(t.id)">
        <div class="form-row__main">
          <span class="form-row__name">{{ t.name }}</span>
          <span class="form-row__meta">
            {{ (t.steps || []).length }} pregunta{{ (t.steps || []).length === 1 ? '' : 's' }}
          </span>
        </div>
        <div class="form-row__actions" @click.stop>
          <UiButton size="sm" variant="ghost" @click="edit(t.id)">
            <template #icon><Pencil :size="14" /></template>
            Editar
          </UiButton>
          <UiButton size="sm" variant="danger" @click="remove(t)">Borrar</UiButton>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, LayoutList, Pencil } from 'lucide-vue-next'
import { listTemplates, createTemplate, deleteTemplate } from '@/services/db'
import { UiButton, UiCard, UiEmpty } from '@/components/console'

const router = useRouter()
const templates = ref([])
const loading = ref(true)
const creating = ref(false)

onMounted(load)
async function load() {
  loading.value = true
  templates.value = await listTemplates()
  loading.value = false
}

async function create() {
  creating.value = true
  try {
    const id = await createTemplate('Nuevo formulario')
    router.push({ name: 'admin-form-edit', params: { templateId: id } })
  } finally {
    creating.value = false
  }
}

function edit(id) {
  router.push({ name: 'admin-form-edit', params: { templateId: id } })
}

async function remove(t) {
  if (!confirm(`¿Borrar el formulario "${t.name}"?`)) return
  await deleteTemplate(t.id)
  await load()
}
</script>

<style scoped>
.forms-list { overflow: hidden; }
.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.14s ease;
}
.form-row:last-child { border-bottom: 0; }
.form-row:hover { background: rgba(255, 255, 255, 0.022); }
.form-row__main { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.form-row__name { font-size: 0.98rem; font-weight: 590; letter-spacing: -0.01em; }
.form-row__meta { font-size: 0.82rem; color: var(--text-faint); }
.form-row__actions { display: flex; gap: 4px; flex-shrink: 0; opacity: 0.75; transition: opacity 0.14s ease; }
.form-row:hover .form-row__actions { opacity: 1; }
</style>
