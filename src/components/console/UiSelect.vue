<template>
  <div class="ui-field" :class="{ 'has-error': error }">
    <label v-if="label" :for="fieldId" class="ui-label">
      {{ label }}<span v-if="required" class="ui-req">*</span>
    </label>
    <div class="ui-control">
      <select
        :id="fieldId"
        class="ui-select"
        :value="modelValue"
        :disabled="disabled"
        v-bind="$attrs"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in normalized" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        <slot />
      </select>
      <svg class="ui-caret" width="12" height="8" viewBox="0 0 12 8" aria-hidden="true">
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <p v-if="error" class="ui-msg ui-msg--error">{{ error }}</p>
    <p v-else-if="help" class="ui-msg">{{ help }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ inheritAttrs: false })
const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] }, // [{value,label}] o [string]
  label: String,
  help: String,
  error: String,
  placeholder: String,
  id: String,
  disabled: Boolean,
  required: Boolean,
})
defineEmits(['update:modelValue'])
const fieldId = computed(() => props.id || `f-${Math.random().toString(36).slice(2, 9)}`)
const normalized = computed(() =>
  props.options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }))
)
</script>

<style scoped>
.ui-field { display: flex; flex-direction: column; gap: 7px; }
.ui-label { font-size: 0.82rem; font-weight: 590; color: var(--text); letter-spacing: -0.01em; }
.ui-req { color: var(--accent); margin-left: 3px; }

.ui-control { position: relative; display: flex; align-items: center; }
.ui-select {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  color: var(--text);
  font-family: inherit;
  font-size: 16px; /* 16px evita el auto-zoom de iOS al enfocar */
  padding: 0 40px 0 15px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  -webkit-appearance: none;
  appearance: none;
}
.ui-select:hover { border-color: var(--border-strong); }
.ui-select:focus {
  border-color: rgba(175, 227, 232, 0.6);
  background: rgba(255, 255, 255, 0.055);
  box-shadow: var(--ring);
}
.ui-select:disabled { opacity: 0.5; cursor: not-allowed; }
.ui-select option { background: var(--surface-2); color: var(--text); }
.has-error .ui-select { border-color: rgba(255, 122, 122, 0.55); }

.ui-caret { position: absolute; right: 15px; color: var(--text-faint); pointer-events: none; }

.ui-msg { margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; }
.ui-msg--error { color: var(--danger); }
</style>
