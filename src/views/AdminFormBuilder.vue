<template>
  <div class="page">
    <div v-if="loading" class="page-loading"><span class="c-spin" /></div>
    <p v-else-if="!template" class="c-error">No encontramos este formulario.</p>

    <template v-else>
      <header class="builder-head">
        <UiButton variant="ghost" size="sm" @click="back">
          <template #icon><ChevronLeft :size="16" /></template>
          Formularios
        </UiButton>
        <span class="save-hint">
          <span v-if="saving" class="c-spin sm" />
          <span v-else class="save-dot" />
          {{ saving ? 'Guardando…' : 'Guardado' }}
        </span>
      </header>

      <input v-model="template.name" class="name-input" placeholder="Nombre del formulario" />

      <div class="steps">
        <UiCard v-for="(step, i) in template.steps" :key="step.id" class="step">
          <div class="step-head">
            <UiBadge :dot="false">{{ typeLabel(step.type) }} · Paso {{ i + 1 }}</UiBadge>
            <div class="step-tools">
              <button class="tool" :disabled="i === 0" title="Subir" @click="move(i, -1)"><ArrowUp :size="15" /></button>
              <button class="tool" :disabled="i === template.steps.length - 1" title="Bajar" @click="move(i, 1)"><ArrowDown :size="15" /></button>
              <button class="tool tool--danger" title="Borrar" @click="removeStep(i)"><Trash2 :size="15" /></button>
            </div>
          </div>

          <div class="step-fields">
            <UiInput v-model="step.question" label="Pregunta" placeholder="¿Qué querés preguntar?" />
            <UiInput v-model="step.help" label="Texto de ayuda (opcional)" placeholder="Aclaración que ve el cliente debajo de la pregunta" />

            <div v-if="step.type === 'choice'" class="opts">
              <span class="field-label">Opciones</span>
              <div v-for="(opt, oi) in step.options" :key="oi" class="opt-row">
                <UiInput v-model="step.options[oi]" :placeholder="`Opción ${oi + 1}`" />
                <button class="tool tool--danger" :disabled="step.options.length <= 1" @click="step.options.splice(oi, 1)"><X :size="15" /></button>
              </div>
              <UiButton size="sm" variant="secondary" class="add-opt" @click="step.options.push('')">
                <template #icon><Plus :size="14" /></template>
                Agregar opción
              </UiButton>
            </div>

            <div class="switches">
              <label class="switch">
                <input type="checkbox" v-model="step.required" />
                <span class="switch-track"><span class="switch-thumb" /></span>
                <span class="switch-text">Obligatoria</span>
              </label>
              <template v-if="step.type === 'choice'">
                <label class="switch">
                  <input type="checkbox" v-model="step.multiple" />
                  <span class="switch-track"><span class="switch-thumb" /></span>
                  <span class="switch-text">Selección múltiple</span>
                </label>
                <label class="switch">
                  <input type="checkbox" v-model="step.allowOther" />
                  <span class="switch-track"><span class="switch-thumb" /></span>
                  <span class="switch-text">Permitir "Otro"</span>
                </label>
              </template>
            </div>
          </div>
        </UiCard>
      </div>

      <div class="add-bar">
        <span class="add-label">Agregar paso</span>
        <UiButton size="sm" variant="secondary" @click="addStep('choice')">
          <template #icon><CircleDot :size="15" /></template>
          Opciones
        </UiButton>
        <UiButton size="sm" variant="secondary" @click="addStep('text')">
          <template #icon><Type :size="15" /></template>
          Texto libre
        </UiButton>
        <UiButton size="sm" variant="secondary" @click="addStep('list')">
          <template #icon><List :size="15" /></template>
          Lista de items
        </UiButton>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft, ArrowUp, ArrowDown, Trash2, X, Plus, CircleDot, Type, List } from 'lucide-vue-next'
import { getTemplate, saveTemplate, newStep } from '@/services/db'
import { UiInput, UiButton, UiCard, UiBadge } from '@/components/console'

const route = useRoute()
const router = useRouter()
const id = route.params.templateId

const template = ref(null)
const loading = ref(true)
const saving = ref(false)

let timer
onMounted(async () => {
  template.value = await getTemplate(id)
  loading.value = false
  // Autoguardado: cualquier cambio se persiste solo (debounce).
  watch(template, scheduleSave, { deep: true })
})

function scheduleSave() {
  saving.value = true
  clearTimeout(timer)
  timer = setTimeout(doSave, 800)
}

async function doSave() {
  try {
    await saveTemplate(id, { name: template.value.name, steps: template.value.steps })
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}

onBeforeUnmount(() => {
  // Si quedó un guardado pendiente, lo disparamos ya.
  if (timer) { clearTimeout(timer); doSave() }
})

const TYPE_LABELS = { choice: 'Opciones', text: 'Texto libre', list: 'Lista' }
const typeLabel = (t) => TYPE_LABELS[t] || t

function addStep(type) { template.value.steps.push(newStep(type)) }
function removeStep(i) { template.value.steps.splice(i, 1) }
function move(i, dir) {
  const steps = template.value.steps
  const j = i + dir
  if (j < 0 || j >= steps.length) return
  ;[steps[i], steps[j]] = [steps[j], steps[i]]
}

function back() {
  router.push({ name: 'admin-forms' })
}
</script>

<style scoped>
.builder-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
.save-hint { display: inline-flex; align-items: center; gap: 7px; font-size: 0.83rem; color: var(--text-faint); }
.save-dot { width: 7px; height: 7px; border-radius: 50%; background: #7ee787; }
.save-hint .c-spin { width: 13px; height: 13px; border-width: 2px; }

.name-input {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 660;
  letter-spacing: -0.03em;
  padding: 6px 2px 14px;
  margin-bottom: 26px;
  outline: none;
}
.name-input:focus { border-color: rgba(175, 227, 232, 0.5); }
.name-input::placeholder { color: var(--text-faint); }

.steps { display: flex; flex-direction: column; gap: 16px; }
.step-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.step-tools { display: flex; gap: 4px; }
.tool {
  width: 30px; height: 30px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text-dim);
  border-radius: 9px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
}
.tool:hover:not(:disabled) { color: var(--text); border-color: var(--border-strong); }
.tool--danger:hover:not(:disabled) { color: var(--danger); border-color: var(--danger); }
.tool:disabled { opacity: 0.35; cursor: not-allowed; }

.step-fields { display: flex; flex-direction: column; gap: 16px; }
.field-label { font-size: 0.82rem; font-weight: 590; display: block; margin-bottom: 10px; }
.opt-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: flex-start; }
.opt-row > :first-child { flex: 1; }
.add-opt { margin-top: 2px; }

.switches { display: flex; flex-wrap: wrap; gap: 20px; padding-top: 6px; }
.switch { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; font-size: 0.88rem; color: var(--text-dim); }
.switch input { position: absolute; opacity: 0; pointer-events: none; }
.switch-track {
  width: 38px; height: 22px;
  border-radius: 999px;
  background: var(--surface-3);
  border: 1px solid var(--border);
  position: relative;
  transition: background 0.18s ease, border-color 0.18s ease;
  flex-shrink: 0;
}
.switch-thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch input:checked + .switch-track { background: var(--accent); border-color: var(--accent); }
.switch input:checked + .switch-track .switch-thumb { transform: translateX(16px); background: var(--accent-ink); }
.switch input:checked ~ .switch-text { color: var(--text); }

.add-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
.add-label { font-size: 0.82rem; color: var(--text-faint); font-weight: 590; margin-right: 2px; }
</style>
