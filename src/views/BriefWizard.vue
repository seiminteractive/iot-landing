<template>
  <div class="console wiz">
    <!-- Fondo: misma luz cónica del hero de la landing (fuente fuera de
         pantalla a la derecha, rayos blanco→aqua enmascarados) + grano -->
    <div class="wiz-bg" aria-hidden="true">
      <div class="light-container">
        <div class="conic-light conic-light-top" />
        <div class="conic-light conic-light-bottom" />
      </div>
      <div class="grain" />
    </div>

    <!-- Cargando --------------------------------------------------------- -->
    <div v-if="loading" class="center"><span class="c-spin" /></div>

    <!-- Enviado ----------------------------------------------------------- -->
    <div v-else-if="sent" class="center">
      <div class="done">
        <div class="done-badge"><Check :size="30" /></div>
        <h1 class="done-title">¡Listo, {{ clientName || 'gracias' }}!</h1>
        <p class="done-text">
          Recibimos tu información. La revisamos y te contactamos con la propuesta
          y la cotización a medida. Ya podés cerrar esta ventana.
        </p>
        <UiButton variant="secondary" @click="sent = false">Revisar mis respuestas</UiButton>
      </div>
    </div>

    <!-- Intro ------------------------------------------------------------- -->
    <div v-else-if="!started && steps.length" class="center">
      <div class="intro">
        <img src="@/assets/MARCA-14.png" alt="Seim" class="intro-logo" />
        <span class="eyebrow">Brief de proyecto</span>
        <h1 class="intro-title">Hola{{ clientName ? ', ' + clientName : '' }}</h1>
        <p class="intro-lead">
          Vamos a hacerte unas preguntas para entender bien tu proyecto y armarte
          una propuesta a medida. No lleva más de unos minutos y se guarda solo
          a medida que avanzás.
        </p>
        <div class="intro-meta">
          <span class="chip"><ListChecks :size="15" /> {{ steps.length }} pregunta{{ steps.length === 1 ? '' : 's' }}</span>
          <span class="chip"><Clock :size="15" /> ~{{ estMinutes }} min</span>
          <span class="chip"><Save :size="15" /> Autoguardado</span>
        </div>
        <UiButton variant="primary" size="lg" class="intro-cta" @click="start">
          {{ savedOnce ? 'Continuar' : 'Comenzar' }} →
        </UiButton>
      </div>
    </div>

    <!-- Wizard ------------------------------------------------------------ -->
    <div v-else class="wiz-inner">
      <header class="wiz-head">
        <div class="wiz-top">
          <img src="@/assets/MARCA-14.png" alt="Seim" class="wiz-logo" />
          <span class="save-state">
            <template v-if="saving"><span class="c-spin sm" /> Guardando…</template>
            <template v-else-if="savedOnce"><Check :size="14" /> Guardado</template>
          </span>
        </div>
        <div class="progress"><div class="progress-bar" :style="{ width: progress + '%' }" /></div>
        <div class="progress-meta">
          <span>Paso {{ index + 1 }} de {{ steps.length }}</span>
          <span>{{ progress }}%</span>
        </div>
      </header>

      <Transition :name="transition" mode="out-in">
        <main v-if="current" :key="current.id" class="wiz-body">
          <div class="wiz-body-inner">
            <span class="q-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <h1 class="q-title">{{ current.question || 'Pregunta sin título' }}</h1>
            <p v-if="current.help" class="q-help">{{ current.help }}</p>

            <!-- Opciones -->
            <div v-if="current.type === 'choice'" class="options">
              <button
                v-for="c in choices(current)"
                :key="c.value"
                type="button"
                class="option"
                :class="{ on: isSelected(current, c.value) }"
                @click="toggleOption(current, c.value)"
              >
                <span class="o-key">{{ c.key }}</span>
                <span class="o-label">{{ c.label }}</span>
                <Check v-if="isSelected(current, c.value)" class="o-check" :size="18" />
              </button>
              <UiInput
                v-if="current.allowOther && isSelected(current, OTHER)"
                v-model="answers[current.id].other"
                placeholder="Contanos cuál…"
                class="other-in"
              />
            </div>

            <!-- Texto libre -->
            <div v-else-if="current.type === 'text'" class="control">
              <UiTextarea
                v-model="answers[current.id]"
                :rows="5"
                placeholder="Escribí tu respuesta…"
              />
            </div>

            <!-- Lista de items -->
            <div v-else-if="current.type === 'list'" ref="listRef" class="list-items">
              <div v-for="(item, i) in answers[current.id]" :key="i" class="list-row">
                <span class="li-bullet">{{ i + 1 }}</span>
                <textarea
                  v-auto-grow
                  rows="1"
                  class="li-input"
                  :value="answers[current.id][i]"
                  :placeholder="`Item ${i + 1}`"
                  @input="onItemInput($event, current, i)"
                  @keydown.enter.prevent="addItem(current)"
                />
                <button class="li-remove" :disabled="answers[current.id].length === 1" @click="removeItem(current, i)">
                  <X :size="16" />
                </button>
              </div>
              <UiButton size="sm" variant="secondary" class="add-item" @click="addItem(current)">
                <template #icon><Plus :size="15" /></template>
                Agregar item
              </UiButton>
            </div>
          </div>
        </main>
      </Transition>

      <footer class="wiz-foot">
        <UiButton variant="ghost" :disabled="index === 0" @click="prev">← Anterior</UiButton>
        <div class="foot-right">
          <span class="enter-hint">Enter ↵</span>
          <UiButton v-if="!isLast" variant="primary" :disabled="!canAdvance" @click="next">Siguiente →</UiButton>
          <UiButton v-else variant="primary" :disabled="!canAdvance" :loading="saving" @click="finish">
            Enviar respuestas
          </UiButton>
        </div>
      </footer>

      <p v-if="steps.length === 0" class="empty-note">
        Este formulario todavía no tiene preguntas. Escribinos y lo resolvemos.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Check, X, Plus, ListChecks, Clock, Save } from 'lucide-vue-next'
import { ensureClientSession } from '@/services/auth'
import { getClientByHash, getTemplate, getResponse, saveAnswers } from '@/services/db'
import { UiInput, UiTextarea, UiButton } from '@/components/console'

const OTHER = '__other__'
const route = useRoute()
const router = useRouter()
const hash = route.params.sessionId

const loading = ref(true)
const saving = ref(false)
const savedOnce = ref(false)
const sent = ref(false)
const started = ref(false)
const index = ref(0)
const dir = ref('next')

const steps = ref([])
const answers = reactive({})
const templateId = ref(null)
const clientName = ref('')

const current = computed(() => steps.value[index.value])
const isLast = computed(() => index.value === steps.value.length - 1)
const progress = computed(() =>
  steps.value.length ? Math.round(((index.value + 1) / steps.value.length) * 100) : 0
)
const estMinutes = computed(() => Math.max(1, Math.round(steps.value.length * 0.5)))
const transition = computed(() => `slide-${dir.value}`)

onMounted(async () => {
  window.addEventListener('keydown', onKey)
  try {
    await ensureClientSession()
    const client = await getClientByHash(hash)
    if (!client) { router.replace({ name: 'brief-gate' }); return }
    clientName.value = client.name || ''
    templateId.value = client.templateId
    const tpl = await getTemplate(client.templateId)
    steps.value = tpl?.steps || []

    const existing = await getResponse(hash)
    for (const step of steps.value) {
      answers[step.id] = normalize(step, existing?.answers?.[step.id])
    }
    if (existing?.status === 'enviado') savedOnce.value = true
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

function normalize(step, saved) {
  if (step.type === 'choice') {
    return { values: Array.isArray(saved?.values) ? [...saved.values] : [], other: saved?.other || '' }
  }
  if (step.type === 'list') return Array.isArray(saved) && saved.length ? [...saved] : ['']
  return typeof saved === 'string' ? saved : ''
}

function choices(step) {
  const arr = step.options.map((o, i) => ({ key: i + 1, value: o, label: o }))
  if (step.allowOther) arr.push({ key: step.options.length + 1, value: OTHER, label: 'Otro' })
  return arr
}

function isSelected(step, val) { return answers[step.id]?.values.includes(val) }
function toggleOption(step, val) {
  const a = answers[step.id]
  if (step.multiple) {
    const i = a.values.indexOf(val)
    if (i >= 0) a.values.splice(i, 1); else a.values.push(val)
  } else {
    a.values = a.values.includes(val) ? [] : [val]
  }
}

const listRef = ref(null)

function addItem(step) { answers[step.id].push('') }
function removeItem(step, i) {
  answers[step.id].splice(i, 1)
  if (answers[step.id].length === 0) answers[step.id].push('')
  // Los textareas se reutilizan por índice: al correr los valores hacia arriba,
  // el que quedó conserva su alto viejo. Recalculamos todos con el DOM ya
  // actualizado para que cada uno tome el tamaño de su nuevo contenido.
  nextTick(() => listRef.value?.querySelectorAll('.li-input').forEach(autoSize))
}

// Item de lista: textarea que crece hacia abajo a medida que se escribe.
function autoSize(el) {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
function onItemInput(e, step, i) {
  answers[step.id][i] = e.target.value
  autoSize(e.target)
}
// Solo dimensionamos al montar (contenido restaurado) y al escribir (@input).
// Evitamos el hook `updated`: se dispara en cada re-render —p.ej. el autosave—
// y el reflow de altura reposiciona el scroll de la lista hacia arriba.
const vAutoGrow = {
  mounted: (el) => autoSize(el),
}

function isComplete(step) {
  if (!step) return true
  if (!step.required) return true
  const a = answers[step.id]
  if (step.type === 'choice') {
    if (a.values.includes(OTHER)) return a.other.trim().length > 0
    return a.values.length > 0
  }
  if (step.type === 'list') return a.some((x) => x.trim().length > 0)
  return (a || '').trim().length > 0
}
const canAdvance = computed(() => isComplete(current.value))

function start() { started.value = true }
function next() { if (index.value < steps.value.length - 1) { dir.value = 'next'; index.value++ } }
function prev() { if (index.value > 0) { dir.value = 'prev'; index.value-- } }
async function finish() { await persist('enviado'); sent.value = true }

function onKey(e) {
  const tag = document.activeElement?.tagName
  const typing = tag === 'TEXTAREA' || tag === 'INPUT'
  if (loading.value || sent.value) return
  if (!started.value) {
    if (e.key === 'Enter' && steps.value.length) { e.preventDefault(); start() }
    return
  }
  const step = current.value
  if (e.key === 'Enter' && !typing) {
    e.preventDefault()
    if (canAdvance.value) { isLast.value ? finish() : next() }
    return
  }
  // Selección por número en preguntas de opciones (1, 2, 3…)
  if (step?.type === 'choice' && !typing && /^[1-9]$/.test(e.key)) {
    const list = choices(step)
    const idx = Number(e.key) - 1
    if (idx < list.length) { e.preventDefault(); toggleOption(step, list[idx].value) }
  }
}

let timer
watch(answers, () => {
  if (loading.value) return
  clearTimeout(timer)
  timer = setTimeout(() => persist('borrador'), 900)
}, { deep: true })

async function persist(status) {
  if (loading.value || steps.value.length === 0) return
  saving.value = true
  try {
    await saveAnswers(hash, {
      templateId: templateId.value,
      clientName: clientName.value,
      answers: JSON.parse(JSON.stringify(answers)),
      status,
    })
    savedOnce.value = true
  } catch (e) {
    console.error('autosave', e)
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.wiz {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background: #030304;
}

/* Fondo premium por capas:
   1) gradiente de profundidad (centro-arriba iluminado → bordes negros),
   2) dos glows aqua suaves que enmarcan el contenido,
   3) el haz cónico del hero (solo desktop),
   4) grano fino.
   Sin grillas ni patrones. */
.wiz-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(ellipse 70% 46% at 82% 4%, rgba(175, 227, 232, 0.12), transparent 60%),
    radial-gradient(ellipse 58% 50% at 8% 98%, rgba(127, 180, 216, 0.08), transparent 66%),
    radial-gradient(ellipse 130% 100% at 50% -12%, #0c0e11 0%, #070809 46%, #030304 100%);
}
/* Halo aqua muy tenue que “respira” detrás del contenido, para dar vida
   sin ensuciar la lectura. */
.wiz-bg::after {
  content: '';
  position: absolute;
  top: -12%;
  left: 50%;
  width: 120vw;
  max-width: 1100px;
  height: 80vh;
  transform: translateX(-50%);
  background: radial-gradient(ellipse 50% 50% at 50% 30%, rgba(175, 227, 232, 0.07), transparent 70%);
  animation: wiz-breathe 12s ease-in-out infinite;
}
@keyframes wiz-breathe {
  50% { opacity: 0.5; transform: translateX(-50%) scale(1.06); }
}

/* Copia fiel de .light-container del hero de la landing:
   fuente de luz fuera de pantalla a la derecha, rayos cónicos blanco→aqua,
   blur 20px y máscara elíptica anclada al borde derecho. */
.light-container {
  position: absolute;
  top: -20%;
  right: -5vw;
  /* Ancho tal que el borde izquierdo cae en x≈0; el degradé de la máscara
     completa a 0 mucho antes (stop 86%), así no hay corte visible. */
  width: 105vw;
  height: 140vh;
  display: flex;
  flex-direction: column;
  filter: blur(30px);
  opacity: 0.7;
  mask-image: radial-gradient(
    ellipse 86% 120% at 100% 42%,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.92) 14%,
    rgba(255, 255, 255, 0.72) 30%,
    rgba(255, 255, 255, 0.46) 46%,
    rgba(255, 255, 255, 0.24) 60%,
    rgba(255, 255, 255, 0.09) 73%,
    rgba(255, 255, 255, 0) 86%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 86% 120% at 100% 42%,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.92) 14%,
    rgba(255, 255, 255, 0.72) 30%,
    rgba(255, 255, 255, 0.46) 46%,
    rgba(255, 255, 255, 0.24) 60%,
    rgba(255, 255, 255, 0.09) 73%,
    rgba(255, 255, 255, 0) 86%
  );
}
.conic-light { flex: 1; width: 100%; }
.conic-light-top {
  background: conic-gradient(
    from 180deg at 99.78% 35%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 15deg,
    rgb(175, 227, 232) 25deg,
    rgb(160, 212, 222) 40deg,
    rgba(145, 195, 205, 0.5) 60deg,
    rgba(17, 17, 17, 0) 90deg,
    rgba(17, 17, 17, 0) 342deg,
    rgb(255, 255, 255) 360deg
  );
}
.conic-light-bottom {
  background: conic-gradient(
    from 0deg at 99.78% 65%,
    rgb(255, 255, 255) 0deg,
    rgb(255, 255, 255) 10deg,
    rgba(17, 17, 17, 0) 20deg,
    rgba(17, 17, 17, 0) 270deg,
    rgb(160, 212, 222) 315deg,
    rgb(175, 227, 232) 330deg,
    rgb(255, 255, 255) 342deg,
    rgb(255, 255, 255) 360deg
  );
}
.grain {
  position: absolute; inset: 0;
  opacity: 0.045;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.center {
  position: relative; z-index: 1;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.wiz-inner {
  position: relative; z-index: 1;
  width: 100%; max-width: 640px;
  margin: 0 auto;
  padding: 40px 24px 44px;
  /* Alto fijo (no min-height): el contenedor nunca crece, así el footer
     queda siempre a la vista. El scroll vive en .wiz-body. */
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex; flex-direction: column;
}

/* Intro ------------------------------------------------------------------- */
.intro { max-width: 500px; text-align: left; }
.intro-logo { height: 24px; width: auto; opacity: 0.95; margin-bottom: 34px; display: block; }
.eyebrow {
  display: inline-block;
  font-size: 0.76rem; font-weight: 620; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 16px;
}
.intro-title { font-size: 2.6rem; font-weight: 680; letter-spacing: -0.035em; margin: 0; line-height: 1.05; }
.intro-lead { color: var(--text-dim); font-size: 1.05rem; line-height: 1.6; margin: 16px 0 0; }
.intro-meta { display: flex; flex-wrap: wrap; gap: 10px; margin: 26px 0 32px; }
.chip {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.82rem; color: var(--text-dim);
  padding: 7px 13px; border-radius: 999px;
  border: 1px solid var(--border); background: rgba(255, 255, 255, 0.025);
}
.intro-cta { padding: 0 26px; }

/* Header ------------------------------------------------------------------ */
.wiz-head { flex-shrink: 0; margin-bottom: 32px; }
.wiz-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.wiz-logo { height: 20px; width: auto; opacity: 0.9; }
.save-state { font-size: 0.8rem; color: var(--text-dim); display: inline-flex; align-items: center; gap: 6px; }
.c-spin.sm { width: 13px; height: 13px; border-width: 2px; }
.progress { height: 6px; background: rgba(255, 255, 255, 0.07); border-radius: 999px; overflow: hidden; }
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #7fb4d8, var(--accent));
  border-radius: 999px;
  transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-meta { display: flex; justify-content: space-between; margin-top: 9px; font-size: 0.76rem; color: var(--text-faint); }

/* Cuerpo ------------------------------------------------------------------ */
/* Área scrolleable entre header y footer. `min-height: 0` es clave para que
   el flex item pueda encogerse por debajo de su contenido y scrollear en vez
   de empujar el footer. */
.wiz-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: var(--border-strong) transparent;
}
.wiz-body::-webkit-scrollbar { width: 8px; }
.wiz-body::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 999px; }
.wiz-body::-webkit-scrollbar-track { background: transparent; }
/* `margin: auto 0` centra el contenido cuando sobra espacio, pero —a
   diferencia de justify-content:center— no recorta el inicio cuando el
   contenido es más alto que el área: ahí simplemente se scrollea. */
.wiz-body-inner { margin: auto 0; width: 100%; padding: 12px 0; }
.q-num {
  display: inline-block;
  font-size: 0.82rem; font-weight: 700; letter-spacing: 0.05em;
  color: var(--accent); margin-bottom: 14px;
}
.q-title { font-size: 1.75rem; font-weight: 660; letter-spacing: -0.03em; line-height: 1.22; margin: 0; }
.q-help { margin: 12px 0 0; color: var(--text-dim); font-size: 1rem; line-height: 1.55; }

.control { margin-top: 32px; }
.options { margin-top: 32px; display: flex; flex-direction: column; gap: 10px; }
.option {
  display: flex; align-items: center; gap: 14px;
  text-align: left;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 14px;
  padding: 15px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, transform 0.08s ease;
  font-family: inherit;
}
.option:hover { border-color: var(--border-strong); background: rgba(255, 255, 255, 0.055); }
.option:active { transform: scale(0.995); }
.option.on { border-color: rgba(175, 227, 232, 0.65); background: var(--accent-soft); }
.o-key {
  width: 26px; height: 26px; flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 640; color: var(--text-dim);
  transition: all 0.15s ease;
}
.option.on .o-key { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.o-label { flex: 1; }
.o-check { color: var(--accent); flex-shrink: 0; }
.other-in { margin-top: 4px; }

.list-items { margin-top: 32px; display: flex; flex-direction: column; gap: 10px; }
.list-row { display: flex; align-items: flex-start; gap: 10px; }
.li-bullet {
  width: 24px; height: 24px; flex-shrink: 0; margin-top: 11px;
  border-radius: 7px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.78rem; color: var(--text-faint); font-weight: 600;
}
/* Textarea auto-expandible: el texto largo baja de línea en vez de cortarse. */
.li-input {
  flex: 1;
  min-height: 46px;
  width: 100%;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-family: inherit;
  font-size: 16px; /* evita el auto-zoom de iOS */
  line-height: 1.5;
  padding: 11px 15px;
  outline: none;
  resize: none;
  overflow: hidden;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.li-input::placeholder { color: var(--text-faint); }
.li-input:hover { border-color: var(--border-strong); }
.li-input:focus {
  border-color: rgba(175, 227, 232, 0.55);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: var(--ring);
}
.li-remove {
  width: 38px; height: 38px; flex-shrink: 0; margin-top: 4px;
  border: 1px solid var(--border); background: transparent; color: var(--text-faint);
  border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
}
.li-remove:hover:not(:disabled) { color: var(--danger); border-color: var(--danger); }
.li-remove:disabled { opacity: 0.35; cursor: not-allowed; }
.add-item { align-self: flex-start; margin-top: 2px; }

/* Footer ------------------------------------------------------------------ */
.wiz-foot { flex-shrink: 0; margin-top: 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.foot-right { display: flex; align-items: center; gap: 14px; }
.enter-hint {
  font-size: 0.74rem; color: var(--text-faint);
  border: 1px solid var(--border); border-radius: 7px; padding: 3px 8px;
}
.empty-note { margin-top: 22px; text-align: center; color: var(--text-faint); }

/* Completado -------------------------------------------------------------- */
.done { max-width: 470px; text-align: center; }
.done-badge {
  width: 64px; height: 64px; margin: 0 auto 24px;
  border-radius: 50%;
  background: var(--accent); color: var(--accent-ink);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 40px -8px rgba(175, 227, 232, 0.55);
}
.done-title { font-size: 2rem; font-weight: 680; letter-spacing: -0.03em; margin: 0; }
.done-text { color: var(--text-dim); margin: 14px 0 28px; line-height: 1.6; font-size: 1.02rem; }

/* Transiciones entre pasos ------------------------------------------------ */
.slide-next-enter-active, .slide-next-leave-active,
.slide-prev-enter-active, .slide-prev-leave-active { transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-next-enter-from { opacity: 0; transform: translateX(34px); }
.slide-next-leave-to { opacity: 0; transform: translateX(-34px); }
.slide-prev-enter-from { opacity: 0; transform: translateX(-34px); }
.slide-prev-leave-to { opacity: 0; transform: translateX(34px); }

@media (max-width: 640px) {
  /* En mobile el haz lateral taparía el texto: lo sacamos, pero el fondo por
     capas (profundidad + glows aqua + halo + grano) se mantiene, así queda
     premium sin comprometer la lectura. */
  .light-container { display: none; }
  .wiz-bg {
    background:
      radial-gradient(ellipse 90% 34% at 84% 2%, rgba(175, 227, 232, 0.14), transparent 62%),
      radial-gradient(ellipse 80% 40% at 6% 100%, rgba(127, 180, 216, 0.09), transparent 68%),
      radial-gradient(ellipse 140% 90% at 50% -10%, #0b0d10 0%, #070809 48%, #030304 100%);
  }
  .center { padding: 24px 20px; }
  .wiz-inner { padding: 22px 20px 22px; }
  .wiz-head { margin-bottom: 22px; }
  .intro-logo { margin-bottom: 26px; }
  .intro-title { font-size: 2.05rem; }
  .intro-lead { font-size: 1rem; }
  .q-title { font-size: 1.45rem; }
  .options { margin-top: 22px; }
  .control, .list-items { margin-top: 22px; }
  .wiz-foot { margin-top: 24px; }
  .enter-hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .wiz-bg::after { animation: none; }
  .slide-next-enter-active, .slide-next-leave-active,
  .slide-prev-enter-active, .slide-prev-leave-active { transition: opacity 0.2s ease; }
  .slide-next-enter-from, .slide-next-leave-to,
  .slide-prev-enter-from, .slide-prev-leave-to { transform: none; }
}
</style>
