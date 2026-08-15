<template>
  <div class="ui-field" :class="{ 'has-error': error }">
    <label v-if="label" :for="fieldId" class="ui-label">
      {{ label }}<span v-if="required" class="ui-req">*</span>
    </label>
    <textarea
      :id="fieldId"
      class="ui-textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="ui-msg ui-msg--error">{{ error }}</p>
    <p v-else-if="help" class="ui-msg">{{ help }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({ inheritAttrs: false })
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  help: String,
  error: String,
  placeholder: String,
  id: String,
  rows: { type: [Number, String], default: 4 },
  disabled: Boolean,
  required: Boolean,
})
defineEmits(['update:modelValue'])
const fieldId = computed(() => props.id || `f-${Math.random().toString(36).slice(2, 9)}`)
</script>

<style scoped>
.ui-field { display: flex; flex-direction: column; gap: 7px; }
.ui-label { font-size: 0.82rem; font-weight: 590; color: var(--text); letter-spacing: -0.01em; }
.ui-req { color: var(--accent); margin-left: 3px; }

.ui-textarea {
  width: 100%;
  min-height: 120px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  color: var(--text);
  font-family: inherit;
  font-size: 16px; /* 16px evita el auto-zoom de iOS al enfocar */
  line-height: 1.55;
  padding: 13px 15px;
  outline: none;
  resize: vertical;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.ui-textarea::placeholder { color: var(--text-faint); }
.ui-textarea:hover { border-color: var(--border-strong); }
.ui-textarea:focus {
  border-color: rgba(175, 227, 232, 0.6);
  background: rgba(255, 255, 255, 0.055);
  box-shadow: var(--ring);
}
.has-error .ui-textarea { border-color: rgba(255, 122, 122, 0.55); }

.ui-msg { margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; }
.ui-msg--error { color: var(--danger); }
</style>
