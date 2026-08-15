<template>
  <div class="ui-field" :class="{ 'has-error': error }">
    <label v-if="label" :for="fieldId" class="ui-label">
      {{ label }}<span v-if="required" class="ui-req">*</span>
    </label>
    <div class="ui-control">
      <span v-if="$slots.prefix" class="ui-affix"><slot name="prefix" /></span>
      <input
        :id="fieldId"
        class="ui-input"
        :class="{ 'has-prefix': !!$slots.prefix, 'has-suffix': !!$slots.suffix }"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span v-if="$slots.suffix" class="ui-affix ui-affix--suffix"><slot name="suffix" /></span>
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
  label: String,
  help: String,
  error: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  id: String,
  disabled: Boolean,
  required: Boolean,
})
defineEmits(['update:modelValue'])
const fieldId = computed(() => props.id || `f-${Math.random().toString(36).slice(2, 9)}`)
</script>

<style scoped>
.ui-field { display: flex; flex-direction: column; gap: 7px; }
.ui-label {
  font-size: 0.82rem;
  font-weight: 590;
  color: var(--text);
  letter-spacing: -0.01em;
}
.ui-req { color: var(--accent); margin-left: 3px; }

.ui-control { position: relative; display: flex; align-items: center; }
.ui-input {
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  color: var(--text);
  font-family: inherit;
  font-size: 16px; /* 16px evita el auto-zoom de iOS al enfocar */
  padding: 0 15px;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  -webkit-appearance: none;
  appearance: none;
}
.ui-input.has-prefix { padding-left: 42px; }
.ui-input.has-suffix { padding-right: 42px; }
.ui-input::placeholder { color: var(--text-faint); }
.ui-input:hover { border-color: var(--border-strong); }
.ui-input:focus {
  border-color: rgba(175, 227, 232, 0.6);
  background: rgba(255, 255, 255, 0.055);
  box-shadow: var(--ring);
}
.ui-input:disabled { opacity: 0.5; cursor: not-allowed; }

.has-error .ui-input { border-color: rgba(255, 122, 122, 0.55); }
.has-error .ui-input:focus { box-shadow: 0 0 0 4px rgba(255, 122, 122, 0.14); }

.ui-affix {
  position: absolute;
  left: 14px;
  display: inline-flex;
  color: var(--text-faint);
  pointer-events: none;
}
.ui-affix--suffix { left: auto; right: 14px; }

.ui-msg { margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; }
.ui-msg--error { color: var(--danger); }
</style>
