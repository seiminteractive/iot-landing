<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['ui-btn', `ui-btn--${variant}`, `ui-btn--${size}`, { 'ui-btn--block': block, 'is-loading': loading }]"
  >
    <span v-if="loading" class="ui-btn__spin" aria-hidden="true" />
    <span v-if="$slots.icon && !loading" class="ui-btn__icon"><slot name="icon" /></span>
    <span v-if="$slots.default" class="ui-btn__label"><slot /></span>
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'secondary' }, // primary | secondary | ghost | danger
  size: { type: String, default: 'md' }, // sm | md | lg
  type: { type: String, default: 'button' },
  loading: Boolean,
  disabled: Boolean,
  block: Boolean,
})
</script>

<style scoped>
.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 590;
  letter-spacing: -0.01em;
  border: 1px solid transparent;
  border-radius: var(--r-md);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.16s ease, border-color 0.16s ease, color 0.16s ease,
    transform 0.08s ease, box-shadow 0.16s ease, filter 0.16s ease;
  -webkit-user-select: none;
  user-select: none;
}
.ui-btn:active { transform: translateY(0.5px); }
.ui-btn:disabled { opacity: 0.42; cursor: not-allowed; transform: none; filter: none; }
.ui-btn--block { width: 100%; }

/* Tamaños */
.ui-btn--sm { height: 32px; padding: 0 12px; font-size: 0.83rem; border-radius: 9px; }
.ui-btn--md { height: 38px; padding: 0 15px; font-size: 0.88rem; border-radius: 10px; }
.ui-btn--lg { height: 46px; padding: 0 20px; font-size: 0.96rem; border-radius: 12px; }

/* Primary — plano y sobrio, sin glow (evita el aspecto "candy") */
.ui-btn--primary {
  background: #b7e6eb;
  color: var(--accent-ink);
  font-weight: 620;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
.ui-btn--primary:not(:disabled):hover { background: #c6ecf0; }
.ui-btn--primary:not(:disabled):active { background: #a9e0e6; }

/* Secondary */
.ui-btn--secondary {
  background: rgba(255, 255, 255, 0.045);
  border-color: var(--border-strong);
  color: var(--text);
}
.ui-btn--secondary:not(:disabled):hover { background: rgba(255, 255, 255, 0.085); }

/* Ghost */
.ui-btn--ghost { background: transparent; color: var(--text-dim); }
.ui-btn--ghost:not(:disabled):hover { background: rgba(255, 255, 255, 0.06); color: var(--text); }

/* Danger */
.ui-btn--danger { background: transparent; color: var(--danger); }
.ui-btn--danger:not(:disabled):hover { background: rgba(255, 122, 122, 0.1); }

.ui-btn__icon { display: inline-flex; margin: 0 -2px; }
.ui-btn__label { display: inline-flex; }

.ui-btn__spin {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  opacity: 0.7;
  animation: ui-spin 0.7s linear infinite;
}
@keyframes ui-spin { to { transform: rotate(360deg); } }
</style>
