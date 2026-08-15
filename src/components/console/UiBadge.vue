<template>
  <span class="ui-badge" :class="status ? `ui-badge--${status}` : ''">
    <span v-if="dot" class="ui-badge__dot" />
    <slot />
  </span>
</template>

<script setup>
defineProps({
  status: String, // borrador | enviado | en_revision | cotizado
  dot: { type: Boolean, default: true },
})
</script>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  padding: 4px 11px 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-dim);
  white-space: nowrap;
}
.ui-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
.ui-badge--borrador { color: #ffcf6b; border-color: rgba(255, 207, 107, 0.32); background: rgba(255, 207, 107, 0.06); }
.ui-badge--enviado { color: var(--accent); border-color: rgba(175, 227, 232, 0.34); background: rgba(175, 227, 232, 0.07); }
.ui-badge--en_revision { color: #c9a7ff; border-color: rgba(201, 167, 255, 0.34); background: rgba(201, 167, 255, 0.06); }
.ui-badge--cotizado { color: #7ee787; border-color: rgba(126, 231, 135, 0.34); background: rgba(126, 231, 135, 0.06); }
</style>
